// Copyright (c) 2009-2025 SAP SE, All Rights Reserved

sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Sorter",
    "sap/tnt/NavigationList"
], function (
    JSONModel,
    Sorter,
    NavigationList
) {
    "use strict";

    /**
     * The NavigationList for the fixedItem aggregation of the SideNavigation.
     *
     * Module specific configuration can contain the following properties as a stringified JSON object:
     * <code>
     * /core/sideNavigation/fixedNavigationListProvider/configuration
     * {
     *     spaces: {
     *         personalization: {
     *             enabled: true
     *         }
     *     },
     *     allApps: {
     *         enabled: true
     *     }
     * }
     * </code>
     *
     * @property {object} oSideNavAPI Holds the side navigation API object passed to the constructor.
     * @property {sap.tnt.NavigationList} oRootItem The root navigation list item configured with fixed menu entries e.g AppFinder.
     *
     * @since 1.134.0
     * @private
     */
    class GenericFixedNavigationListProvider {
        /**
         * Creates a new menu entry "My Spaces" with spaces and pages for the SideNavigation.
         *
         * @param {object} oSideNavAPI The side navigation API object.
         *
         * @since 1.134.0
         * @private
         */
        constructor (oSideNavAPI) {
            this.oSideNavAPI = oSideNavAPI;
            this.oRootItem = new NavigationList({
                items: {
                    path: "/fixedItems",
                    sorter: new Sorter({ path: "scale" }),
                    factory: this.#sideNavigationFactory.bind(this)
                }
            });
            this.#buildSideNavigation();
        }
        /**
        * Asynchronously retrieves the root navigation list item.
        *
        * @async
        * @returns {Promise<sap.tnt.NavigationList>} A promise that resolves to NavigationList with fixed menu entries if such are enabled.
        * @since 1.134.0
        * @private
        */
        async getRootItem () {
            if (this.oSideNavAPI.getConfigValue("spaces.personalization.enabled") || this.oSideNavAPI.getConfigValue("allApps.enabled")) {
                return this.oRootItem;
            }
            return null;
        }

        /**
        * Constructs the side navigation by adding fixed items to the model if such are enabled in the config.
        * Possible menu entries for the fixed items - AppFinder, AllSpaces
        * @since 1.134.0
        * @private
        */
        #buildSideNavigation () {
            this.oChildItems = {};
            const oSideNavigationFixedItemsModel = new JSONModel({
                fixedItems: []
            });

            const fnAddItemToModel = (oItem) => {
                const sPath = "/fixedItems";
                const oModel = this.oRootItem.getModel();
                const aItems = oModel.getObject(sPath);
                aItems.push(oItem);
                oModel.setProperty(sPath, aItems);
            };

            if (this.oSideNavAPI.getConfigValue("spaces.personalization.enabled")) {
                sap.ui.require(["sap/ushell/components/shell/SideNavigation/modules/AllSpaces"], (AllSpaces) => {
                    const oAllSpaces = new AllSpaces(this.oSideNavAPI);
                    oAllSpaces.getRootItem().then((oItem) => {
                        this.oChildItems.allSpaces = oItem;
                        fnAddItemToModel({ key: "allSpaces", scale: 1 });
                    });
                });
            }

            if (this.oSideNavAPI.getConfigValue("allApps.enabled")) {
                sap.ui.require(["sap/ushell/components/shell/SideNavigation/modules/AppFinder"], (AppFinder) => {
                    const oAppFinder = new AppFinder(this.oSideNavAPI);
                    oAppFinder.getRootItem().then((oItem) => {
                        this.oChildItems.appFinder = oItem;
                        fnAddItemToModel({ key: "appFinder", scale: 2 });
                    });
                });
            }

            this.oRootItem.setModel(oSideNavigationFixedItemsModel);
        }
        /**
        * Retrieves and clones a child navigation item by its identifier.
        *
        * @param {string} sId - The identifier of the child navigation item to retrieve.
        * @returns {sap.tnt.NavigationListItem} - A clone of the requested child navigation item.
        * @private
        * @since 1.134.0
        */
        #getChildItemById (sId) {
            return this.oChildItems[sId].clone();
        }

        /**
        * Factory function for creating side navigation list items.
        *
        * @param {string} _sId - The unique identifier for the side navigation list item.
        * @param {object} oContext - The context object providing access to model data for item creation.
        * @returns {sap.tnt.NavigationListItem} - A cloned navigation list item based on the key from the context.
        * @private
        * @since 1.134.0
        */
        #sideNavigationFactory (_sId, oContext) {
            return this.#getChildItemById(oContext.getProperty("key"));
        }
    }

    return GenericFixedNavigationListProvider;
}, false);
