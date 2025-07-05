// Copyright (c) 2009-2025 SAP SE, All Rights Reserved
/**
 * @fileOverview handle all the resources for the different applications.
 * @version 1.136.1
 */
sap.ui.define([
    "sap/ushell/ApplicationType/UrlPostProcessing",
    "sap/ui/thirdparty/hasher",
    "sap/ushell/utils",
    "sap/ushell/Container"
], (
    UrlPostProcessing,
    hasher,
    utils,
    Container
) => {
    "use strict";

    class StatefulContainerV2Handler {
        async createApp (oApplicationContainer, sUrl, sStorageAppId, oResolvedHashFragment) {
            let oFLPParams;

            oApplicationContainer.setReservedParameters(oResolvedHashFragment.reservedParameters);
            oApplicationContainer.setCurrentAppUrl(sUrl);
            oApplicationContainer.setCurrentAppId(sStorageAppId);
            oApplicationContainer.setCurrentAppTargetResolution(oResolvedHashFragment);
            oApplicationContainer.setIframeReusedForApp(true);

            sUrl = UrlPostProcessing.processUrl(sUrl, oResolvedHashFragment.applicationType, false, oApplicationContainer);

            const oPostParams = {
                sCacheId: sStorageAppId,
                sUrl: sUrl,
                sHash: hasher.getHash()
            };

            if (sUrl.indexOf("sap-iframe-hint=GUI") > 0 || sUrl.indexOf("sap-iframe-hint=WDA") > 0 || sUrl.indexOf("sap-iframe-hint=WCF") > 0) {
                const oAppStatesInfo = utils.getParamKeys(sUrl);

                if (oAppStatesInfo.aAppStateNamesArray.length > 0) {
                    try {
                        const Navigation = await Container.getServiceAsync("Navigation");
                        const aDataArray = await Navigation.getAppStateData(oAppStatesInfo.aAppStateKeysArray);
                        oFLPParams = {};
                        oAppStatesInfo.aAppStateNamesArray.forEach((item, index) => {
                            if (aDataArray[index]) {
                                oFLPParams[item] = aDataArray[index];
                            }
                        });
                    } catch {
                        // fail silently
                    }
                } else {
                    oFLPParams = {};
                }
            }

            if (oFLPParams) {
                oFLPParams["sap-flp-url"] = Container.getFLPUrl(true);
                oFLPParams["system-alias"] = oApplicationContainer.getSystemAlias();
                oPostParams["sap-flp-params"] = oFLPParams;
            }

            const oResult = await oApplicationContainer.sendRequest("sap.ushell.services.appLifeCycle.create", oPostParams, true);

            return oResult?.result;
        }

        async destroyApp (oApplicationContainer, sStorageKey) {
            const bIsActiveApp = oApplicationContainer.getCurrentAppId() === sStorageKey;

            if (bIsActiveApp) {
                oApplicationContainer.setCurrentAppUrl("");
                oApplicationContainer.setCurrentAppId("");
                oApplicationContainer.setCurrentAppTargetResolution(undefined);
                Container.setAsyncDirtyStateProvider(undefined);
            }

            await oApplicationContainer.sendRequest("sap.ushell.services.appLifeCycle.destroy", {
                sCacheId: sStorageKey
            }, true);
        }

        async storeAppWithinSameFrame (oApplicationContainer, sStorageKey) {
            oApplicationContainer.setCurrentAppUrl("");
            oApplicationContainer.setCurrentAppId("");
            oApplicationContainer.setCurrentAppTargetResolution(undefined);
            Container.setAsyncDirtyStateProvider(undefined);

            await oApplicationContainer.sendRequest("sap.ushell.services.appLifeCycle.store", {
                sCacheId: sStorageKey
            }, true);
        }

        async restoreAppWithinSameFrame (oApplicationContainer, sUrl, sStorageKey, oResolvedHashFragment) {
            oApplicationContainer.setCurrentAppUrl(sUrl);
            oApplicationContainer.setCurrentAppId(sStorageKey);
            oApplicationContainer.setCurrentAppTargetResolution(oResolvedHashFragment);
            oApplicationContainer.setIframeReusedForApp(true);

            await oApplicationContainer.sendRequest("sap.ushell.services.appLifeCycle.restore", {
                sCacheId: sStorageKey,
                sUrl: oResolvedHashFragment.url,
                sHash: hasher.getHash()
            }, true);
        }

        isStatefulContainerSupportingKeepAlive (oApplicationContainer) {
            if (!oApplicationContainer) {
                return false;
            }

            return oApplicationContainer.supportsCapabilities([
                // stateful capabilities
                "sap.ushell.services.AppLifeCycle.create",
                "sap.ushell.services.appLifeCycle.destroy",
                // keep alive capabilities
                "sap.ushell.services.appLifeCycle.store",
                "sap.ushell.services.appLifeCycle.restore"
            ]);
        }

        isIframeIsValidSupported (oApplicationContainer) {
            if (!oApplicationContainer) {
                return false;
            }

            return oApplicationContainer.supportsCapabilities([
                "sap.ushell.services.appRuntime.iframeIsValid"
            ]);
        }
    }

    return new StatefulContainerV2Handler();

});
