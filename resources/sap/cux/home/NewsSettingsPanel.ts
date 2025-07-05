/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *  * (c) Copyright 2009-2025 SAP SE. All rights reserved
 */

import HBox from "sap/m/HBox";
import Label from "sap/m/Label";
import List from "sap/m/List";
import ListItemBase from "sap/m/ListItemBase";
import StandardListItem from "sap/m/StandardListItem";
import Switch from "sap/m/Switch";
import Text from "sap/m/Text";
import Title from "sap/m/Title";
import VBox from "sap/m/VBox";
import Component from "sap/ui/core/Component";
import Control from "sap/ui/core/Control";
import BaseSettingsPanel from "./BaseSettingsPanel";
import NewsPanel, { ICustomNewsFeed } from "./NewsPanel";
import { getInvisibleText } from "./utils/Accessibility";
import { SETTINGS_PANELS_KEYS } from "./utils/Constants";
import { addFESRSemanticStepName, FESR_EVENTS } from "./utils/FESRUtil";
import PersonalisationUtils from "./utils/PersonalisationUtils";
import UshellPersonalizer from "./utils/UshellPersonalizer";

interface IFavNewsFeed {
	items: string[];
	showAllPreparationRequired?: boolean;
}

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
export default class NewsSettingsPanel extends BaseSettingsPanel {
	private oShowSwitch!: Switch;
	private oCustNewsSwitchContainer!: HBox;
	private oList!: List;
	private oPersonalizer!: UshellPersonalizer;
	private oNewsPanel!: NewsPanel;
	private aFavNewsFeed!: ICustomNewsFeed[] | string[];
	private headerText!: Text;
	private title!: Title;

	/**
	 * Init lifecycle method
	 *
	 * @public
	 * @override
	 */
	public init(): void {
		super.init();

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
	}

	/**
	 * Returns the content for the News Settings Panel.
	 *
	 * @private
	 * @returns {Control} The control containing the News Settings Panel content.
	 */
	private getContent(): Control {
		const oHeader = this.setHeader();
		const oTitle = this.setTitleMessage();
		const oContentVBox = new VBox(this.getId() + "--idNewsPageOuterVBoX", {
			alignItems: "Start",
			justifyContent: "SpaceBetween",
			items: [oHeader, oTitle, this.setNewsList()]
		});
		return oContentVBox;
	}

	/**
	 * Get personalization instance
	 */
	private async getPersonalization() {
		if (!this.oPersonalizer) {
			this.oPersonalizer = await UshellPersonalizer.getInstance(
				PersonalisationUtils.getPersContainerId(this._getPanel()),
				PersonalisationUtils.getOwnerComponent(this._getPanel()) as Component
			);
		}
		return this.oPersonalizer;
	}

	/**
	 * Returns the content for the News Settings Panel Header.
	 *
	 * @private
	 * @returns {sap.ui.core.Control} The control containing the News Settings Panel's Header content.
	 */
	private setHeader() {
		this.headerText = new Text(this.getId() + "--idCustNewsFeedSettingsText", {
			text: this._i18nBundle.getText("newsFeedSettingsText")
		});
		const oHeaderVBox = new VBox(this.getId() + "--idCustNewsFeedSettingsTextContainer", {
			alignItems: "Start",
			justifyContent: "SpaceBetween",
			items: [this.headerText]
		}).addStyleClass("sapUiSmallMarginTop sapUiSmallMarginBegin");
		return oHeaderVBox;
	}

	/**
	 * Returns the content for the News Settings Panel Title description.
	 *
	 * @private
	 * @returns {sap.ui.core.Control} The control containing the News Settings Panel's Title description.
	 */
	private setTitleMessage() {
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
	}

