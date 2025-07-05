/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *  * (c) Copyright 2009-2025 SAP SE. All rights reserved
 */

import FlexBox from "sap/m/FlexBox";
import type { MetadataOptions } from "sap/ui/core/Element";
import BaseContainer from "./BaseContainer";
import BasePanel from "./BasePanel";
import type { $NewsAndPagesContainerSettings } from "./NewsAndPagesContainer";
import { getNewsPagesPlaceholder } from "./NewsAndPagesContainerGenericPlaceholder";
import NewsPanel from "./NewsPanel";
import PagePanel from "./PagePanel";
import { INewsFeedVisibiliyChange, INewsPersData, ISpacePagePersonalization } from "./interface/KeyUserInterface";
import { OrientationType } from "./library";
import { DeviceType } from "./utils/Device";

interface IpanelLoaded {
	[key: string]: { loaded: boolean; count: number };
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
	static renderer = {
		...BaseContainer.renderer,
		apiVersion: 2
	};
	static readonly metadata: MetadataOptions = {
		properties: {
			/**
			 * Color Personalizations for Spaces & Pages
			 */
			colorPersonalizations: { type: "array", group: "Misc", defaultValue: [], visibility: "hidden" },
			/**
			 * Icon Personalizations for Spaces & Pages
			 */
			iconPersonalizations: { type: "array", group: "Misc", defaultValue: [], visibility: "hidden" },
			/**
			 * News feed visibility flag
			 */
			newsFeedVisibility: { type: "boolean", group: "Misc", defaultValue: true, visibility: "hidden" }
		}
	};

	private panelLoaded: IpanelLoaded = {};
	private pagePanel!: PagePanel;
	private newsPanel!: NewsPanel;

	constructor(id?: string | $NewsAndPagesContainerSettings);
	constructor(id?: string, settings?: $NewsAndPagesContainerSettings);
	/**
	 * Constructor for the new News and Pages container.
	 *
	 * @param {string} [id] ID for the new control, generated automatically if an ID is not provided
	 * @param {object} [settings] Initial settings for the new control
	 */
	public constructor(id?: string, settings?: $NewsAndPagesContainerSettings) {
		super(id, settings);
	}

	/**
	 * Init lifecycle method
	 *
	 * @private
	 * @override
	 */
	public init(): void {
		super.init();
		this.panelLoaded = {};

		this.setProperty(
			"orientation",
			this.getDeviceType() === DeviceType.Desktop || this.getDeviceType() === DeviceType.LargeDesktop
				? OrientationType.Horizontal
				: OrientationType.Vertical
		);
		this.addCustomSetting("title", this._i18nBundle.getText("myInterestMsg") as string);
	}

	/**
	 * Loads the News and Pages section.
	 * Overrides the load method of the BaseContainer.
	 *
	 * @private
	 * @override
	 */
	public async load() {
		const aContent = this.getContent() as PagePanel[];
		for (const oContent of aContent) {
			await oContent.getData();
		}
	}

	/**
	 * Sets property value for colorPersonalization.
	 * Overridden to update cached personalizations.
	 *
	 * @private
	 * @override
	 * @returns {NewsAndPagesContainer} the container for chaining
	 */
	setColorPersonalizations(personalizations: Array<ISpacePagePersonalization>): NewsAndPagesContainer {
		const existingPers = (this.getProperty("colorPersonalizations") as ISpacePagePersonalization[]) || [];
		const updatedPers = existingPers.concat(personalizations);
		this.setProperty("colorPersonalizations", updatedPers);
		this.getContent().forEach((oContent) => {
			if (oContent.getMetadata().getName() === "sap.cux.home.PagePanel") {
				(oContent as PagePanel).applyColorPersonalizations(updatedPers);
			}
		});
		return this;
	}

	/**
	 * Sets property value for iconPersonalization.
	 * Overridden to update cached personalizations.
	 *
	 * @private
	 * @override
	 * @returns {NewsAndPagesContainer} the container for chaining
	 */
	setIconPersonalizations(personalizations: Array<ISpacePagePersonalization>): NewsAndPagesContainer {
		const existingPers = (this.getProperty("iconPersonalizations") as ISpacePagePersonalization[]) || [];
		const updatedPers = existingPers.concat(personalizations);
		this.setProperty("iconPersonalizations", updatedPers);
		this.getContent().forEach((oContent) => {
			if (oContent.getMetadata().getName() === "sap.cux.home.PagePanel") {
				(oContent as PagePanel).applyIconPersonalizations(updatedPers);
			}
		});
		return this;
	}

	public newsVisibilityChangeHandler(personalization: INewsFeedVisibiliyChange) {
		const aContent = this.getContent();
		aContent.forEach((oContent: BasePanel) => {
			if (oContent.getMetadata().getName() === "sap.cux.home.NewsPanel") {
				let newsPanel = oContent as NewsPanel;
				const defaultNewsFeedVisible = newsPanel.isURLParamEnabled("default-News");
				if (personalization.isNewsFeedVisible) {
					this.setProperty("newsFeedVisibility", true);
					this._getPanelContentWrapper(newsPanel).setVisible(true);
				} else if (!defaultNewsFeedVisible) {
					this.setProperty("newsFeedVisibility", false);
					this._getPanelContentWrapper(newsPanel).setVisible(false);
				}
			}
		});
	}

