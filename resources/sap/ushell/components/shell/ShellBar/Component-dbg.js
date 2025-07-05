// Copyright (c) 2009-2025 SAP SE, All Rights Reserved

sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "sap/ui/model/json/JSONModel"
], function (
    UIComponent,
    Device,
    JSONModel) {
    "use strict";

    const sSearchOverlayCSS = "sapUshellShellShowSearchOverlay";

    let _iSearchWidth = 0;

    const SearchState = {
        COL: "COL",
        EXP: "EXP",
        EXP_S: "EXP_S"
    };

    return UIComponent.extend("sap.ushell.components.shell.ShellBar.Component", {
        metadata: {
            manifest: "json",
            interfaces: ["sap.ui.core.IAsyncContentCreation"],
            properties: {
                searchState: { type: "string", defaultValue: "COL" }
            },
            events: {
                searchSizeChanged: {},
                searchButtonPress: {}
            },
            associations: {
                appTitle: { type: "sap.ui.core.Control" }
            }
        },

        init: function () {
            // Call the init function of the parent
            UIComponent.prototype.init.apply(this, arguments);
            const oModel = new JSONModel({
                logo: {},
                searchField: {
                    show: false
                }
            });
            this.setModel(oModel);
            this.FLPRangeSet = {
                name: "Ushell",
                rangeBorders: [600, 1024, 1440, 1920],
                rangeNames: ["Phone", "Tablet", "Desktop", "LargeDesktop", "ExtraLargeDesktop"]
            };
            Device.media.initRangeSet(
                this.FLPRangeSet.name,
                this.FLPRangeSet.rangeBorders,
                "px",
                this.FLPRangeSet.rangeNames
            );
        },

        setSearch: function (oSearchField) {
            this.rootControlLoaded().then((oView) => {
                oView.byId("shellBar").addSearchField(oSearchField);
            });
        },

        setSearchState: function (sStateName, maxRemSize, bWithOverlay) {
            if (SearchState[sStateName] && this.getSearchState() !== sStateName) {
                if (typeof maxRemSize === "boolean") {
                    bWithOverlay = maxRemSize;
                    maxRemSize = undefined;
                }

                this.setProperty("searchState", sStateName, false);

                const bShow = (sStateName !== "COL");
                this.getModel().setProperty("/searchField/show", bShow);
                document.body.classList.toggle(sSearchOverlayCSS, bShow && bWithOverlay);

                // save for animation after rendering
                _iSearchWidth = bShow ? maxRemSize || 35 : 0;
            }
        },

        isPhoneState: function () {
            const deviceType = Device.media.getCurrentRange(Device.media.RANGESETS.SAP_STANDARD).name;
            const bEnoughSpaceForSearch = this.getDomRef().getBoundingClientRect().width > this.getSearchWidth();
            return (Device.system.phone || deviceType === "Phone" || !bEnoughSpaceForSearch);
        },

        getSearchWidth: function () {
            return _iSearchWidth;
        },

        isExtraLargeState: function () {
            return Device.media.getCurrentRange(this.FLPRangeSet.name).from === this.FLPRangeSet.rangeBorders[3];
        },

        getNotificationsBtnDomRef: function () {
            return this.getRootControl().byId("shellBar").getNotificationsDomRef();
        },

        getProductSwitchDomRef: function () {
            return this.getRootControl().byId("shellBar").getProductSwitchDomRef();
        },

        enhanceComponentContainerAPI: function (oComponentContainer) {
            oComponentContainer.setSearch = this.setSearch.bind(this);
            oComponentContainer.setSearchState = this.setSearchState.bind(this);
            oComponentContainer.getSearchState = this.getSearchState.bind(this);
            oComponentContainer.isPhoneState = this.isPhoneState.bind(this);
            oComponentContainer.getSearchWidth = this.getSearchWidth.bind(this);
            oComponentContainer.attachSearchSizeChanged = this.attachSearchSizeChanged.bind(this);
            oComponentContainer.attachSearchButtonPress = this.attachSearchButtonPress.bind(this);
            oComponentContainer.setAppTitle = this.setAppTitle.bind(this);
            oComponentContainer.getAppTitle = this.getAppTitle.bind(this);
            oComponentContainer.isExtraLargeState = this.isExtraLargeState.bind(this);
            oComponentContainer.getNotificationsBtnDomRef = this.getNotificationsBtnDomRef.bind(this);
            oComponentContainer.getProductSwitchDomRef = this.getProductSwitchDomRef.bind(this);
        }
    });
});
