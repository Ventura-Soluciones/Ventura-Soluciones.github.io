/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *  * (c) Copyright 2009-2025 SAP SE. All rights reserved
 */
sap.ui.define(["sap/base/Log", "sap/m/GenericTile", "sap/m/SlideTile", "sap/ui/core/EventBus", "sap/ui/core/format/DateFormat", "sap/ui/model/xml/XMLModel", "sap/ushell/Container", "./BaseNewsPanel", "./MenuItem", "./NewsGroup", "./NewsItem", "./library", "./utils/Constants", "./utils/DataFormatUtils", "./utils/Device", "./utils/FESRUtil", "./utils/HttpHelper", "./utils/PersonalisationUtils", "./utils/UshellPersonalizer"], function (Log, GenericTile, SlideTile, EventBus, DateFormat, XMLModel, Container, __BaseNewsPanel, __MenuItem, __NewsGroup, __NewsItem, ___library, ___utils_Constants, ___utils_DataFormatUtils, ___utils_Device, ___utils_FESRUtil, __HttpHelper, __PersonalisationUtils, __UshellPersonalizer) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  function _settle(pact, state, value) {
    if (!pact.s) {
      if (value instanceof _Pact) {
        if (value.s) {
          if (state & 1) {
            state = value.s;
          }
          value = value.v;
        } else {
          value.o = _settle.bind(null, pact, state);
          return;
        }
      }
      if (value && value.then) {
        value.then(_settle.bind(null, pact, state), _settle.bind(null, pact, 2));
        return;
      }
      pact.s = state;
      pact.v = value;
      const observer = pact.o;
      if (observer) {
        observer(pact);
      }
    }
  }
  const BaseNewsPanel = _interopRequireDefault(__BaseNewsPanel);
  const _Pact = /*#__PURE__*/function () {
    function _Pact() {}
    _Pact.prototype.then = function (onFulfilled, onRejected) {
      const result = new _Pact();
      const state = this.s;
      if (state) {
        const callback = state & 1 ? onFulfilled : onRejected;
        if (callback) {
          try {
            _settle(result, 1, callback(this.v));
          } catch (e) {
            _settle(result, 2, e);
          }
          return result;
        } else {
          return this;
        }
      }
      this.o = function (_this) {
        try {
          const value = _this.v;
          if (_this.s & 1) {
            _settle(result, 1, onFulfilled ? onFulfilled(value) : value);
          } else if (onRejected) {
            _settle(result, 1, onRejected(value));
          } else {
            _settle(result, 2, value);
          }
        } catch (e) {
          _settle(result, 2, e);
        }
      };
      return result;
    };
    return _Pact;
  }();
  function _isSettledPact(thenable) {
    return thenable instanceof _Pact && thenable.s & 1;
  }
  function _for(test, update, body) {
    var stage;
    for (;;) {
      var shouldContinue = test();
      if (_isSettledPact(shouldContinue)) {
        shouldContinue = shouldContinue.v;
      }
      if (!shouldContinue) {
        return result;
      }
      if (shouldContinue.then) {
        stage = 0;
        break;
      }
      var result = body();
      if (result && result.then) {
        if (_isSettledPact(result)) {
          result = result.s;
        } else {
          stage = 1;
          break;
        }
      }
      if (update) {
        var updateValue = update();
        if (updateValue && updateValue.then && !_isSettledPact(updateValue)) {
          stage = 2;
          break;
        }
      }
    }
    var pact = new _Pact();
    var reject = _settle.bind(null, pact, 2);
    (stage === 0 ? shouldContinue.then(_resumeAfterTest) : stage === 1 ? result.then(_resumeAfterBody) : updateValue.then(_resumeAfterUpdate)).then(void 0, reject);
    return pact;
    function _resumeAfterBody(value) {
      result = value;
      do {
        if (update) {
          updateValue = update();
          if (updateValue && updateValue.then && !_isSettledPact(updateValue)) {
            updateValue.then(_resumeAfterUpdate).then(void 0, reject);
            return;
          }
        }
        shouldContinue = test();
        if (!shouldContinue || _isSettledPact(shouldContinue) && !shouldContinue.v) {
          _settle(pact, 1, result);
          return;
        }
        if (shouldContinue.then) {
          shouldContinue.then(_resumeAfterTest).then(void 0, reject);
          return;
        }
        result = body();
        if (_isSettledPact(result)) {
          result = result.v;
        }
      } while (!result || !result.then);
      result.then(_resumeAfterBody).then(void 0, reject);
    }
    function _resumeAfterTest(shouldContinue) {
      if (shouldContinue) {
        result = body();
        if (result && result.then) {
          result.then(_resumeAfterBody).then(void 0, reject);
        } else {
          _resumeAfterBody(result);
        }
      } else {
        _settle(pact, 1, result);
      }
    }
    function _resumeAfterUpdate() {
      if (shouldContinue = test()) {
        if (shouldContinue.then) {
          shouldContinue.then(_resumeAfterTest).then(void 0, reject);
        } else {
          _resumeAfterTest(shouldContinue);
        }
      } else {
        _settle(pact, 1, result);
      }
    }
  }
  const MenuItem = _interopRequireDefault(__MenuItem);
  function _catch(body, recover) {
    try {
      var result = body();
    } catch (e) {
      return recover(e);
    }
    if (result && result.then) {
      return result.then(void 0, recover);
    }
    return result;
  }
  const NewsGroup = _interopRequireDefault(__NewsGroup);
  const NewsItem = _interopRequireDefault(__NewsItem);
  const NewsType = ___library["NewsType"];
  const DEFAULT_NEWS_URL = ___utils_Constants["DEFAULT_NEWS_URL"];
  const recycleId = ___utils_DataFormatUtils["recycleId"];
  const DeviceType = ___utils_Device["DeviceType"];
  const addFESRId = ___utils_FESRUtil["addFESRId"];
  const HttpHelper = _interopRequireDefault(__HttpHelper);
  const PersonalisationUtils = _interopRequireDefault(__PersonalisationUtils);
  const UshellPersonalizer = _interopRequireDefault(__UshellPersonalizer);
  const BASE_URL = "/sap/opu/odata4/ui2/insights_srv/srvd/ui2/",
    NEWS_FEED_READ_API = BASE_URL + "insights_read_srv/0001/" + "NEWS_FEED",
    NEWS_FEED_TRANSLATION_API = BASE_URL + "insights_read_srv/0001/" + "NewsFeedColumnTranslation",
    DEFAULT_FEED_COUNT = 7,
    fnImagePlaceholder = function (sPath, N) {
      return Array.from({
        length: N
      }, function (v, i) {
        return sPath + "/" + (i + 1) + ".jpg";
      });
    };
  const CUSTOM_NEWS_FEED = {
      TITLE: "LineOfBusiness",
      LINK: "WhatsNewDocument",
      VALIDITY: "ValidAsOf",
      PREPARATION_REQUIRED: "PreparationRequired",
      EXCLUDE_FIELDS: ["ChangeId", "LineNumber", "LineOfBusiness", "SolutionArea", "Title", "Description", "Type", "ValidAsOf", "WhatsNewDocument", "Link"],
      IMAGE_URL: "sap/cux/home/img/CustomNewsFeed/",
      FESR_STEP_NAME: "custNewsSlide-press",
      EMPTY_DATA_ERROR_CODE: "NODATA"
    },
    CUSTOM_IMAGES = {
      "Application Platform and Infrastructure": fnImagePlaceholder("ApplicationPlatformandInfrastructure", 3),
      "Asset Management": fnImagePlaceholder("AssetManagement", 3),
      "Cross Applications": fnImagePlaceholder("CrossApplications", 3),
      Finance: fnImagePlaceholder("Finance", 3),
      Manufacturing: fnImagePlaceholder("Manufacturing", 3),
      "R&D / Engineering": fnImagePlaceholder("RnDandEngineering", 3),
      Sales: fnImagePlaceholder("Sales", 3),
      "Sourcing and Procurement": fnImagePlaceholder("SourcingandProcurement", 3),
      "Supply Chain": fnImagePlaceholder("SupplyChain", 3),
      default: ["default.jpg"]
    };

  /**
   *
   * Panel class for managing and storing News.
   *
   * @extends sap.cux.home.BaseNewsPanel
   *
   * @author SAP SE
   * @version 0.0.1
   * @since 1.121
   *
   * @internal
   * @experimental Since 1.121
   * @public
   *
   * @alias sap.cux.home.NewsPanel
   */
  const NewsPanel = BaseNewsPanel.extend("sap.cux.home.NewsPanel", {
    metadata: {
      library: "sap.cux.home",
      properties: {
        /**
         * The URL of the news item.
         *
         * @public
         */
        url: {
          type: "string",
          group: "Misc",
          defaultValue: "",
          visibility: "public"
        },
        /**
         * Type of the news item.
         *
         * @public
         */
        type: {
          type: "sap.cux.home.NewsType",
          group: "Misc",
          visibility: "public",
          defaultValue: NewsType.RSS
        },
        /**
         * The key of custom news feed.
         *
         * @private
         */
        customFeedKey: {
          type: "string",
          group: "Misc",
          defaultValue: "",
          visibility: "public"
        },
        /**
         * The filename of custom news feed.
         *
         * @private
         */
        customFileName: {
          type: "string",
          group: "Misc",
          defaultValue: ""
        },
        /**
         * The flag for custom news feed is checked or not.
         *
         * @private
         */
        showCustom: {
          type: "boolean",
          group: "Misc",
          defaultValue: false
        },
        /**
         * The flag to determine rss feed will load or not.
         *
         * @private
         */
        newsAvailable: {
          type: "boolean",
          group: "Misc",
          defaultValue: true,
          visibility: "hidden"
        },
        /**
         * Supported file formats for news.
         *
         * @private
         */
        supportedFileFormats: {
          type: "FileFormat[]",
          group: "Misc",
          defaultValue: ["xlsx"],
          visibility: "hidden"
        }
      },
      aggregations: {
        /**
         * newsGroup aggregation for News
         */
        newsGroup: {
          type: "sap.cux.home.NewsGroup",
          singularName: "newsGroup",
          multiple: true,
          visibility: "hidden"
        }
      }
    },
    /**
     * Constructor for a new News Panel.
     *
     * @param {string} [id] ID for the new control, generated automatically if an ID is not provided
     * @param {object} [settings] Initial settings for the new control
     */
    constructor: function _constructor(id, settings) {
      BaseNewsPanel.prototype.constructor.call(this, id, settings);
      this._defaultNewsPromise = null;
      this.customNewsFeedCache = new Map();
    },
    /**
     * Init lifecycle method
     *
     * @private
     * @override
     */
    init: function _init() {
      BaseNewsPanel.prototype.init.call(this);
      this.oNewsTile = new SlideTile(this.getId() + "--idNewsSlide", {
        displayTime: 20000,
        width: "100%",
        height: "17rem",
        tiles: [new GenericTile(this.getId() + "--placeholder", {
          state: "Loading",
          mode: "ArticleMode",
          frameType: "Stretch"
        })]
      }).addStyleClass("newsTileMaxWidth sapUiSmallMarginTop");
      addFESRId(this.oNewsTile, "newsSlidePress");
      this.getNewsWrapper().addContent(this.oNewsTile);
      this.getNewsWrapper().addStyleClass("newsWrapper");
      this.setProperty("title", this._i18nBundle.getText("newsTitle"));
      this._eventBus = EventBus.getInstance();
      this.oManageMenuItem = new MenuItem(`${this.getId()}-manageNews`, {
        title: this._i18nBundle.getText("mngNews"),
        icon: "sap-icon://edit",
        press: this.handleEditNews.bind(this)
      });
      this.addAggregation("menuItems", this.oManageMenuItem);
      addFESRId(this.oManageMenuItem, "manageNews");
      let defaultNewsEnabled = this.isURLParamEnabled("default-News");
      // if Default News url param is enabled, show default news only
      if (defaultNewsEnabled) {
        this.setUrl(DEFAULT_NEWS_URL);
        this.setProperty("showCustom", false);
      }
    },
    /**
     *
     * @param paramName name of parameter
     * This method checks if the URL parameter is enabled.
     * @returns {boolean} True if the parameter is enabled, false otherwise.
     * @private
     */
    isURLParamEnabled: function _isURLParamEnabled(paramName) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(paramName)?.toUpperCase() === "TRUE";
    },
    /**
     * Retrieves news data asynchronously.
     * If the news model is not initialized, it initializes the XML model and loads news feed data.
     * @private
     * @returns {Promise} A promise that resolves when the news data is retrieved.
     */
    getData: function _getData() {
      try {
        const _this = this;
        function _temp7() {
          function _temp5() {
            _this.fireEvent("loaded");
            _this.adjustLayout();
          }
          const _temp4 = function () {
            if (sUrl && sUrl !== DEFAULT_NEWS_URL && !_this.getProperty("showCustom")) {
              //rss feed scenario
              return Promise.resolve(_this.initializeXmlModel(sUrl)).then(function (_this$initializeXmlMo) {
                _this.oNewsModel = _this$initializeXmlMo;
                _this.oNewsTile.setModel(_this.oNewsModel);
                _this.oManageMenuItem.setVisible(false);
              });
            } else {
              const _temp3 = function () {
                if (sUrl == DEFAULT_NEWS_URL && !_this.getProperty("showCustom")) {
                  // default news scenario
                  _this.bNewsLoad = _this.bNewsLoad || false;
                  _this.oManageMenuItem.setVisible(true);
                  void _this.setCustomNewsFeed("");
                } else {
                  const _temp2 = function () {
                    if (_this.getProperty("showCustom")) {
                      //custom news scenario
                      _this.bNewsLoad = _this.bNewsLoad || false;
                      _this.oManageMenuItem.setVisible(true);
                      const sCustomNewsFeedKey = _this.getCustomFeedKey();
                      const _temp = function () {
                        if (sCustomNewsFeedKey) {
                          return Promise.resolve(_this.setCustomNewsFeed(sCustomNewsFeedKey)).then(function () {});
                        } else {
                          _this.handleFeedError();
                        }
                      }();
                      if (_temp && _temp.then) return _temp.then(function () {});
                    } else {
                      _this.handleFeedError();
                    }
                  }();
                  if (_temp2 && _temp2.then) return _temp2.then(function () {});
                }
              }();
              if (_temp3 && _temp3.then) return _temp3.then(function () {});
            }
          }();
          return _temp4 && _temp4.then ? _temp4.then(_temp5) : _temp5(_temp4);
        }
        let sUrl = _this.getUrl();
        let defaultNewsEnabled = _this.isURLParamEnabled("default-News");
        _this.mandatoryNewsFeed = [];
        const _temp6 = function () {
          if (!_this.favNewsFeed) {
            return Promise.resolve(_this.setFavNewsFeed(defaultNewsEnabled)).then(function () {});
          }
        }();
        return Promise.resolve(_temp6 && _temp6.then ? _temp6.then(_temp7) : _temp7(_temp6));
      } catch (e) {
        return Promise.reject(e);
      }
    },
    /**
     * Retrieves the current news group data based on the provided id.
     *
     * @param id - The group ID
     * @returns The news group object that matches the extracted group ID, or `undefined`
     *          if no matching group is found.
     * @private
     */
    getCurrentNewsGroup: function _getCurrentNewsGroup(id) {
      let aValues = this._defaultNews.value;
      let aGroupId = id.split("-");
      // find the groupid from the sId
      let groupId = aGroupId?.[aGroupId.length - 1];
      let currentGroup = aValues.find(oGroup => oGroup.group_id === groupId);
      return currentGroup;
    },
    /**
     * Returns the custom news feed key property of NewsPanel
     * @returns {string} custom news feed key
     */
    getCustomFeedKey: function _getCustomFeedKey() {
      return this.getProperty("customFeedKey");
    },
    /**
     * Returns the Url property of NewsPanel
     * @returns {any}
     */
    getUrl: function _getUrl() {
      return this.getProperty("url");
    },
    /**
     * Initializes an XML model for managing news data.
     * This method returns a Promise that resolves to the initialized XML model.
     */
    /**
     * Initializes an XML model for managing news data.
     * This method returns a Promise that resolves to the initialized XML model.
     * @param {string} sUrl rss url to load the news feed
     * @returns {Promise<XMLModel>} XML Document containing the news feeds
     */
    initializeXmlModel: function _initializeXmlModel(sUrl) {
      try {
        const _this2 = this;
        const oParent = _this2.getParent();
        return Promise.resolve(new Promise(resolve => {
          const oNewsModel = new XMLModel(sUrl);
          oNewsModel.setDefaultBindingMode("OneWay");
          oNewsModel.attachRequestCompleted(oEvent => {
            void function () {
              try {
                if (!_this2.bNewsLoad) {
                  oParent?.panelLoadedFn("News", {
                    loaded: true,
                    count: DEFAULT_FEED_COUNT
                  });
                  _this2.bNewsLoad = true;
                }
                const oDocument = oEvent.getSource().getData();
                return Promise.resolve(_this2.loadNewsFeed(oDocument, 0)).then(function () {
                  _this2._eventBus.publish("KeyUserChanges", "newsFeedLoadFailed", {
                    showError: false,
                    date: new Date()
                  });
                  resolve(oNewsModel);
                });
              } catch (e) {
                return Promise.reject(e);
              }
            }();
          });
          oNewsModel.attachRequestFailed(() => {
            _this2.handleFeedError();
            if (!_this2.bNewsLoad) {
              oParent?.panelLoadedFn("News", {
                loaded: false,
                count: 0
              });
              _this2.bNewsLoad = true;
            }
            _this2._eventBus.publish("KeyUserChanges", "newsFeedLoadFailed", {
              showError: true,
              date: new Date()
            });
            resolve(oNewsModel);
          });
        }));
      } catch (e) {
        return Promise.reject(e);
      }
    },
    /**
     * Loads the news feed based on the provided document and number of feeds.
     * Determines the feed type (RSS, feed, custom) and binds the news tile accordingly.
     * @param {Document} oDocument - The document containing the news feed data.
     * @param {number} [noOfFeeds] - The number of feeds to be displayed. Defaults to a predefined value.
     */
    loadNewsFeed: function _loadNewsFeed(oDocument, noOfFeeds) {
      try {
        const _this3 = this;
        function _temp9() {
          if (!!oDocument?.querySelector("rss") && !!oDocument?.querySelector("item")) {
            oBindingInfo = {
              path: "/channel/item/",
              length: noOfFeeds || DEFAULT_FEED_COUNT
            };
          } else if (!!oDocument?.querySelector("atom") && !!oDocument?.querySelector("entry")) {
            oBindingInfo = {
              path: "/entry/",
              length: noOfFeeds || DEFAULT_FEED_COUNT
            };
          } else if ((!!oDocument?.querySelector("customFeed") || !!oDocument?.querySelector("defaultFeed")) && !!oDocument?.querySelector("item")) {
            _this3.destroyAggregation("newsItems");
            oBindingInfo = {
              path: "/item/",
              length: noOfFeeds || DEFAULT_FEED_COUNT
            };
          } else {
            _this3.handleFeedError();
            return;
          }
          _this3.bindNewsTile(_this3.oNewsTile, oBindingInfo);
        }
        let oBindingInfo;
        const _temp8 = function () {
          if (!oDocument?.querySelector("customFeed") && !oDocument?.querySelector("defaultFeed")) {
            return Promise.resolve(_this3.extractAllImageUrls(oDocument, noOfFeeds || DEFAULT_FEED_COUNT)).then(function () {});
          }
        }();
        return Promise.resolve(_temp8 && _temp8.then ? _temp8.then(_temp9) : _temp9(_temp8));
      } catch (e) {
        return Promise.reject(e);
      }
    },
    /**
     * Handles errors that occur during the loading of the news feed.
     * @returns {void}
     */
    handleFeedError: function _handleFeedError() {
      if (this.getProperty("showCustom") || this.getUrl() === DEFAULT_NEWS_URL) {
        this.generateErrorMessage().setVisible(true);
        this.oNewsTile.setVisible(false);
      } else {
        (this.getNewsWrapper()?.getParent()).setVisible(false);
        this.setProperty("newsAvailable", false);
        this.oManageMenuItem.setVisible(false);
      }
    },
    setURL: function _setURL(url) {
      try {
        const _this4 = this;
        _this4.setProperty("showCustom", false);
        _this4.setProperty("newsAvailable", true);
        _this4.generateErrorMessage().setVisible(false);
        (_this4.getNewsWrapper()?.getParent()).setVisible(true);
        _this4.oNewsTile.setVisible(true);
        _this4.setProperty("url", url);
        return Promise.resolve(_this4.getData()).then(function () {});
      } catch (e) {
        return Promise.reject(e);
      }
    },
    /**
     * Adjust layout based on the device type
     *
     * @private
     */
    adjustLayout: function _adjustLayout() {
      if (this.getDeviceType() === DeviceType.Mobile) {
        this.oNewsTile.setHeight("11rem");
        this.generateErrorMessage().setWidth("100%");
        this.oNewsTile.removeStyleClass("sapUiSmallMarginTop");
      } else {
        this.oNewsTile.setHeight("17rem");
        (this.getNewsWrapper()?.getParent()).setWidth("100%");
      }
    },
    /**
     * Binds the news tile with the provided binding information.
     * @param {sap.m.SlideTile} oSlideTile - The SlideTile control to be bound.
     * @param {IBindingInfo} oBindingInfo - The binding information containing the path and length of the aggregation.
     */
    bindNewsTile: function _bindNewsTile(oSlideTile, oBindingInfo) {
      if (oBindingInfo) {
        if (!oSlideTile.getBinding("tiles")) {
          oSlideTile.bindAggregation("tiles", {
            path: oBindingInfo.path,
            length: oBindingInfo.length,
            templateShareable: false,
            factory: (sId, oContext) => {
              const newsInfo = oContext.getObject();
              let oTile;
              if (newsInfo.getElementsByTagName("link").length > 0) {
                oTile = new NewsItem(recycleId(`${sId}-news-item`), {
                  url: newsInfo.getElementsByTagName("link")[0].textContent,
                  title: newsInfo.getElementsByTagName("title")[0].textContent,
                  subTitle: newsInfo.getElementsByTagName("description")[0].textContent,
                  imageUrl: newsInfo.getElementsByTagName("imageUrl")[0].textContent,
                  footer: this.formatDate(newsInfo.getElementsByTagName("pubDate")[0].textContent)
                });
              } else {
                let sGroupId = newsInfo.getElementsByTagName("id")?.[0]?.textContent ?? "";
                let newsId = sGroupId ? sId + "-newsgroup-" + sGroupId : sId + "-newsgroup";
                let subTitleNews = newsInfo.getElementsByTagName("subTitle")?.[0]?.textContent ?? "";
                oTile = new NewsGroup(recycleId(newsId), {
                  title: newsInfo.getElementsByTagName("title")[0].textContent,
                  subTitle: subTitleNews || this._i18nBundle.getText("newsFeedDescription"),
                  imageUrl: newsInfo.getElementsByTagName("imageUrl")?.[0]?.textContent,
                  footer: newsInfo.getElementsByTagName("footer")?.[0]?.textContent
                });
              }
              this.addAggregation("newsItems", oTile, true);
              return oTile.getTile();
            }
          });
        }
      }
    },
    /**
     * Extracts images for all the news tiles
     * @param {Document} oDocument - The document containing the news feed data.
     * @param {number} [noOfFeeds] - The number of feeds to be displayed. Defaults to a predefined value.
     */
    extractAllImageUrls: function _extractAllImageUrls(oDocument, noOfFeeds) {
      try {
        const _this5 = this;
        let i = 0;
        const _temp10 = _for(function () {
          return i < noOfFeeds;
        }, function () {
          return i++;
        }, function () {
          const oItemElement = oDocument?.getElementsByTagName("item")[i];
          return Promise.resolve(_this5.extractImage(oItemElement.getElementsByTagName("link")[0].textContent)).then(function (sUrl) {
            const oImageUrl = oDocument.createElement("imageUrl");
            oImageUrl.textContent = sUrl;
            oItemElement.appendChild(oImageUrl);
          });
        });
        return Promise.resolve(_temp10 && _temp10.then ? _temp10.then(function () {}) : void 0);
      } catch (e) {
        return Promise.reject(e);
      }
    },
    /**
     * Converts the given date to a relative date-time format.
     * @param {string} timeStamp - The timestamp to be converted.
     * @returns {string} The date in relative date-time format.
     */
    formatDate: function _formatDate(timeStamp) {
      const relativeDateFormatter = DateFormat.getDateTimeInstance({
        style: "medium",
        relative: true,
        relativeStyle: "short"
      });
      return relativeDateFormatter.format(new Date(timeStamp));
    },
    /**
     * Returns the favourite news feed for the custom news
     * @returns {IFavNewsFeed}
     * @private
     */
    getFavNewsFeed: function _getFavNewsFeed() {
      return this.favNewsFeed;
    },
    /**
     * Extracts the image URL from the provided HREF link or link.
     * @param {string} sHrefLink - The HREF link containing the image URL.
     * @returns {Promise} A promise that resolves to the extracted image URL.
     */
    extractImage: function _extractImage(sHrefLink) {
      const fnLoadPlaceholderImage = () => {
        const sPrefix = sap.ui.require.toUrl("sap/cux/home/utils");
        this.image = this.image ? this.image + 1 : 1;
        this.image = this.image < 9 ? this.image : 1;
        return `${sPrefix}/imgNews/${this.image}.jpg`;
      };
      return fetch(sHrefLink).then(res => res.text()).then(sHTML => {
        const aMatches = sHTML.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i);
        return Array.isArray(aMatches) && aMatches[1] ? aMatches[1] : fnLoadPlaceholderImage();
      }).catch(fnLoadPlaceholderImage);
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
     * Sets the favorite news feed for the user by retrieving personalization data.
     *
     * This method asynchronously fetches the user's personalization data and updates
     * the `favNewsFeed` property with the favorite news feed information.
     *
     * @returns {Promise<void>} A promise that resolves when the favorite news feed is set.
     * @private
     */
    setFavNewsFeed: function _setFavNewsFeed(defaultFeed) {
      try {
        const _this6 = this;
        return Promise.resolve(_this6._getUserPersonalization()).then(function (personalizer) {
          return Promise.resolve(personalizer?.read()).then(function (persData) {
            _this6.favNewsFeed = defaultFeed ? persData?.defaultNewsFeed : persData?.favNewsFeed;
          });
        });
      } catch (e) {
        return Promise.reject(e);
      }
    },
    /**
     * This method retrieves the count and feeds of the custom news feed asynchronously.
     * If the count is not zero, it loads the custom news feed data and returns the feeds.
     * @param {string} sFeedId - The ID of the custom news feed to set.
     * @returns {Promise} A promise that resolves to an array of news feeds.
     * @private
     */
    setCustomNewsFeed: function _setCustomNewsFeed(sFeedId) {
      try {
        const _this7 = this;
        return Promise.resolve(_catch(function () {
          _this7.oNewsTile.setVisible(true);
          _this7.generateErrorMessage().setVisible(false);
          return Promise.resolve(_this7.setFavNewsFeed(!sFeedId)).then(function () {
            function _temp12() {
              if (aFeeds.length === 0) {
                throw new Error("Error: No news feed available");
              }
              //filer selected feeds from all news feed
              if (_this7.favNewsFeed?.items?.length) {
                aFeeds = aFeeds.filter(oNewsFeed => {
                  //return this.favNewsFeed?.items.includes(oNewsFeed.title) || this.mandatoryNewsFeed.includes(oNewsFeed.title);
                  return _this7.favNewsFeed?.items.includes(oNewsFeed.title);
                });
              } else if (_this7.favNewsFeed?.items?.length === 0) {
                _this7.getParent()?.panelLoadedFn("News", {
                  loaded: true,
                  count: 0
                });
                throw new Error("Error: No fav news feed available");
              }
              return Promise.resolve(_this7.loadCustomNewsFeed(aFeeds, sFeedId ? "customFeed" : "defaultFeed")).then(function () {});
            }
            const customFileName = _this7.getProperty("customFileName");
            const showAllPrepRequired = _this7.isCSVFileFormat(customFileName) ? false : _this7.favNewsFeed?.showAllPreparationRequired ?? true;
            if (_this7.isCSVFileFormat(customFileName)) {
              CUSTOM_NEWS_FEED.EXCLUDE_FIELDS.push("PreparationRequired");
            }
            let aFeeds;
            const _temp11 = function () {
              if (sFeedId) {
                return Promise.resolve(_this7.getCustomNewsFeed(sFeedId, showAllPrepRequired)).then(function (_this7$getCustomNewsF) {
                  aFeeds = _this7$getCustomNewsF;
                });
              } else {
                return Promise.resolve(_this7.getCustomNewsFeed("", true)).then(function (_this7$getCustomNewsF2) {
                  aFeeds = _this7$getCustomNewsF2;
                });
              }
            }();
            return _temp11 && _temp11.then ? _temp11.then(_temp12) : _temp12(_temp11);
          });
        }, function (err) {
          Log.error(err);
          _this7.handleFeedError();
        }));
      } catch (e) {
        return Promise.reject(e);
      }
    },
    /**
     * Filters the provided list of news groups to include only those that are marked as mandatory.
     *
     * A news group is considered mandatory if:
     * - Its `mandatory_text` property (at the top level) is set to "TRUE" (case-insensitive).
     * - Any of its associated articles (in the `_group_to_article` array) has a `mandatory_text` property set to "TRUE" (case-insensitive).
     *
     * If any article within a group is marked as mandatory, the group's `mandatory_text` property
     * is updated to "TRUE".
     *
     * @param newsGroups - An array of news groups to filter. Each group is expected to implement the `ICustomNewsFeed` interface.
     * @returns An array of news groups that are marked as mandatory.
     * @private
     */
    filterMandatoryNews: function _filterMandatoryNews(newsGroups) {
      return newsGroups.filter(group => {
        // Check top-level mandatory_text
        const isTopLevelMandatory = group.mandatory_text?.toUpperCase() === "TRUE";

        // Check if any inner _group_to_article has mandatory_text true
        const isAnyArticleMandatory = group._group_to_article?.some(function (article) {
          //make mandatory_test true at group level if any article is mandatory
          if (article.mandatory_text?.toUpperCase() === "TRUE") {
            group.mandatory_text = "TRUE";
            return true;
          }
        });
        return isTopLevelMandatory || isAnyArticleMandatory;
      });
    },
    /**
     * Retrieves the default news feed details from the given OData response.
     *
     * @param newsResponse - The OData response containing the news feed data.
     * @param showAllPreparationRequired - A boolean flag indicating whether to filter news items that require preparation.
     * @returns An array of default news feed items.
     * @private
     */
    getDefaultNewsFeedDetails: function _getDefaultNewsFeedDetails(newsResponse) {
      let aNews = JSON.parse(JSON.stringify(newsResponse.value || []));
      const aDefaultNews = [];
      const oDefaultFeedDict = {};
      this.mandatoryNewsFeed = [];
      if (aNews?.length > 0) {
        this.mandatoryNewsFeed = this.filterMandatoryNews(aNews).map(oFeed => oFeed.title);
        for (const oFeed of aNews) {
          const title = oFeed.title;
          let subTitle = "";
          if (!oDefaultFeedDict[title]) {
            subTitle = oFeed.subTitle || oFeed.description || "";
            aDefaultNews.push({
              title: title,
              footer: oFeed.footer_text,
              imageUrl: this.getDefaultFeedImage(oFeed),
              id: oFeed.group_id,
              subTitle: subTitle || ""
            });
            oDefaultFeedDict[title] = title;
          }
        }
      }
      return aDefaultNews;
    },
    /**
     * Returns the mandatory news feed details
     * If the mandatory news feed is not set, it returns an empty array.
     *
     * @returns {ICustomNewsFeed[]} The mandatory news feed details.
     * @private
     */
    getMandatoryDefaultNewsFeed: function _getMandatoryDefaultNewsFeed() {
      return this.mandatoryNewsFeed || [];
    },
    /**
     * Retrieves the default news response, either from cache or by fetching it.
     * @returns {Promise<ODataResponse>} A promise that resolves to the default news data
     * @private
     */
    getDefaultNewsResponse: function _getDefaultNewsResponse() {
      // Return cached data if available
      if (this._defaultNews) {
        return Promise.resolve(this._defaultNews);
      }
      if (!this._defaultNewsPromise) {
        this._defaultNewsPromise = this.fetchDefaultNews();
      }
      return this._defaultNewsPromise;
    },
    /**
     * Fetches the default news data from the server.
     * @returns {Promise<ODataResponse>} A promise that resolves to the fetched news data
     * @throws {Error} If the network request fails or returns a non-OK status
     * @private
     */
    fetchDefaultNews: function _fetchDefaultNews() {
      try {
        const _this8 = this;
        return Promise.resolve(_catch(function () {
          return Promise.resolve(fetch(DEFAULT_NEWS_URL)).then(function (response) {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return Promise.resolve(response.json()).then(function (_response$json) {
              _this8._defaultNews = _response$json;
              return _this8._defaultNews;
            });
          });
        }, function (error) {
          _this8._defaultNewsPromise = null;
          Log.error(error);
          throw error;
        }));
      } catch (e) {
        return Promise.reject(e);
      }
    },
    /**
     * Retrieves a custom news feed based on the provided feed ID.
     * If no feed ID is provided, it returns the default news feed.
     *
     * @param {string} sFeedId - The ID of the custom news feed to retrieve. If not provided, the default news feed is returned.
     * @param {boolean} showAllPreparationRequired - A flag indicating whether to show all preparation required.
     * @returns {Promise<ICustomNewsFeed[]>} A promise that resolves to an array of custom news feed items.
     * @private
     */
    getCustomNewsFeed: function _getCustomNewsFeed(sFeedId, showAllPreparationRequired) {
      try {
        const _this9 = this;
        if (!sFeedId) {
          return Promise.resolve(_this9.getDefaultNewsResponse()).then(function () {
            let aDefaultgroups = _this9.getDefaultNewsFeedDetails(_this9._defaultNews);
            return aDefaultgroups;
          });
        } else {
          return Promise.resolve(_this9.getCustomFeedData(sFeedId, showAllPreparationRequired));
        }
      } catch (e) {
        return Promise.reject(e);
      }
    },
    /**
     * Retrieves custom news feed items identified by the provided feed ID and settings.
     * It processes the response data and returns an array of custom news feed items.
     * @param {string} sFeedId - The ID of the custom news feed.
     * @param {boolean} showAllPreparationRequired - Indicates whether to show all preparation required.
     * @returns {Promise} A Promise that resolves to an array of custom news feed items.
     * @private
     */
    getCustomFeedData: function _getCustomFeedData(sFeedId, showAllPreparationRequired) {
      try {
        const _this10 = this;
        return Promise.resolve(_catch(function () {
          const newsDetailUrl = _this10.getNewsFeedDetailsUrl({
            changeId: sFeedId,
            showAllPreparationRequired
          });
          if (!_this10.customNewsFeedCache.has(newsDetailUrl)) {
            _this10.customNewsFeedCache.set(newsDetailUrl, _this10.getAuthNewsFeed(newsDetailUrl));
          }
          return Promise.resolve(_this10.customNewsFeedCache.get(newsDetailUrl)).then(function (_this10$customNewsFee) {
            const authorizedNewsFeeds = _this10$customNewsFee;
            const oFeedDict = {};
            const aFeeds = [];
            if (authorizedNewsFeeds?.length > 0) {
              authorizedNewsFeeds.forEach(oFeed => {
                const title = oFeed[CUSTOM_NEWS_FEED.TITLE];
                if (!oFeedDict[title.value]) {
                  aFeeds.push({
                    title: title.value,
                    footer: oFeed[CUSTOM_NEWS_FEED.VALIDITY].value,
                    imageUrl: _this10.getCustomFeedImage(title.value)
                  });
                  oFeedDict[title.value] = title.value;
                }
              });
            }
            return aFeeds; // group details
          });
        }, function (err) {
          Log.error(err);
          throw new Error(err);
        }));
      } catch (e) {
        return Promise.reject(e);
      }
    },
    /**
     * Generates the URL for retrieving news feed details based on the provided news object.
     * The generated URL limits the number of results to 999.
     * @param {INewsItem} oNews - The news object containing properties such as changeId, title, and showAllPreparationRequired.
     * @returns {string} The URL for retrieving news feed details.
     */
    getNewsFeedDetailsUrl: function _getNewsFeedDetailsUrl(oNews) {
      let sUrl = NEWS_FEED_READ_API + "?$filter=ChangeId eq " + "'" + oNews.changeId + "'";
      const customFileName = this.getProperty("customFileName");
      if (!this.isCSVFileFormat(customFileName) && oNews.showAllPreparationRequired) {
        sUrl = sUrl + " and PreparationRequired eq true";
      }
      return sUrl + "&$top=999";
    },
    /**
     * Retrieves the news feed from the specified URL after applying authorization filtering based on the available apps.
     * If the news feed contains impacted artifacts, it checks if the current user has access to any of the impacted apps.
     * If the user has access to at least one impacted app, the news feed is included in the returned array.
     * @param {string} sNewsUrl - The URL of the news feed.
     * @returns {Array} The filtered array of news feed items authorized for the user.
     */
    getAuthNewsFeed: function _getAuthNewsFeed(sNewsUrl, newsTitle) {
      try {
        const _this11 = this;
        return Promise.resolve(_catch(function () {
          return Promise.resolve(Promise.all([_this11.getAllAvailableApps(), _this11.getNewsFeedDetails(sNewsUrl, newsTitle)])).then(function (_ref) {
            let [aAvailableApps, aNewsFeed] = _ref;
            return aAvailableApps.length === 0 ? aNewsFeed : _this11.arrangeNewsFeeds(aNewsFeed, aAvailableApps);
          });
        }, function (err) {
          Log.error(err);
        }));
      } catch (e) {
        return Promise.reject(e);
      }
    },
    /**
     * If the news feed contains impacted artifacts, it checks if the current user has access to any of the impacted apps.
     * If the user has access to at least one impacted app, the news feed is included in the returned array.
     * @param {ICustomNewsFeed[]} aNewsFeed - array of news feed
     * @param {IAvailableApp[]} aAvailableApps - array of all availabel apps
     * @returns {Array} The filtered array of news feed items authorized for the user.
     */
    arrangeNewsFeeds: function _arrangeNewsFeeds(aNewsFeed, aAvailableApps) {
      const aAuthNewsFeed = [];
      aNewsFeed.forEach(oNewsFeed => {
        if (oNewsFeed.Category.value !== "App" || !oNewsFeed.ImpactedArtifacts.value) {
          aAuthNewsFeed.push(oNewsFeed);
        } else {
          const aImpactedArtifacts = oNewsFeed.ImpactedArtifacts.value.split("\n");
          for (let impactedArtifact of aImpactedArtifacts) {
            const oImpactedArtifact = impactedArtifact;
            if (oImpactedArtifact && this.isAuthFeed(aAvailableApps, impactedArtifact)) {
              aAuthNewsFeed.push(oNewsFeed);
              break;
            }
          }
        }
      });
      return aAuthNewsFeed;
    },
    /**
     * takes all available apps list and the impacted atifact from the news and returns if it's valid
     * @param {IAvailableApp[]} aAvailableApps - Array of all available apps
     * @param {string} oImpactedArtifact - impacted artifact form the news
     * @returns {boolean} checks if the news is authenticated with the available apps list
     */
    isAuthFeed: function _isAuthFeed(aAvailableApps, oImpactedArtifact) {
      const fioriIdSplitter = "|";
      if (oImpactedArtifact.includes(fioriIdSplitter)) {
        const aTokens = oImpactedArtifact.split(fioriIdSplitter);
        const sFioriId = (aTokens[aTokens.length - 1] || "").trim();
        if (sFioriId) {
          const index = aAvailableApps.findIndex(oApp => {
            return sFioriId === oApp?.signature?.parameters["sap-fiori-id"]?.defaultValue?.value;
          });
          return index > -1;
        }
      }
      return true;
    },
    /**
     * Retrieves all available apps from the ClientSideTargetResolution service for authorization filtering.
     * @returns {Array} An array of available apps.
     */
    getAllAvailableApps: function _getAllAvailableApps() {
      try {
        return Promise.resolve(_catch(function () {
          return Promise.resolve(Container.getServiceAsync("ClientSideTargetResolution")).then(function (oService) {
            return oService?._oAdapter._aInbounds || [];
          });
        }, function (err) {
          if (err instanceof Error) {
            Log.error(err.message);
          }
          return [];
        }));
      } catch (e) {
        return Promise.reject(e);
      }
    },
    /**
     * Retrieves the news feed details from the specified URL, including translation and formatting of field labels.
     * @param {string} sUrl - The URL of the news feed details.
     * @returns {Array} The array of news feed items with translated and formatted field labels.
     */
    getNewsFeedDetails: function _getNewsFeedDetails(sUrl, newsTitle) {
      try {
        let _exit = false;
        const _this12 = this;
        function _temp14(_result3) {
          if (_exit) return _result3;
          const fnFormattedLabel = sLabel => sLabel.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
          return Promise.resolve(Promise.all([HttpHelper.GetJSON(sUrl), _this12.getTranslatedText(_this12.getCustomFeedKey())])).then(function (_ref2) {
            let [newsResponse, translationResponse] = _ref2;
            let aNews = JSON.parse(JSON.stringify(newsResponse.value || []));
            const aTranslation = JSON.parse(JSON.stringify(translationResponse.value || []));
            aNews = _this12.filterNewsOnTitle(aNews, newsTitle);
            return aNews.map(oNews => {
              const aFields = Object.keys(oNews);
              const aExpandFields = [];
              aFields.forEach(oField => {
                const oTranslatedField = aTranslation.find(oTranslation => oTranslation?.ColumnName?.toUpperCase() === oField.toUpperCase());
                const oTranslatedFieldName = oTranslatedField?.TranslatedName || fnFormattedLabel(oField);
                oNews[oField] = {
                  label: oTranslatedFieldName,
                  value: oNews[oField]
                };
                if (!CUSTOM_NEWS_FEED.EXCLUDE_FIELDS.includes(oField)) {
                  aExpandFields.push(oNews[oField]);
                }
              });
              oNews.Link = {
                label: _this12._i18nBundle.getText("readMoreLink"),
                value: oNews[CUSTOM_NEWS_FEED.LINK],
                text: "Link"
              };
              oNews.expanded = aNews.length === 1;
              oNews.expandFields = aExpandFields;
              return oNews;
            });
          });
        }
        const _temp13 = function () {
          if (_this12.customNewsFeedCache.has(sUrl)) {
            return Promise.resolve(_this12.customNewsFeedCache.get(sUrl)).then(function (newsFeedDetails) {
              const _this12$filterNewsOnT = _this12.filterNewsOnTitle(newsFeedDetails, newsTitle);
              _exit = true;
              return _this12$filterNewsOnT;
            });
          }
        }();
        return Promise.resolve(_temp13 && _temp13.then ? _temp13.then(_temp14) : _temp14(_temp13));
      } catch (e) {
        return Promise.reject(e);
      }
    },
    /**
     * Filters the news feed data based on the LOB title for the news detail dialog
     *
     * @private
     * @param {ICustomNewsFeed[]} aNews complete news feed data
     * @param {?string} [newsTitle] title of the line of business to be filtered on
     * @returns {ICustomNewsFeed[]} filtered news feed for provided LOB title
     */
    filterNewsOnTitle: function _filterNewsOnTitle(aNews, newsTitle) {
      if (newsTitle) {
        return aNews.filter(newsDetail => {
          return newsDetail.LineOfBusiness.value === newsTitle;
        });
      }
      return aNews;
    },
    /**
     * Retrieves translated text for news feed fields based on the specified feed ID.
     * @param {string} sFeedId - The ID of the custom news feed
     * @returns {Promise} A promise resolving to the translated text for news feed fields.
     */
    getTranslatedText: function _getTranslatedText(sFeedId) {
      try {
        const sUrl = NEWS_FEED_TRANSLATION_API + "?$filter=Changeid eq '" + sFeedId + "'";
        if (!this.customNewsFeedCache.has(sUrl)) {
          this.customNewsFeedCache.set(sUrl, HttpHelper.GetJSON(sUrl));
        }
        return this.customNewsFeedCache.get(sUrl);
      } catch (err) {
        if (err instanceof Error) {
          Log.error(err.message);
        }
        return [];
      }
    },
    /**
     * Loads custom news feed into the news panel after parsing JSON feed data to XML format.
     * @param {Array} feeds - The array of custom news feed items.
     */
    loadCustomNewsFeed: function _loadCustomNewsFeed(feeds, feedType) {
      try {
        const _this13 = this;
        const oXMLResponse = _this13.parseJsonToXml(JSON.parse(JSON.stringify(feeds)), feedType);
        const oParent = _this13.getParent();
        if (!_this13.oNewsModel) {
          _this13.oNewsModel = new XMLModel(oXMLResponse);
          if (!_this13.bNewsLoad) {
            oParent?.panelLoadedFn("News", {
              loaded: true,
              count: DEFAULT_FEED_COUNT
            });
            _this13.bNewsLoad = true;
          }
          _this13.oNewsTile.setModel(_this13.oNewsModel);
        } else {
          _this13.oNewsTile.unbindAggregation("tiles", false); // Unbind the bound aggregation
          _this13.oNewsTile.destroyAggregation("tiles"); // Removes old tiles
          _this13.oNewsModel.setData(oXMLResponse);
        }
        return Promise.resolve(_this13.loadNewsFeed(oXMLResponse, feeds.length)).then(function () {});
      } catch (e) {
        return Promise.reject(e);
      }
    },
    /**
     * Parses JSON data into XML format.
     * @param {JSON[]} json - The JSON data to be parsed into XML.
     * @returns {XMLDocument} The XML document representing the parsed JSON data.
     */
    parseJsonToXml: function _parseJsonToXml(json, feedType) {
      const _transformJsonForXml = aData => aData.map(data => ({
        item: data
      }));
      const _jsonToXml = json => {
        let xml = "";
        let key;
        for (key in json) {
          const value = json[key];
          if (value) {
            if (typeof value === "object") {
              xml += `<${key}>${_jsonToXml(value)}</${key}>`;
            } else {
              xml += `<${key}>${value}</${key}>`;
            }
          }
        }
        return xml.replace(/<\/?\d+>/g, "");
      };
      const transformedJson = JSON.parse(JSON.stringify(_transformJsonForXml(json)));
      let xml = "<?xml version='1.0' encoding='UTF-8'?>";
      const rootToken = feedType;
      xml += `<${rootToken}>`;
      xml += _jsonToXml(transformedJson);
      xml += `</${rootToken}>`;
      xml = xml.replaceAll("&", "&amp;");
      const parser = new DOMParser();
      return parser.parseFromString(xml, "text/xml");
    },
    /**
     * Randomly selects an image from the available images for the feed item.
     * @param {string} sFileName - The file name of the custom news feed item.
     * @returns {string} The URL of the image for the feed item.
     * @private
     */
    getCustomFeedImage: function _getCustomFeedImage(sFileName) {
      const sFileBasePath = sap.ui.require.toUrl(CUSTOM_NEWS_FEED.IMAGE_URL);
      let sFilePath = sFileBasePath + CUSTOM_IMAGES.default[0];
      const files = CUSTOM_IMAGES[sFileName] || [];
      let randomIndex = 0;
      if (files.length > 0) {
        const randomArray = new window.Uint32Array(1);
        window.crypto.getRandomValues(randomArray);
        randomIndex = randomArray[0] % 3;
        sFilePath = sFileBasePath + files[randomIndex];
      }
      return sFilePath;
    },
    /**
     * Retrieves the default feed image for a given news feed.
     *
     * @param {ICustomNewsFeed} oFeed - The custom news feed object.
     * @returns {string} The base64 encoded image string with the appropriate MIME type, or an empty string if no valid image is found.
     * @private
     */
    getDefaultFeedImage: function _getDefaultFeedImage(oFeed) {
      const imgId = oFeed?.bg_image_id;
      const groupImg = oFeed?._group_to_image;
      if (!groupImg || groupImg.image_id !== imgId) {
        return "";
      }
      let mimeType = groupImg.mime_type;
      const groupBgImg = groupImg.bg_image;
      if (!groupBgImg) {
        return "";
      }
      if (mimeType === "application/octet-stream") {
        mimeType = "image/jpeg";
      }
      if (!this.isValidBase64(groupBgImg)) {
        const base64Data = this.base64UrlToBase64(groupBgImg);
        return `data:${mimeType};base64,${base64Data}`;
      }
      return `data:${mimeType};base64,${groupBgImg}`;
    },
    /**
     * Converts a base64 URL string to a standard base64 string.
     *
     * @param {string} base64Url - The base64 URL string to convert.
     * @returns {string} The converted base64 string.
     * @private
     */
    base64UrlToBase64: function _base64UrlToBase(base64Url) {
      let base64 = base64Url?.replace(/_/g, "/").replace(/-/g, "+");

      // Add padding if missing (Base64 should be a multiple of 4)
      while (base64.length % 4 !== 0) {
        base64 += "=";
      }
      return base64;
    },
    /**
     * Checks if a string is a valid base64 encoded string.
     * @param input The string to validate
     * @returns boolean indicating if the string is valid base64
     * @private
     */
    isValidBase64: function _isValidBase(input) {
      // Check if the string exists and isn't empty
      if (!input || input.length === 0) {
        return false;
      }

      // Canonical base64 strings use these characters
      // A-Z, a-z, 0-9, +, /, and = for padding
      const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;

      // Check if the string matches the base64 character set
      if (!base64Regex.test(input)) {
        return false;
      }

      // Check if the length is valid
      // Base64 strings have a length that is a multiple of 4
      if (input.length % 4 !== 0) {
        return false;
      }

      // Check padding rules
      if (input.includes("=")) {
        // If there is padding, it must be at the end
        const paddingIndex = input.indexOf("=");
        const lastPaddingIndex = input.lastIndexOf("=");
        // Padding should only occur at the end
        if (paddingIndex !== input.length - (input.length - paddingIndex)) {
          return false;
        }

        // Can only have 1 or 2 padding characters
        if (input.length - paddingIndex > 2) {
          return false;
        }

        // Make sure all padding is at the end
        if (paddingIndex !== lastPaddingIndex && lastPaddingIndex !== paddingIndex + 1) {
          return false;
        }
      }
      return true;
    },
    _getUserPersonalization: function _getUserPersonalization() {
      const persContainerId = PersonalisationUtils.getPersContainerId(this);
      const ownerComponent = PersonalisationUtils.getOwnerComponent(this);
      return UshellPersonalizer.getInstance(persContainerId, ownerComponent);
    }
  });
  return NewsPanel;
});
//# sourceMappingURL=NewsPanel-dbg-dbg.js.map
