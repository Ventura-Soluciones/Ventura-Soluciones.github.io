// Copyright (c) 2009-2025 SAP SE, All Rights Reserved

sap.ui.define([
    "sap/ushell/Config",
    "sap/tnt/NavigationList"
], function (
    Config,
    NavigationList
) {
    "use strict";
    /**
     * The NavigationList for the item aggregation of the SideNavigation.
     *
     * This module depends on the following ushell configuration:
     *
     * <code>
     * /core/menu/personalization/enabled
     * /core/spaces/myHome/enabled
     * /core/spaces/myHome/myHomeSpaceId
     * /core/spaces/myHome/myHomeSpaceId
     * </code>
     *
     * Module specific configuration can contain the following properties as a stringified JSON object:
     * <code>
     * /core/sideNavigation/navigationListProvider/configuration
     * {
     *     recentActivity: {
     *         enabled: true,
     *         maxItems: 10
     *     },
     *     favorites: {
     *         enabled: true
     *     },
     *     spaces: {
     *         enabled: true,
     *         defaultIcon: ""
     *     }
     * }
     * </code>
     *
     * @since 1.134.0
     * @private
     */
    class GenericNavigationListProvider {
        /**
         * The side navigation API object passed to the constructor.
         * @type {object}
         */
        #oSideNavAPI;

        /**
         * The root navigation list.
         * @type {sap.tnt.NavigationList}
         */
        #oRootItem;

        /**
         * Instance of the MyHome module.
         * @type {object}
         */
        #oMyHome;

        /**
         * Creates a NavigationList for the item aggregation of the SideNavigation.
         *
         * @param {object} oSideNavAPI The side navigation API object.
         *
         * @since 1.134.0
         * @private
         */
        constructor (oSideNavAPI) {
            this.#oSideNavAPI = oSideNavAPI;
            this.#oRootItem = new NavigationList();
            this.#buildSideNavigation();
        }

        /**
        * Asynchronously retrieves the root navigation item.
        *
        * @async
        * @returns {Promise<sap.tnt.NavigationList>} A promise that resolves to NavigationList with the configuration menu items.
        * @since 1.134.0
        */
        async getRootItem () {
            return this.#oRootItem;
        }

        /**
        * Asynchronously retrieves the selected item key from the spaces.
        * @returns {Promise<string>} A promise that resolves to the selected item key.
        * @since 1.134.0
        */
        async findSelectedKey () {
            let sSelectedKey;
            sSelectedKey = await this.#oMyHome?.findSelectedKey();
            if (!sSelectedKey) {
                sSelectedKey = (await this.pSpaces).findSelectedKey();
            }
            return sSelectedKey;
        }

        /**
        * Builds the side navigation structure by dynamically loading and configuring navigation modules.
        * This method initializes child navigation items based on the configuration settings provided.
        *
        * @private
        * @since 1.134.0
        */
        #buildSideNavigation () {
            this.oChildItems = {};

            const fnAddItemsToAggregation = () => {
                this.#oRootItem.addAggregation("items", this.oChildItems.myHome);
                this.#oRootItem.addAggregation("items", this.oChildItems.recentActivity);
                this.#oRootItem.addAggregation("items", this.oChildItems.favorites);
                this.#oRootItem.addAggregation("items", this.oChildItems.spaces);
            };

            if (Config.last("/core/spaces/myHome/enabled")) {
                sap.ui.require(["sap/ushell/components/shell/SideNavigation/modules/MyHome"], (MyHome) => {
                    this.#oMyHome = new MyHome(this.#oSideNavAPI);
                    this.#oMyHome.getRootItem().then((oItem) => {
                        this.oChildItems.myHome = oItem;
                        fnAddItemsToAggregation();
                    });
                });
            }

            if (this.#oSideNavAPI.getConfigValue("recentActivity.enabled")) {
                sap.ui.require(["sap/ushell/components/shell/SideNavigation/modules/RecentActivity"], (RecentActivity) => {
                    const oRecentActivity = new RecentActivity(this.#oSideNavAPI);
                    oRecentActivity.getRootItem().then((oItem) => {
                        this.oChildItems.recentActivity = oItem;
                        fnAddItemsToAggregation();
                    });
                });
            }

            if (this.#oSideNavAPI.getConfigValue("favorites.enabled")) {
                sap.ui.require(["sap/ushell/components/shell/SideNavigation/modules/Favorites"], (Favorites) => {
                    const oFavorites = new Favorites(this.#oSideNavAPI);
                    oFavorites.getRootItem().then((oItem) => {
                        this.oChildItems.favorites = oItem;
                        fnAddItemsToAggregation();
                    });
                });
            }

            this.pSpaces = new Promise((resolve) => {
                if (this.#oSideNavAPI.getConfigValue("spaces.enabled")) {
                    sap.ui.require(["sap/ushell/components/shell/SideNavigation/modules/Spaces"], (Spaces) => {
                        const oSpaces = new Spaces(this.#oSideNavAPI);
                        oSpaces.getRootItem().then((oItem) => {
                            this.oChildItems.spaces = oItem;
                            fnAddItemsToAggregation();
                        });
                        resolve(oSpaces);
                    });
                }
            });
        }
    }

    return GenericNavigationListProvider;
}, false);
