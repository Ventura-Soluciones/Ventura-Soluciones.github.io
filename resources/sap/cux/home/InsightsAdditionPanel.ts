/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *  * (c) Copyright 2009-2025 SAP SE. All rights reserved
 */

import Button from "sap/m/Button";
import { ButtonType } from "sap/m/library";
import Text from "sap/m/Text";
import BaseSettingsPanel from "./BaseSettingsPanel";
import { CONTENT_ADDITION_PANEL_TYPES } from "./utils/Constants";

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
export default class InsightsAdditionPanel extends BaseSettingsPanel {
	private addCardsButton!: Button;

	/**
	 * Init lifecycle method
	 *
	 * @public
	 * @override
	 */
	public init(): void {
		super.init();

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
	}

	/**
	 * Sets up the content for the Insights Addition Panel.
	 *
	 * @private
	 */
	private _setupContent(): void {
		const dummyContent = new Text(`${this.getId()}-dummy-text`, {
			text: this._i18nBundle.getText("insightsCards")
		});
		this.addAggregation("content", dummyContent);
	}

	/**
	 * Checks if the Insights Addition Panel is supported.
	 *
	 * @public
	 * @override
	 * @async
	 * @returns {Promise<boolean>} A promise that resolves to true if supported.
	 */
	public async isSupported(): Promise<boolean> {
		return Promise.resolve(true);
	}

	/**
	 * Handles the "Add" button press event.
	 *
	 * @private
	 */
	private onPressAddCards(): void {}

	/**
	 * Handles the dialog close event.
	 *
	 * @private
	 */
	private onDilaogClose(): void {}
}
