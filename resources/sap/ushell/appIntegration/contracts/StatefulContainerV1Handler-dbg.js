// Copyright (c) 2009-2025 SAP SE, All Rights Reserved
/**
 * @file This file contains miscellaneous utility functions for WebGui stateful container V1
 */
sap.ui.define([
    "sap/ushell/utils",
    "sap/ushell/Container"
], function (
    ushellUtils,
    Container
) {
    "use strict";

    class StatefulContainerV1Handler {
        async createApp (oApplicationContainer, sStorageAppId, oResolvedHashFragment) {
            oApplicationContainer.setCurrentAppId(sStorageAppId);
            oApplicationContainer.setCurrentAppUrl(oResolvedHashFragment.url);
            oApplicationContainer.setCurrentAppTargetResolution(oResolvedHashFragment);
            oApplicationContainer.setIframeReusedForApp(true);

            const oPostParams = await this.#createPostParams(oApplicationContainer, oResolvedHashFragment);
            await oApplicationContainer.sendRequest("sap.its.startService", oPostParams, true);
        }

        async #createPostParams (oApplicationContainer, oResolvedHashFragment) {
            let sUrl = oResolvedHashFragment.url;

            sUrl = await ushellUtils.appendSapShellParam(sUrl);
            sUrl = ushellUtils.filterOutParamsFromLegacyAppURL(sUrl);

            let oFLPParams;
            const oPostParams = {
                url: sUrl
            };
            if (oApplicationContainer.getIframeWithPost && oApplicationContainer.getIframeWithPost() === true) {
                const oAppStatesInfo = ushellUtils.getParamKeys(sUrl);

                if (oAppStatesInfo.aAppStateNamesArray.length > 0) {
                    const Navigation = await Container.getServiceAsync("Navigation");
                    try {
                        const aDataArray = await Navigation.getAppStateData(oAppStatesInfo.aAppStateKeysArray);
                        oFLPParams = {};
                        oAppStatesInfo.aAppStateNamesArray.forEach(function (item, index) {
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

            return oPostParams;
        }

        async destroyApp (oApplicationContainer) {
            oApplicationContainer.setCurrentAppId("");
            await oApplicationContainer.sendRequest("sap.gui.triggerCloseSession", {}, false);
        }
    }

    return new StatefulContainerV1Handler();
}, /* bExport= */ false);