	/**
	 * Returns the content for the news List
	 *
	 * @private
	 * @returns {sap.ui.core.Control} The control containing the News Settings Panel's List
	 */
	private setNewsList() {
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
			ariaLabelledBy: [
				oInvisibleText.getId(),
				`${this.getId()}--idCustNewsFeedSettingsText`,
				`${this.getId()}--idCustNewsFeedSettignsTitle`
			]
		});
		//Outer VBox
		const oNewsListVBox = new VBox(this.getId() + "--idCustNewsFeedListContainer", {
			direction: "Column",
			items: [this.oList, oShowAllPrep, oInvisibleText],
			width: "96%"
		}).addStyleClass("sapUiSmallMarginTop sapUiSmallMarginBegin");
		return oNewsListVBox;
	}

	/**
	 * Checks if the custom file format is CSV based on the custom file name.
	 *
	 * @param {string} fileName - The custom file name.
	 * @returns {boolean} True if the file format is CSV, otherwise false.
	 */
	private isCSVFileFormat(fileName: string): boolean {
		return fileName.split(".").pop()?.toLowerCase() === "csv";
	}

	/**
	 *
	 * Saves news feed settings and shows news feed based on selection change of list of switch
	 *
	 * @private
	 */
	private async saveNewsFeedSettings() {
		const aSelectedNewsFeed: string[] = this.oList.getSelectedItems().map((item: ListItemBase) => {
			return (item as StandardListItem).getTitle();
		});
		const feedKey = this.oNewsPanel.getCustomFeedKey();

		const customFileName = this.oNewsPanel.getProperty("customFileName") as string;
		let oFavNewsFeed;
		if (feedKey) {
			oFavNewsFeed = {
				items: aSelectedNewsFeed,
				showAllPreparationRequired: this.isCSVFileFormat(customFileName) ? false : this.oShowSwitch.getState()
			} as IFavNewsFeed;
		} else {
			oFavNewsFeed = {
				items: aSelectedNewsFeed
			};
		}
		const oPersonalizer = await this.getPersonalization();
		const oPersData = (await oPersonalizer.read()) || {};
		if (feedKey) {
			oPersData.favNewsFeed = oFavNewsFeed;
		} else {
			oPersData.defaultNewsFeed = oFavNewsFeed;
		}
		await oPersonalizer.write(oPersData);
		//get the latest value of switch and set the state
		this.oShowSwitch.setState(oFavNewsFeed.showAllPreparationRequired);
		//load news feed
		await this.oNewsPanel.setCustomNewsFeed(feedKey);
	}
	/** Set items for the NewsList
	 * @param {Array} [aItems] news items to be set as items aggregation
	 * @private
	 */
	private setItems(aItems: ICustomNewsFeed[]) {
		this.oList.destroyAggregation("items", true);
		(aItems || []).forEach((oItem: ICustomNewsFeed, i: number) => {
			const oCustomListItem = new StandardListItem(this.getId() + "--idCustNewsFeedItem" + "--" + i, {
				title: oItem.title,
				selected: oItem.selected as boolean
				// blocked: oItem.blocked as boolean
			});
			//.addStyleClass("newsListItem");
			this.oList.addItem(oCustomListItem);
		});
	}

	/**
	 * Loads news feed settings
	 *
	 * @returns {Promise} resolves to news feed settings
	 */
	private async loadNewsFeedSettings() {
		this.oNewsPanel = this._getPanel() as NewsPanel;
		const sFeedKey = this.oNewsPanel.getCustomFeedKey();
		const oPersonalizer = await this.getPersonalization();
		const oPersData = await oPersonalizer.read();
		const aPersNewsFeed = (sFeedKey ? oPersData?.["favNewsFeed"] : oPersData?.["defaultNewsFeed"]) as IFavNewsFeed;
		let showAllPreparationRequired = false;
		showAllPreparationRequired = aPersNewsFeed?.showAllPreparationRequired ?? !aPersNewsFeed;

		const customFileName = this.oNewsPanel.getProperty("customFileName") as string;

		let mandatoryNewsFeed: string[] = [];
		if (this.isCSVFileFormat(customFileName) || !sFeedKey) {
			this.oCustNewsSwitchContainer.setVisible(false);
		}

		let aNewsFeed: ICustomNewsFeed[] = await this.oNewsPanel.getCustomNewsFeed(sFeedKey, false);
		if (!sFeedKey) {
			this.headerText.setText(this._i18nBundle.getText("defaultNewsSettingsText"));
			this.title.setText(this._i18nBundle.getText("defaultNewsSettingsHeading"));
			mandatoryNewsFeed = this.oNewsPanel.getMandatoryDefaultNewsFeed();
		} else {
			this.headerText.setText(this._i18nBundle.getText("newsFeedSettingsText"));
			this.title.setText(this._i18nBundle.getText("newsFeedSettingsHeading"));
		}
		if (aNewsFeed && aNewsFeed.length > 0) {
			this.aFavNewsFeed = (aPersNewsFeed && aPersNewsFeed.items) || aNewsFeed;
			// combine favnewsFeed with mandatory news group as mandatorynews should always be shown
			// let favMandatoryNewsSet = new Set([...this.aFavNewsFeed, ...mandatoryNewsFeed]);
			// let combinedFavMandatoryNews = Array.from(favMandatoryNewsSet);
			let combinedFavMandatoryNews = this.aFavNewsFeed;
			aNewsFeed = aNewsFeed.map((oNewsFeed: ICustomNewsFeed) => {
				const NewsFeedInFavorites = combinedFavMandatoryNews.find((oFavNewsFeed) => {
					return oFavNewsFeed === oNewsFeed.title;
				})
					? true
					: false;

				oNewsFeed.selected = !aPersNewsFeed ? true : NewsFeedInFavorites;
				oNewsFeed.blocked = !!mandatoryNewsFeed.find((feedName) => {
					return feedName === oNewsFeed.title;
				});
				return oNewsFeed;
			});
			this.aFavNewsFeed = aNewsFeed;
			this.setItems(this.aFavNewsFeed);
			this.oShowSwitch.setState(!!showAllPreparationRequired);
			return aNewsFeed;
		}
	}
}
