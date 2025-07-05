declare module "sap/cux/home/InsightsAdditionPanel" {
    import BaseSettingsPanel from "sap/cux/home/BaseSettingsPanel";
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
        private addCardsButton;
        /**
         * Init lifecycle method
         *
         * @public
         * @override
         */
        init(): void;
        /**
         * Sets up the content for the Insights Addition Panel.
         *
         * @private
         */
        private _setupContent;
        /**
         * Checks if the Insights Addition Panel is supported.
         *
         * @public
         * @override
         * @async
         * @returns {Promise<boolean>} A promise that resolves to true if supported.
         */
        isSupported(): Promise<boolean>;
        /**
         * Handles the "Add" button press event.
         *
         * @private
         */
        private onPressAddCards;
        /**
         * Handles the dialog close event.
         *
         * @private
         */
        private onDilaogClose;
    }
}
//# sourceMappingURL=InsightsAdditionPanel.d.ts.map