// Copyright (c) 2009-2025 SAP SE, All Rights Reserved
/**
 * @fileOverview Utility functions for RTA.
 */
sap.ui.define([
    "sap/ui/core/theming/Parameters",
    "sap/ushell/Container",
    "sap/ushell/EventHub",
    "sap/ushell/Config",
    "sap/ushell/state/ShellModel"
], function (
    ThemingParameters,
    Container,
    EventHub,
    Config,
    ShellModel
) {
    "use strict";

    /**
     * @alias sap.ushell.api.RTA
     * @namespace
     *
     * @since 1.120.0
     * @private
     * @ui5-restricted sap.ui.fl, sap.ui.rta
     */
    const RtaUtils = {};

    /**
     * Returns the shell header control.
     * @returns {sap.ushell.ui.ShellHeader} The shellHeader
     *
     * @since 1.120.0
     * @private
     * @ui5-restricted sap.ui.fl, sap.ui.rta
     * @deprecated Since version 1.136.1
     */
    RtaUtils.getShellHeader = function () {
        const oRenderer = Container.getRendererInternal();
        if (!Config.last("/core/shellBar/enabled")) {
            return oRenderer.getRootControl().getShellHeader();
        } else {
            // the webComponent is very different from the previous shell header
            return {
                getLogo: this.getLogo
            };
        }
    };

    /**
     * RTA uses getLogo() to find the current logo URL.
     * Modify getLogo until a better way is implemented in RTA.
     * Logo priority:
     *  1) Custom Company logo URL
     *  2) set in the constructor of the shell header
     *  3) theme logo
     *  4) SAP logo
     *  5) undefined
     * In case the logo cannot yet be retrieved from the theme, a invalidation is triggered.
     *
     * @since 1.136.1
     * @returns {string|undefined} Logo URL
     * @private
     * @ui5-restricted sap.ui.rta
     */
    RtaUtils.getLogo = function () {
        const bShowLogo = ShellModel.getModel().getProperty("/header/home/showLogo");
        if (!bShowLogo) {
            return;
        }

        const sCustomCompanyLogoUrl = Config.last("/core/companyLogo/url");

        if (sCustomCompanyLogoUrl !== "") {
            return sCustomCompanyLogoUrl;
        }

        const sThemeLogo = ThemingParameters.get({
            name: "sapUiGlobalLogo",
            callback: () => { }
        });

        if (sThemeLogo) {
            // check given logo URL: Is it valid?
            const aMatch = /url[\s]*\('?"?([^'")]*)'?"?\)/.exec(sThemeLogo);
            if (aMatch) {
                return aMatch[1];
            }
        }
        if (sThemeLogo === "none") {
            return sap.ui.require.toUrl("sap/ushell/themes/base/img/SAPLogo.svg");
        }

        return "";
    };

    /**
     * Sets the visibility of the shell header.
     * @param {boolean} visible Whether the shell header should be visible in all states.
     *
     * @since 1.120.0
     * @private
     * @ui5-restricted sap.ui.fl, sap.ui.rta
     */
    RtaUtils.setShellHeaderVisibility = function (visible) {
        const oRenderer = Container.getRendererInternal();
        oRenderer.setHeaderVisibility(visible, false);
    };

    /**
     * Adds a placeholder for the shell header within the iframe.
     *
     * @since 1.121.0
     * @private
     * @ui5-restricted sap.ui.fl, sap.ui.rta
     */
    RtaUtils.addTopHeaderPlaceHolder = function () {
        const oRenderer = Container.getRendererInternal();
        oRenderer.addTopHeaderPlaceHolder();
    };

    /**
     * Removes the placeholder for the shell header within the iframe.
     *
     * @since 1.121.0
     * @private
     * @ui5-restricted sap.ui.fl, sap.ui.rta
     */
    RtaUtils.removeTopHeaderPlaceHolder = function () {
        const oRenderer = Container.getRendererInternal();
        oRenderer.removeTopHeaderPlaceHolder();
    };

    /**
     * Sets the property enabled of the navigation bar.
     * @param {boolean} bEnable Whether the navigation bar should be enabled or not.
     * @since 1.126.0
     * @private
     * @ui5-restricted sap.ui.fl, sap.ui.rta
     */
    RtaUtils.setNavigationBarEnabled = function (bEnable) {
        EventHub.emit("enableMenuBarNavigation", bEnable);
    };
    return RtaUtils;

});
