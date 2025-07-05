/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *  * (c) Copyright 2009-2025 SAP SE. All rights reserved
 */
import Log from "sap/base/Log";
import FlexBox from "sap/m/FlexBox";
import GenericTile from "sap/m/GenericTile";
import SlideTile from "sap/m/SlideTile";
import { FrameType } from "sap/m/library";
import Event from "sap/ui/base/Event";
import Component from "sap/ui/core/Component";
import type { MetadataOptions } from "sap/ui/core/Element";
import EventBus from "sap/ui/core/EventBus";
import DateFormat from "sap/ui/core/format/DateFormat";
import Context from "sap/ui/model/Context";
import XMLModel from "sap/ui/model/xml/XMLModel";
import Container from "sap/ushell/Container";
import type { $BaseNewsPanelSettings } from "./BaseNewsPanel";
import BaseNewsPanel from "./BaseNewsPanel";
import MenuItem from "./MenuItem";
import NewsAndPagesContainer from "./NewsAndPagesContainer";
import NewsGroup from "./NewsGroup";
import NewsItem from "./NewsItem";
import { NewsType } from "./library";
import { DEFAULT_NEWS_URL } from "./utils/Constants";
import { recycleId } from "./utils/DataFormatUtils";
import { DeviceType } from "./utils/Device";
import { addFESRId } from "./utils/FESRUtil";
import HttpHelper from "./utils/HttpHelper";
import PersonalisationUtils from "./utils/PersonalisationUtils";
import UshellPersonalizer from "./utils/UshellPersonalizer";

interface IBindingInfo {
	path: string;
	length: number;
}

interface INewsResponse {
	value: ICustomNewsFeed[];
}

export interface ICustomNewsFeed {
	title: string;
	subTitle?: string;
	description?: string;
	footer_text?: Record<string, string>;
	mandatory_text?: string;
	_group_to_image?: Record<string, string>;
	_group_to_article?: ICustomNewsFeed[];
	[key: string]: unknown;
}

export interface INewsItem {
	changeId: string;
	title?: string;
	showAllPreparationRequired?: boolean;
}

interface ITranslatedText {
	ColumnName?: string;
	TranslatedName?: string;
}

interface IAppConfiguration {
	_oAdapter: {
		_aInbounds: IAvailableApp[];
	};
}

interface ODataResponse {
	"@odata.context": string;
	"@odata.metadataEtag": string;
	value: ICustomNewsFeed[];
}

interface IAvailableApp {
	semanticObject?: string;
	action?: string;
	id?: string;
	title?: string;
	permanentKey?: string;
	contentProviderId?: string;
	resolutionResult?: {
		[key: string]: string;
	};
	deviceTypes?: {
		[key: string]: boolean;
	};
	signature: {
		parameters: {
			[key: string]: IAppParameter;
		};
		additionalParameters?: string;
	};
}

interface IAppParameter {
	defaultValue?: {
		value: string;
		format: string;
	};
	required: boolean;
}
interface IFavNewsFeed {
	items: string[];
	showAllPreparationRequired?: boolean;
}
export interface INewsLink {
	[key: string]: string;
}

export interface INewsParam {
	[key: string]: { [key: string]: string };
}

export type FileFormat = "xlsx" | "csv";

const BASE_URL = "/sap/opu/odata4/ui2/insights_srv/srvd/ui2/",
	NEWS_FEED_READ_API = BASE_URL + "insights_read_srv/0001/" + "NEWS_FEED",
	NEWS_FEED_TRANSLATION_API = BASE_URL + "insights_read_srv/0001/" + "NewsFeedColumnTranslation",
	DEFAULT_FEED_COUNT = 7,
	fnImagePlaceholder = function (sPath: string, N: number) {
		return Array.from({ length: N }, function (v, i) {
			return sPath + "/" + (i + 1) + ".jpg";
		});
	};

