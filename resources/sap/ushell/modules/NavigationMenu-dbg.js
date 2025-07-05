// Copyright (c) 2009-2025 SAP SE, All Rights Reserved

/**
 * @file This module provides an API for configuring the navigation menu of the Launchpad.
 * It allows adding additional NavigationListProviders to the navigation menu via for example a Plugin.
 * The navigation menu is an extension of the sap.tnt.SideNavigation that provides navigation capabilities.
 */
sap.ui.define([
    "sap/ushell/Config"
], function (
    Config
) {
    "use strict";

    /**
     * @enum {string} NavigationMenuMode - Defines the position of the navigation menu.
     * @private
     * @ui5-restricted SAL
     */
    const NavigationMenuMode = {
        Docked: "Docked",
        Popover: "Popover"
    };

    /**
     * @alias sap.ushell.modules.NavigationMenu
     * @namespace
     * @description The navigation menu API provides a way of placing content on the navigation menu.
     *
     * @since 1.136.0
     * @private
     * @ui5-restricted SAL
     */
    class NavigationMenu {

        NavigationMenuMode = NavigationMenuMode;

        constructor () {
            Config.emit("/core/sideNavigation/enabled", true);
        }

        /**
         * Sets the navigation list provider for the navigation menu.
         *
         * @param {string} sModulePath The module path of the navigation list provider.
         * @param {object} oConfiguration The configuration object for the navigation list provider.
         *
         * @since 1.136.0
         * @private
         * @ui5-restricted SAL
         */
        setNavigationListProvider (sModulePath, oConfiguration) {
            Config.emit("/core/sideNavigation/navigationListProvider", {
                modulePath: sModulePath,
                configuration: JSON.stringify(oConfiguration || {})
            });
        }

        /**
         * Sets the navigation list provider for the fixed area of the navigation menu.
         *
         * @param {string} sModulePath The module path of the navigation list provider.
         * @param {object} oConfiguration The configuration object for the navigation list provider.
         *
         * @since 1.136.0
         * @private
         * @ui5-restricted SAL
         */
        setFixedNavigationListProvider (sModulePath, oConfiguration) {
            Config.emit("/core/sideNavigation/fixedNavigationListProvider", {
                modulePath: sModulePath,
                configuration: JSON.stringify(oConfiguration || {})
            });
        }

        /**
         * Sets the mode of the navigation menu.
         *
         * @param {NavigationMenuMode} sMode The mode of the navigation menu. Can be "Docked" or "Popover".
         */
        setMode (sMode) {
            if (sMode !== NavigationMenuMode.Docked && sMode !== NavigationMenuMode.Popover) {
                throw new Error("Invalid mode: " + sMode);
            }
            Config.emit("/core/sideNavigation/mode", sMode);
        }
    }

    return new NavigationMenu();
});
