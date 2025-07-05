// Copyright (c) 2009-2025 SAP SE, All Rights Reserved
sap.ui.define([
    "sap/base/util/ObjectPath",
    "sap/ui/core/EventBus",
    "sap/ui/core/mvc/Controller",
    "sap/ui/Device",
    "sap/ushell/Container",
    "sap/ushell/EventHub",
    "sap/ushell/Config",
    "sap/base/Log"
], function (
    ObjectPath,
    EventBus,
    Controller,
    Device,
    Container,
    EventHub,
    Config,
    Log
) {
    "use strict";

    /**
     * The default key value when no key is selected.
     */
    const sNoneSelectedKey = "NONE";

    /**
     * @alias sap.ushell.components.shell.SideNavigation.controller.SideNavigation
     * @class
     * @classdesc Controller of the SideNavigation view.
     *
     * @param {string} sId Controller id
     * @param {object} oParams Controller parameter
     *
     * @extends sap.ui.core.mvc.Controller
     *
     * @since 1.132.0
     * @private
     */
    return Controller.extend("sap.ushell.components.shell.SideNavigation.controller.SideNavigation", /** @lends sap.ushell.components.shell.SideNavigation.controller.SideNavigation.prototype */ {
        _aDoables: [],

        /**
         * UI5 lifecycle method which is called upon controller initialization.
         * It gets all the required UShell services and
         * initializes the view.
         *
         * @private
         * @since 1.132.0
         */
        onInit: function () {
            this._handleSideNavigationContentDensity();

            const oUpdateNavigationListOnConfigChange = Config.on("/core/sideNavigation/navigationListProvider").do((oConfig) => {
                this.pNavigationListProvider = this._initNavigationListProvider("/core/sideNavigation/navigationListProvider");
                this._selectIndexAfterRouteChange();
            });
            const oUpdateFixedNavigationListOnConfigChange = Config.on("/core/sideNavigation/fixedNavigationListProvider").do((oConfig) => {
                this._initNavigationListProvider("/core/sideNavigation/fixedNavigationListProvider", "fixedItem");
            });

            this._aDoables.push(oUpdateNavigationListOnConfigChange);
            this._aDoables.push(oUpdateFixedNavigationListOnConfigChange);

            this.oContainerRouter = Container.getRendererInternal().getRouter();

            this.oContainerRouter.getRoute("home").attachMatched(this._selectIndexAfterRouteChange, this);
            this.oContainerRouter.getRoute("openFLPPage").attachMatched(this._selectIndexAfterRouteChange, this);
            this.oContainerRouter.getRoute("openWorkPage").attachMatched(this._selectIndexAfterRouteChange, this);

            this.oEnableMenuBarNavigationListener = EventHub.on("enableMenuBarNavigation").do((bEnableSideNavigation) => this.onEnableSideNavigation(bEnableSideNavigation));
            EventBus.getInstance().subscribe("sap.ushell", "appOpened", this._selectIndexAfterRouteChange, this);
        },

        _handleSideNavigationContentDensity: async function () {
            const oSideNavigation = this.byId("sideNavigation");
            let bCompact;

            // on pure touch devices, force cozy (app support and user preference are both ignored)
            if (!Device.system.desktop && !Device.system.combi) {
                bCompact = false;
            }

            // apply user preference only on desktop/combi and only when the app supports both densities
            if (bCompact === undefined) {
                const oUserInfoService = await Container.getServiceAsync("UserInfo");
                const sContentDensity = oUserInfoService.getUser?.()?.getContentDensity();
                if (sContentDensity === "compact") {
                    bCompact = true;
                } else if (sContentDensity === "cozy") {
                    bCompact = false;
                } else {
                    bCompact = !Device.support.touch;
                }
            }

            if (bCompact) {
                oSideNavigation.addStyleClass("sapUiSizeCompact");
            } else {
                oSideNavigation.addStyleClass("sapUiSizeCozy");
            }
        },

        /**
         * Initializes the NavigationListProvider.
         *
         * It initializes the navigation list provider and passes an API closure to access the side navigation API.
         *
         * @param {string} sConfigPath The configuration path.
         * @param {string} sAggregationName The name of the aggregation.
         * @returns {Promise<object>} A promise that resolves with the NavigationListProvider when it is initialized.
         * @private
         * @since 1.134.0
         */
        _initNavigationListProvider: function (sConfigPath, sAggregationName) {
            return new Promise((resolve) => {
                const oSideNavigation = this.byId("sideNavigation");
                const oNavContainer = this.byId("navContainer");
                const sModulePath = Config.last(`${sConfigPath}/modulePath`);
                const oComponent = this.getOwnerComponent();
                if (sModulePath) {
                    const oAPIClosure = {
                        getConfigValue: (sPath) => {
                            let oConfig;
                            try {
                                oConfig = JSON.parse(Config.last(`${sConfigPath}/configuration`));
                            } catch (oError) {
                                oConfig = {};
                            }
                            return ObjectPath.get(sPath, oConfig);
                        },
                        getNavContainerFacade: () => {
                            return {
                                add: (oControl) => oNavContainer.addPage(oControl),
                                to: (vControl) => oNavContainer.to(vControl),
                                toRoot: () => oNavContainer.to(oSideNavigation)
                            };
                        },
                        updateSelectedKey: () => this._selectIndexAfterRouteChange(),
                        openSideNavigation: () => oComponent.popoverOpen(),
                        closeSideNavigation: () => oComponent.popoverClose(),
                        expandSideNavigation: () => oComponent.toggleSideNavigationExpansion(true),
                        collapseSideNavigation: () => oComponent.toggleSideNavigationExpansion(false)
                    };

                    sap.ui.require([sModulePath], async (NavigationListProvider) => {
                        const oNavigationListProvider = new NavigationListProvider(oAPIClosure);
                        const oNavigationListItems = await oNavigationListProvider.getRootItem();
                        if (sAggregationName === "fixedItem") {
                            oSideNavigation.setFixedItem(oNavigationListItems);
                        } else {
                            oSideNavigation.setItem(oNavigationListItems);
                        }
                        resolve(oNavigationListProvider);
                    });
                }
            });
        },

        /**
        * Enables or disables the side navigation based on the provided flag.
        * It sets the "enableSideNavigation" property in the view configuration model to the provided value.
        *
        * @param {boolean} bEnableSideNavigation A flag indicating whether to enable or disable the side navigation.
        *
        * @private
        * @since 1.132.0
        */
        onEnableSideNavigation: function (bEnableSideNavigation) {
            this.getView().getModel("viewConfiguration").setProperty("/enableSideNavigation", bEnableSideNavigation);
        },

        /**
        * Selects the appropriate side navigation entry after a route change
        * based on the current hash and default space.
        *
        * - Updates the "selectedKey" property of the view configuration model,
        * which is responsible for the visual indication of the currently selected
        * side navigation entry.
        *
        * @returns {Promise} A promise that resolves when the selection is completed.
        *
        * @private
        * @since 1.132.0
        */
        _selectIndexAfterRouteChange: async function () {
            const oViewConfigModel = this.getOwnerComponent().getModel("viewConfiguration");
            const oNavigationListProvider = await this.pNavigationListProvider;
            const sSelectedKey = await oNavigationListProvider.findSelectedKey();
            setTimeout(() => {
                if (sSelectedKey) {
                    oViewConfigModel.setProperty("/selectedKey", sSelectedKey);
                } else {
                    // no entry found for selection. Remove selection to avoid visual indication
                    oViewConfigModel.setProperty("/selectedKey", sNoneSelectedKey);
                    this.byId("sideNavigation").setSelectedItem(null);
                }
            }, 0);
        },

        /**
         * UI5 lifecycle method which is called upon controller destruction.
         * It detaches the router events, and config listeners, and EventHub listeners, and EventBus subscriptions.
         *
         * @private
         * @since 1.132.0
         */
        onExit: function () {
            this.oEnableMenuBarNavigationListener.off();
            EventBus.getInstance().unsubscribe("sap.ushell", "appOpened", this._selectIndexAfterRouteChange, this);
            this._aDoables.forEach(function (oConfigListener) {
                oConfigListener.off();
            });
            this._aDoables = [];

            // clean up the router matched event listeners
            const oRouter = Container.getRendererInternal().getRouter();

            // the router is not available in the test environment in some cases ...
            if (!oRouter) {
                return;
            }

            function detachMatched (sRouteName) {
                // ... or the route is not available in the test environment in some cases
                const oRoute = oRouter.getRoute(sRouteName);
                if (oRoute) {
                    oRoute.detachMatched(this._selectIndexAfterRouteChange, this);
                }
            }
            try {
                detachMatched.call(this, "home");
                detachMatched.call(this, "openFLPPage");
                detachMatched.call(this, "openWorkPage");
            } catch (oError) {
                Log.error("Error detaching route matched event listeners", oError);
            }
        }
    });
});