const CUSTOM_NEWS_FEED = {
		TITLE: "LineOfBusiness",
		LINK: "WhatsNewDocument",
		VALIDITY: "ValidAsOf",
		PREPARATION_REQUIRED: "PreparationRequired",
		EXCLUDE_FIELDS: [
			"ChangeId",
			"LineNumber",
			"LineOfBusiness",
			"SolutionArea",
			"Title",
			"Description",
			"Type",
			"ValidAsOf",
			"WhatsNewDocument",
			"Link"
		],
		IMAGE_URL: "sap/cux/home/img/CustomNewsFeed/",
		FESR_STEP_NAME: "custNewsSlide-press",
		EMPTY_DATA_ERROR_CODE: "NODATA"
	},
	CUSTOM_IMAGES: { [key: string]: string[] } = {
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
export default class NewsPanel extends BaseNewsPanel {
	private oNewsTile!: SlideTile;
	private oNewsModel!: XMLModel;
	private oManageMenuItem!: MenuItem;
	private image!: number;
	private customNewsFeedCache: Map<string, unknown>;
	private bNewsLoad!: boolean;
	private favNewsFeed!: IFavNewsFeed;
	private _eventBus!: EventBus;
	private _defaultNews!: ODataResponse;
	private mandatoryNewsFeed!: string[];
	private _defaultNewsPromise: Promise<ODataResponse> | null = null;

	static readonly metadata: MetadataOptions = {
		library: "sap.cux.home",
		properties: {
			/**
			 * The URL of the news item.
			 *
			 * @public
			 */
			url: { type: "string", group: "Misc", defaultValue: "", visibility: "public" },
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
			customFeedKey: { type: "string", group: "Misc", defaultValue: "", visibility: "public" },
			/**
			 * The filename of custom news feed.
			 *
			 * @private
			 */
			customFileName: { type: "string", group: "Misc", defaultValue: "" },
			/**
			 * The flag for custom news feed is checked or not.
			 *
			 * @private
			 */
			showCustom: { type: "boolean", group: "Misc", defaultValue: false },
			/**
			 * The flag to determine rss feed will load or not.
			 *
			 * @private
			 */
			newsAvailable: { type: "boolean", group: "Misc", defaultValue: true, visibility: "hidden" },
			/**
			 * Supported file formats for news.
			 *
			 * @private
			 */
			supportedFileFormats: { type: "FileFormat[]", group: "Misc", defaultValue: ["xlsx"], visibility: "hidden" }
		},
		aggregations: {
			/**
			 * newsGroup aggregation for News
			 */
			newsGroup: { type: "sap.cux.home.NewsGroup", singularName: "newsGroup", multiple: true, visibility: "hidden" }
		}
	};

	constructor(idOrSettings?: string | $BaseNewsPanelSettings);
	constructor(id?: string, settings?: $BaseNewsPanelSettings);
	/**
	 * Constructor for a new News Panel.
	 *
	 * @param {string} [id] ID for the new control, generated automatically if an ID is not provided
	 * @param {object} [settings] Initial settings for the new control
	 */
	public constructor(id?: string, settings?: $BaseNewsPanelSettings) {
		super(id, settings);
		this.customNewsFeedCache = new Map();
	}

	/**
	 * Init lifecycle method
	 *
	 * @private
	 * @override
	 */
	public init(): void {
		super.init();

		this.oNewsTile = new SlideTile(this.getId() + "--idNewsSlide", {
			displayTime: 20000,
			width: "100%",
			height: "17rem",
			tiles: [
				new GenericTile(this.getId() + "--placeholder", {
					state: "Loading",
					mode: "ArticleMode",
					frameType: "Stretch" as FrameType
				})
			]
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
	}

	/**
	 *
	 * @param paramName name of parameter
	 * This method checks if the URL parameter is enabled.
	 * @returns {boolean} True if the parameter is enabled, false otherwise.
	 * @private
	 */
	public isURLParamEnabled(paramName: string): boolean {
		const urlParams = new URLSearchParams(window.location.search);
		return urlParams.get(paramName)?.toUpperCase() === "TRUE";
	}

	/**
	 * Retrieves news data asynchronously.
	 * If the news model is not initialized, it initializes the XML model and loads news feed data.
	 * @private
	 * @returns {Promise} A promise that resolves when the news data is retrieved.
	 */
	public async getData() {
		let sUrl: string = this.getUrl();
		let defaultNewsEnabled = this.isURLParamEnabled("default-News");
		this.mandatoryNewsFeed = [];
		if (!this.favNewsFeed) {
			await this.setFavNewsFeed(defaultNewsEnabled);
		}

		if (sUrl && sUrl !== DEFAULT_NEWS_URL && !this.getProperty("showCustom")) {
			//rss feed scenario
			this.oNewsModel = await this.initializeXmlModel(sUrl);
			this.oNewsTile.setModel(this.oNewsModel);
			this.oManageMenuItem.setVisible(false);
		} else if (sUrl == DEFAULT_NEWS_URL && !this.getProperty("showCustom")) {
			// default news scenario
			this.bNewsLoad = this.bNewsLoad || false;
			this.oManageMenuItem.setVisible(true);
			void this.setCustomNewsFeed("");
		} else if (this.getProperty("showCustom")) {
			//custom news scenario
			this.bNewsLoad = this.bNewsLoad || false;
			this.oManageMenuItem.setVisible(true);
			const sCustomNewsFeedKey = this.getCustomFeedKey();
			if (sCustomNewsFeedKey) {
				await this.setCustomNewsFeed(sCustomNewsFeedKey);
			} else {
				this.handleFeedError();
			}
		} else {
			this.handleFeedError();
		}
		this.fireEvent("loaded");
		this.adjustLayout();
	}

	/**
	 * Retrieves the current news group data based on the provided id.
	 *
	 * @param id - The group ID
	 * @returns The news group object that matches the extracted group ID, or `undefined`
	 *          if no matching group is found.
	 * @private
	 */
	public getCurrentNewsGroup(id: string) {
		let aValues = this._defaultNews.value;
		let aGroupId = id.split("-");
		// find the groupid from the sId
		let groupId = aGroupId?.[aGroupId.length - 1];
		let currentGroup = aValues.find((oGroup) => oGroup.group_id === groupId);
		return currentGroup;
	}

	/**
	 * Returns the custom news feed key property of NewsPanel
	 * @returns {string} custom news feed key
	 */
	public getCustomFeedKey(): string {
		return this.getProperty("customFeedKey") as string;
	}

	/**
	 * Returns the Url property of NewsPanel
	 * @returns {any}
	 */
	public getUrl(): string {
		return this.getProperty("url") as string;
	}

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
	private async initializeXmlModel(sUrl: string): Promise<XMLModel> {
		const oParent = this.getParent() as NewsAndPagesContainer;
		return new Promise((resolve) => {
			const oNewsModel = new XMLModel(sUrl);
			oNewsModel.setDefaultBindingMode("OneWay");
			oNewsModel.attachRequestCompleted((oEvent: Event) => {
				void (async () => {
					if (!this.bNewsLoad) {
						oParent?.panelLoadedFn("News", { loaded: true, count: DEFAULT_FEED_COUNT });
						this.bNewsLoad = true;
					}
					const oDocument = oEvent.getSource<XMLModel>().getData() as XMLDocument;
					await this.loadNewsFeed(oDocument, 0);
					this._eventBus.publish("KeyUserChanges", "newsFeedLoadFailed", { showError: false, date: new Date() });
					resolve(oNewsModel);
				})();
			});
			oNewsModel.attachRequestFailed(() => {
				this.handleFeedError();
				if (!this.bNewsLoad) {
					oParent?.panelLoadedFn("News", { loaded: false, count: 0 });
					this.bNewsLoad = true;
				}
				this._eventBus.publish("KeyUserChanges", "newsFeedLoadFailed", { showError: true, date: new Date() });
				resolve(oNewsModel);
			});
		});
	}

	/**
	 * Loads the news feed based on the provided document and number of feeds.
	 * Determines the feed type (RSS, feed, custom) and binds the news tile accordingly.
	 * @param {Document} oDocument - The document containing the news feed data.
	 * @param {number} [noOfFeeds] - The number of feeds to be displayed. Defaults to a predefined value.
	 */
	private async loadNewsFeed(oDocument: Document, noOfFeeds: number) {
		let oBindingInfo: IBindingInfo;
		if (!oDocument?.querySelector("customFeed") && !oDocument?.querySelector("defaultFeed")) {
			await this.extractAllImageUrls(oDocument, noOfFeeds || DEFAULT_FEED_COUNT);
		}

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
		} else if (
			(!!oDocument?.querySelector("customFeed") || !!oDocument?.querySelector("defaultFeed")) &&
			!!oDocument?.querySelector("item")
		) {
			this.destroyAggregation("newsItems");
			oBindingInfo = {
				path: "/item/",
				length: noOfFeeds || DEFAULT_FEED_COUNT
			};
		} else {
			this.handleFeedError();
			return;
		}
		this.bindNewsTile(this.oNewsTile, oBindingInfo);
	}

	/**
	 * Handles errors that occur during the loading of the news feed.
	 * @returns {void}
	 */
	public handleFeedError(): void {
		if (this.getProperty("showCustom") || this.getUrl() === DEFAULT_NEWS_URL) {
			this.generateErrorMessage().setVisible(true);
			this.oNewsTile.setVisible(false);
		} else {
			(this.getNewsWrapper()?.getParent() as FlexBox).setVisible(false);
			this.setProperty("newsAvailable", false);
			this.oManageMenuItem.setVisible(false);
		}
	}

	public async setURL(url: string) {
		this.setProperty("showCustom", false);
		this.setProperty("newsAvailable", true);
		this.generateErrorMessage().setVisible(false);
		(this.getNewsWrapper()?.getParent() as FlexBox).setVisible(true);
		this.oNewsTile.setVisible(true);
		this.setProperty("url", url);
		await this.getData();
	}

	/**
	 * Adjust layout based on the device type
	 *
	 * @private
	 */
	public adjustLayout() {
		if (this.getDeviceType() === DeviceType.Mobile) {
			this.oNewsTile.setHeight("11rem");
			this.generateErrorMessage().setWidth("100%");
			this.oNewsTile.removeStyleClass("sapUiSmallMarginTop");
		} else {
			this.oNewsTile.setHeight("17rem");
			(this.getNewsWrapper()?.getParent() as FlexBox).setWidth("100%");
		}
	}

	/**
	 * Binds the news tile with the provided binding information.
	 * @param {sap.m.SlideTile} oSlideTile - The SlideTile control to be bound.
	 * @param {IBindingInfo} oBindingInfo - The binding information containing the path and length of the aggregation.
	 */
	private bindNewsTile(oSlideTile: SlideTile, oBindingInfo: IBindingInfo): void {
		if (oBindingInfo) {
			if (!oSlideTile.getBinding("tiles")) {
				oSlideTile.bindAggregation("tiles", {
					path: oBindingInfo.path,
					length: oBindingInfo.length,
					templateShareable: false,
					factory: (sId: string, oContext: Context) => {
						const newsInfo = oContext.getObject() as XMLDocument;
						let oTile;
						if (newsInfo.getElementsByTagName("link").length > 0) {
							oTile = new NewsItem(recycleId(`${sId}-news-item`), {
								url: newsInfo.getElementsByTagName("link")[0].textContent as string,
								title: newsInfo.getElementsByTagName("title")[0].textContent as string,
								subTitle: newsInfo.getElementsByTagName("description")[0].textContent as string,
								imageUrl: newsInfo.getElementsByTagName("imageUrl")[0].textContent as string,
								footer: this.formatDate(newsInfo.getElementsByTagName("pubDate")[0].textContent as string)
							});
						} else {
							let sGroupId = (newsInfo.getElementsByTagName("id")?.[0]?.textContent as string) ?? "";
							let newsId = sGroupId ? sId + "-newsgroup-" + sGroupId : sId + "-newsgroup";
							let subTitleNews = newsInfo.getElementsByTagName("subTitle")?.[0]?.textContent ?? "";
							oTile = new NewsGroup(recycleId(newsId), {
								title: newsInfo.getElementsByTagName("title")[0].textContent as string,
								subTitle: subTitleNews || (this._i18nBundle.getText("newsFeedDescription") as string),
								imageUrl: newsInfo.getElementsByTagName("imageUrl")?.[0]?.textContent as string,
								footer: newsInfo.getElementsByTagName("footer")?.[0]?.textContent as string
							});
						}
						this.addAggregation("newsItems", oTile, true);
						return oTile.getTile();
					}
				});
			}
		}
	}

	/**
	 * Extracts images for all the news tiles
	 * @param {Document} oDocument - The document containing the news feed data.
	 * @param {number} [noOfFeeds] - The number of feeds to be displayed. Defaults to a predefined value.
	 */
	private async extractAllImageUrls(oDocument: Document, noOfFeeds: number) {
		for (let i = 0; i < noOfFeeds; i++) {
			const oItemElement = oDocument?.getElementsByTagName("item")[i];
			const sUrl: string = await this.extractImage(oItemElement.getElementsByTagName("link")[0].textContent as string);
			const oImageUrl = oDocument.createElement("imageUrl");
			oImageUrl.textContent = sUrl;
			oItemElement.appendChild(oImageUrl);
		}
	}

	/**
	 * Converts the given date to a relative date-time format.
	 * @param {string} timeStamp - The timestamp to be converted.
	 * @returns {string} The date in relative date-time format.
	 */
	private formatDate(timeStamp: string): string {
		const relativeDateFormatter = DateFormat.getDateTimeInstance({
			style: "medium",
			relative: true,
			relativeStyle: "short"
		});
		return relativeDateFormatter.format(new Date(timeStamp));
	}

	/**
	 * Returns the favourite news feed for the custom news
	 * @returns {IFavNewsFeed}
	 * @private
	 */
	public getFavNewsFeed() {
		return this.favNewsFeed;
	}

	/**
	 * Extracts the image URL from the provided HREF link or link.
	 * @param {string} sHrefLink - The HREF link containing the image URL.
	 * @returns {Promise} A promise that resolves to the extracted image URL.
	 */
	private extractImage(sHrefLink: string): Promise<string> {
		const fnLoadPlaceholderImage = () => {
			const sPrefix = sap.ui.require.toUrl("sap/cux/home/utils");
			this.image = this.image ? this.image + 1 : 1;
			this.image = this.image < 9 ? this.image : 1;
			return `${sPrefix}/imgNews/${this.image}.jpg`;
		};

		return fetch(sHrefLink)
			.then((res) => res.text())
			.then((sHTML) => {
				const aMatches = sHTML.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i);
				return Array.isArray(aMatches) && aMatches[1] ? aMatches[1] : fnLoadPlaceholderImage();
			})
			.catch(fnLoadPlaceholderImage);
	}

	/**
	 * Checks if the custom file format is CSV based on the custom file name.
	 *
	 * @param {string} fileName - The custom file name.
	 * @returns {boolean} True if the file format is CSV, otherwise false.
	 */
	private isCSVFileFormat(fileName: string): boolean {
		return fileName.split(".").pop()?.toLowerCase() === ("csv" as string);
	}
	/**
	 * Sets the favorite news feed for the user by retrieving personalization data.
	 *
	 * This method asynchronously fetches the user's personalization data and updates
	 * the `favNewsFeed` property with the favorite news feed information.
	 *
	 * @returns {Promise<void>} A promise that resolves when the favorite news feed is set.
	 * @private
	 */
	private async setFavNewsFeed(defaultFeed?: boolean): Promise<void> {
		const personalizer = await this._getUserPersonalization();
		const persData = await personalizer?.read();
		this.favNewsFeed = (defaultFeed ? persData?.defaultNewsFeed : persData?.favNewsFeed) as IFavNewsFeed;
	}

	/**
	 * This method retrieves the count and feeds of the custom news feed asynchronously.
	 * If the count is not zero, it loads the custom news feed data and returns the feeds.
	 * @param {string} sFeedId - The ID of the custom news feed to set.
	 * @returns {Promise} A promise that resolves to an array of news feeds.
	 * @private
	 */
	public async setCustomNewsFeed(sFeedId: string): Promise<void> {
		try {
			this.oNewsTile.setVisible(true);
			this.generateErrorMessage().setVisible(false);
			await this.setFavNewsFeed(!sFeedId);
			const customFileName = this.getProperty("customFileName") as string;
			const showAllPrepRequired = this.isCSVFileFormat(customFileName)
				? false
				: (this.favNewsFeed?.showAllPreparationRequired ?? true);

			if (this.isCSVFileFormat(customFileName)) {
				CUSTOM_NEWS_FEED.EXCLUDE_FIELDS.push("PreparationRequired");
			}
			let aFeeds;
			if (sFeedId) {
				aFeeds = await this.getCustomNewsFeed(sFeedId, showAllPrepRequired);
			} else {
				aFeeds = await this.getCustomNewsFeed("", true);
			}

			if (aFeeds.length === 0) {
				throw new Error("Error: No news feed available");
			}
			//filer selected feeds from all news feed
			if (this.favNewsFeed?.items?.length) {
				aFeeds = aFeeds.filter((oNewsFeed) => {
					//return this.favNewsFeed?.items.includes(oNewsFeed.title) || this.mandatoryNewsFeed.includes(oNewsFeed.title);
					return this.favNewsFeed?.items.includes(oNewsFeed.title);
				});
			} else if (this.favNewsFeed?.items?.length === 0) {
				(this.getParent() as NewsAndPagesContainer)?.panelLoadedFn("News", { loaded: true, count: 0 });
				throw new Error("Error: No fav news feed available");
			}
			await this.loadCustomNewsFeed(aFeeds, sFeedId ? "customFeed" : "defaultFeed");
		} catch (err) {
			Log.error(err as string);
			this.handleFeedError();
		}
	}

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
	private filterMandatoryNews(newsGroups: ICustomNewsFeed[]) {
		return newsGroups.filter((group) => {
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
	}

	/**
	 * Retrieves the default news feed details from the given OData response.
	 *
	 * @param newsResponse - The OData response containing the news feed data.
	 * @param showAllPreparationRequired - A boolean flag indicating whether to filter news items that require preparation.
	 * @returns An array of default news feed items.
	 * @private
	 */
	private getDefaultNewsFeedDetails(newsResponse: ODataResponse) {
		let aNews: ICustomNewsFeed[] = JSON.parse(JSON.stringify(newsResponse.value || [])) as ICustomNewsFeed[];
		const aDefaultNews: ICustomNewsFeed[] = [];
		const oDefaultFeedDict = {} as Record<string, string>;
		this.mandatoryNewsFeed = [];
		if (aNews?.length > 0) {
			this.mandatoryNewsFeed = this.filterMandatoryNews(aNews).map((oFeed) => oFeed.title);

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
	}

	/**
	 * Returns the mandatory news feed details
	 * If the mandatory news feed is not set, it returns an empty array.
	 *
	 * @returns {ICustomNewsFeed[]} The mandatory news feed details.
	 * @private
	 */
	public getMandatoryDefaultNewsFeed() {
		return this.mandatoryNewsFeed || [];
	}

	/**
	 * Retrieves the default news response, either from cache or by fetching it.
	 * @returns {Promise<ODataResponse>} A promise that resolves to the default news data
	 * @private
	 */
	private getDefaultNewsResponse(): Promise<ODataResponse> {
		// Return cached data if available
		if (this._defaultNews) {
			return Promise.resolve(this._defaultNews);
		}

		if (!this._defaultNewsPromise) {
			this._defaultNewsPromise = this.fetchDefaultNews();
		}

		return this._defaultNewsPromise;
	}

	/**
	 * Fetches the default news data from the server.
	 * @returns {Promise<ODataResponse>} A promise that resolves to the fetched news data
	 * @throws {Error} If the network request fails or returns a non-OK status
	 * @private
	 */
	private async fetchDefaultNews(): Promise<ODataResponse> {
		try {
			const response = await fetch(DEFAULT_NEWS_URL);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			this._defaultNews = (await response.json()) as ODataResponse;
			return this._defaultNews;
		} catch (error) {
			this._defaultNewsPromise = null;
			Log.error(error as string);
			throw error;
		}
	}

	/**
	 * Retrieves a custom news feed based on the provided feed ID.
	 * If no feed ID is provided, it returns the default news feed.
	 *
	 * @param {string} sFeedId - The ID of the custom news feed to retrieve. If not provided, the default news feed is returned.
	 * @param {boolean} showAllPreparationRequired - A flag indicating whether to show all preparation required.
	 * @returns {Promise<ICustomNewsFeed[]>} A promise that resolves to an array of custom news feed items.
	 * @private
	 */
	public async getCustomNewsFeed(sFeedId: string, showAllPreparationRequired: boolean): Promise<ICustomNewsFeed[]> {
		if (!sFeedId) {
			await this.getDefaultNewsResponse();
			let aDefaultgroups = this.getDefaultNewsFeedDetails(this._defaultNews);
			return aDefaultgroups;
		} else {
			return this.getCustomFeedData(sFeedId, showAllPreparationRequired);
		}
	}

	/**
	 * Retrieves custom news feed items identified by the provided feed ID and settings.
	 * It processes the response data and returns an array of custom news feed items.
	 * @param {string} sFeedId - The ID of the custom news feed.
	 * @param {boolean} showAllPreparationRequired - Indicates whether to show all preparation required.
	 * @returns {Promise} A Promise that resolves to an array of custom news feed items.
	 * @private
	 */
	private async getCustomFeedData(sFeedId: string, showAllPreparationRequired: boolean): Promise<ICustomNewsFeed[]> {
		try {
			const newsDetailUrl = this.getNewsFeedDetailsUrl({ changeId: sFeedId, showAllPreparationRequired });
			if (!this.customNewsFeedCache.has(newsDetailUrl)) {
				this.customNewsFeedCache.set(newsDetailUrl, this.getAuthNewsFeed(newsDetailUrl));
			}
			const authorizedNewsFeeds = (await this.customNewsFeedCache.get(newsDetailUrl)) as ICustomNewsFeed[];
			const oFeedDict: { [key: string]: string } = {};
			const aFeeds: ICustomNewsFeed[] = [];
			if (authorizedNewsFeeds?.length > 0) {
				authorizedNewsFeeds.forEach((oFeed: ICustomNewsFeed) => {
					const title = oFeed[CUSTOM_NEWS_FEED.TITLE] as INewsLink;
					if (!oFeedDict[title.value]) {
						aFeeds.push({
							title: title.value,
							footer: (oFeed[CUSTOM_NEWS_FEED.VALIDITY] as INewsLink).value,
							imageUrl: this.getCustomFeedImage(title.value)
						});
						oFeedDict[title.value] = title.value;
					}
				});
			}
			return aFeeds; // group details
		} catch (err) {
			Log.error(err as string);
			throw new Error(err as string);
		}
	}

	/**
	 * Generates the URL for retrieving news feed details based on the provided news object.
	 * The generated URL limits the number of results to 999.
	 * @param {INewsItem} oNews - The news object containing properties such as changeId, title, and showAllPreparationRequired.
	 * @returns {string} The URL for retrieving news feed details.
	 */
	public getNewsFeedDetailsUrl(oNews: INewsItem) {
		let sUrl = NEWS_FEED_READ_API + "?$filter=ChangeId eq " + "'" + oNews.changeId + "'";
		const customFileName = this.getProperty("customFileName") as string;
		if (!this.isCSVFileFormat(customFileName) && oNews.showAllPreparationRequired) {
			sUrl = sUrl + " and PreparationRequired eq true";
		}
		return sUrl + "&$top=999";
	}

	/**
	 * Retrieves the news feed from the specified URL after applying authorization filtering based on the available apps.
	 * If the news feed contains impacted artifacts, it checks if the current user has access to any of the impacted apps.
	 * If the user has access to at least one impacted app, the news feed is included in the returned array.
	 * @param {string} sNewsUrl - The URL of the news feed.
	 * @returns {Array} The filtered array of news feed items authorized for the user.
	 */
	public async getAuthNewsFeed(sNewsUrl: string, newsTitle?: string) {
		try {
			const [aAvailableApps, aNewsFeed] = await Promise.all([
				this.getAllAvailableApps(),
				this.getNewsFeedDetails(sNewsUrl, newsTitle)
			]);
			if (aAvailableApps.length === 0) {
				return aNewsFeed;
			}
			return this.arrangeNewsFeeds(aNewsFeed, aAvailableApps);
		} catch (err) {
			Log.error(err as string);
		}
	}

	/**
	 * If the news feed contains impacted artifacts, it checks if the current user has access to any of the impacted apps.
	 * If the user has access to at least one impacted app, the news feed is included in the returned array.
	 * @param {ICustomNewsFeed[]} aNewsFeed - array of news feed
	 * @param {IAvailableApp[]} aAvailableApps - array of all availabel apps
	 * @returns {Array} The filtered array of news feed items authorized for the user.
	 */
	private arrangeNewsFeeds(aNewsFeed: ICustomNewsFeed[], aAvailableApps: IAvailableApp[]) {
		const aAuthNewsFeed: ICustomNewsFeed[] = [];

		aNewsFeed.forEach((oNewsFeed: ICustomNewsFeed) => {
			if ((oNewsFeed.Category as INewsLink).value !== "App" || !(oNewsFeed.ImpactedArtifacts as INewsLink).value) {
				aAuthNewsFeed.push(oNewsFeed);
			} else {
				const aImpactedArtifacts: string[] = (oNewsFeed.ImpactedArtifacts as INewsLink).value.split("\n");
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
	}

	/**
	 * takes all available apps list and the impacted atifact from the news and returns if it's valid
	 * @param {IAvailableApp[]} aAvailableApps - Array of all available apps
	 * @param {string} oImpactedArtifact - impacted artifact form the news
	 * @returns {boolean} checks if the news is authenticated with the available apps list
	 */
	private isAuthFeed(aAvailableApps: IAvailableApp[], oImpactedArtifact: string) {
		const fioriIdSplitter = "|";
		if (oImpactedArtifact.includes(fioriIdSplitter)) {
			const aTokens = oImpactedArtifact.split(fioriIdSplitter);
			const sFioriId = (aTokens[aTokens.length - 1] || "").trim();
			if (sFioriId) {
				const index = aAvailableApps.findIndex((oApp: IAvailableApp) => {
					return sFioriId === oApp?.signature?.parameters["sap-fiori-id"]?.defaultValue?.value;
				});
				return index > -1;
			}
		}
		return true;
	}

	/**
	 * Retrieves all available apps from the ClientSideTargetResolution service for authorization filtering.
	 * @returns {Array} An array of available apps.
	 */
	private async getAllAvailableApps(): Promise<IAvailableApp[]> {
		try {
			const oService = await Container.getServiceAsync<IAppConfiguration>("ClientSideTargetResolution");
			return oService?._oAdapter._aInbounds || [];
		} catch (err) {
			if (err instanceof Error) {
				Log.error(err.message);
			}
			return [];
		}
	}

	/**
	 * Retrieves the news feed details from the specified URL, including translation and formatting of field labels.
	 * @param {string} sUrl - The URL of the news feed details.
	 * @returns {Array} The array of news feed items with translated and formatted field labels.
	 */
	private async getNewsFeedDetails(sUrl: string, newsTitle?: string): Promise<ICustomNewsFeed[]> {
		if (this.customNewsFeedCache.has(sUrl)) {
			const newsFeedDetails = await this.customNewsFeedCache.get(sUrl);
			return this.filterNewsOnTitle(newsFeedDetails as ICustomNewsFeed[], newsTitle);
		}

		const fnFormattedLabel = (sLabel: string) => sLabel.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
		const [newsResponse, translationResponse] = await Promise.all([
			HttpHelper.GetJSON(sUrl) as Promise<{ value: ICustomNewsFeed[] }>,
			this.getTranslatedText(this.getCustomFeedKey())
		]);
		let aNews: ICustomNewsFeed[] = JSON.parse(JSON.stringify((newsResponse as INewsResponse).value || [])) as ICustomNewsFeed[];
		const aTranslation = JSON.parse(JSON.stringify((translationResponse as INewsResponse).value || [])) as ITranslatedText[];
		aNews = this.filterNewsOnTitle(aNews, newsTitle);
		return aNews.map((oNews: ICustomNewsFeed) => {
			const aFields = Object.keys(oNews);
			const aExpandFields: INewsLink[] = [];
			aFields.forEach((oField) => {
				const oTranslatedField = aTranslation.find(
					(oTranslation: ITranslatedText) => oTranslation?.ColumnName?.toUpperCase() === oField.toUpperCase()
				);
				const oTranslatedFieldName = (oTranslatedField?.TranslatedName as string) || fnFormattedLabel(oField);
				oNews[oField] = { label: oTranslatedFieldName, value: oNews[oField] as string } as INewsLink;
				if (!CUSTOM_NEWS_FEED.EXCLUDE_FIELDS.includes(oField)) {
					aExpandFields.push(oNews[oField] as INewsLink);
				}
			});
			oNews.Link = {
				label: this._i18nBundle.getText("readMoreLink") as string,
				value: oNews[CUSTOM_NEWS_FEED.LINK] as string,
				text: "Link"
			};
			oNews.expanded = aNews.length === 1;
			oNews.expandFields = aExpandFields;
			return oNews;
		});
	}

	/**
	 * Filters the news feed data based on the LOB title for the news detail dialog
	 *
	 * @private
	 * @param {ICustomNewsFeed[]} aNews complete news feed data
	 * @param {?string} [newsTitle] title of the line of business to be filtered on
	 * @returns {ICustomNewsFeed[]} filtered news feed for provided LOB title
	 */
	private filterNewsOnTitle(aNews: ICustomNewsFeed[], newsTitle?: string): ICustomNewsFeed[] {
		if (newsTitle) {
			return aNews.filter((newsDetail: ICustomNewsFeed) => {
				return (newsDetail.LineOfBusiness as INewsLink).value === newsTitle;
			});
		}
		return aNews;
	}

	/**
	 * Retrieves translated text for news feed fields based on the specified feed ID.
	 * @param {string} sFeedId - The ID of the custom news feed
	 * @returns {Promise} A promise resolving to the translated text for news feed fields.
	 */
	private getTranslatedText(sFeedId: string) {
		try {
			const sUrl = NEWS_FEED_TRANSLATION_API + "?$filter=Changeid eq '" + sFeedId + "'";
			if (!this.customNewsFeedCache.has(sUrl)) {
				this.customNewsFeedCache.set(sUrl, HttpHelper.GetJSON(sUrl) as Promise<ICustomNewsFeed[]>);
			}
			return this.customNewsFeedCache.get(sUrl);
		} catch (err) {
			if (err instanceof Error) {
				Log.error(err.message);
			}
			return [];
		}
	}

	/**
	 * Loads custom news feed into the news panel after parsing JSON feed data to XML format.
	 * @param {Array} feeds - The array of custom news feed items.
	 */
	private async loadCustomNewsFeed(feeds: ICustomNewsFeed[], feedType: string) {
		const oXMLResponse = this.parseJsonToXml(JSON.parse(JSON.stringify(feeds)) as JSON[], feedType);
		const oParent = this.getParent() as NewsAndPagesContainer;
		if (!this.oNewsModel) {
			this.oNewsModel = new XMLModel(oXMLResponse);
			if (!this.bNewsLoad) {
				oParent?.panelLoadedFn("News", { loaded: true, count: DEFAULT_FEED_COUNT });
				this.bNewsLoad = true;
			}
			this.oNewsTile.setModel(this.oNewsModel);
		} else {
			this.oNewsTile.unbindAggregation("tiles", false); // Unbind the bound aggregation
			this.oNewsTile.destroyAggregation("tiles"); // Removes old tiles
			this.oNewsModel.setData(oXMLResponse);
		}
		await this.loadNewsFeed(oXMLResponse, feeds.length);
	}

	/**
	 * Parses JSON data into XML format.
	 * @param {JSON[]} json - The JSON data to be parsed into XML.
	 * @returns {XMLDocument} The XML document representing the parsed JSON data.
	 */
	private parseJsonToXml(json: JSON[], feedType: string): XMLDocument {
		const _transformJsonForXml = (aData: JSON[]) => aData.map((data: JSON) => ({ item: data }));
		const _jsonToXml = (json: JSON) => {
			let xml = "";
			let key: string;
			for (key in json) {
				const value = json[key as keyof typeof json];
				if (value) {
					if (typeof value === "object") {
						xml += `<${key}>${_jsonToXml(value)}</${key}>`;
					} else {
						xml += `<${key}>${value as string}</${key}>`;
					}
				}
			}
			return xml.replace(/<\/?\d+>/g, "");
		};
		const transformedJson: JSON = JSON.parse(JSON.stringify(_transformJsonForXml(json))) as JSON;
		let xml = "<?xml version='1.0' encoding='UTF-8'?>";
		const rootToken = feedType;
		xml += `<${rootToken}>`;
		xml += _jsonToXml(transformedJson);
		xml += `</${rootToken}>`;
		xml = xml.replaceAll("&", "&amp;");
		const parser = new DOMParser();
		return parser.parseFromString(xml, "text/xml");
	}

	/**
	 * Randomly selects an image from the available images for the feed item.
	 * @param {string} sFileName - The file name of the custom news feed item.
	 * @returns {string} The URL of the image for the feed item.
	 * @private
	 */
	private getCustomFeedImage(sFileName: string) {
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
	}

	/**
	 * Retrieves the default feed image for a given news feed.
	 *
	 * @param {ICustomNewsFeed} oFeed - The custom news feed object.
	 * @returns {string} The base64 encoded image string with the appropriate MIME type, or an empty string if no valid image is found.
	 * @private
	 */
	private getDefaultFeedImage(oFeed: ICustomNewsFeed): string {
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
	}

	/**
	 * Converts a base64 URL string to a standard base64 string.
	 *
	 * @param {string} base64Url - The base64 URL string to convert.
	 * @returns {string} The converted base64 string.
	 * @private
	 */
	private base64UrlToBase64(base64Url: string) {
		let base64 = base64Url?.replace(/_/g, "/").replace(/-/g, "+");

		// Add padding if missing (Base64 should be a multiple of 4)
		while (base64.length % 4 !== 0) {
			base64 += "=";
		}
		return base64;
	}

	/**
	 * Checks if a string is a valid base64 encoded string.
	 * @param input The string to validate
	 * @returns boolean indicating if the string is valid base64
	 * @private
	 */
	private isValidBase64(input: string): boolean {
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
	}

	private _getUserPersonalization() {
		const persContainerId = PersonalisationUtils.getPersContainerId(this);
		const ownerComponent = PersonalisationUtils.getOwnerComponent(this) as Component;
		return UshellPersonalizer.getInstance(persContainerId, ownerComponent);
	}
}
