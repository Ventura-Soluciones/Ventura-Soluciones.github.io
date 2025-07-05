/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *  * (c) Copyright 2009-2025 SAP SE. All rights reserved
 */
sap.ui.define(["sap/m/HBox", "sap/m/Label", "sap/m/List", "sap/m/StandardListItem", "sap/m/Switch", "sap/m/Text", "sap/m/Title", "sap/m/VBox", "./BaseSettingsPanel", "./utils/Accessibility", "./utils/Constants", "./utils/FESRUtil", "./utils/PersonalisationUtils", "./utils/UshellPersonalizer"], function (HBox, Label, List, StandardListItem, Switch, Text, Title, VBox, __BaseSettingsPanel, ___utils_Accessibility, ___utils_Constants, ___utils_FESRUtil, __PersonalisationUtils, __UshellPersonalizer) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const BaseSettingsPanel = _interopRequireDefault(__BaseSettingsPanel);
  const getInvisibleText = ___utils_Accessibility["getInvisibleText"];
  const SETTINGS_PANELS_KEYS = ___utils_Constants["SETTINGS_PANELS_KEYS"];
  const addFESRSemanticStepName = ___utils_FESRUtil["addFESRSemanticStepName"];
  const FESR_EVENTS = ___utils_FESRUtil["FESR_EVENTS"];
  const PersonalisationUtils = _interopRequireDefault(__PersonalisationUtils);
  const UshellPersonalizer = _interopRequireDefault(__UshellPersonalizer);
  /**
   *
   * Class for My Home News Settings Panel.
   *
   * @extends BaseSettingsPanel
   *
   * @author SAP SE
   * @version 0.0.1
   * @since 1.121
   *
   * @internal
   * @experimental Since 1.121
   * @private
   *
   * @alias sap.cux.home.NewsSettingsPanel
   */
  const NewsSettingsPanel = BaseSettingsPanel.extend("sap.cux.home.NewsSettingsPanel", {
    /**
     * Init lifecycle method
     *
     * @public
     * @override
     */
    init: function _init() {
      BaseSettingsPanel.prototype.init.call(this);

      //setup panel
      this.setProperty("key", SETTINGS_PANELS_KEYS.NEWS);
      this.setProperty("title", this._i18nBundle.getText("news"));
      this.setProperty("icon", "sap-icon://newspaper");

      //setup layout content
      this.addAggregation("content", this.getContent());

      //fired every time on panel navigation
      this.attachPanelNavigated(() => {
        void this.loadNewsFeedSettings();
      });
      this.aFavNewsFeed = [];
    },
    /**
     * Returns the content for the News Settings Panel.
     *
     * @private
     * @returns {Control} The control containing the News Settings Panel content.
     */
    getContent: function _getContent() {
      const oHeader = this.setHeader();
      const oTitle = this.setTitleMessage();
      const oContentVBox = new VBox(this.getId() + "--idNewsPageOuterVBoX", {
        alignItems: "Start",
        justifyContent: "SpaceBetween",
        items: [oHeader, oTitle, this.setNewsList()]
      });
      return oContentVBox;
    },
    /**
     * Get personalization instance
     */
    getPersonalization: function _getPersonalization() {
      try {
        const _this = this;
        function _temp2() {
          return _this.oPersonalizer;
        }
        const _temp = function () {
          if (!_this.oPersonalizer) {
            return Promise.resolve(UshellPersonalizer.getInstance(PersonalisationUtils.getPersContainerId(_this._getPanel()), PersonalisationUtils.getOwnerComponent(_this._getPanel()))).then(function (_UshellPersonalizer$g) {
              _this.oPersonalizer = _UshellPersonalizer$g;
            });
          }
        }();
        return Promise.resolve(_temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp));
      } catch (e) {
        return Promise.reject(e);
      }
    },
    /**
     * Returns the content for the News Settings Panel Header.
     *
     * @private
     * @returns {sap.ui.core.Control} The control containing the News Settings Panel's Header content.
     */
    setHeader: function _setHeader() {
      this.headerText = new Text(this.getId() + "--idCustNewsFeedSettingsText", {
        text: this._i18nBundle.getText("newsFeedSettingsText")
      });
      const oHeaderVBox = new VBox(this.getId() + "--idCustNewsFeedSettingsTextContainer", {
        alignItems: "Start",
        justifyContent: "SpaceBetween",
        items: [this.headerText]
      }).addStyleClass("sapUiSmallMarginTop sapUiSmallMarginBegin");
      return oHeaderVBox;
    },
    /**
     * Returns the content for the News Settings Panel Title description.
     *
     * @private
     * @returns {sap.ui.core.Control} The control containing the News Settings Panel's Title description.
     */
    setTitleMessage: function _setTitleMessage() {
      this.title = new Title(this.getId() + "--idCustNewsFeedSettignsTitle", {
        text: this._i18nBundle.getText("newsFeedSettingsHeading"),
        titleStyle: "H5"
      });
      const oTitleHbox = new HBox(this.getId() + "--idCustNewsFeedSettingsTitleContainer", {
        alignItems: "Center",
        justifyContent: "SpaceBetween",
        items: [this.title]
      });
      const oTitleVBox = new VBox(this.getId() + "--idCustNewsFeedSettingsTitleVBox", {
        alignItems: "Start",
        justifyContent: "SpaceBetween",
        items: [oTitleHbox]
      }).addStyleClass("sapUiSmallMarginTop sapUiSmallMarginBegin");
      return oTitleVBox;
    },
    /**
     * Returns the content for the news List
     *
     * @private
     * @returns {sap.ui.core.Control} The control containing the News Settings Panel's List
     */
    setNewsList: function _setNewsList() {
      //showAllPrepRequired Switch
      const oShowSwitchLabel = new Label(this.getId() + "--idShowAllCustNewsSwitchLabel", {
        text: this._i18nBundle.getText("showAllPreparationRequiredSwitchLabel")
      });
      this.oShowSwitch = new Switch(`${this.getId()}-showSwitch`, {
        // 'ariaLabelledBy': "idShowAllCustNewsSwitchLabel idShowAllCustNewsSwitch",
        customTextOn: " ",
        customTextOff: " ",
        change: () => {
          void this.saveNewsFeedSettings();
        },
        // 'fesr:change': "showPrepRequire",
        state: false,
        ariaLabelledBy: [`${this.getId()}--idShowAllCustNewsSwitchLabel`]
      });
      addFESRSemanticStepName(this.oShowSwitch, FESR_EVENTS.CHANGE, "showPrepRequire");
      this.oCustNewsSwitchContainer = new HBox(this.getId() + "--idShowAllCustNewsSwitchContainer", {
        alignItems: "Center",
        items: [oShowSwitchLabel, this.oShowSwitch],
        width: "94%"
      }).addStyleClass("sapUiSmallMarginTop");
      const oShowAllPrep = new VBox(this.getId() + "--idShowAllCustNewsSwitchVBox", {
        items: [this.oCustNewsSwitchContainer],
        width: "94%"
      }).addStyleClass("sapUiSmallMarginTop");
      const oInvisibleText = getInvisibleText(`${this.getId()}--newsTitleText`, this._i18nBundle.getText("newsTitle"));
      //List of news items
      this.oList = new List(this.getId() + "--idCustNewsFeedList", {
        mode: "MultiSelect",
        selectionChange: () => {
          void this.saveNewsFeedSettings();
        },
        ariaLabelledBy: [oInvisibleText.getId(), `${this.getId()}--idCustNewsFeedSettingsText`, `${this.getId()}--idCustNewsFeedSettignsTitle`]
      });
      //Outer VBox
      const oNewsListVBox = new VBox(this.getId() + "--idCustNewsFeedListContainer", {
        direction: "Column",
        items: [this.oList, oShowAllPrep, oInvisibleText],
        width: "96%"
      }).addStyleClass("sapUiSmallMarginTop sapUiSmallMarginBegin");
      return oNewsListVBox;
    },
    /**
     * Checks if the custom file format is CSV based on the custom file name.
     *
     * @param {string} fileName - The custom file name.
     * @returns {boolean} True if the file format is CSV, otherwise false.
     */
    isCSVFileFormat: function _isCSVFileFormat(fileName) {
      return fileName.split(".").pop()?.toLowerCase() === "csv";
    },
    /**
     *
     * Saves news feed settings and shows news feed based on selection change of list of switch
     *
     * @private
     */
    saveNewsFeedSettings: function _saveNewsFeedSettings() {
      try {
        const _this2 = this;
        const aSelectedNewsFeed = _this2.oList.getSelectedItems().map(item => {
          return item.getTitle();
        });
        const feedKey = _this2.oNewsPanel.getCustomFeedKey();
        const customFileName = _this2.oNewsPanel.getProperty("customFileName");
        let oFavNewsFeed;
        if (feedKey) {
          oFavNewsFeed = {
            items: aSelectedNewsFeed,
            showAllPreparationRequired: _this2.isCSVFileFormat(customFileName) ? false : _this2.oShowSwitch.getState()
          };
        } else {
          oFavNewsFeed = {
            items: aSelectedNewsFeed
          };
        }
        return Promise.resolve(_this2.getPersonalization()).then(function (oPersonalizer) {
          return Promise.resolve(oPersonalizer.read()).then(function (oPersData) {
            if (feedKey) {
              oPersData.favNewsFeed = oFavNewsFeed;
            } else {
              oPersData.defaultNewsFeed = oFavNewsFeed;
            }
            return Promise.resolve(oPersonalizer.write(oPersData)).then(function () {
              //get the latest value of switch and set the state
              _this2.oShowSwitch.setState(oFavNewsFeed.showAllPreparationRequired);
              //load news feed
              return Promise.resolve(_this2.oNewsPanel.setCustomNewsFeed(feedKey)).then(function () {});
            });
          });
        });
      } catch (e) {
        return Promise.reject(e);
      }
    },
    /** Set items for the NewsList
     * @param {Array} [aItems] news items to be set as items aggregation
     * @private
     */
    setItems: function _setItems(aItems) {
      this.oList.destroyAggregation("items", true);
      (aItems || []).forEach((oItem, i) => {
        const oCustomListItem = new StandardListItem(this.getId() + "--idCustNewsFeedItem" + "--" + i, {
          title: oItem.title,
          selected: oItem.selected
          // blocked: oItem.blocked as boolean
        });
        //.addStyleClass("newsListItem");
        this.oList.addItem(oCustomListItem);
      });
    },
    /**
     * Loads news feed settings
     *
     * @returns {Promise} resolves to news feed settings
     */
    loadNewsFeedSettings: function _loadNewsFeedSettings() {
      try {
        const _this3 = this;
        _this3.oNewsPanel = _this3._getPanel();
        const sFeedKey = _this3.oNewsPanel.getCustomFeedKey();
        return Promise.resolve(_this3.getPersonalization()).then(function (oPersonalizer) {
          return Promise.resolve(oPersonalizer.read()).then(function (oPersData) {
            const aPersNewsFeed = sFeedKey ? oPersData?.["favNewsFeed"] : oPersData?.["defaultNewsFeed"];
            let showAllPreparationRequired = false;
            showAllPreparationRequired = aPersNewsFeed?.showAllPreparationRequired ?? !aPersNewsFeed;
            const customFileName = _this3.oNewsPanel.getProperty("customFileName");
            let mandatoryNewsFeed = [];
            if (_this3.isCSVFileFormat(customFileName) || !sFeedKey) {
              _this3.oCustNewsSwitchContainer.setVisible(false);
            }
            return Promise.resolve(_this3.oNewsPanel.getCustomNewsFeed(sFeedKey, false)).then(function (aNewsFeed) {
              if (!sFeedKey) {
                _this3.headerText.setText(_this3._i18nBundle.getText("defaultNewsSettingsText"));
                _this3.title.setText(_this3._i18nBundle.getText("defaultNewsSettingsHeading"));
                mandatoryNewsFeed = _this3.oNewsPanel.getMandatoryDefaultNewsFeed();
              } else {
                _this3.headerText.setText(_this3._i18nBundle.getText("newsFeedSettingsText"));
                _this3.title.setText(_this3._i18nBundle.getText("newsFeedSettingsHeading"));
              }
              if (aNewsFeed && aNewsFeed.length > 0) {
                _this3.aFavNewsFeed = aPersNewsFeed && aPersNewsFeed.items || aNewsFeed;
                // combine favnewsFeed with mandatory news group as mandatorynews should always be shown
                // let favMandatoryNewsSet = new Set([...this.aFavNewsFeed, ...mandatoryNewsFeed]);
                // let combinedFavMandatoryNews = Array.from(favMandatoryNewsSet);
                let combinedFavMandatoryNews = _this3.aFavNewsFeed;
                aNewsFeed = aNewsFeed.map(oNewsFeed => {
                  const NewsFeedInFavorites = combinedFavMandatoryNews.find(oFavNewsFeed => {
                    return oFavNewsFeed === oNewsFeed.title;
                  }) ? true : false;
                  oNewsFeed.selected = !aPersNewsFeed ? true : NewsFeedInFavorites;
                  oNewsFeed.blocked = !!mandatoryNewsFeed.find(feedName => {
                    return feedName === oNewsFeed.title;
                  });
                  return oNewsFeed;
                });
                _this3.aFavNewsFeed = aNewsFeed;
                _this3.setItems(_this3.aFavNewsFeed);
                _this3.oShowSwitch.setState(!!showAllPreparationRequired);
                return aNewsFeed;
              }
            });
          });
        });
      } catch (e) {
        return Promise.reject(e);
      }
    }
  });
  return NewsSettingsPanel;
});
//# sourceMappingURL=NewsSettingsPanel-dbg-dbg.js.map
