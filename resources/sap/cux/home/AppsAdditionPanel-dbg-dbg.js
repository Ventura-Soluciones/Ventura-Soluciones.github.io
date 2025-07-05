/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *  * (c) Copyright 2009-2025 SAP SE. All rights reserved
 */
sap.ui.define(["sap/base/Log", "sap/m/Button", "sap/m/CustomListItem", "sap/m/ExpandableText", "sap/m/FlexBox", "sap/m/GenericTile", "sap/m/HBox", "sap/m/Label", "sap/m/library", "sap/m/MessageToast", "sap/m/Text", "sap/m/VBox", "sap/ui/core/Fragment", "sap/ui/model/json/JSONModel", "sap/ui/model/resource/ResourceModel", "sap/ushell/Container", "./AppsContainer", "./BaseSettingsPanel", "./FavAppPanel", "./utils/AppManager", "./utils/Constants"], function (Log, Button, CustomListItem, ExpandableText, FlexBox, GenericTile, HBox, Label, sap_m_library, MessageToast, Text, VBox, Fragment, JSONModel, ResourceModel, Container, __AppsContainer, __BaseSettingsPanel, __FavAppPanel, __AppManager, ___utils_Constants) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
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
  const ButtonType = sap_m_library["ButtonType"];
  function _finallyRethrows(body, finalizer) {
    try {
      var result = body();
    } catch (e) {
      return finalizer(true, e);
    }
    if (result && result.then) {
      return result.then(finalizer.bind(null, false), finalizer.bind(null, true));
    }
    return finalizer(false, result);
  }
  const AppsContainer = _interopRequireDefault(__AppsContainer);
  const _iteratorSymbol = /*#__PURE__*/typeof Symbol !== "undefined" ? Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator")) : "@@iterator";
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
  function _forTo(array, body, check) {
    var i = -1,
      pact,
      reject;
    function _cycle(result) {
      try {
        while (++i < array.length && (!check || !check())) {
          result = body(i);
          if (result && result.then) {
            if (_isSettledPact(result)) {
              result = result.v;
            } else {
              result.then(_cycle, reject || (reject = _settle.bind(null, pact = new _Pact(), 2)));
              return;
            }
          }
        }
        if (pact) {
          _settle(pact, 1, result);
        } else {
          pact = result;
        }
      } catch (e) {
        _settle(pact || (pact = new _Pact()), 2, e);
      }
    }
    _cycle();
    return pact;
  }
  const BaseSettingsPanel = _interopRequireDefault(__BaseSettingsPanel);
  function _forOf(target, body, check) {
    if (typeof target[_iteratorSymbol] === "function") {
      var iterator = target[_iteratorSymbol](),
        step,
        pact,
        reject;
      function _cycle(result) {
        try {
          while (!(step = iterator.next()).done && (!check || !check())) {
            result = body(step.value);
            if (result && result.then) {
              if (_isSettledPact(result)) {
                result = result.v;
              } else {
                result.then(_cycle, reject || (reject = _settle.bind(null, pact = new _Pact(), 2)));
                return;
              }
            }
          }
          if (pact) {
            _settle(pact, 1, result);
          } else {
            pact = result;
          }
        } catch (e) {
          _settle(pact || (pact = new _Pact()), 2, e);
        }
      }
      _cycle();
      if (iterator.return) {
        var _fixup = function (value) {
          try {
            if (!step.done) {
              iterator.return();
            }
          } catch (e) {}
          return value;
        };
        if (pact && pact.then) {
          return pact.then(_fixup, function (e) {
            throw _fixup(e);
          });
        }
        _fixup();
      }
      return pact;
    }
    // No support for Symbol.iterator
    if (!("length" in target)) {
      throw new TypeError("Object is not iterable");
    }
    // Handle live collections properly
    var values = [];
    for (var i = 0; i < target.length; i++) {
      values.push(target[i]);
    }
    return _forTo(values, function (i) {
      return body(values[i]);
    }, check);
  }
  const FavAppPanel = _interopRequireDefault(__FavAppPanel);
  const AppManager = _interopRequireDefault(__AppManager);
  const AI_APP_FINDER_API = ___utils_Constants["AI_APP_FINDER_API"];
  const AI_APP_FINDER_BASE_URL = ___utils_Constants["AI_APP_FINDER_BASE_URL"];
  const CONTENT_ADDITION_PANEL_TYPES = ___utils_Constants["CONTENT_ADDITION_PANEL_TYPES"];
  const FEATURE_TOGGLES = ___utils_Constants["FEATURE_TOGGLES"];
  const Constants = {
    DeprecatedInfoText: "deprecated",
    MinQueryLength: 5,
    MaxDescriptionLength: 400
  };
  var SearchStatus = /*#__PURE__*/function (SearchStatus) {
    SearchStatus["Idle"] = "idle";
    SearchStatus["Searching"] = "searching";
    SearchStatus["Complete"] = "complete";
    return SearchStatus;
  }(SearchStatus || {});
  var ErrorType = /*#__PURE__*/function (ErrorType) {
    ErrorType["NoResultsFound"] = "noResultsFound";
    ErrorType["ServiceError"] = "serviceError";
    ErrorType["ValidationError"] = "validationError";
    ErrorType["DefaultError"] = "defaultError";
    return ErrorType;
  }(ErrorType || {});
  var TileType = /*#__PURE__*/function (TileType) {
    TileType["Static"] = "STATIC";
    return TileType;
  }(TileType || {});
  /**
   *
   * Class for Apps Addition Panel in MyHome.
   *
   * @extends BaseSettingsPanel
   *
   * @author SAP SE
   * @version 0.0.1
   * @since 1.136
   *
   * @internal
   * @experimental Since 1.136
   * @private
   *
   * @alias sap.cux.home.AppsAdditionPanel
   */
  const AppsAdditionPanel = BaseSettingsPanel.extend("sap.cux.home.AppsAdditionPanel", {
    constructor: function constructor() {
      BaseSettingsPanel.prototype.constructor.apply(this, arguments);
      this.appManagerInstance = AppManager.getInstance();
    },
    /**
     * Init lifecycle method
     *
     * @public
     * @override
     */
    init: function _init() {
      BaseSettingsPanel.prototype.init.call(this);
      this.userSelectedApps = new Set();

      //setup panel
      this.setProperty("key", CONTENT_ADDITION_PANEL_TYPES.AI_APP_FINDER);
      this.setProperty("title", this._i18nBundle.getText("addAppsAndTile"));

      //setup actions
      this._setupActions();

      //setup content
      void this._setupContent();

      //setup events
      this.attachEvent("onDialogClose", this.resetPanel.bind(this));
    },
    /**
     * Sets up the actions for the Apps Addition Panel.
     *
     * @private
     */
    _setupActions: function _setupActions() {
      this.addAppsButton = new Button(`${this.getId()}-add-app-btn`, {
        text: this._i18nBundle.getText("addFromInsightsDialogBtn"),
        type: ButtonType.Emphasized,
        press: () => {
          void this.onPressAddApps();
        }
      });
      this.addAppsButton.bindProperty("enabled", {
        parts: ["/hasError", "/searchStatus", "/userSelectedApps"],
        formatter: (hasError, searchStatus, userSelectedApps) => {
          return !hasError && searchStatus === SearchStatus.Complete && userSelectedApps.length > 0;
        }
      });
      this.addActionButton(this.addAppsButton);
    },
    /**
     * Sets up the content for the Apps Addition Panel.
     *
     * @private
     * @async
     */
    _setupContent: function _setupContent() {
      try {
        const _this = this;
        return Promise.resolve(Container.getServiceAsync("VisualizationInstantiation")).then(function (_Container$getService) {
          _this.vizInstantiationService = _Container$getService;
          //load ui fragment
          return Promise.resolve(Fragment.load({
            id: `${_this.getId()}-content`,
            name: "sap.cux.home.utils.fragment.appsAdditionContent",
            controller: _this
          })).then(function (_Fragment$load) {
            const panelContent = _Fragment$load;
            _this.addAggregation("content", panelContent);

            //initialize ui model
            //bind suggested apps list
            _this.model = new JSONModel({
              query: "",
              hasError: false,
              errorType: ErrorType.DefaultError,
              errorDescription: "",
              searchStatus: SearchStatus.Idle,
              loadingAnimation: _this._generateSearchingAnimation(),
              suggestedAppsCount: 0,
              userSelectedApps: [],
              suggestedApps: []
            });
            panelContent.setModel(_this.model);
            panelContent.setModel(new ResourceModel({
              bundleName: "sap.cux.home.i18n.messagebundle"
            }), "i18n");
            _this.addAppsButton.setModel(_this.model);
            _this.appSuggestionList = Fragment.byId(`${_this.getId()}-content`, "appsList");
            _this.appSuggestionList.bindAggregation("items", {
              path: "/suggestedApps",
              factory: _this._generateListItem.bind(_this)
            });
          });
        });
      } catch (e) {
        return Promise.reject(e);
      }
    },
    /**
     * Generates a list item for the Apps Addition Panel.
     *
     * @private
     * @param {string} id - The unique ID for the list item.
     * @param {Context} context - The binding context for the list item.
     * @returns {CustomListItem} The generated list item control.
     */
    _generateListItem: function _generateListItem(id, context) {
      const listItem = new CustomListItem(id, {
        selected: context.getProperty("addedToHomePage"),
        content: [new FlexBox(`${id}-result-container`, {
          renderType: "Bare",
          wrap: "Wrap",
          direction: context.getProperty("isStaticApp") ? "Column" : "Row",
          alignItems: context.getProperty("isStaticApp") ? "Start" : "Center",
          items: [this._getAppPreviewContainer(id, context), this._getAppDetailsContainer(id, context)]
        }).addStyleClass("sapUiSmallMargin")]
      });

      //bind associated checkbox to disable it when the app is already added to home page
      listItem.getMultiSelectControl(true).setEnabled(!context.getProperty("addedToHomePage"));
      return listItem;
    },
    /**
     * Creates a preview container for the suggested app.
     *
     * @private
     * @param {string} id - The unique ID for the container.
     * @param {Context} context - The binding context for the app.
     * @returns {HBox} The app preview container.
     */
    _getAppPreviewContainer: function _getAppPreviewContainer(id, context) {
      const container = new HBox(`${id}-suggestedAppContainer`, {
        renderType: "Bare"
      });
      if (context.getProperty("isStaticApp")) {
        // create generic tile for static app
        container.addItem(new GenericTile(`${id}-staticApp`, {
          mode: "IconMode",
          frameType: "TwoByHalf",
          header: context.getProperty("title"),
          subheader: context.getProperty("subTitle"),
          tileIcon: context.getProperty("icon"),
          visible: context.getProperty("isStaticApp")
        }).addStyleClass("suggestedTile"));
      } else {
        // create custom visualization for other apps
        const instance = this.vizInstantiationService.instantiateVisualization(context.getProperty("vizData"));
        instance?.setActive(true);
        instance.setClickable(false);
        container.addItem(instance);
      }
      return container;
    },
    /**
     * Creates a details container for the suggested app.
     *
     * @private
     * @param {string} id - The unique ID for the container.
     * @param {Context} context - The binding context for the app.
     * @returns {VBox} The app details container.
     */
    _getAppDetailsContainer: function _getAppDetailsContainer(id, context) {
      return new VBox(`${id}-app-details-container`, {
        renderType: "Bare",
        gap: "0.5rem",
        items: [new Label(`${id}-descriptionLabel`, {
          text: this._i18nBundle.getText("appDescription"),
          showColon: true
        }), new ExpandableText(`${id}-description`, {
          text: context.getProperty("description"),
          maxCharacters: Constants.MaxDescriptionLength
        }), new HBox(`${id}-app-status-container`, {
          renderType: "Bare",
          visible: context.getProperty("status").length > 0,
          items: [new Label(`${id}-appStatusLabel`, {
            text: this._i18nBundle.getText("appStatus"),
            showColon: true
          }), new HBox(`${id}-app-status-texts`, {
            renderType: "Bare",
            items: this._generateStatusTexts(context.getProperty("status"))
          }).addStyleClass("sapUiTinyMarginBegin statusTextsContainer")]
        })]
      }).addStyleClass(context.getProperty("isStaticApp") ? "sapUiSmallMarginTop" : "sapUiSmallMarginBegin");
    },
    /**
     * Checks if the Apps Addition Panel is supported. Internally, it checks if the
     * AI Smart App Finder feature toggle is enabled and if the associated application
     * is accessible for the user.
     *
     * @public
     * @override
     * @async
     * @returns {Promise<boolean>} A promise that resolves to a boolean indicating support.
     */
    isSupported: function _isSupported() {
      try {
        const _this2 = this;
        function _temp5() {
          //remove panel if it's not supported
          if (!_this2.isPanelSupported) {
            _this2.removeActionButton(_this2.addAppsButton);
            const contentAdditionDialog = _this2.getParent();
            contentAdditionDialog.removePanel(_this2);
            contentAdditionDialog.updateActionButtons();
          }
          return _this2.isPanelSupported;
        }
        const _temp4 = function () {
          if (_this2.isPanelSupported === undefined) {
            _this2.isPanelSupported = false;
            const _temp3 = function () {
              if (_this2.getFavAppPanel()) {
                const _temp2 = _catch(function () {
                  return Promise.resolve(_this2.appManagerInstance.isFeatureEnabled(FEATURE_TOGGLES.AI_SMART_APPFINDER)).then(function (isFeatureEnabled) {
                    const _temp = function () {
                      if (isFeatureEnabled) {
                        return Promise.resolve(Container.getServiceAsync("Navigation")).then(function (navigationService) {
                          return Promise.resolve(navigationService.isNavigationSupported([{
                            target: {
                              semanticObject: "IntelligentPrompt",
                              action: "propose"
                            }
                          }])).then(function (_ref) {
                            let [{
                              supported
                            }] = _ref;
                            _this2.isPanelSupported = supported;
                          });
                        });
                      }
                    }();
                    if (_temp && _temp.then) return _temp.then(function () {});
                  });
                }, function (error) {
                  Log.error(error.message);
                });
                if (_temp2 && _temp2.then) return _temp2.then(function () {});
              }
            }();
            if (_temp3 && _temp3.then) return _temp3.then(function () {});
          }
        }();
        return Promise.resolve(_temp4 && _temp4.then ? _temp4.then(_temp5) : _temp5(_temp4));
      } catch (e) {
        return Promise.reject(e);
      }
    },
    /**
     * Generates the searching animation SVG as a string.
     *
     * @private
     * @returns {string} The SVG string for the loading animation.
     */
    _generateSearchingAnimation: function _generateSearchingAnimation() {
      return `<svg height="210" fill="none">
            <g>
                <rect height="210" rx="4" fill="white"/>
                <rect x="16" y="143" width="90%" height="8" rx="4" fill="var(--sapContent_Placeholderloading_Background)"/>
                <rect x="16" y="103" width="84%" height="32" rx="4" fill="var(--sapContent_Placeholderloading_Background)"/>
                <rect x="16" y="33" width="90%" height="8" rx="4" fill="var(--sapContent_Placeholderloading_Background)"/>
                <rect x="16" y="16" width="96%" height="12" rx="4" fill="var(--sapContent_Placeholderloading_Background)"/>
            </g>
        </svg>`;
    },
    /**
     * Resets the panel to its default state.
     *
     * @private
     */
    resetPanel: function _resetPanel() {
      const defaultModelProperties = {
        query: "",
        hasError: false,
        searchStatus: SearchStatus.Idle,
        suggestedAppsCount: 0,
        userSelectedApps: [],
        suggestedApps: []
      };
      this.model.setData({
        ...this.model.getData(),
        ...defaultModelProperties
      });
      this.userSelectedApps.clear();
    },
    /**
     * Handles the "Go" button press event for searching suggested apps.
     *
     * @private
     * @async
     * @param {SearchField$SearchEvent} event - The search event triggered by the user.
     */
    onPressGo: function _onPressGo(event) {
      try {
        const _this3 = this;
        // reset panel if clear button is pressed
        if (event.getParameter("clearButtonPressed")) {
          _this3.resetPanel();
          return Promise.resolve();
        }

        // validate query
        const query = _this3.model.getProperty("/query");
        if (!_this3.isValidQuery(query)) return Promise.resolve();
        const _temp7 = _finallyRethrows(function () {
          return _catch(function () {
            // initiate search
            _this3.model.setProperty("/hasError", false);
            _this3.model.setProperty("/searchStatus", SearchStatus.Searching);
            _this3.appSuggestionList.removeSelections(true);
            return Promise.resolve(_this3.fetchAppsFromSearch(query)).then(function (rawApps) {
              const _temp6 = function () {
                if (rawApps.length > 0 && _this3.model.getProperty("/searchStatus") === SearchStatus.Searching) {
                  return Promise.resolve(_this3.fetchAllAvailableVisualizations()).then(function (allVisualizations) {
                    return Promise.resolve(_this3.appManagerInstance.fetchFavVizs(true, true)).then(function (favoriteApps) {
                      return Promise.resolve(_this3.appManagerInstance.fetchInsightApps(true, _this3._i18nBundle.getText("insights"))).then(function (insightsApps) {
                        // generate suggested apps
                        const apps = _this3._generateApps(rawApps, allVisualizations, [...favoriteApps, ...insightsApps]);
                        return Promise.resolve(_this3._filterUnsupportedApps(apps)).then(function (suggestedApps) {
                          // update model with filtered apps
                          _this3.model.setProperty("/suggestedApps", suggestedApps);
                          _this3.model.setProperty("/suggestedAppsCount", suggestedApps.length);
                        });
                      });
                    });
                  });
                }
              }();
              if (_temp6 && _temp6.then) return _temp6.then(function () {});
            }); // suggest apps if there are results and search is not cancelled
          }, function (err) {
            Log.error(err.message);
            _this3._handleError();
          });
        }, function (_wasThrown, _result) {
          // update search status only if search is not cancelled
          if (_this3.model.getProperty("/searchStatus") === SearchStatus.Searching) {
            _this3.model.setProperty("/searchStatus", SearchStatus.Complete);
          }
          if (_wasThrown) throw _result;
          return _result;
        });
        return Promise.resolve(_temp7 && _temp7.then ? _temp7.then(function () {}) : void 0);
      } catch (e) {
        return Promise.reject(e);
      }
    },
    /**
     * Filters out unsupported apps based on accessibility.
     *
     * @private
     * @param {SuggestedApp[]} apps - The list of suggested apps to filter.
     * @returns {Promise<SuggestedApp[]>} A promise that resolves to the filtered list of supported apps.
     */
    _filterUnsupportedApps: function _filterUnsupportedApps(apps) {
      try {
        const intents = apps.map(app => app.vizData?.target) || [];
        return Promise.resolve(Container.getServiceAsync("Navigation")).then(function (navigationService) {
          return Promise.resolve(navigationService.isNavigationSupported(intents)).then(function (supportedAppIndices) {
            return apps.filter((_, index) => supportedAppIndices[index]);
          });
        });
      } catch (e) {
        return Promise.reject(e);
      }
    },
    /**
     * Generates suggested apps from raw app data and visualizations.
     *
     * @private
     * @param {RawAppData[]} rawApps - The raw app data to process.
     * @param {IVisualization[]} allVisualizations - All available visualizations.
     * @param {ICustomVisualization[]} homePageVisualizations - Visualizations available in homepage.
     * @returns {SuggestedApp[]} The list of suggested apps.
     */
    _generateApps: function _generateApps(rawApps, allVisualizations, homePageVisualizations) {
      return rawApps.map(app => {
        const vizData = allVisualizations.find(viz => viz.vizId === app.chipID);
        const addedToHomePage = homePageVisualizations.some(viz => viz.visualization?.vizId === app.chipID);
        return {
          title: app.title,
          chipID: app.chipID,
          subTitle: app.subTitle,
          description: app.appDescription,
          icon: app.iconUrl,
          vizData,
          addedToHomePage,
          isStaticApp: app.tileType === TileType.Static,
          status: this.getAppStatusTexts(app.configuration, addedToHomePage)
        };
      });
    },
    /**
     * Validates the query string based on minimum length.
     *
     * @private
     * @param {string} query - The query string to validate.
     * @returns {boolean} True if the query is valid, otherwise false.
     */
    isValidQuery: function _isValidQuery(query) {
      return Boolean(query?.trim() && query.trim().length >= Constants.MinQueryLength);
    },
    /**
     * Fetches all available visualizations for the user.
     *
     * @private
     * @async
     * @returns {Promise<IVisualization[]>} A promise that resolves to the list of visualizations.
     */
    fetchAllAvailableVisualizations: function _fetchAllAvailableVisualizations() {
      try {
        const _this4 = this;
        function _temp9() {
          return _this4.allAvailableVisualizations;
        }
        const _temp8 = function () {
          if (!_this4.allAvailableVisualizations) {
            return Promise.resolve(Container.getServiceAsync("SearchableContent")).then(function (searchableContentService) {
              return Promise.resolve(searchableContentService.getApps({
                enableVisualizationPreview: false
              })).then(function (allAvailableApps) {
                _this4.allAvailableVisualizations = allAvailableApps.reduce((visualizations, currentApp) => {
                  return visualizations.concat(currentApp.visualizations);
                }, []);
              });
            });
          }
        }();
        return Promise.resolve(_temp8 && _temp8.then ? _temp8.then(_temp9) : _temp9(_temp8));
      } catch (e) {
        return Promise.reject(e);
      }
    },
    /**
     * Fetches a CSRF token for secure API requests.
     *
     * @private
     * @async
     * @returns {Promise<string | null>} A promise that resolves to the CSRF token or null if fetching fails.
     */
    _fetchCSRFToken: function _fetchCSRFToken() {
      try {
        return Promise.resolve(_catch(function () {
          return Promise.resolve(fetch(AI_APP_FINDER_BASE_URL, {
            method: "GET",
            headers: {
              "X-CSRF-Token": "Fetch"
            }
          })).then(function (response) {
            return response.headers.get("X-CSRF-Token");
          });
        }, function (error) {
          Log.error("Failed to fetch CSRF token", error);
          return null;
        }));
      } catch (e) {
        return Promise.reject(e);
      }
    },
    /**
     * Fetches apps from the search API based on the query.
     *
     * @private
     * @async
     * @param {string} query - The search query string.
     * @returns {Promise<RawAppData[]>} A promise that resolves to the list of raw app data.
     */
    fetchAppsFromSearch: function _fetchAppsFromSearch(query) {
      try {
        const _this5 = this;
        return Promise.resolve(_catch(function () {
          return Promise.resolve(_this5._fetchCSRFToken()).then(function (token) {
            const headers = {
              "Content-Type": "application/json",
              ...(token && {
                "X-CSRF-Token": token
              })
            };
            return Promise.resolve(fetch(AI_APP_FINDER_API, {
              method: "POST",
              headers,
              body: JSON.stringify({
                UserInput: query
              })
            })).then(function (response) {
              let _exit = false;
              function _temp12(_result2) {
                return _exit ? _result2 : Promise.resolve(response.json()).then(function (_response$json2) {
                  const queryResult = _response$json2;
                  return queryResult.value || [];
                });
              }
              const _temp11 = function () {
                if (!response.ok) {
                  return Promise.resolve(response.json()).then(function (_response$json) {
                    const errorResponse = _response$json;
                    _this5._handleError(errorResponse.error?.message || "");
                    const _temp10 = [];
                    _exit = true;
                    return _temp10;
                  });
                }
              }();
              // handle error responses
              return _temp11 && _temp11.then ? _temp11.then(_temp12) : _temp12(_temp11);
            });
          });
        }, function (error) {
          Log.error(error.message);
          _this5._handleError();
          return [];
        }));
      } catch (e) {
        return Promise.reject(e);
      }
    },
    /**
     * Retrieves status texts for an app based on its configuration and homepage status.
     *
     * @private
     * @param {string} configuration - The app's configuration string.
     * @param {boolean} addedToHomePage - Indicates if the app is already added to the homepage.
     * @returns {string[]} An array of status texts for the app.
     */
    getAppStatusTexts: function _getAppStatusTexts(configuration, addedToHomePage) {
      let statusTexts = [];
      if (addedToHomePage) {
        statusTexts.push(this._i18nBundle.getText("alreadyAddedApp"));
      }
      if (configuration) {
        try {
          const parsedConfig = JSON.parse(configuration);
          const tileConfig = JSON.parse(parsedConfig?.tileConfiguration);
          const infoText = (tileConfig?.display_info_text || "").toLowerCase();
          if (infoText === Constants.DeprecatedInfoText) {
            statusTexts.push(this._i18nBundle.getText("deprecatedApp"));
          }
        } catch (error) {
          Log.warning(error.message);
        }
      }
      return statusTexts;
    },
    /**
     * Generates status text controls for the provided status texts.
     *
     * @private
     * @param {string[]} stausTexts - The list of status texts.
     * @returns {Text[]} An array of Text controls with applied styles.
     */
    _generateStatusTexts: function _generateStatusTexts(stausTexts) {
      return stausTexts.map(status => {
        return new Text({
          text: this._i18nBundle.getText(status)
        }).addStyleClass(this.applyStatusClass(status));
      });
    },
    /**
     * Applies a CSS class to the status text based on its type.
     *
     * @private
     * @param {string} status - The status text to classify.
     * @returns {string} The CSS class for the status text.
     */
    applyStatusClass: function _applyStatusClass(status) {
      if (status === this._i18nBundle.getText("alreadyAddedApp")) {
        return "addedAppStatusText";
      } else if (status === this._i18nBundle.getText("deprecatedApp")) {
        return "deprecatedAppStatusText";
      } else {
        return "";
      }
    },
    /**
     * Handles the "Add Apps" button press event to add selected apps to favorites.
     *
     * @private
     * @async
     */
    onPressAddApps: function _onPressAddApps() {
      try {
        const _this6 = this;
        function _temp14() {
          // refresh the favorite apps panel
          return Promise.resolve(_this6.refreshFavoriteApps()).then(function () {
            _this6.getParent().close();
            MessageToast.show(_this6._i18nBundle.getText("appAddedToFavorites"));
            _this6.resetPanel();
          });
        }
        const userSelectedApps = _this6.model.getProperty("/userSelectedApps");
        const vizIds = userSelectedApps.map(item => item.getBindingContext()?.getProperty("chipID"));
        const _temp13 = _forOf(vizIds, function (vizId) {
          return Promise.resolve(_this6.appManagerInstance.addVisualization(vizId)).then(function () {});
        });
        return Promise.resolve(_temp13 && _temp13.then ? _temp13.then(_temp14) : _temp14(_temp13));
      } catch (e) {
        return Promise.reject(e);
      }
    },
    /**
     * Retrieves the AppsContainer instance from the parent layout.
     *
     * @private
     * @returns {AppsContainer | undefined} The AppsContainer instance or undefined if not found.
     */
    getAppsContainer: function _getAppsContainer() {
      const layout = this.getParent()?.getParent();
      return layout.getContent().find(container => container instanceof AppsContainer);
    },
    /**
     * Retrieves the favorite apps panel from the AppsContainer.
     *
     * @private
     * @returns {FavAppPanel | undefined} The favorite apps panel or undefined if not found.
     */
    getFavAppPanel: function _getFavAppPanel() {
      return this.getAppsContainer()?.getContent().find(panel => panel instanceof FavAppPanel);
    },
    /**
     * Refreshes the favorite apps panel in the AppsContainer.
     *
     * @private
     * @async
     */
    refreshFavoriteApps: function _refreshFavoriteApps() {
      try {
        const _this7 = this;
        return Promise.resolve(_this7.getAppsContainer()?.refreshPanel(_this7.getFavAppPanel())).then(function () {});
      } catch (e) {
        return Promise.reject(e);
      }
    },
    /**
     * Handles the selection change event for the suggested apps list.
     *
     * @public
     * @param {ListBase$SelectionChangeEvent} event - The selection change event.
     */
    onListSelectionChange: function _onListSelectionChange(event) {
      const listItem = event.getParameter("listItem");
      const selected = event.getParameter("selected");
      if (!selected) this.userSelectedApps.delete(listItem);else {
        const context = listItem.getBindingContext();
        const addedToHomePage = context?.getProperty("addedToHomePage");
        if (!addedToHomePage) this.userSelectedApps.add(listItem);
      }
      this.model.setProperty("/userSelectedApps", Array.from(this.userSelectedApps));
    },
    /**
     * Handles errors by updating the model with error details.
     *
     * @private
     * @param {string} [message=""] - The error message to process.
     */
    _handleError: function _handleError() {
      let message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      const [, errorCode, errorDescription] = message.match(/\((\d{2})\d*\)\s*(.*)/) || [];
      this.model.setProperty("/hasError", true);
      this.model.setProperty("/errorType", this._getErrorType(errorCode));
      this.model.setProperty("/errorDescription", errorDescription || "");
    },
    /**
     * Determines the error type based on the provided error code.
     *
     * @private
     * @param {string} [errorCode=""] - The error code to evaluate.
     * @returns {ErrorType} The corresponding error type.
     */
    _getErrorType: function _getErrorType() {
      let errorCode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      switch (errorCode) {
        case "10":
          return ErrorType.ServiceError;
        case "20":
        case "40":
          return ErrorType.NoResultsFound;
        case "30":
          return ErrorType.ValidationError;
        default:
          return ErrorType.DefaultError;
      }
    }
  });
  return AppsAdditionPanel;
});
//# sourceMappingURL=AppsAdditionPanel-dbg-dbg.js.map
