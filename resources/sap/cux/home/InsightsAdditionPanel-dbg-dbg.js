/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *  * (c) Copyright 2009-2025 SAP SE. All rights reserved
 */
sap.ui.define(["sap/m/Button", "sap/m/library", "sap/m/Text", "./BaseSettingsPanel", "./utils/Constants"], function (Button, sap_m_library, Text, __BaseSettingsPanel, ___utils_Constants) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const ButtonType = sap_m_library["ButtonType"];
  const BaseSettingsPanel = _interopRequireDefault(__BaseSettingsPanel);
  const CONTENT_ADDITION_PANEL_TYPES = ___utils_Constants["CONTENT_ADDITION_PANEL_TYPES"];
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
   * @alias sap.cux.home.InsightsAdditionPanel
   */
  const InsightsAdditionPanel = BaseSettingsPanel.extend("sap.cux.home.InsightsAdditionPanel", {
    /**
     * Init lifecycle method
     *
     * @public
     * @override
     */
    init: function _init() {
      BaseSettingsPanel.prototype.init.call(this);

      //setup panel
      this.setProperty("key", CONTENT_ADDITION_PANEL_TYPES.AI_INSIGHTS_CARDS);
      this.setProperty("title", this._i18nBundle.getText("insightsCards"));

      //setup actions
      this.addCardsButton = new Button(`${this.getId()}-add-cards-btn`, {
        text: this._i18nBundle.getText("addFromInsightsDialogBtn"),
        type: ButtonType.Emphasized,
        press: this.onPressAddCards.bind(this)
      });
      this.addActionButton(this.addCardsButton);

      //setup content
      this._setupContent();
      this.attachEvent("onDialogClose", this.onDilaogClose.bind(this));
    },
    /**
     * Sets up the content for the Insights Addition Panel.
     *
     * @private
     */
    _setupContent: function _setupContent() {
      const dummyContent = new Text(`${this.getId()}-dummy-text`, {
        text: this._i18nBundle.getText("insightsCards")
      });
      this.addAggregation("content", dummyContent);
    },
    /**
     * Checks if the Insights Addition Panel is supported.
     *
     * @public
     * @override
     * @async
     * @returns {Promise<boolean>} A promise that resolves to true if supported.
     */
    isSupported: function _isSupported() {
      try {
        return Promise.resolve(true);
      } catch (e) {
        return Promise.reject(e);
      }
    },
    /**
     * Handles the "Add" button press event.
     *
     * @private
     */
    onPressAddCards: function _onPressAddCards() {},
    /**
     * Handles the dialog close event.
     *
     * @private
     */
    onDilaogClose: function _onDilaogClose() {}
  });
  return InsightsAdditionPanel;
});
//# sourceMappingURL=InsightsAdditionPanel-dbg-dbg.js.map
