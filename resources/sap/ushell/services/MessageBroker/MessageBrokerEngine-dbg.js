// Copyright (c) 2009-2025 SAP SE, All Rights Reserved

/**
 * @fileOverview This module contains the implementation of the message broker
 * @version 1.136.1
 */
sap.ui.define([
    "sap/base/Log",
    "sap/base/util/deepExtend"
], (
    Log,
    deepExtend
) => {
    "use strict";

    let bEnabled = true;
    const oAcceptedOrigins = {};
    const oClientsPerChannel = {};
    const oConnectedClients = {};
    const oSubscribedClients = {};

    //add default origin
    oAcceptedOrigins[window.location.origin] = true;

    function MessageBrokerEngine () {

        this.setEnabled = function (bVal) {
            bEnabled = bVal;
        };

        /**
         *
         * @param {object} oPostMessageData The PostMessage object.
         * @returns {Promise} Promise result.
         *
         * @since 1.110.0
         * @private
         */

        this.processPostMessage = function (oPostMessageData) {
            if (!bEnabled) {
                return Promise.reject();
            }

            const oMessageData = oPostMessageData.oMessageData;
            const oMessageDataBody = oMessageData.body;
            const oMessage = oPostMessageData.oMessage;
            const sOrigin = oMessage.origin;
            const oIframe = oMessage.source;

            oMessageDataBody.requestId = oMessageData.request_id;

            if (!oIframe) {
                const sErrorMsg = "Missing iframe object in PostMessage request";
                Log.error(sErrorMsg, null, "sap.ushell.services.MessageBroker");
                return Promise.reject(sErrorMsg);
            }

            return this._handlePostMessageRequest(oMessageDataBody, oIframe, sOrigin);
        };

        /**
         *
         * @param {string} sClientId client id.
         * @returns {Promise} the result.
         *
         * @since 1.110.0
         * @private
         */

        this.connect = function (sClientId) {
            let sError;

            if (!bEnabled) {
                return Promise.reject();
            }

            if (typeof sClientId !== "string" || !sClientId.length) {
                sError = "Missing required parameter client id";
            } else if (oConnectedClients[sClientId]) {
                sError = "Client is already connected";
            } else {
                // add client initial entry to connected clients
                oConnectedClients[sClientId] = true;
                return Promise.resolve();
            }

            Log.error(sError, null, "sap.ushell.services.MessageBroker");
            return Promise.reject(sError);
        };

        /**
         *
         * @param {string} sClientId client id.
         * @returns {Promise} the result.
         *
         * @since 1.110.0
         * @private
         */

        this.disconnect = function (sClientId) {
            let sError;

            if (!bEnabled) {
                return Promise.reject();
            }

            if (typeof sClientId !== "string" || !sClientId.length) {
                sError = "Missing required parameter client id";
            } else if (!oConnectedClients[sClientId]) {
                sError = "Client is already disconnected";
            } else {

                for (const sChannelKey in oClientsPerChannel) {

                    const aChannelClients = oClientsPerChannel[sChannelKey];
                    // find client and remove from the channel
                    for (const oClientKey in aChannelClients) {

                        const oClient = aChannelClients[oClientKey];

                        if (oClient.clientId === sClientId) {
                            aChannelClients.splice(oClientKey, 1);
                            break;
                        }
                    }
                }

                // if client disconnects but is still subscribed
                if (oSubscribedClients[sClientId] && oSubscribedClients[sClientId].channels.length) {
                    this._emitEvent("clientUnsubscribed", sClientId, oSubscribedClients[sClientId].channels);

                    // remove from subscribed clients
                    delete oSubscribedClients[sClientId];
                }
                // remove from connected clients
                delete oConnectedClients[sClientId];

                return Promise.resolve();
            }

            Log.error(sError, null, "sap.ushell.services.MessageBroker");
            return Promise.reject(sError);
        };

        /**
         *
         * @param {string} sClientId client id.
         * @param {Array<*>} aSubscribedChannels array of channel-objects.
         * @param {function} fnMessageCallback callback function returns promise.
         * @param {function} fnClientConnectionCallback callback function returns promise.
         * @param {object} oIframe iframe object if iframe client.
         * @param {string} sOrigin iframe origin if iframe client.
         * @returns {Promise} the result.
         *
         * @since 1.110.0
         * @private
         */

        this.subscribe = function (sClientId, aSubscribedChannels, fnMessageCallback, fnClientConnectionCallback, oIframe, sOrigin) {
            let sError;
            const sMessageName = "clientSubscribed";
            let aOtherSubscribedClients = [];
            let bIsNewClient = false;

            if (!bEnabled) {
                return Promise.reject();
            }

            if (typeof sClientId !== "string" || !sClientId.length ||
                !aSubscribedChannels.length ||
                (typeof oIframe !== "object" &&
                    (typeof fnMessageCallback !== "function" ||
                        typeof fnClientConnectionCallback !== "function"))) {
                sError = "Missing required parameter(s)";
            } else if (!oConnectedClients[sClientId]) {
                sError = "Client is not connected";
            } else {
                for (const sChannelKey in aSubscribedChannels) {

                    const oChannel = aSubscribedChannels[sChannelKey];

                    // add new client to the channel
                    const oFullClientData = {
                        clientId: sClientId,
                        subscribedChannels: aSubscribedChannels,
                        messageCallback: fnMessageCallback,
                        clientConnectionCallback: fnClientConnectionCallback,
                        iframe: oIframe || {},
                        origin: sOrigin || "",
                        isUI5: !oIframe
                    };

                    // add new channel
                    if (!oClientsPerChannel[oChannel.channelId]) {
                        oClientsPerChannel[oChannel.channelId] = [];
                    }

                    const oExistingClient = oClientsPerChannel[oChannel.channelId].find((oClient) => {
                        return oClient.clientId === sClientId;
                    });

                    // add new client
                    if (!oExistingClient) {
                        oClientsPerChannel[oChannel.channelId].push(oFullClientData);
                    }

                    // if client is already subscribed to any channel
                    if (oSubscribedClients[sClientId]) {
                        const oExistingChannel = oSubscribedClients[sClientId].channels.find((oSubChannel) => {
                            return oSubChannel.channelId === oChannel.channelId;
                        });

                        if (!oExistingChannel) {
                            // add new channel to the existing channels
                            oSubscribedClients[sClientId].channels.push(oChannel);
                        }
                    }
                }

                // if new client
                if (!oSubscribedClients[sClientId]) {

                    bIsNewClient = true;

                    const oSubscriptionData = {
                        clientId: sClientId,
                        channels: aSubscribedChannels
                    };
                    // add to subscribed clients
                    oSubscribedClients[sClientId] = oSubscriptionData;

                    aOtherSubscribedClients = Object.values(oSubscribedClients).filter((oClient) => {
                        return oClient.clientId !== sClientId;
                    });
                }

                // notify other subscribed clients of new subscription
                if (Object.keys(oSubscribedClients).length > 1) {
                    this._emitEvent(sMessageName, sClientId, aSubscribedChannels);
                }

                if (bIsNewClient) {
                    // notify new client of other already subscribed clients
                    setTimeout(() => {
                        if (aOtherSubscribedClients.length) {
                            aOtherSubscribedClients.forEach((oClient) => {
                                if (!oIframe) {
                                    fnClientConnectionCallback(sMessageName, oClient.clientId, oClient.channels);
                                } else {
                                    const oParams = {
                                        clientId: oClient.clientId,
                                        channels: oClient.channels,
                                        channelId: "sap.ushell.MessageBroker",
                                        messageName: sMessageName
                                    };

                                    sap.ui.require(["sap/ushell/appIntegration/PostMessageManager"], (PostMessageManager) => {
                                        const oResult = this._buildPostMessageObject("event", oParams);
                                        this._sendPostMessage(PostMessageManager, oResult, oIframe, sOrigin);
                                    });
                                }
                            });
                        }
                    }, 1000);
                }

                return Promise.resolve();
            }

            Log.error(sError, null, "sap.ushell.services.MessageBroker");
            return Promise.reject(sError);
        };

        /**
         *
         * @param {string} sClientId client id.
         * @param {object[]} aUnsubscribedChannels channels to unsubscribe from.
         * @returns {Promise} the resolve or error.
         *
         * @since 1.110.0
         * @private
         */

        this.unsubscribe = function (sClientId, aUnsubscribedChannels) {
            let sError;

            if (!bEnabled) {
                return Promise.reject();
            }

            if (typeof sClientId !== "string" || !sClientId.length ||
                !Array.isArray(aUnsubscribedChannels) || !aUnsubscribedChannels.length) {
                sError = "Missing required parameter(s)";
                Log.error(sError, null, "sap.ushell.services.MessageBroker");
                return Promise.reject(sError);
            }

            if (!oConnectedClients[sClientId]) {
                sError = "Client is not connected";
                Log.error(sError, null, "sap.ushell.services.MessageBroker");
                return Promise.reject(sError);
            }

            for (const sChannelIndex in aUnsubscribedChannels) {

                const oChannel = aUnsubscribedChannels[sChannelIndex];

                if (oClientsPerChannel[oChannel.channelId]) {
                    const aChannelClients = oClientsPerChannel[oChannel.channelId];
                    // find client and remove from the channel
                    for (const oClientKey in aChannelClients) {

                        const oClient = aChannelClients[oClientKey];

                        if (oClient.clientId === sClientId) {
                            const aSubscribedChannels = oSubscribedClients[sClientId].channels;

                            oSubscribedClients[sClientId].channels = aSubscribedChannels.filter((oSubChannel) => {
                                return oSubChannel.channelId !== oChannel.channelId;
                            });

                            aChannelClients.splice(oClientKey, 1);
                            break;
                        }
                    }
                } else {
                    // if channel does not exist
                    const sMessage = `Unknown channel Id: ${oChannel.channelId}`;
                    Log.warning(sMessage, null, "sap.ushell.services.MessageBroker");
                }
            }

            this._emitEvent("clientUnsubscribed", sClientId, aUnsubscribedChannels);
            return Promise.resolve();
        };

        /**
         *
         * @param {string} sChannelId channel id.
         * @param {string} sClientId client id.
         * @param {string} sMessageId request id for iframe clients or message id for UI5 clients.
         * @param {string} sMessageName message name.
         * @param {string[]} aTargetClientIds array of target clients Ids.
         * @param {object} data additional data.
         * @returns {Promise} Promise result.
         *
         * @since 1.110.0
         * @private
         */

        this.publish = function (sChannelId, sClientId, sMessageId, sMessageName, aTargetClientIds, data) {
            let sError;
            let aTargetClients = [];

            if (!bEnabled) {
                return Promise.reject();
            }

            // if client is not connected
            if (!oConnectedClients[sClientId]) {
                sError = "Client is not connected";
                Log.error(sError, null, "sap.ushell.services.MessageBroker");
                return Promise.reject(sError);
            }

            // if channel does not exist
            if (!oClientsPerChannel[sChannelId]) {
                sError = `Unknown channel Id: ${sChannelId}`;
                Log.error(sError, null, "sap.ushell.services.MessageBroker");
                return Promise.reject(sError);
            }

            const oPubClient = oClientsPerChannel[sChannelId].find((oSubClient) => {
                return oSubClient.clientId === sClientId;
            });

            // if client is not subscribed to the channel
            if (!oPubClient) {
                sError = "Client is not subscribed to the provided channel";
                Log.error(sError, null, "sap.ushell.services.MessageBroker");
                return Promise.reject(sError);
            }

            for (const sClientKey in aTargetClientIds) {

                const sTargetClientId = aTargetClientIds[sClientKey];

                // if message is for all clients in the channel
                if (sTargetClientId === "*") {
                    aTargetClients = oClientsPerChannel[sChannelId].concat();
                    break;
                } else {
                    // check if target client exists
                    const oTargetClient = oClientsPerChannel[sChannelId].find((oClient) => {
                        return oClient.clientId === sTargetClientId;
                    });

                    if (oTargetClient) {
                        aTargetClients.push(this._deepCopy(oTargetClient));
                    }
                }
            }

            if (aTargetClients.length) {
                this._sendMessage(aTargetClients, sChannelId, sMessageId, sMessageName, sClientId, data);
                return Promise.resolve();
            }

            sError = "Target client(s) not found in the provided channel";
            Log.error(sError, null, "sap.ushell.services.MessageBroker");
            return Promise.reject(sError);
        };

        /**
         *
         * @param {string} sOrigin iframe origin.
         *
         * @since 1.110.0
         * @private
         */

        this.addAcceptedOrigin = function (sOrigin) {
            if (!bEnabled) {
                return;
            }

            if (typeof sOrigin === "string" && sOrigin.length > 0) {
                oAcceptedOrigins[sOrigin] = true;
                if (sOrigin.startsWith("https:") && sOrigin.endsWith(":443")) {
                    oAcceptedOrigins[sOrigin.substring(0, sOrigin.length - 4)] = true;
                }
            } else {
                Log.warning("Missing required parameter sOrigin", null, "sap.ushell.services.MessageBroker");
            }
        };

        /**
         *
         * @param {string} sOrigin iframe origin.
         *
         * @since 1.110.0
         * @private
         */

        this.removeAcceptedOrigin = function (sOrigin) {
            if (!bEnabled) {
                return;
            }
            delete oAcceptedOrigins[sOrigin];
        };

        /**
         *
         * @returns {string[]} the result.
         *
         * @since 1.110.0
         * @private
         */

        this.getAcceptedOrigins = function () {
            if (!bEnabled) {
                return;
            }
            return Object.keys(oAcceptedOrigins);
        };

        /**
         *
         * @returns {object} the result.
         *
         * @since 1.110.0
         * @private
         */

        this.getSubscribedClients = function () {
            if (!bEnabled) {
                return;
            }
            return this._deepCopy(oClientsPerChannel);
        };

        /**
         *
         * @param {string} sMessageName message name.
         * @param {string} sClientId client id.
         * @param {Array<*>} aChannels subscribed/unsubscribed channels of the client.
         *
         * @since 1.110.0
         * @private
         */

        this._emitEvent = function (sMessageName, sClientId, aChannels) {
            const oNotifiedClients = {};

            for (const sChannelKey in oClientsPerChannel) {

                const oChannel = oClientsPerChannel[sChannelKey];

                for (const sClientKey in oChannel) {

                    const oClient = oChannel[sClientKey];
                    // do not notify the same client who initiated the event
                    if (oClient.clientId !== sClientId && !oNotifiedClients[oClient.clientId]) {

                        const oParams = {
                            clientId: sClientId,
                            channels: aChannels
                        };

                        if (oClient.isUI5 !== false) {
                            oClient.clientConnectionCallback(sMessageName, sClientId, aChannels);
                        } else {

                            oParams.channelId = "sap.ushell.MessageBroker";
                            oParams.messageName = sMessageName;

                            sap.ui.require(["sap/ushell/appIntegration/PostMessageManager"], (PostMessageManager) => {
                                const oResult = this._buildPostMessageObject("event", oParams);
                                this._sendPostMessage(PostMessageManager, oResult, oClient.iframe, oClient.origin);
                            });
                        }

                        oNotifiedClients[oClient.clientId] = true;
                    }
                }
            }
        };

        /**
         *
         * @param {object[]} aTargetClients target clients.
         * @param {string} sChannelId channel id.
         * @param {string} sMessageId request id for iframe clients or message id for UI5 clients.
         * @param {string} sMessageName message name.
         * @param {string} sClientId client id.
         * @param {object} data additional data.
         *
         * @since 1.110.0
         * @private
         */

        this._sendMessage = function (aTargetClients, sChannelId, sMessageId, sMessageName, sClientId, data) {
            for (const sClientKey in aTargetClients) {

                const oClient = aTargetClients[sClientKey];

                // do not send message to the same client who requested to send it
                if (oClient.clientId !== sClientId) {
                    if (oClient.isUI5 !== false) {
                        oClient.messageCallback(sClientId, sChannelId, sMessageName, data);
                    } else {
                        const oParams = {
                            clientId: sClientId,
                            channelId: sChannelId,
                            messageName: sMessageName,
                            data: data
                        };

                        sap.ui.require(["sap/ushell/appIntegration/PostMessageManager"], (PostMessageManager) => {
                            const oResult = this._buildPostMessageObject("request", oParams);
                            this._sendPostMessage(PostMessageManager, oResult, oClient.iframe, oClient.origin);
                        });
                    }
                }
            }
        };

        /**
         *
         * @param {string} sEndpoint api method name.
         * @param {Array<*>} aParams api parameters.
         * @returns {Promise} Promise result.
         *
         * @since 1.110.0
         * @private
         */

        this._callApi = function (sEndpoint, aParams) {
            return this[sEndpoint].apply(this, aParams);
        };

        /**
         * @param {object} oMessageDataBody message object.
         * @param {object} oIframe The iFrame object.
         * @param {string} sOrigin iframe origin.
         * @returns {Promise} Promise result.
         *
         * @since 1.110.0
         * @private
         */

        this._handlePostMessageRequest = function (oMessageDataBody, oIframe, sOrigin) {
            return new Promise((resolve, reject) => {

                const sClientId = oMessageDataBody.clientId;
                const sChannelId = oMessageDataBody.channelId;
                const sRequestId = oMessageDataBody.requestId;
                let sMessageName = oMessageDataBody.messageName;
                const aSubscribedChannels = oMessageDataBody.subscribedChannels;
                const aTargetClientIds = oMessageDataBody.targetClientIds;
                const data = oMessageDataBody.data;

                const oApiParams = {
                    connect: [
                        sClientId
                    ],
                    disconnect: [
                        sClientId
                    ],
                    subscribe: [
                        sClientId,
                        aSubscribedChannels,
                        null,
                        null,
                        oIframe,
                        sOrigin
                    ],
                    unsubscribe: [
                        sClientId,
                        aSubscribedChannels
                    ],
                    publish: [
                        sChannelId,
                        sClientId,
                        sRequestId,
                        sMessageName,
                        aTargetClientIds,
                        data
                    ]
                };

                const oPostMessageParams = {
                    channelId: sChannelId,
                    clientId: sClientId,
                    messageName: sMessageName,
                    requestId: sRequestId
                };

                sMessageName = oApiParams[sMessageName] ? sMessageName : "publish";

                this._callApi(sMessageName, oApiParams[sMessageName])
                    .then(() => {
                        if (sMessageName !== "publish") {
                            sap.ui.require(["sap/ushell/appIntegration/PostMessageManager"], (PostMessageManager) => {
                                const oResult = this._buildPostMessageObject("response", oPostMessageParams);
                                oResult.messageBody.status = "accepted";

                                this._sendPostMessage(PostMessageManager, oResult, oIframe, sOrigin);
                            });
                        }
                        resolve({ _noresponse_: true });
                    }).catch((sError) => {
                        reject(sError);
                    });
            });
        };

        /**
         *
         * @param {string} sType object type.
         * @param {object} oParams object properties.
         * @returns {object} relevant post message object.
         *
         * @since 1.110.0
         * @private
         */

        this._buildPostMessageObjectFallback = function (PostMessageUtils, sObjectType, oParams) {
            const sServiceName = "sap.ushell.services.MessageBroker";

            if (sObjectType === "response") {
                const oMessageBody = {
                    channelId: oParams.channelId,
                    clientId: oParams.clientId,
                    correlationMessageId: oParams.requestId,
                    messageName: oParams.messageName
                };
                const oResponse = PostMessageUtils.createPostMessageResponse(
                    sServiceName,
                    oParams.requestId,
                    oMessageBody,
                    true
                );
                return oResponse;

            }

            if (sObjectType === "event") {
                const oMessageBody = {
                    channelId: oParams.channelId,
                    clientId: oParams.clientId,
                    messageName: oParams.messageName,
                    channels: oParams.channels
                };
                const oRequest = PostMessageUtils.createPostMessageRequest(
                    sServiceName,
                    oMessageBody
                );
                return oRequest;

            }

            if (sObjectType === "request") {
                const oMessageBody = {
                    channelId: oParams.channelId,
                    clientId: oParams.clientId,
                    messageName: oParams.messageName,
                    data: oParams.data
                };
                const oRequest = PostMessageUtils.createPostMessageRequest(
                    sServiceName,
                    oMessageBody
                );
                return oRequest;
            }

            return PostMessageUtils.createPostMessageRequest(
                sServiceName
            );
        };

        /**
         *
         * @param {string} sType object type.
         * @param {object} oParams object properties.
         * @returns {object} relevant post message object.
         *
         * @since 1.134.0
         * @private
         */

        this._buildPostMessageObject = function (sObjectType, oParams) {
            const sServiceName = "sap.ushell.services.MessageBroker";

            if (sObjectType === "response") {
                const oMessageBody = {
                    channelId: oParams.channelId,
                    clientId: oParams.clientId,
                    correlationMessageId: oParams.requestId,
                    messageName: oParams.messageName
                };
                const oResult = {
                    isRequest: false,
                    requestId: oParams.requestId,
                    isSuccess: true,
                    serviceRequest: sServiceName,
                    messageBody: oMessageBody
                };
                return oResult;

            }

            if (sObjectType === "event") {
                const oMessageBody = {
                    channelId: oParams.channelId,
                    clientId: oParams.clientId,
                    messageName: oParams.messageName,
                    channels: oParams.channels
                };
                const oResult = {
                    isRequest: true,
                    serviceRequest: sServiceName,
                    messageBody: oMessageBody
                };
                return oResult;

            }

            if (sObjectType === "request") {
                const oMessageBody = {
                    channelId: oParams.channelId,
                    clientId: oParams.clientId,
                    messageName: oParams.messageName,
                    data: oParams.data
                };
                const oResult = {
                    isRequest: true,
                    serviceRequest: sServiceName,
                    messageBody: oMessageBody
                };
                return oResult;
            }

            const oResult = {
                isRequest: true,
                serviceRequest: sServiceName
            };
            return oResult;
        };

        this._sendPostMessage = function (PostMessageManager, oResult, oContentWindow, sTargetOrigin) {
            if (oResult.isRequest) {
                PostMessageManager.sendRequest(
                    oResult.serviceRequest,
                    oResult.messageBody,
                    oContentWindow,
                    sTargetOrigin,
                    false // bWaitForResponse
                );
            } else {
                PostMessageManager.sendResponse(
                    oResult.requestId,
                    oResult.serviceRequest,
                    oResult.messageBody,
                    oResult.isSuccess,
                    oContentWindow,
                    sTargetOrigin
                );
            }
        };

        /**
         *
         * @param {string} sPrefix function name prefix.
         * @param {string} sType function type.
         * @returns {string} function name to call.
         *
         * @since 1.110.0
         * @private
         */

        this._buildFunctionName = function (sPrefix, sType) {
            sType = sType.charAt(0).toUpperCase() + sType.substring(1);
            return sPrefix + sType;
        };

        /**
         *
         * @param {object} oEntity.
         * @returns {object} deep copy.
         *
         * @since 1.110.0
         * @private
         */

        this._deepCopy = function (oEntity) {
            return deepExtend(oEntity);
        };
    }

    return new MessageBrokerEngine();
}, false);
