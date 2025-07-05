// Copyright (c) 2009-2025 SAP SE, All Rights Reserved
/**
 * @file This file contains the MessageBrokerHandler class.
 */
sap.ui.define([
    "sap/ushell/appIntegration/PostMessageManager",
    "sap/ushell/Config",
    "sap/ushell/Container",
    "sap/ushell/utils"
], function (
    PostMessageManager,
    Config,
    Container,
    ushellUtils
) {
    "use strict";

    const oServiceRequestHandlers = {
        "sap.ushell.services.MessageBroker": {
            async handler (oMessageBody, oMessageEvent) {
                await Container.getServiceAsync("MessageBroker");
                const [MessageBrokerEngine] = await ushellUtils.requireAsync(["sap/ushell/services/MessageBroker/MessageBrokerEngine"]);

                // todo: [FLPCOREANDUX-10024] Improve this
                const oServiceParams = {
                    oMessageData: JSON.parse(oMessageEvent.data),
                    oMessage: oMessageEvent
                };

                return MessageBrokerEngine.processPostMessage(oServiceParams);
            },
            options: {
                async isValidRequest (oMessageEvent) {
                    const MessageBroker = await Container.getServiceAsync("MessageBroker");
                    const sOrigin = MessageBroker.getAcceptedOrigins().find((sAcceptedOrigin) => {
                        return sAcceptedOrigin === oMessageEvent.origin;
                    });
                    if (sOrigin !== undefined) {
                        return true;
                    }
                    return false;
                }
            }
        }
    };

    return {
        register () {
            if (!Config.last("/core/shell/enableMessageBroker")) {
                return;
            }

            Object.keys(oServiceRequestHandlers).forEach((sServiceRequest) => {
                const oHandler = oServiceRequestHandlers[sServiceRequest];
                PostMessageManager.setRequestHandler(sServiceRequest, oHandler.handler, oHandler.options);
            });
        }
    };

});
