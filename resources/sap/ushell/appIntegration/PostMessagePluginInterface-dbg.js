// Copyright (c) 2009-2025 SAP SE, All Rights Reserved

sap.ui.define([
    "sap/base/util/deepExtend",
    "sap/ui/thirdparty/jquery"
], (
    deepExtend,
    jQuery
) => {
    "use strict";

    const USER_API_PREFIX = "user.postapi.";

    /**
     * @private
     */
    function PostMessagePluginInterface () {
        let _bRunsInOuterShell;
        let _fnAddCommunicationObject;

        /**
         * @private
         */
        this.init = function (bRunsInOuterShell, fnAddCommunicationObject) {
            _bRunsInOuterShell = bRunsInOuterShell;
            _fnAddCommunicationObject = fnAddCommunicationObject;
        };

        /**
         * @private
         */
        this.getInterface = function () {
            const oInterface = {};

            oInterface.registerPostMessageAPIs = addCommunicationObject.bind(null, _fnAddCommunicationObject);
            oInterface.createPostMessageResult = createPostMessageResult;

            if (_bRunsInOuterShell) {
                oInterface.postMessageToApp = doPostMessage.bind(null, _bRunsInOuterShell);
            } else {
                oInterface.postMessageToFlp = doPostMessage.bind(null, _bRunsInOuterShell);
            }

            return oInterface;
        };
    }

    /**
     * @private
     */
    function addCommunicationObject (fnAddCommunicationObject, oNewCommunicationObject, bSAPInternal) {
        const oRes = {
            status: "success",
            desc: ""
        };
        const oDefaultInCallProps = {
            isActiveOnly: true,
            distributionType: ["all"]
        };

        if (oNewCommunicationObject === undefined || Object.keys(oNewCommunicationObject).length <= 0) {
            oRes.status = "error";
            oRes.desc = "no handler was found to register";
            return oRes;
        }

        if (bSAPInternal === undefined) {
            bSAPInternal = false;
        }
        Object.keys(oNewCommunicationObject).forEach((sService) => {
            if (typeof sService !== "string") {
                oRes.status = "error";
                oRes.desc = "oPostMessageAPIs should contain only string keys";
            } else if (bSAPInternal === false && sService.indexOf(USER_API_PREFIX) !== 0) {
                oRes.status = "error";
                oRes.desc = `all user custom Message APIs must start with '${USER_API_PREFIX}'`;
            } else {
                Object.keys(oNewCommunicationObject[sService]).forEach((sType) => {
                    if (sType === "inCalls") {
                        oNewCommunicationObject[sService].oServiceCalls = oNewCommunicationObject[sService][sType];
                        delete oNewCommunicationObject[sService][sType];
                    } else if (sType === "outCalls") {
                        Object.keys(oNewCommunicationObject[sService][sType]).forEach((sMethod) => {
                            oNewCommunicationObject[sService][sType][sMethod] = deepExtend({}, oDefaultInCallProps, oNewCommunicationObject[sService][sType][sMethod]);
                        });
                        oNewCommunicationObject[sService].oRequestCalls = oNewCommunicationObject[sService][sType];
                        delete oNewCommunicationObject[sService][sType];
                    } else {
                        oRes.status = "error";
                        oRes.desc = "api should contain either 'inCalls' or 'outCalls'";
                    }
                });
            }
        });

        if (oRes.status === "success") {
            fnAddCommunicationObject(oNewCommunicationObject);
        }

        return oRes;
    }

    /**
     * @private
     */
    function doPostMessage (bRunsInOuterShell, sServiceName, sInterface, oParams) {
        const oDeferred = new jQuery.Deferred();

        if (oParams === undefined) {
            oParams = {};
        }

        if (bRunsInOuterShell) {
            // todo: [FLPCOREANDUX-10024] Resolve this
            sap.ui.require(["sap/ushell/appIntegration/PostMessageManager"], (PostMessageManager) => {
                const sServiceRequest = `${sServiceName}.${sInterface}`;

                PostMessageManager.sendRequestToAllApplications(sServiceRequest, oParams, true)
                    .then((oMessageBodies) => {
                        oDeferred.resolve(oMessageBodies[0]?.result);
                    });
            });
        } else {
            sap.ui.require(["sap/ushell/appRuntime/ui5/AppRuntimeService"], (AppRuntimeService) => {
                AppRuntimeService.sendMessageToOuterShell(`${sServiceName}.${sInterface}`, oParams)
                    .done((oResult) => {
                        oDeferred.resolve(oResult);
                    });
            });
        }

        return oDeferred.promise();
    }

    /**
     * @private
     */
    function createPostMessageResult (oResult) {
        if (oResult === undefined) {
            oResult = {};
        }
        return new jQuery.Deferred().resolve(oResult).promise();
    }

    return new PostMessagePluginInterface();
});
