// Copyright (c) 2009-2025 SAP SE, All Rights Reserved
sap.ui.define([
    "sap/base/i18n/Localization",
    "sap/base/Log",
    "sap/ui/core/theming/Parameters",
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Element",
    "sap/ui/Device",
    "sap/ui/model/json/JSONModel",
    "sap/ushell/api/NewExperience",
    "sap/ushell/thirdparty/ui5/webcomponents/Button",
    "sap/ushell/thirdparty/ui5/webcomponents-fiori/ShellBarItem",
    "sap/ushell/state/BackNavigation",
    "sap/ushell/state/BindingHelper",
    "sap/ushell/Container",
    "sap/ushell/Config",
    "sap/ushell/resources",
    "sap/ushell/utils",
    "sap/ushell/EventHub",
    "sap/ushell/ui/shell/ShellAppTitle",
    "sap/ushell/thirdparty/ui5/webcomponents-fiori/ShellBarSpacer"
], function (
    Localization,
    Log,
    ThemingParameters,
    Controller,
    Element,
    Device,
    JSONModel,
    NewExperience,
    _Button, // Needed to be able to synchronously load the webcomponent inside the ushell/renderer/Renderer and PostLoadingHeaderEnhancment/Component
    ShellBarItem,
    BackNavigation,
    BindingHelper,
    Container,
    Config,
    resources,
    ushellUtils,
    EventHub,
    ShellAppTitle,
    ShellBarSpacer
) {
    "use strict";

    const _aReservedHeadEndItems = [
        "NOTIFICATIONSCOUNTBUTTON",
        "PRODUCTSWITCHBTN",
        "USERACTIONSMENUHEADERBUTTON",
        "SF"
    ];

    /**
     * @alias sap.ushell.components.shell.ShellBar.controller.ShellBar
     * @class
     * @classdesc Controller of the ShellBar view.
     *
     * @param {string} sId Controller id
     * @param {object} oParams Controller parameter
     *
     * @extends sap.ui.core.mvc.Controller
     *
     * @since 1.135.0
     * @private
     */
    return Controller.extend("sap.ushell.components.shell.ShellBar.controller.ShellBar", /** @lends sap.ushell.components.shell.ShellBar.controller.ShellBar.prototype */ {
        _aDoables: [],
        _sSapLogo: sap.ui.require.toUrl("sap/ushell/themes/base/img/SAPLogo.svg"),

        /**
         * UI5 lifecycle method which is called upon controller initialization.
         * It gets all the required UShell services and
         * initializes the view.
         *
         * @private
         * @since 1.135.0
         */
        onInit: function () {
            BindingHelper.overrideUpdateAggregation(this.byId("shellBar"));

            this._aDoables.push(Config.on("/core/shellHeader/homeUri").do(this._updateHomeUri.bind(this)));
            this._updateHomeUri(Config.last("/core/shellHeader/homeUri"));

            this.getView().setModel(this.getConfigurationModel(), "config");

            this.prepareLogo();
            this.prepareShellAppTitle();
            this._aDoables.push(EventHub.on("navigateBack").do(this.pressNavBackButton.bind(this)));
            this._aDoables.push(EventHub.on("navigateFromShellApplicationNavigationMenu").do(this.navigateFromShellApplicationNavigationMenu.bind(this)));
            Device.resize.attachHandler(this.handleResize.bind(this));
        },

        handleResize: function (oEvent) {
            if (this._iDebounceTimerHandleResize) {
                clearTimeout(this._iDebounceTimerHandleResize);
            }
            this._iDebounceTimerHandleResize = setTimeout(() => {
                const oShellBar = this.byId("shellBar");
                oShellBar.getBinding("content").refresh(true);
            }, 400);
        },

        getConfigurationModel: function () {
            const oModel = new JSONModel({
                windowTitleExtension: Config.last("/core/shell/windowTitleExtension") || ""
            });
            return oModel;
        },

        onContentItemVisibilityChange: function (oEvent) {
            if (this._iDebounceTimerContentItemVisibilityChange) {
                clearTimeout(this._iDebounceTimerContentItemVisibilityChange);
            }
            this._iDebounceTimerContentItemVisibilityChange = setTimeout(() => {
                const aHiddenElements = oEvent.getParameter("items");
                const sNewExperienceControlId = NewExperience.getShellHeaderControl()?.getId();
                const oHiddenElements = aHiddenElements.reduce((oAcc, oCurrentItem) => {
                    const sId = oCurrentItem.getId();
                    if (["shellAppTitle", sNewExperienceControlId].includes(sId)) {
                        oAcc[sId] = oCurrentItem;
                    }
                    return oAcc;
                }, {});

                if (oHiddenElements.shellAppTitle) {
                    oHiddenElements.shellAppTitle.setShowAppTitle(false);
                }

                const oShellBarAppTitle = Element.getElementById(this.getOwnerComponent().getAppTitle());
                const oNewExperienceControl = oHiddenElements[sNewExperienceControlId];
                if (oNewExperienceControl) {
                    oShellBarAppTitle.setNewExperienceControl(oNewExperienceControl);
                } else if (NewExperience.getShellHeaderControl()?.getParent() === this.byId("shellBar")) {
                    oShellBarAppTitle.setNewExperienceControl(null);
                }
            }, 400);
        },

        onSearchButtonClick: function (oEvent) {
            this.getOwnerComponent().fireSearchButtonPress(oEvent);
        },

        onSearchFieldToggle: function (oEvent) {
            const sStateName = oEvent.getParameter("expanded") ? "EXP_S" : "COL";
            this.getOwnerComponent().setSearchState(sStateName);
        },

        onProfileClick: function () {
            EventHub.emit("showUserActionsMenu", Date.now());
        },

        isHeadEndItem: function (sItemId) {
            const sItemIdUpperCase = sItemId.toUpperCase();
            if (_aReservedHeadEndItems.includes(sItemIdUpperCase)) {
                return false;
            }
            const oControl = Element.getElementById(sItemId);
            return oControl instanceof ShellBarItem;
        },

        isContentItem: function (sItemId) {
            const sItemIdUpperCase = sItemId.toUpperCase();
            if (_aReservedHeadEndItems.includes(sItemIdUpperCase)) {
                return false;
            }
            const oControl = Element.getElementById(sItemId);
            return !(oControl instanceof ShellBarItem);
        },

        isProfileMenu: function (sItemIdUpperCase) {
            return sItemIdUpperCase === "USERACTIONSMENUHEADERBUTTON";
        },

        hasNotifications: function (aHeadEndItems) {
            const bHasNotifications = aHeadEndItems.some((sItemId) => sItemId.toUpperCase() === "NOTIFICATIONSCOUNTBUTTON");
            if (bHasNotifications) {
                const oNotificationBtnModel = Element.getElementById("NotificationsCountButton").getModel("configModel");
                this.getView().setModel(oNotificationBtnModel, "configModel");
            }
            return bHasNotifications;
        },

        onNotificationsClick: function () {
            EventHub.emit("showNotifications", Date.now());
        },

        hasProducts: function (aHeadEndItems) {
            return aHeadEndItems.some((sItemId) => sItemId.toUpperCase() === "PRODUCTSWITCHBTN");
        },

        onProductSwitchClick: function () {
            EventHub.emit("showProducts", Date.now());
        },

        onLogoClick: function () {
            Container.getServiceAsync("Navigation").then((oNavigation) => {
                oNavigation.navigate({
                    target: {
                        shellHash: this.getOwnerComponent().getModel().getProperty("/logo/homeUri")
                    }
                });
            });
        },

        prepareLogo: function () {
            const oModel = this.getOwnerComponent().getModel();
            this.getCustomLogoAltText();
            const sLogoUri = this.getLogo();
            oModel.setProperty("/logo/src", sLogoUri);
            oModel.setProperty("/logo/alt", this.getLogoAltText(sLogoUri));
        },

        prepareShellAppTitle: function () {
            const oShellBarSpacer = new ShellBarSpacer({
                id: "shellBarSpacer"
            });

            const oShellAppTitle = new ShellAppTitle({
                id: "shellAppTitle",
                text: "{shellModel>/application/title}",
                title: "{shellModel>/application/title}",
                icon: "{shellModel>/application/icon}",
                subTitle: "{shellModel>/header/secondTitle}"
            });
            // set the ShellAppTitle to be the last thing to be hidden when screen gets small
            oShellAppTitle.data("hide-order", "9999", true);
            this.getOwnerComponent().setAppTitle(oShellAppTitle);
            Container.getRendererInternal("fiori2").addHeaderEndItem({id: oShellAppTitle.getId()}, true, false);
            Container.getRendererInternal("fiori2").addHeaderEndItem({id: oShellBarSpacer.getId()}, true, false);
        },

        _updateHomeUri: function (sHomeUri) {
            const oModel = this.getOwnerComponent().getModel();
            oModel.setProperty("/logo/homeUri", sHomeUri);
            oModel.setProperty("/logo/isRootIntent", ushellUtils.isRootIntent(sHomeUri));
        },

        getLogo: function () {
            const sCustomCompanyLogoUrl = Config.last("/core/companyLogo/url");

            if (sCustomCompanyLogoUrl !== "") {
                return sCustomCompanyLogoUrl;
            }

            const sThemeLogo = ThemingParameters.get({
                name: "sapUiGlobalLogo",
                callback: () => {
                    // When no Logo can be retrieved yet, null is returned by ThemingParameters.get() - and a rerender is triggered.
                    this.getOwnerComponent.invalidate();
                }
            });

            if (sThemeLogo) {
                // check given logo URL: Is it valid?
                const aMatch = /url[\s]*\('?"?([^'")]*)'?"?\)/.exec(sThemeLogo);
                if (aMatch) {
                    return aMatch[1];
                }
            }

            return this._sSapLogo;
        },

        getCustomLogoAltText: function () {
            const sCompanyLogoAltTexts = Config.last("/core/companyLogo/accessibleText");
            let sCurrentLanguage;

            delete this._sCustomAltText;
            if (sCompanyLogoAltTexts) {
                try {
                    const oLogoAltTexts = JSON.parse(sCompanyLogoAltTexts);
                    if (oLogoAltTexts) {
                        sCurrentLanguage = Localization.getLanguage();
                        // 1. Exact match
                        this._sCustomAltText = oLogoAltTexts[sCurrentLanguage];
                        // 2. Current language: "en", custom language: "en-GB"
                        if (!this._sCustomAltText) {
                            Object.keys(oLogoAltTexts).forEach((sKey) => {
                                if (sKey.indexOf(sCurrentLanguage) === 0) {
                                    this._sCustomAltText = oLogoAltTexts[sKey];
                                }
                            });
                        }
                        // 3. Current language: "en-GB", custom language: "en"
                        if (!this._sCustomAltText) {
                            Object.keys(oLogoAltTexts).forEach((sKey) => {
                                if (sCurrentLanguage.indexOf(sKey) === 0) {
                                    this._sCustomAltText = oLogoAltTexts[sKey];
                                }
                            });
                        }
                        // 4. Default value
                        if (!this._sCustomAltText) {
                            this._sCustomAltText = oLogoAltTexts.default;
                        }
                    }
                } catch (err) {
                    Log.warning("Custom logo image ALT text is not a JSON string.", sCompanyLogoAltTexts);
                    this._sCustomAltText = sCompanyLogoAltTexts; // Still, a customer may provide a "[Company name] logo" instead of JSON
                }
            }
        },

        getLogoAltText: function (sLogoUri) {
            if (!sLogoUri) {
                return "";
            }
            if (sLogoUri === this._sSapLogo) {
                return resources.i18n.getText("sapLogoText"); // "SAP Logo"
            }
            return this._sCustomAltText || resources.i18n.getText("SHELL_LOGO_TOOLTIP"); // Custom text or "Company logo"
        },

        pressNavBackButton: async function () {
            // set meAria as closed when navigating back
            EventHub.emit("showUserActionsMenu", false);
            BackNavigation.navigateBack();
        },

        navigateFromShellApplicationNavigationMenu: function (sIntent) {
            //if the target was not change, do nothing
            if (window.hasher.getHash() !== sIntent.substr(1)) {
                // we must make sure the view-port is centered before triggering navigation from shell-app-nav-menu
                EventHub.emit("centerViewPort", Date.now());

                // trigger the navigation
                window.hasher.setHash(sIntent);
            }

            // close the popover which holds the navigation menu
            var oShellAppTitle = Element.getElementById("shellAppTitle");
            if (oShellAppTitle) {
                oShellAppTitle.close();
            }
        },

        /**
         * UI5 lifecycle method which is called upon controller destruction.
         * It detaches the router events and config listeners.
         *
         * @private
         * @since 1.135.0
         */
        onExit: function () {
            this._aDoables.forEach((oDoable) => {
                oDoable.off();
            });
            this._aDoables = [];
        }
    });
});