	public newsPersonalization(personalizations: INewsPersData) {
		const aContent = this.getContent();
		aContent.forEach((oContent: BasePanel) => {
			if (oContent.getMetadata().getName() === "sap.cux.home.NewsPanel") {
				let newsPanel = oContent as NewsPanel;
				const newsFeedVisibility = Boolean(this.getProperty("newsFeedVisibility"));
				const defaultNewsFeedVisible = newsPanel.isURLParamEnabled("default-News");
				if (!defaultNewsFeedVisible) {
					newsPanel.setProperty("url", personalizations.newsFeedURL);
					newsPanel.setProperty("showCustom", personalizations.showCustomNewsFeed);
					newsPanel.setProperty("customFeedKey", personalizations.customNewsFeedKey);
					newsPanel.setProperty("customFileName", personalizations.customNewsFeedFileName);
				}

				if (newsFeedVisibility) {
					const url = personalizations.newsFeedURL;
					this._getPanelContentWrapper(newsPanel).setVisible(true);
					const customFeedKey = String(newsPanel.getProperty("customFeedKey"));
					const showCustom = Boolean(newsPanel.getProperty("showCustom"));
					if (!defaultNewsFeedVisible) {
						if (showCustom && customFeedKey) {
							newsPanel.setProperty("newsAvailable", true);
							void newsPanel.setCustomNewsFeed(customFeedKey);
						} else if (!showCustom && url) {
							void newsPanel.setURL(url);
						} else {
							this._getPanelContentWrapper(newsPanel).setVisible(false);
							this.setProperty("newsFeedVisibility", false);
						}
					}
				}
				void newsPanel.getData();
			}
		});
	}

	public panelLoadedFn(sPanelType: string, oVal: { loaded: boolean; count: number }) {
		// same issue of panelwrapper not available at this time
		const aContent = this.getContent();
		aContent.forEach((oContent: BasePanel) => {
			if (oContent.getMetadata().getName() === "sap.cux.home.PagePanel") {
				this.pagePanel = oContent as PagePanel;
			} else if (oContent.getMetadata().getName() === "sap.cux.home.NewsPanel") {
				this.newsPanel = oContent as NewsPanel;
			}
		});
		this.panelLoaded[sPanelType] = oVal;
		this.adjustLayout();
	}

	public adjustStyleLayout(bIsNewsTileVisible: boolean) {
		const sDeviceType = this.getDeviceType();
		const newsContentWrapper = this.newsPanel ? this._getPanelContentWrapper(this.newsPanel) : undefined;
		const pagesContentWrapper = this.pagePanel ? this._getPanelContentWrapper(this.pagePanel) : undefined;
		const containerWrapper = this._getInnerControl() as FlexBox;
		if (bIsNewsTileVisible) {
			this.newsPanel.adjustLayout();
		}
		if (sDeviceType === DeviceType.Desktop || sDeviceType === DeviceType.LargeDesktop) {
			if (bIsNewsTileVisible) {
				pagesContentWrapper?.setWidth("100%");
			}
			containerWrapper.setAlignItems("Center");
			containerWrapper.setDirection("Row");
			newsContentWrapper?.setWidth("100%");
			newsContentWrapper?.addStyleClass("newsTileMaxWidth");
		} else if (sDeviceType === DeviceType.Tablet) {
			pagesContentWrapper?.setWidth("100%");
			pagesContentWrapper?.setJustifyContent("Start");
			newsContentWrapper?.setWidth("calc(100vw - 64px)");
			newsContentWrapper?.removeStyleClass("newsTileMaxWidth");
			containerWrapper.setAlignItems("Baseline");
			containerWrapper.setDirection("Column");
		}

		if (pagesContentWrapper) {
			setTimeout(
				this.pagePanel.attachResizeHandler.bind(
					this.pagePanel,
					bIsNewsTileVisible,
					this.getDomRef()?.clientWidth || 0,
					pagesContentWrapper,
					containerWrapper
				)
			);
		}
	}

	/**
	 * Adjusts the layout of the all panels in the container.
	 *
	 * @private
	 * @override
	 */
	public adjustLayout() {
		if (this.pagePanel && this.newsPanel && this._getPanelContentWrapper(this.newsPanel).getVisible()) {
			let bIsNewsTileVisible = true;
			if (this.panelLoaded["Page"]?.loaded || this.panelLoaded["News"]?.loaded) {
				// In case News Panel fails to load remove the panel and apply styles for page to take full width
				if (this.panelLoaded["News"]?.loaded === false) {
					bIsNewsTileVisible = false;
					this.removeContent(this.newsPanel);
				} else if (this.panelLoaded["Page"]?.loaded === false) {
					this.removeContent(this.pagePanel);
				}
				this.adjustStyleLayout(bIsNewsTileVisible);
			}
		} else if (this.pagePanel && this.panelLoaded["Page"]?.loaded) {
			// If News Panel is not present apply styles for page to take full width
			this.adjustStyleLayout(false);
		}
	}

	/**
	 * Retrieves the generic placeholder content for the News and Pages container.
	 *
	 * @returns {string} The HTML string representing the News and Pages container's placeholder content.
	 */
	protected getGenericPlaceholderContent(): string {
		return getNewsPagesPlaceholder();
	}
}
