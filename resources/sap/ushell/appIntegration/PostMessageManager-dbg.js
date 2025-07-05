// Copyright (c) 2009-2025 SAP SE, All Rights Reserved

/**
 * @file This file contains the PostMessageManager class.
 * It handles the postMessage communication between the applications and the framework.
 */
sap.ui.define([
    "sap/base/Log",
    "sap/base/util/Deferred",
    "sap/base/util/isPlainObject",
    "sap/base/util/ObjectPath",
    "sap/base/util/uid"
], (
    Log,
    Deferred,
    isPlainObject,
    ObjectPath,
    uid
) => {
    "use strict";

    /**
     * @typedef {object} PostMessageRequest
     * @property {string} type the type of the message
     * @property {string} request_id the request id
     * @property {string} service the service name
     * @property {object} body the message body
     */

    /**
     * @typedef {object} PostMessageResponse
     * @property {string} type the type of the message
     * @property {string} request_id the request id
     * @property {string} service the service name
     * @property {string} status the status of the response
     * @property {object} body the message body
     */

    /**
     * @typedef {object} RequestHandlerOptions
     * @property {boolean} [provideApplicationContext=false] flag to indicate if the application context should be used.
     * @property {boolean} [allowInactive=false] flag to indicate if the request should be allowed from inactive applications.
     * @property {function} [isValidRequest] a function to validate the request
     */

    const oDefaultRequestHandlerOptions = {
        provideApplicationContext: false,
        allowInactive: false
    };

    /**
     * @typedef {object} DistributionPolicy
     * @property {boolean} [activeOnly=false] flag to indicate if the message should be sent only to active application
     * @property {boolean} [ignoreCapabilities=false] flag to indicate if the capabilities should be ignored
     * @property {function} [isValidRequestTarget] a function to validate the request target
     */

    const oDefaultDistributionPolicy = {
        activeOnly: false,
        ignoreCapabilities: false
    };

    const DoNotReply = Symbol("DoNotReply");
    const oLogger = Log.getLogger("sap.ushell.appIntegration.PostMessageManager");

    class PostMessageManager {
        #fnPostMessageEventHandler = () => {
            throw new Error("PostMessageManager is not initialized");
        };
        #fnGetCurrentApplication = () => {
            throw new Error("PostMessageManager is not initialized");
        };
        #fnGetAllApplications = () => {
            throw new Error("PostMessageManager is not initialized");
        };

        #bInitialized = false;
        #bDisabled = false;

        #aEventPreprocessor = [];
        #aResponseHandlers = [];
        #oRequestHandlers = {};
        #oDistributionPolicies = {};

        // Plugins might add more handlers. Therefore, we need to keep track of them.
        #bKeepMessagesForLaterProcessing = true;
        #aUnprocessedMessages = [];

        init (oOptions = {}) {
            if (this.#bInitialized) {
                throw new Error("PostMessageManager is already initialized.");
            }

            const oConfig = ObjectPath.get("sap-ushell-config.services.PostMessage.config") || {};

            if (oConfig.enabled === false) {
                this.#bDisabled = true;
                this.#bInitialized = true;
                oLogger.warning("PostMessageAPI is disabled by configuration.");
                return;
            }

            const fnGetCurrentApplication = oOptions.getCurrentApplication || function () {};
            this.#fnGetCurrentApplication = fnGetCurrentApplication;

            const fnGetAllApplications = oOptions.getAllApplications || function () { return []; };
            this.#fnGetAllApplications = fnGetAllApplications;

            if (oOptions.skipReplay) {
                this.#bKeepMessagesForLaterProcessing = false;
            }

            this.#fnPostMessageEventHandler = this.#handlePostMessageEvent.bind(this);
            addEventListener("message", this.#fnPostMessageEventHandler);
            this.#bInitialized = true;
        }

        /**
         * @param {Event} oEvent
         * @returns {Promise}
         */
        async #handlePostMessageEvent (oEvent) {
            let oMessage;
            try {
                // we support stringified JSON and plain objects
                if (typeof oEvent.data === "string") {
                    oMessage = JSON.parse(oEvent.data);
                } else if (isPlainObject(oEvent.data)) {
                    oMessage = oEvent.data;
                } else {
                    // e.g. Error, transferable objects, ...
                    throw new Error("Invalid message format");
                }
                // Initialize the body. It can be undefined which is unexpected for the service request handlers.
                oMessage.body = oMessage.body || {};
            } catch {
                oLogger.debug("Received Post Message with invalid JSON. Ignoring the message.", oEvent.data);
                return;
            }

            const oResult = this.#preprocessMessageEvent(oEvent, oMessage);
            oEvent = oResult.oEvent;
            oMessage = oResult.oMessage;

            if (!oMessage.service) {
                oLogger.debug("Received Post Message without a service name. Ignoring the message.");
                return;
            }

            const oSourceWindow = oEvent.source;
            const sSourceDomain = oEvent.origin;
            oLogger.debug(`Received postMessage ${oMessage.service} (${oMessage.request_id}) from iframe with domain '${sSourceDomain}'`, JSON.stringify(oMessage, null, 2));

            if (!["response", "request"].includes(oMessage.type)) {
                oLogger.warning(`Received Post Message with an invalid type: '${oMessage.type}'. Ignoring the message.`);
                return;
            }

            // first check if the message is a response to a request
            if (oMessage.type === "response") {
                const bWasHandled = this.#handleResponseHandlers(oEvent);
                if (bWasHandled) {
                    oLogger.debug(`Response for ${oMessage.service} (${oMessage.request_id}) was handled by a response handler.`);
                }
                return;
            }
            // handle the message as requests

            let oResponseMessageBody;
            let bSuccess = true;
            try {
                const vResult = await this.#handleServiceRequests(oMessage, oSourceWindow, sSourceDomain, oEvent);
                oLogger.debug(`Service request for ${oMessage.service} (${oMessage.request_id}) was handled successfully.`);

                if (vResult === DoNotReply) {
                    oLogger.debug(`Service request for ${oMessage.service} (${oMessage.request_id}) was handled successfully, but no response is needed.`);
                    return;
                }
                // todo: [FLPCOREANDUX-10024] remove this
                // MessageBrokerEngine
                if (vResult && typeof vResult === "object" && Object.hasOwn(vResult, "_noresponse_")) {
                    oLogger.debug(`Service request for ${oMessage.service} (${oMessage.request_id}) was handled successfully, but no response is needed.`);
                    return;
                }

                oResponseMessageBody = { result: vResult };
            } catch (vError) {
                bSuccess = false;
                oLogger.error(`Service request for ${oMessage.service} (${oMessage.request_id}) failed.`, vError);
                // some services reject with a string instead of an Error object
                let sStack;
                let sMessage = vError;
                if (vError instanceof Error) {
                    sMessage = vError.message;
                    sStack = vError.stack;
                }

                oResponseMessageBody = {
                    message: sMessage,
                    stack: sStack
                };
            }

            return this.sendResponse(
                oMessage.request_id,
                oMessage.service,
                oResponseMessageBody,
                bSuccess,
                oSourceWindow,
                sSourceDomain
            );
        }

        /**
         * @param {Event} oEvent
         * @param {PostMessageRequest|PostMessageResponse} oMessage
         */
        #preprocessMessageEvent (oEvent, oMessage) {
            // Event properties are read-only, so we need to create a new event object if we want to change them.
            let oNewEventObject;
            this.#aEventPreprocessor.forEach((fnProcessor) => {
                if (oNewEventObject) {
                    return;
                }

                oNewEventObject = fnProcessor(oEvent, oMessage);
            });

            return {
                oEvent: oNewEventObject || oEvent,
                oMessage
            };
        }

        /**
         * @param {Event} oEvent
         * @returns {boolean}
         */
        #handleResponseHandlers (oEvent) {
            let bWasHandled = false;
            this.#aResponseHandlers.forEach((fnResponseHandler) => {
                if (bWasHandled) {
                    return;
                }

                bWasHandled = fnResponseHandler(oEvent);
            });

            return bWasHandled;
        }

        /**
         * @param {PostMessageRequest} oMessage
         * @param {Window} oSourceWindow
         * @param {string} sSourceDomain
         * @param {Event} oMessageEvent
         * @returns {Promise<any>}
         */
        async #handleServiceRequests (oMessage, oSourceWindow, sSourceDomain, oMessageEvent) {
            const sServiceRequest = oMessage.service;
            const fnServiceRequestHandler = this.#getServiceRequestHandler(sServiceRequest);

            if (!fnServiceRequestHandler) {
                if (this.#bKeepMessagesForLaterProcessing) {
                    this.#aUnprocessedMessages.push(oMessageEvent);
                    return DoNotReply; // event will be answered later
                }
                await this.sendResponse(
                    oMessage.request_id,
                    sServiceRequest,
                    {
                        code: -1,
                        message: `Unknown service name: '${sServiceRequest}'`
                    },
                    false, // bSuccess
                    oSourceWindow,
                    sSourceDomain
                );
                return DoNotReply;
            }

            const oRequestHandlerOptions = this.#getServiceRequestHandlerOptions(sServiceRequest);
            if (typeof oRequestHandlerOptions?.isValidRequest === "function") {
                const bIsValidRequest = await oRequestHandlerOptions.isValidRequest(oMessageEvent);
                if (!bIsValidRequest) {
                    throw new Error(`Invalid request for service ${sServiceRequest}.`);
                }
            }

            if (oRequestHandlerOptions.provideApplicationContext) {
                const oApplicationContainer = this.#getApplicationContainerContext(oSourceWindow);
                if (!oApplicationContainer) {
                    throw new Error("Cannot find the related application for the service request.");
                }

                if (!oApplicationContainer.getActive() && !oRequestHandlerOptions?.allowInactive) {
                    throw new Error("Received Post Message from an inactive application.");
                }

                if (!oApplicationContainer.isTrustedPostMessageSource(oMessageEvent)) {
                    throw new Error("Received Post Message from an untrusted source.");
                }

                oLogger.debug(`Handling service request for ${sServiceRequest} (${oMessage.request_id}) with application context ${oApplicationContainer.getId()}.`);

                return fnServiceRequestHandler(oMessage.body, oApplicationContainer, oMessageEvent);
            }

            oLogger.debug(`Handling service request for ${sServiceRequest} (${oMessage.request_id}) without application context.`);

            return fnServiceRequestHandler(oMessage.body, oMessageEvent);
        }

        /**
         * @param {string} sServiceRequest
         * @returns {function}
         */
        #getServiceRequestHandler (sServiceRequest) {
            return this.#oRequestHandlers[sServiceRequest]?.handler;
        }

        /**
         * @param {string} sServiceRequest
         * @returns {RequestHandlerOptions}
         */
        #getServiceRequestHandlerOptions (sServiceRequest) {
            return this.#oRequestHandlers[sServiceRequest]?.options;
        }

        /**
         * @param {Window} oSourceWindow
         * @returns {sap.ushell.appIntegration.IframeApplicationContainer}
         */
        #getApplicationContainerContext (oSourceWindow) {
            let oApplicationContainer;
            this.#fnGetAllApplications().forEach((oContainer) => {
                if (oApplicationContainer || !oContainer.isA("sap.ushell.appIntegration.IframeApplicationContainer")) {
                    return;
                }

                const oApplicationWindow = oContainer.getPostMessageTarget();
                if (oApplicationWindow === oSourceWindow) {
                    oApplicationContainer = oContainer;
                }
            });

            if (oApplicationContainer) {
                return oApplicationContainer;
            }

            oLogger.error("Cannot find the related application for the service request; using the current application as fallback. This fallback will be removed in future");

            const oCurrentApplicationContainer = this.#fnGetCurrentApplication();
            if (oCurrentApplicationContainer && oCurrentApplicationContainer.isA("sap.ushell.appIntegration.IframeApplicationContainer")) {
                return oCurrentApplicationContainer;
            }
        }

        /**
         * @param {function} fnPreprocessor
         */
        addEventPreprocessor (fnPreprocessor) {
            this.#aEventPreprocessor.push(fnPreprocessor);
        }

        /**
         * @param {string} sServiceRequest
         * @param {function} fnHandler
         * @param {RequestHandlerOptions} oOptions
         */
        setRequestHandler (sServiceRequest, fnHandler, oOptions = {}) {
            if (this.#oRequestHandlers[sServiceRequest]) {
                oLogger.error(`Request handler for service ${sServiceRequest} is already defined. Overwriting the existing handler.`);
            }

            this.#oRequestHandlers[sServiceRequest] = {
                handler: fnHandler,
                options: {
                    ...oDefaultRequestHandlerOptions,
                    ...oOptions
                }
            };
        }

        /**
         * @param {string} sServiceRequest
         * @param {any} oMessageBody
         * @param {Window} oContentWindow
         * @param {string} sTargetOrigin
         * @param {boolean} bWaitForResponse
         * @returns {Promise<any>}
         */
        async sendRequest (sServiceRequest, oMessageBody, oContentWindow, sTargetOrigin, bWaitForResponse) {
            if (this.#bDisabled) {
                throw new Error("PostMessageAPI is disabled by configuration.");
            }
            if (!this.#bInitialized) {
                throw new Error("PostMessageManager is not initialized.");
            }

            const sRequestId = uid();

            const oMessage = {
                type: "request",
                request_id: sRequestId,
                service: sServiceRequest,
                body: oMessageBody || {}
            };

            return this.#sendMessage(oMessage, oContentWindow, sTargetOrigin, bWaitForResponse);
        }

        /**
         * @param {string} sRequestId
         * @param {string} sServiceRequest
         * @param {any} oMessageBody
         * @param {boolean} bSuccess
         * @param {Window} oContentWindow
         * @param {string} sTargetOrigin
         * @returns {Promise}
         */
        async sendResponse (sRequestId, sServiceRequest, oMessageBody, bSuccess, oContentWindow, sTargetOrigin) {
            if (this.#bDisabled) {
                throw new Error("PostMessageAPI is disabled by configuration.");
            }
            if (!this.#bInitialized) {
                throw new Error("PostMessageManager is not initialized.");
            }

            const oMessage = {
                type: "response",
                request_id: sRequestId,
                service: sServiceRequest,
                status: bSuccess ? "success" : "error",
                body: oMessageBody || {}
            };

            return this.#sendMessage(oMessage, oContentWindow, sTargetOrigin, false);
        }

        /**
         * @param {PostMessageRequest|PostMessageResponse} oMessage
         * @param {Window} oContentWindow
         * @param {string} sTargetOrigin
         * @param {boolean} bWaitForResponse
         * @returns {Promise<any>}
         */
        async #sendMessage (oMessage, oContentWindow, sTargetOrigin, bWaitForResponse) {
            if (!oContentWindow) {
                throw new Error("No content window provided.");
            }

            const sRequestId = oMessage.request_id;

            let oResponsePromise = Promise.resolve();
            if (bWaitForResponse) {
                oLogger.debug(`Waiting for response on ${oMessage.service} (${oMessage.request_id}) from iframe with domain '${sTargetOrigin}'`);
                oResponsePromise = this.#waitForClientResponse(sRequestId, oContentWindow);
            }

            const sMessage = JSON.stringify(oMessage);
            oLogger.debug(`Sending post message on ${oMessage.service} (${oMessage.request_id}) to iframe with domain '${sTargetOrigin}'`, JSON.stringify(oMessage, null, 2));

            oContentWindow.postMessage(sMessage, sTargetOrigin);

            return oResponsePromise;
        }

        /**
         * @param {string} sRequestId
         * @param {Window} oExpectedContentWindow
         * @returns {Promise<any>}
         */
        #waitForClientResponse (sRequestId, oExpectedContentWindow) {
            const oDeferred = new Deferred();
            const fnResponseHandler = this.#handleClientResponse.bind(null, oDeferred, sRequestId, oExpectedContentWindow);

            this.#aResponseHandlers.push(fnResponseHandler);

            return oDeferred.promise;
        }

        /**
         * @param {sap.base.util.Deferred} oDeferred
         * @param {string} sRequestId
         * @param {Window} oExpectedContentWindow
         * @param {Event} oEvent
         * @returns {boolean}
         */
        #handleClientResponse (oDeferred, sRequestId, oExpectedContentWindow, oEvent) {
            // only messages from the expected iframe should be handled, except when running in QUnit
            const bIsRunningInQUnit = typeof window.QUnit === "object";
            if (!bIsRunningInQUnit && oExpectedContentWindow !== oEvent.source) {
                return false;
            }

            let oMessage;
            try {
                oMessage = JSON.parse(oEvent.data);
            } catch {
                return false;
            }

            // only handle messages that have the expected request_id
            if (oMessage?.request_id !== sRequestId) {
                return false;
            }

            oLogger.debug(`Received response for ${oMessage.service} (${oMessage.request_id}) from iframe with domain '${oEvent.origin}'`);

            if (oMessage.status === "success") {
                oDeferred.resolve(oMessage.body);
            } else {
                let oError;
                if (oMessage.body?.message) {
                    oError = new Error(oMessage.body.message);
                } else {
                    oError = new Error("Unknown error");
                }

                if (oMessage.body?.stack) {
                    oError.stack = oMessage.body.stack;
                }
                oDeferred.reject(oError);
            }

            return true;
        }

        /**
         * @param {string} sServiceRequest
         * @param {any} oMessageBody
         * @param {boolean} bWaitForResponse
         * @returns {Promise<any[]>}
         */
        async sendRequestToAllApplications (sServiceRequest, oMessageBody, bWaitForResponse) {
            if (this.#bDisabled) {
                throw new Error("PostMessageAPI is disabled by configuration.");
            }
            if (!this.#bInitialized) {
                throw new Error("PostMessageManager is not initialized.");
            }

            const oDistributionPolicy = this.#getDistributionPolicy(sServiceRequest);
            const aRelevantContainers = [];
            if (oDistributionPolicy.activeOnly) {
                aRelevantContainers.push(this.#fnGetCurrentApplication());
            } else {
                this.#fnGetAllApplications().forEach((oContainer) => {
                    aRelevantContainers.push(oContainer);
                });
            }

            const aFilteredContainers = aRelevantContainers
                .filter((oContainer) => {
                    if (!oContainer) {
                        return false;
                    }

                    if (!oContainer.isA("sap.ushell.appIntegration.IframeApplicationContainer")) {
                        return false;
                    }

                    if (oDistributionPolicy.ignoreCapabilities || oContainer.supportsCapabilities([sServiceRequest])) {
                        return true;
                    }

                    if (typeof oDistributionPolicy?.isValidRequestTarget === "function") {
                        const bIsValidRequestTarget = oDistributionPolicy.isValidRequestTarget(oContainer);
                        return bIsValidRequestTarget;
                    }

                    return false;
                });

            const aPromises = aFilteredContainers.map((oContainer) => {
                return this.sendRequest(
                    sServiceRequest,
                    oMessageBody,
                    oContainer.getPostMessageTarget(),
                    oContainer.getPostMessageTargetOrigin(),
                    bWaitForResponse
                );
            });

            return Promise.all(aPromises);
        }

        /**
         * @param {string} sServiceRequest
         * @returns {DistributionPolicy}
         */
        #getDistributionPolicy (sServiceRequest) {
            return this.#oDistributionPolicies[sServiceRequest] || oDefaultDistributionPolicy;
        }

        /**
         * @param {string} sServiceRequest
         * @param {DistributionPolicy} oPolicy
         */
        setDistributionPolicy (sServiceRequest, oPolicy = {}) {
            if (this.#oDistributionPolicies[sServiceRequest]) {
                oLogger.error(`Distribution policy for service ${sServiceRequest} is already defined. Overwriting the existing policy.`);
            }

            this.#oDistributionPolicies[sServiceRequest] = {
                ...oDefaultDistributionPolicy,
                ...oPolicy
            };
        }

        replayStoredMessages () {
            this.#bKeepMessagesForLaterProcessing = false;
            this.#aUnprocessedMessages.forEach((oEvent) => {
                this.#handlePostMessageEvent(oEvent);
            });
            this.#aUnprocessedMessages = [];
        }

        /**
         * For testing only
         */
        reset () {
            removeEventListener("message", this.#fnPostMessageEventHandler);
            this.#fnPostMessageEventHandler = () => {
                throw new Error("PostMessageManager is not initialized");
            };
            this.#fnGetCurrentApplication = () => {
                throw new Error("PostMessageManager is not initialized");
            };
            this.#fnGetAllApplications = () => {
                throw new Error("PostMessageManager is not initialized");
            };

            this.#bInitialized = false;
            this.#bDisabled = false;

            this.#aEventPreprocessor = [];
            this.#oRequestHandlers = {};
            this.#aResponseHandlers = [];
            this.#oDistributionPolicies = {};

            this.#bKeepMessagesForLaterProcessing = true;
            this.#aUnprocessedMessages = [];
        }
    }

    return new PostMessageManager();
});
