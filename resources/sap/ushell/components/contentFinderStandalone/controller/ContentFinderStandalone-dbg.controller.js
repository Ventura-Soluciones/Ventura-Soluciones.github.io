// Copyright (c) 2009-2025 SAP SE, All Rights Reserved

/**
 * @file Controller for ContentFinderDialog standalone root view
 * @version 1.136.1
 */
sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ushell/utils/workpage/WorkPageService",
    "sap/ushell/appIntegration/AppLifeCycle",
    "sap/ushell/components/contentFinder/CatalogService",
    "sap/ushell/Container",
    "sap/ushell/EventHub",
    "sap/ushell/resources",
    "sap/base/Log",
    "sap/ushell/services/MessageInternal",
    "sap/m/library"
], function (
    /** @type { typeof import("sap/ui/core/mvc/Controller").default} */
    Controller,
    WorkPageService,
    AppLifeCycleAI,
    CatalogService,
    Container,
    EventHub,
    ushellResources,
    Log,
    Message,
    /** @type {typeof import("sap/m/library")} */
    Library
) {
    "use strict";

    /**
     * @alias sap.ushell.components.contentFinderStandalone.controller.ContentFinderStandalone
     * @class
     * @classdesc Controller of the standalone root view.
     *
     * @param {string} sId Controller id.
     * @param {object} oParams Controller parameters.
     *
     * @extends sap.ui.core.mvc.Controller
     *
     * @since 1.123.0
     * @private
     */
    return Controller.extend("sap.ushell.components.contentFinderStandalone.controller.ContentFinderStandalone",
        /** @lends sap.ushell.components.contentFinderStandalone.controller.ContentFinderStandalone.prototype */{

            /**
             * The init function called after the view was initialized.
             *
             * @since 1.123.0
             * @private
             */
            onInit: function () {
                this.oWorkPageService = new WorkPageService();
                this.oCatalogService = new CatalogService();
                this.oResourceBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();

                // Routing for 'AppFinder'
                // todo: [FLPCOREANDUX-10024] remove this dependency
                this.oShellUIService = AppLifeCycleAI.getShellUIService();
                this.oRouter = Container.getRendererInternal().getRouter();
                this.oRouter.getRoute("appfinder").attachMatched(this._handleContentFinderNavigation.bind(this));
            },

            /**
             * Handles the navigation to the content finder.
             * Updates shell header title.
             *
             * @since 1.128.0
             * @private
             */
            _handleContentFinderNavigation: function () {
                this.oShellUIService.setTitle(ushellResources.i18n.getText("appFinderTitle"));
            },

            /**
             * Called when the appSearch component was created.
             *
             * Attaches the required event handling.
             *
             * @param {sap.ui.base.Event} oEvent The 'componentCreated' event.
             *
             * @since 1.123.0
             * @private
             */
            appSearchComponentCreated: async function (oEvent) {
                this.oComponent = oEvent.getParameter("component");

                // Required to load the core-ext bundles to enable menubar, usersettings, search, ...
                EventHub.emit("CenterViewPointContentRendered");

                this.oComponent.attachVisualizationFilterApplied(null, this._onVisualizationFilterApplied, this);

                // Getting transformed initial filter parameters if available
                const aInitialAvailableFilterTypes = this.oComponent.getSelectedVisualizationFilter();
                const oFilterParams = this._transformFilterParams(aInitialAvailableFilterTypes);

                //we don't want to await this promise here but rather start both calls to loadVisualizations and getCatalogs in parallel and then await them after
                const loadVizPromise = this.oWorkPageService.loadVisualizations(oFilterParams).then((oVisualizationData) => {
                    this.oComponent.setVisualizationData(oVisualizationData);
                }).catch((e) => {
                    Log.error("ContentFinderStandalone: Visualization data loading failed: " + JSON.stringify(e));
                    this.oComponent.setVisualizationData(undefined, undefined, this._getErrorOnLoadingMessage());
                });
                const loadCategoryPromise = this.setCategoryTree();

                // Temporary fallback to the classic AppFinder in case the Content Finder causes issues or does not show all required data.
                const oUrl = new URL(location.href);
                oUrl.searchParams.append("sap-ushell-xx-overwrite-config", "/core/workPages/contentFinderStandalone:false");
                this.oComponent.getUiModel().setProperty("/linkToAppFinder", oUrl.toString());
                await loadVizPromise;
                await loadCategoryPromise;
            },


            /**
             * Sets the category tree for the ContentFinder.
             *
             * @returns {Promise<undefined>} Resolves with <code>undefined</code>.
             */
            setCategoryTree: async function () {
                // fetch category data: catalogs
                let oCatalogsResponse;
                try {
                    oCatalogsResponse = await this.oCatalogService.getCatalogs();
                } catch (error) {
                    Log.error("Catalog fetching failed with:" + JSON.stringify(error));
                    return;
                }

                let aCategories = [];
                if (oCatalogsResponse?.catalogs?.length > 0) {
                    // prepare category tree with static categories
                    aCategories = [
                        {
                            id: undefined,
                            title: this.oResourceBundle.getText("ContentFinderStandalone.CategoryTree.Category.AllTiles"),
                            filterIsTitle: true,
                            inactive: false,
                            allowedFilters: ["tiles"]
                        },
                        {
                            id: "$$catalogs",
                            title: this.oResourceBundle.getText("ContentFinderStandalone.CategoryTree.Category.Catalogs"),
                            inactive: true,
                            filterIsTitle: false,
                            nodes: oCatalogsResponse?.catalogs,
                            $count: oCatalogsResponse?.totalCount,
                            allowedFilters: ["tiles"]
                        }
                    ];
                }

                this.oComponent.setCategoryTree(aCategories);
            },

            /**
             * Called when a filter action was performed in the Content Finder, e.g. search, filter by type, catalog, etc.
             *
             * @param {sap.ui.base.Event} oEvent The 'visualizationFilterApplied' event
             *
             * @since 1.123.0
             * @private
             */
            _onVisualizationFilterApplied: async function (oEvent) {
                const oFilterParams = this._transformFilterParams(oEvent.getParameters());
                let oVisualizationData;
                let oErrorOnLoadVisualizations;
                const categoryId = oEvent.getParameter("categoryId");
                try {
                    // the following are the same graph query with only difference CatalogService's one accepting the categoryId as a parameter
                    if (categoryId) {
                        oVisualizationData = await this.oCatalogService.loadVisualizations(categoryId, oFilterParams);
                    } else {
                        oVisualizationData = await this.oWorkPageService.loadVisualizations(oFilterParams);
                    }
                } catch (e) {
                    Log.error("ContentFinderStandalone: Visualization data loading failed: " + JSON.stringify(e));

                    const bIsPagination = Number(oFilterParams.skip) > 0;
                    if (!bIsPagination) {
                        // when the first page of visualizations cannot be loaded, the error message is shown
                        oErrorOnLoadVisualizations = this._getErrorOnLoadingMessage();
                    } else {
                        // we're on a page > 1, so we show an error message
                        new Message().error(this.getOwnerComponent().getModel("i18n").getResourceBundle().getText("ContentFinderStandalone.AppSearch.NextPage.Error.Title"));
                    }
                }

                this.oComponent.setVisualizationData(oVisualizationData, undefined, oErrorOnLoadVisualizations);
            },

            /**
             * Transforms the filter parameters received by the ContentFinder to a format required by the graphql API.
             *
             * @param {object} oParams The ContentFinder filter parameters.
             * @returns {{top: int, skip: ?int, filter: object[]}} The filter parameters in graphql API format.
             *
             * @since 1.123.0
             * @private
             */
            _transformFilterParams: function (oParams) {
                const iTop = oParams?.pagination?.top;
                const iSkip = oParams?.pagination?.skip;
                const sSearchTerm = oParams?.search;
                const aTypes = oParams?.types || [];
                const aExpandedTypes = aTypes.length > 0 ? [{ in: aTypes }] : [];
                const oSearchFilter = sSearchTerm
                    ? {
                        type: aExpandedTypes,
                        descriptor: [
                            {
                                conditions: [
                                    {
                                        propertyPath: "/sap.app/title",
                                        stringFilter: [{ containsIgnoreCase: sSearchTerm }]
                                    }
                                ]
                            },
                            {
                                conditions: [
                                    {
                                        propertyPath: "/sap.app/subTitle",
                                        stringFilter: [{ containsIgnoreCase: sSearchTerm }]
                                    }
                                ]
                            },
                            {
                                conditions: [
                                    {
                                        propertyPath: "/sap.app/info",
                                        stringFilter: [{ containsIgnoreCase: sSearchTerm }]
                                    }
                                ]
                            },
                            {
                                conditions: [
                                    {
                                        propertyPath: "/sap.fiori/registrationIds",
                                        anyFilter: [
                                            {
                                                conditions: [
                                                    {
                                                        stringFilter: [{ containsIgnoreCase: sSearchTerm }]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                    : { type: aExpandedTypes };

                return { top: iTop, skip: iSkip, filter: [oSearchFilter] };
            },

            /**
             * Error message to show when loading (initially or on filter/search) the visualization data fails.
             * @returns {object} The error message to be shown when the visualization data cannot be loaded.
             */
            _getErrorOnLoadingMessage: function () {

                return {
                    type: Library.IllustratedMessageType.UnableToLoad,
                    title: this.oResourceBundle.getText("ContentFinderStandalone.AppSearch.Error.LoadingApps.Title"),
                    description: this.oResourceBundle.getText("ContentFinderStandalone.AppSearch.Error.LoadingApps.Details")
                };
            }
        });
});
