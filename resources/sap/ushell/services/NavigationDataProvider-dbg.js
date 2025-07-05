// Copyright (c) 2009-2025 SAP SE, All Rights Reserved

/**
 * @fileOverview This module prepares the navigation data.
 *
 * It provides the inbound and systemAlias data for the pages runtime.
 * Only used on the ABAP platform and on local for testing.
 *
 * Configured with the ClientSideTargetResolutionAdapter.
 *
 * @version 1.136.1
 */
sap.ui.define([
    "sap/ushell/resources",
    "sap/ushell/utils"
], (resources, ushellUtils) => {
    "use strict";

    /**
     * @alias sap.ushell.services.NavigationDataProvider
     * @class
     * @classdesc The Unified Shell's NavigationDataProvider service.
     *
     * <b>Note:</b> To retrieve a valid instance of this service, it is necessary to call {@link sap.ushell.Container#getServiceAsync}.
     * <pre>
     *   sap.ui.require(["sap/ushell/Container"], async function (Container) {
     *     const NavigationDataProvider = await Container.getServiceAsync("NavigationDataProvider");
     *     // do something with the NavigationDataProvider service
     *   });
     * </pre>
     *
     * @hideconstructor
     *
     * @since 1.68.0
     * @experimental Since 1.68.0
     * @private
     */
    function NavigationDataProvider (/*adapter, serviceConfiguration*/) {
        this.S_COMPONENT_NAME = "sap.ushell.services.NavigationDataProvider";
        this._init.apply(this, arguments);
    }

    /**
     * Private initializer.
     *
     * @param {object} adapter
     *     the navigation data provider adapter for the frontend server
     * @param {object} serviceConfiguration
     *     the navigation data provider service configuration
     * @experimental Since 1.68.0
     *
     * @private
     */
    NavigationDataProvider.prototype._init = function (adapter, serviceConfiguration) {
        this.oAdapter = adapter;
    };

    /**
     * An object representing navigation data containing inbounds and available system aliases.
     * @typedef {object} NavigationData
     * @property {object[]} object.inbounds The inbounds.
     * @property {object} object.systemAliases The system aliases.
     */

    /**
     * Loads and returns the relevant navigation data.
     *
     * @returns {Promise<NavigationData>} The navigation data.
     * @experimental Since 1.68.0
     *
     * @private
     */
    NavigationDataProvider.prototype.getNavigationData = function () {
        return new Promise((resolve, reject) => {
            const oSystemAliases = (this.oAdapter.getSystemAliases && this.oAdapter.getSystemAliases()) || {};

            ushellUtils.promisify(this.oAdapter.getInbounds())
                .then((aInbounds) => {
                    resolve({
                        systemAliases: oSystemAliases,
                        inbounds: aInbounds
                    });
                })
                .catch((error) => {
                    const oError = {
                        component: this.S_COMPONENT_NAME,
                        description: resources.i18n.getText("NavigationDataProvider.CannotLoadData"),
                        detail: error
                    };
                    reject(oError);
                });
        });
    };

    NavigationDataProvider.hasNoAdapter = false;
    return NavigationDataProvider;
});
