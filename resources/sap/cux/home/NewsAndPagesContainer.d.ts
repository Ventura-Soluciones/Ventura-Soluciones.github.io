declare module "sap/cux/home/NewsAndPagesContainer" {
    import type { MetadataOptions } from "sap/ui/core/Element";
    import BaseContainer from "sap/cux/home/BaseContainer";
    import type { $NewsAndPagesContainerSettings } from "sap/cux/home/NewsAndPagesContainer";
    import { INewsFeedVisibiliyChange, INewsPersData } from "sap/cux/home/interface/KeyUserInterface";
    interface IpanelLoaded {
        [key: string]: {
            loaded: boolean;
            count: number;
        };
    }
    /**
     *
     * Container class for managing and storing News and Pages.
     *
     * @extends BaseContainer
     *
     * @author SAP SE
     * @version 0.0.1
     * @since 1.121
     *
     * @internal
     * @experimental Since 1.121
     * @public
     *
     * @alias sap.cux.home.NewsAndPagesContainer
     */
    export default class NewsAndPagesContainer extends BaseContainer {
        static renderer: {
            apiVersion: number;
            render: (rm: import("sap/ui/core/RenderManager").default, control: BaseContainer) => void;
            renderContent: (rm: import("sap/ui/core/RenderManager").default, control: BaseContainer) => void;
            renderCustomPlaceholder: (rm: import("sap/ui/core/RenderManager").default, control: BaseContainer) => void;
        };
        static readonly metadata: MetadataOptions;
        private panelLoaded;
        private pagePanel;
        private newsPanel;
        constructor(id?: string | $NewsAndPagesContainerSettings);
        constructor(id?: string, settings?: $NewsAndPagesContainerSettings);
        /**
         * Init lifecycle method
         *
         * @private
         * @override
         */
        init(): void;
        /**
         * Loads the News and Pages section.
         * Overrides the load method of the BaseContainer.
         *
         * @private
         * @override
         */
        load(): Promise<void>;
        newsVisibilityChangeHandler(personalization: INewsFeedVisibiliyChange): void;
        newsPersonalization(personalizations: INewsPersData): void;
        panelLoadedFn(sPanelType: string, oVal: {
            loaded: boolean;
            count: number;
        }): void;
        adjustStyleLayout(bIsNewsTileVisible: boolean): void;
        /**
         * Adjusts the layout of the all panels in the container.
         *
         * @private
         * @override
         */
        adjustLayout(): void;
        /**
         * Retrieves the generic placeholder content for the News and Pages container.
         *
         * @returns {string} The HTML string representing the News and Pages container's placeholder content.
         */
        protected getGenericPlaceholderContent(): string;
    }
}
//# sourceMappingURL=NewsAndPagesContainer.d.ts.map