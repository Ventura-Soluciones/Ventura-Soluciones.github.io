// Copyright (c) 2009-2025 SAP SE, All Rights Reserved
/**
 * @file This file contains the AppruntimeHandler class.
 */
sap.ui.define([
    "sap/base/Log",
    "sap/ui/thirdparty/hasher",
    "sap/ushell/appIntegration/PostMessageManager",
    "sap/ushell/Container"
], function (
    Log,
    hasher,
    PostMessageManager,
    Container
) {
    "use strict";

    const oDistributionPolicies = {
        "sap.ushell.appRuntime.innerAppRouteChange": {
            activeOnly: true,
            ignoreCapabilities: true
        },
        "sap.ushell.appRuntime.keepAliveAppHide": {
            activeOnly: true,
            ignoreCapabilities: true
        },
        "sap.ushell.appRuntime.keepAliveAppShow": {
            activeOnly: true,
            ignoreCapabilities: true
        },
        "sap.ushell.appRuntime.hashChange": {
            activeOnly: true
        },
        "sap.ushell.appRuntime.setDirtyFlag": {
            activeOnly: true
        },
        "sap.ushell.appRuntime.getDirtyFlag": {
            activeOnly: true
        },
        "sap.ushell.appRuntime.themeChange": {
            ignoreCapabilities: true
        },
        "sap.ushell.appRuntime.uiDensityChange": {
            ignoreCapabilities: true
        }
    };

    const oServiceRequestHandlers = {
        "sap.ushell.appRuntime.hashChange": {
            async handler (oMessageBody, oMessageEvent) {
                const { newHash, direction } = oMessageBody;

                //FIX for internal incident #1980317281 - In general, hash structure in FLP is splitted into 3 parts:
                //A - application identification & B - Application parameters & C - Internal application area
                // Now, when an IFrame changes its hash, it sends PostMessage up to the FLP. The FLP does 2 things: Change its URL
                // and send a PostMessage back to the IFrame. This fix instruct the Shell.Controller.js to block only
                // the message back to the IFrame.
                hasher.disableBlueBoxHashChangeTrigger = true;
                hasher.replaceHash(newHash);
                hasher.disableBlueBoxHashChangeTrigger = false;

                //Getting the history direction, taken from the history object of UI5 (sent by the Iframe).
                //The direction value is used to update the direction property of the UI5 history object
                // that is running in the Iframe.
                if (direction) {
                    const ShellNavigationInternal = await Container.getServiceAsync("ShellNavigationInternal");
                    ShellNavigationInternal.hashChanger.fireEvent(
                        "hashReplaced",
                        {
                            hash: ShellNavigationInternal.hashChanger.getHash(),
                            direction: direction
                        }
                    );
                    Log.debug(`PostMessageAPI.hashChange :: Informed by the Iframe, to change the History direction property in FLP to: ${direction}`);
                }
            }
        },
        "sap.ushell.appRuntime.iframeIsValid": {
            async handler (oMessageBody, oApplicationContainer, oMessageEvent) {
                oApplicationContainer.setIsIframeValidTime({ time: new Date().getTime() });
            },
            options: {
                provideApplicationContext: true,
                allowInactive: true
            }
        },
        "sap.ushell.appRuntime.iframeIsBusy": {
            async handler (oMessageBody, oMessageEvent) {
                //deprecated since 1.118 and not used anymore
            }
        },
        "sap.ushell.appRuntime.isInvalidIframe": {
            async handler (oMessageBody, oApplicationContainer, oMessageEvent) {
                oApplicationContainer.setIsInvalidIframe(oMessageBody.bValue);
            },
            options: {
                provideApplicationContext: true,
                allowInactive: true
            }
        }
    };

    return {
        register () {
            Object.keys(oDistributionPolicies).forEach((sServiceRequest) => {
                const oDistributionPolicy = oDistributionPolicies[sServiceRequest];
                PostMessageManager.setDistributionPolicy(sServiceRequest, oDistributionPolicy);
            });

            Object.keys(oServiceRequestHandlers).forEach((sServiceRequest) => {
                const oHandler = oServiceRequestHandlers[sServiceRequest];
                PostMessageManager.setRequestHandler(sServiceRequest, oHandler.handler, oHandler.options);
            });
        }
    };
});
