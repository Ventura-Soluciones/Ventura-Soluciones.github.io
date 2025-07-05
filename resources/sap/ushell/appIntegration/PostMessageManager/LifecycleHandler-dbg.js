// Copyright (c) 2009-2025 SAP SE, All Rights Reserved
/**
 * @file This file contains the LifecycleHandler class.
 */
sap.ui.define([
    "sap/base/Log",
    "sap/base/util/Deferred",
    "sap/m/library",
    "sap/ui/thirdparty/hasher",
    "sap/ui/thirdparty/URI",
    "sap/ushell/appIntegration/PostMessageManager",
    "sap/ushell/Container",
    "sap/ushell/EventHub",
    "sap/ushell/library",
    "sap/ushell/resources",
    "sap/ushell/state/ShellModel",
    "sap/ushell/utils"
], function (
    Log,
    Deferred,
    mobileLibrary,
    hasher,
    URI,
    PostMessageManager,
    Container,
    EventHub,
    ushellLibrary,
    ushellResources,
    ShellModel,
    ushellUtils
) {
    "use strict";

    const URLHelper = mobileLibrary.URLHelper;

    // shortcut for sap.ushell.appIntegration.contracts.StatefulType
    const StatefulType = ushellLibrary.appIntegration.contracts.StatefulType;

    const aEventPreprocessor = [
        (oMessageEvent, oMessage) => {
            // Handle messages to AppLifeCycle service
            // Replace calls with old naming convention 'appLifeCycle'
            if (oMessage.service?.startsWith("sap.ushell.services.appLifeCycle")) {
                oMessage.service = oMessage.service.replace(/appLifeCycle/gi, "AppLifeCycle");

                return new MessageEvent("message", {
                    data: JSON.stringify(oMessage),
                    origin: oMessageEvent.origin,
                    source: oMessageEvent.source
                });
            }
        }
    ];

    const oDistributionPolicies = {
        "sap.ushell.services.AppLifeCycle.create": {
            activeOnly: true
        },
        "sap.ushell.services.AppLifeCycle.destroy": {
            activeOnly: true
        },
        "sap.ushell.services.AppLifeCycle.store": {
            activeOnly: true
        },
        "sap.ushell.services.AppLifeCycle.restore": {
            activeOnly: true
        },
        "sap.ushell.sessionHandler.extendSessionEvent": {
            ignoreCapabilities: true
        },
        "sap.ushell.sessionHandler.logout": {
            isValidRequestTarget (oContainer) {
                //this is a temporary check that will be removed after the issue of the central logout
                //will be implemented. In the case here, for FLP@ABAP, we do not want to send logout message to
                //CRM, WebGui and WDA iframes ifames as this is not needed. Sending it will cause an issue with the
                //main FLP logout
                if (",WCF,GUI,TR,WDA,".includes(oContainer.getApplicationType())) {
                    return false;
                }
                return true;
            }
        }
    };

    const oServiceRequestHandlers = {
        "sap.gui.loadFinished": {
            async handler (oMessageBody, oApplicationContainer, oMessageEvent) {
                oApplicationContainer.setStatefulType(StatefulType.ContractV1);
            },
            options: {
                provideApplicationContext: true,
                allowInactive: true
            }
        },
        "sap.ushell.services.AppLifeCycle.subscribe": {
            async handler (oMessageBody, oApplicationContainer, oMessageEvent) {
                const aNewCapabilities = oMessageBody;

                if (!Array.isArray(aNewCapabilities)) {
                    Log.error("subscribe service call failed: capabilities must be an array");
                    throw new Error("subscribe service call failed: capabilities must be an array");
                }

                const aFormattedCapabilities = aNewCapabilities.map((oCapability) => {
                    return `${oCapability.service}.${oCapability.action}`;
                });

                oApplicationContainer.addCapabilities(aFormattedCapabilities);
            },
            options: {
                provideApplicationContext: true,
                allowInactive: true
            }
        },
        "sap.ushell.services.AppLifeCycle.setup": {
            async handler (oMessageBody, oApplicationContainer, oMessageEvent) {
                const oSetup = oMessageBody;

                const aNewCapabilities = [];
                if (oSetup) {
                    if (oSetup.isStateful) {
                        oApplicationContainer.setStatefulType(StatefulType.ContractV2);

                        aNewCapabilities.push("sap.ushell.services.AppLifeCycle.create");
                        aNewCapabilities.push("sap.ushell.services.AppLifeCycle.destroy");

                        // todo: [FLPCOREANDUX-10024] this is a workaround
                        const bIsAppruntime = !ushellUtils.isSAPLegacyApplicationType(oApplicationContainer.getApplicationType(), oApplicationContainer.getFrameworkId());
                        if (bIsAppruntime) {
                            aNewCapabilities.push("sap.ushell.services.AppLifeCycle.store");
                            aNewCapabilities.push("sap.ushell.services.AppLifeCycle.restore");
                        }
                    }

                    if (oSetup.isIframeValid) {
                        aNewCapabilities.push("sap.ushell.appRuntime.iframeIsValid");
                    }

                    if (oSetup.session?.bLogoutSupport) {
                        aNewCapabilities.push("sap.ushell.sessionHandler.logout");
                    }

                    oApplicationContainer.addCapabilities(aNewCapabilities);
                }
            },
            options: {
                provideApplicationContext: true,
                allowInactive: true
            }
        },
        "sap.ushell.sessionHandler.notifyUserActive": {
            handler: extendSession
        },
        "sap.ushell.sessionHandler.extendSessionEvent": {
            handler: extendSession
        },
        "sap.ushell.ui5service.ShellUIService.setTitle": {
            async handler (oMessageBody, oApplicationContainer, oMessageEvent) {
                const { sTitle, oAdditionalInformation } = oMessageBody;
                const ShellUIService = oApplicationContainer.getShellUIService();

                ShellUIService.setTitle(sTitle, oAdditionalInformation);
            },
            options: {
                provideApplicationContext: true
            }
        },
        "sap.ushell.ui5service.ShellUIService.setBackNavigation": {
            async handler (oMessageBody, oApplicationContainer, oMessageEvent) {
                const ShellUIService = oApplicationContainer.getShellUIService();

                let fnCallback;
                if (oMessageBody.callbackMessage?.service) {
                    fnCallback = () => {
                        PostMessageManager.sendRequest(
                            oMessageBody.callbackMessage.service,
                            null,
                            oApplicationContainer.getPostMessageTarget(),
                            oApplicationContainer.getPostMessageTargetOrigin(),
                            false // bWaitForResponse
                        );
                    };
                } // empty body or callback message will call the setBackNavigation with undefined, this should reset the back button callback

                ShellUIService.setBackNavigation(fnCallback);
            },
            options: {
                provideApplicationContext: true
            }
        },
        "sap.ushell.services.ShellUIService.setTitle": {
            async handler (oMessageBody, oApplicationContainer, oMessageEvent) {
                const { sTitle, oAdditionalInformation } = oMessageBody;
                const ShellUIService = oApplicationContainer.getShellUIService();

                ShellUIService.setTitle(sTitle, oAdditionalInformation);
            },
            options: {
                provideApplicationContext: true
            }
        },
        "sap.ushell.services.ShellUIService.setHierarchy": {
            async handler (oMessageBody, oApplicationContainer, oMessageEvent) {
                const { aHierarchyLevels } = oMessageBody;
                const ShellUIService = oApplicationContainer.getShellUIService();

                ShellUIService.setHierarchy(aHierarchyLevels);
            },
            options: {
                provideApplicationContext: true
            }
        },
        "sap.ushell.services.ShellUIService.setRelatedApps": {
            async handler (oMessageBody, oApplicationContainer, oMessageEvent) {
                const { aRelatedApps } = oMessageBody;
                const ShellUIService = oApplicationContainer.getShellUIService();

                ShellUIService.setRelatedApps(aRelatedApps);
            },
            options: {
                provideApplicationContext: true
            }
        },
        "sap.ushell.services.ShellUIService.setDirtyFlag": {
            async handler (oMessageBody, oMessageEvent) {
                const { bIsDirty } = oMessageBody;

                Container.setDirtyFlag(bIsDirty);
            }
        },
        "sap.ushell.services.ShellUIService.showShellUIBlocker": {
            async handler (oMessageBody, oMessageEvent) {
                // 'sap.ushell.services.ShellUIService.showShellUIBlocker' was discontinued with SAPUI5 1.132.
                // This functionality has some conceptual issues which caused several issues in Work Zone.
                // Once we overcome these issues, we will re-implement this functionality. (FLPCOREANDUX-10622)
                // This call will be ignored.
            }
        },
        "sap.ushell.services.ShellUIService.getFLPUrl": {
            async handler (oMessageBody, oMessageEvent) {
                const bIncludeHash = oMessageBody.bIncludeHash;

                return Container.getFLPUrlAsync(bIncludeHash);
            }
        },
        "sap.ushell.services.ShellUIService.getShellGroupIDs": {
            async handler (oMessageBody, oMessageEvent) {
                /**
                 * @deprecated since 1.120. Deprecated together with the classic homepage.
                 */ // eslint-disable-next-line no-constant-condition
                if (true) {
                    const { bGetAll } = oMessageBody;
                    const BookmarkV2 = await Container.getServiceAsync("BookmarkV2");

                    return BookmarkV2.getShellGroupIDs(bGetAll);
                }

                throw new Error("Bookmark.getShellGroupIDs is deprecated. Use BookmarkV2.getContentNodes instead.");
            }
        },
        "sap.ushell.services.ShellUIService.addBookmark": {
            async handler (oMessageBody, oMessageEvent) {
                /**
                 * @deprecated since 1.120. Deprecated together with the classic homepage.
                 */ // eslint-disable-next-line no-constant-condition
                if (true) {
                    const { oParameters, groupId } = oMessageBody;
                    const BookmarkV2 = await Container.getServiceAsync("BookmarkV2");

                    return BookmarkV2.addBookmarkByGroupId(oParameters, groupId);
                }

                throw new Error("Bookmark.addBookmarkByGroupId is deprecated. Use BookmarkV2.addBookmark instead.");
            }
        },
        "sap.ushell.services.ShellUIService.addBookmarkDialog": {
            async handler (oMessageBody, oMessageEvent) {
                const [AddBookmarkButton] = await ushellUtils.requireAsync(["sap/ushell/ui/footerbar/AddBookmarkButton"]);
                const dialogButton = new AddBookmarkButton();
                dialogButton.firePress({});
            }
        },
        "sap.ushell.services.ShellUIService.getShellGroupTiles": {
            async handler (oMessageBody, oMessageEvent) {
                /**
                 * @deprecated since 1.120. Deprecated together with the classic homepage.
                 */ // eslint-disable-next-line no-constant-condition
                if (true) {
                    const { groupId } = oMessageBody;
                    const FlpLaunchPage = await Container.getServiceAsync("FlpLaunchPage");

                    const oDeferred = FlpLaunchPage.getTilesByGroupId(groupId);
                    return ushellUtils.promisify(oDeferred);
                }

                throw new Error("Classic homepage is deprecated.");
            }
        },
        "sap.ushell.services.ShellUIService.sendUrlAsEmail": {
            async handler (oMessageBody, oMessageEvent) {
                const sAppName = ShellModel.getModel().getProperty("/application/title");

                let sSubject;
                if (sAppName === undefined) {
                    sSubject = ushellResources.i18n.getText("linkToApplication");
                } else {
                    sSubject = `${ushellResources.i18n.getText("linkTo")} '${sAppName}'`;
                }

                sendEmail(
                    "",
                    sSubject,
                    document.URL,
                    "",
                    "",
                    document.URL,
                    true
                );
            }
        },
        "sap.ushell.services.ShellUIService.sendEmailWithFLPButton": {
            async handler (oMessageBody, oMessageEvent) {
                const { bSetAppStateToPublic } = oMessageBody;

                const sAppName = ShellModel.getModel().getProperty("/application/title");
                let sSubject;
                if (sAppName === undefined) {
                    sSubject = ushellResources.i18n.getText("linkToApplication");
                } else {
                    sSubject = `${ushellResources.i18n.getText("linkTo")} '${sAppName}'`;
                }

                sendEmail(
                    "",
                    sSubject,
                    document.URL,
                    "",
                    "",
                    document.URL,
                    bSetAppStateToPublic
                );
            }
        },
        "sap.ushell.services.ShellUIService.sendEmail": {
            async handler (oMessageBody, oMessageEvent) {
                const { sTo, sSubject, sBody, sCc, sBcc, sIFrameURL, bSetAppStateToPublic } = oMessageBody;

                sendEmail(
                    sTo,
                    sSubject,
                    sBody,
                    sCc,
                    sBcc,
                    sIFrameURL,
                    bSetAppStateToPublic
                );
            }
        },
        "sap.ushell.services.ShellUIService.processHotKey": {
            async handler (oMessageBody, oMessageEvent) {
                const oParams = oMessageBody;
                // IE doesn't support creating the KeyboardEvent object with a the "new" constructor, hence if this will fail, it will be created
                // using the document object- https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/KeyboardEvent
                // This KeyboardEvent has a constructor, so checking for its ecsitaance will not solve this, hence, only solution found is try-catch
                let oKeyboardEvent;
                try {
                    oKeyboardEvent = new KeyboardEvent("keydown", oParams);
                } catch (err) {
                    const { altKey, ctrlKey, shiftKey, key, keyCode } = oParams;
                    const IEevent = document.createEvent("KeyboardEvent");

                    let sSpecialKeys = ""; // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/initKeyboardEvent
                    if (altKey) {
                        sSpecialKeys += "Alt ";
                    }
                    if (ctrlKey) {
                        sSpecialKeys += "Control ";
                    }
                    if (shiftKey) {
                        sSpecialKeys += "Shift ";
                    }

                    IEevent.initKeyboardEvent("keydown", false, false, null, key, keyCode, sSpecialKeys, 0, false);
                    oKeyboardEvent = IEevent;
                }
                document.dispatchEvent(oKeyboardEvent);
            }
        },
        "sap.ushell.services.Container.setDirtyFlag": {
            async handler (oMessageBody, oMessageEvent) {
                const { bIsDirty } = oMessageBody;
                Container.setDirtyFlag(bIsDirty);
            }
        },
        "sap.ushell.services.Container.registerDirtyStateProvider": {
            async handler (oMessageBody, oApplicationContainer, oMessageEvent) {
                const { bRegister } = oMessageBody;
                if (bRegister) {
                    Container.setAsyncDirtyStateProvider(async function (oNavigationContext) {
                        //safety check in case post message does not get result
                        const oNativeDeferred = new Deferred();
                        const backupTimer = setTimeout(() => {
                            oNativeDeferred.resolve(false);
                        }, 2500);

                        PostMessageManager.sendRequest(
                            "sap.ushell.appRuntime.handleDirtyStateProvider",
                            { oNavigationContext },
                            oApplicationContainer.getPostMessageTarget(),
                            oApplicationContainer.getPostMessageTargetOrigin(),
                            true // bWaitForResponse
                        ).then((oResponseMessageBody) => {
                            if (backupTimer) {
                                clearTimeout(backupTimer);
                            }

                            oNativeDeferred.resolve(oResponseMessageBody.result || false);
                        });

                        return oNativeDeferred.promise;
                    });
                } else {
                    Container.setAsyncDirtyStateProvider();
                }
            },
            options: {
                provideApplicationContext: true
            }
        },
        "sap.ushell.services.Container.getFLPUrl": {
            async handler (oMessageBody, oMessageEvent) {
                const bIncludeHash = oMessageBody.bIncludeHash;
                return Container.getFLPUrlAsync(bIncludeHash);
            }
        },
        "sap.ushell.services.Container.getFLPConfig": {
            async handler (oMessageBody, oMessageEvent) {
                return Container.getFLPConfig();
            }
        },
        "sap.ushell.services.Container.getFLPPlatform": {
            async handler (oMessageBody, oMessageEvent) {
                return Container.getFLPPlatform();
            }
        },
        "sap.ushell.services.Container.attachLogoutEvent": {
            async handler (oMessageBody, oApplicationContainer, oMessageEvent) {
                Container.attachLogoutEvent(async function () {
                    return PostMessageManager.sendRequest(
                        "sap.ushell.appRuntime.executeLogoutFunctions",
                        {},
                        oApplicationContainer.getPostMessageTarget(),
                        oApplicationContainer.getPostMessageTargetOrigin(),
                        true // bWaitForResponse
                    );
                }, true);
            },
            options: {
                provideApplicationContext: true
            }
        },
        "sap.ushell.services.AppLifeCycle.reloadCurrentApp": {
            async handler (oMessageBody, oMessageEvent) {
                // should only be called for appruntime
                EventHub.emit("reloadCurrentApp", {
                    // Omit sAppContainerId, otherwise the entire iframe will be reloaded
                    sCurrentHash: hasher.getHash(),
                    date: Date.now()
                });
            }
        },
        "sap.ushell.services.AppLifeCycle.getFullyQualifiedXhrUrl": {
            async handler (oMessageBody, oMessageEvent) {
                const { path } = oMessageBody;

                if (path !== "" && path !== undefined && path !== null) {
                    const AppLifeCycle = await Container.getServiceAsync("AppLifeCycle");
                    const oSystemContext = await AppLifeCycle.getCurrentApplication().getSystemContext();
                    const sXhrUrl = oSystemContext.getFullyQualifiedXhrUrl(path);

                    let sHostName = "";
                    let sProtocol = "";
                    let sPort = "";
                    const sFlpURL = Container.getFLPUrl(true);
                    const oURI = new URI(sFlpURL);
                    if (oURI.protocol() !== null && oURI.protocol() !== undefined && oURI.protocol() !== "") {
                        sProtocol = `${oURI.protocol()}://`;
                    }
                    if (oURI.hostname() !== null && oURI.hostname() !== undefined && oURI.hostname() !== "") {
                        sHostName = oURI.hostname();
                    }
                    if (oURI.port() !== null && oURI.port() !== undefined && oURI.port() !== "") {
                        sPort = `:${oURI.port()}`;
                    }

                    const sResult = sProtocol + sHostName + sPort + sXhrUrl;
                    return sResult;
                }
            }
        },
        "sap.ushell.services.AppLifeCycle.getSystemAlias": {
            async handler (oMessageBody, oApplicationContainer, oMessageEvent) {
                const oAppTargetResolution = oApplicationContainer.getCurrentAppTargetResolution();
                const sFullyQualifiedSystemAlias = oAppTargetResolution.systemAlias;
                const sContentProviderId = oAppTargetResolution.contentProviderId;

                const [SystemAlias] = await ushellUtils.requireAsync(["sap/ushell/ApplicationType/systemAlias"]);

                return SystemAlias.getSystemAliasInProvider(sFullyQualifiedSystemAlias, sContentProviderId);
            },
            options: {
                provideApplicationContext: true
            }
        },
        "sap.ushell.services.AppLifeCycle.setNewAppInfo": {
            async handler (oMessageBody, oMessageEvent) {
                const oParams = oMessageBody;
                const AppLifeCycle = await Container.getServiceAsync("AppLifeCycle");

                AppLifeCycle.setAppInfo(oParams, true);
            }
        },
        "sap.ushell.services.AppLifeCycle.updateCurrentAppInfo": {
            async handler (oMessageBody, oMessageEvent) {
                const oParams = oMessageBody;
                const AppLifeCycle = await Container.getServiceAsync("AppLifeCycle");

                AppLifeCycle.setAppInfo(oParams, false);
            }
        },
        "sap.ushell.services.AppConfiguration.setApplicationFullWidth": {
            async handler (oMessageBody, oMessageEvent) {
                const { bValue } = oMessageBody;

                const [AppConfiguration] = await ushellUtils.requireAsync(["sap/ushell/services/AppConfiguration"]);

                AppConfiguration.setApplicationFullWidthInternal(bValue);
            }
        }
    };

    async function extendSession () {
        const oShellController = Container.getRenderer().getShellController();
        const oSessionHandler = oShellController._getSessionHandler();

        if (oSessionHandler?.isInitialized?.()) {
            oSessionHandler.userActivityHandler();
        }
    }

    async function sendEmail (sTo = "", sSubject = "", sBody = "", sCc = "", sBcc = "", sIFrameURL, bSetAppStateToPublic) {
        let sFLPUrl = ushellUtils.getDocumentUrl();

        function replaceIframeUrlToFLPUrl (sIFrameURL1, sFLPUrl1, sXStateKey, sIStateKey, sXStateKeyNew, sIStateKeyNew) {
            //replace iframe url with flp url
            sSubject = sSubject.includes(sIFrameURL1) ? sSubject.replace(sIFrameURL1, sFLPUrl1) : sSubject;
            sBody = sBody.includes(sIFrameURL1) ? sBody.replace(sIFrameURL1, sFLPUrl1) : sBody;

            //for cases where we do not find iframe url, replace the app state keys
            if (sXStateKey && sXStateKeyNew) {
                sSubject = sSubject.includes(sXStateKey) ? sSubject.replaceAll(sXStateKey, sXStateKeyNew) : sSubject;
                sBody = sBody.includes(sXStateKey) ? sBody.replaceAll(sXStateKey, sXStateKeyNew) : sBody;
            }

            if (sIStateKey && sIStateKeyNew) {
                sSubject = sSubject.includes(sIStateKey) ? sSubject.replaceAll(sIStateKey, sIStateKeyNew) : sSubject;
                sBody = sBody.includes(sIStateKey) ? sBody.replaceAll(sIStateKey, sIStateKeyNew) : sBody;
            }

        }

        if (bSetAppStateToPublic) {
            const oAppStateService = await Container.getServiceAsync("AppState");
            oAppStateService.setAppStateToPublic(sIFrameURL).then((sNewURL, sXStateKey, sIStateKey, sXStateKeyNew = "", sIStateKeyNew = "") => {
                if (sXStateKeyNew) {
                    sFLPUrl = sFLPUrl.replace(sXStateKey, sXStateKeyNew);
                }
                if (sIStateKeyNew) {
                    sFLPUrl = sFLPUrl.replace(sIStateKey, sIStateKeyNew);
                }
                //check if the subject or the body of the email contain the IFrame URL
                replaceIframeUrlToFLPUrl(sIFrameURL, sFLPUrl, sXStateKey, sIStateKey, sXStateKeyNew, sIStateKeyNew);
                URLHelper.triggerEmail(sTo, sSubject, sBody, sCc, sBcc);
            }, Log.error);
        } else {
            //check if the subject or the body of the email contain the IFrame URL
            replaceIframeUrlToFLPUrl(sIFrameURL, sFLPUrl);
            URLHelper.triggerEmail(sTo, sSubject, sBody, sCc, sBcc);
        }
    }

    return {
        register () {
            aEventPreprocessor.forEach((oEventPreprocessor) => {
                PostMessageManager.addEventPreprocessor(oEventPreprocessor);
            });

            Object.keys(oDistributionPolicies).forEach((sServiceRequest) => {
                const oDistributionPolicy = oDistributionPolicies[sServiceRequest];
                PostMessageManager.setDistributionPolicy(sServiceRequest, oDistributionPolicy);
            });

            Object.keys(oServiceRequestHandlers).forEach((sServiceRequest) => {
                const oHandler = oServiceRequestHandlers[sServiceRequest];
                PostMessageManager.setRequestHandler(sServiceRequest, oHandler.handler, oHandler.options);
            });
        },

        // for testing
        sendEmail
    };
});
