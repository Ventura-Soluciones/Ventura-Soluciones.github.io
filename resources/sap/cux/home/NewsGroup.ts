/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *  * (c) Copyright 2009-2025 SAP SE. All rights reserved
 */

import Button from "sap/m/Button";
import CustomListItem from "sap/m/CustomListItem";
import Dialog from "sap/m/Dialog";
import HBox from "sap/m/HBox";
import Image from "sap/m/Image";
import Label from "sap/m/Label";
import Link from "sap/m/Link";
import List from "sap/m/List";
import Text from "sap/m/Text";
import Title from "sap/m/Title";
import VBox from "sap/m/VBox";
import Event from "sap/ui/base/Event";
import CustomData from "sap/ui/core/CustomData";
import type { MetadataOptions } from "sap/ui/core/Element";
import Element from "sap/ui/core/Element";
import HTML from "sap/ui/core/HTML";
import BaseNewsItem from "./BaseNewsItem";
import { $NewsGroupSettings } from "./NewsGroup";
import NewsPanel, { ICustomNewsFeed, INewsItem, INewsLink, INewsParam } from "./NewsPanel";
import { DEFAULT_NEWS_URL } from "./utils/Constants";
import { recycleId } from "./utils/DataFormatUtils";

/**
 *
 * Class for managing and storing News Group items.
 *
 * @extends sap.cux.home.BaseNewsItem
 *
 * @author SAP SE
 * @version 0.0.1
 * @since 1.121
 *
 * @internal
 * @experimental Since 1.121
 * @private
 *
 * @alias sap.cux.home.NewsGroup
 */
export default class NewsGroup extends BaseNewsItem {
	private oNewsGroupDialog!: Dialog;
	private oNewsGroupImage!: Image;
	private oNewsList!: List;
	private currentDefaultGroup!: ICustomNewsFeed;

	constructor(idOrSettings?: string | $NewsGroupSettings);
	constructor(id?: string, settings?: $NewsGroupSettings);
	constructor(id?: string, settings?: $NewsGroupSettings) {
		super(id, settings);
	}

	static readonly metadata: MetadataOptions = {
		library: "sap.cux.home",
		aggregations: {
			/**
			 * newsItems aggregation of the news. These items will be shown in a dialog on click of the news
			 */
			newsItems: { type: "sap.cux.home.NewsItem", singularName: "newsItem", multiple: true }
		}
	};

	/**
	 * Init lifecycle method
	 *
	 * @private
	 * @override
	 */
	public init(): void {
		super.init();
		this._oTile.attachPress(this, this.pressNewsItem.bind(this));
		this.createNewsGroupDialog();
	}

	/**
	 * Handles the press event on the news item, opens the dialog.
	 * @returns {void}
	 */
	private pressNewsItem(): void {
		void this.openNewsGroupDialog();
	}

	/**
	 * Opens the dialog for news details
	 * @returns {Promise<void>}
	 */
	private async openNewsGroupDialog(): Promise<void> {
		this.oNewsList?.setBusy(true);
		const oNewsPanel = this.getParent() as NewsPanel;
		const customFileName = oNewsPanel.getProperty("customFileName") as string;
		const isCSVFileFormat = customFileName.split(".").pop()?.toLowerCase() === "csv";

		const sImageUrl = this.getImageUrl();
		const aFavNewsFeed = oNewsPanel.getFavNewsFeed();
		let aData: ICustomNewsFeed[] = [];

		if (oNewsPanel.getUrl() !== DEFAULT_NEWS_URL) {
			const oNewsConfig: INewsItem = {
				changeId: oNewsPanel.getCustomFeedKey(),
				title: this.getTitle(),
				showAllPreparationRequired: isCSVFileFormat ? false : !aFavNewsFeed ? true : aFavNewsFeed.showAllPreparationRequired
			};

			this.oNewsGroupDialog?.open();
			const sNewsFeedURL = oNewsPanel.getNewsFeedDetailsUrl(oNewsConfig);

			aData = (await oNewsPanel.getAuthNewsFeed(sNewsFeedURL, oNewsConfig.title)) as ICustomNewsFeed[];
		} else {
			this.oNewsGroupDialog?.open();
			this.currentDefaultGroup = oNewsPanel.getCurrentNewsGroup(this.getId()) as ICustomNewsFeed;
			aData = (this.currentDefaultGroup?._group_to_article as ICustomNewsFeed[]) || [];
		}
		this.oNewsGroupDialog?.setTitle(this.getTitle());
		this.oNewsGroupImage?.setSrc(sImageUrl);
		this.loadNewsDetails(aData);
	}

	/**
	 * Iterate through the provided news details data and loads the news items
	 * @param {ICustomNewsFeed[]} aNewsDetails array of news items to be shown in the list
	 * @returns {void}
	 */
	private loadNewsDetails(aNewsDetails: ICustomNewsFeed[]): void {
		this.oNewsList?.destroyAggregation("items", true);
		(aNewsDetails || []).forEach((oItem: ICustomNewsFeed, i: number) => {
			const oCustomListItem = this.generateNewsListTemplate(oItem, i);
			this.oNewsList?.addItem(oCustomListItem);
		});
		this.oNewsList?.setBusy(false);
	}

	/**
	 * Generates the custom list item templates for the news details
	 * @param {ICustomNewsFeed} oItem news feed item for binding the template
	 * @param {number} i index of the item
	 * @returns {CustomListItem} the template of list item to be shown in the dialog
	 */
	private generateNewsListTemplate(oItem: ICustomNewsFeed, i: number): CustomListItem {
		const oNewsPanel = this.getParent() as NewsPanel;
		if (oNewsPanel.getUrl() !== DEFAULT_NEWS_URL) {
			const oFieldVBox = new VBox(this.getId() + "--idNewsFieldsBox" + "--" + i).addStyleClass("newsListItemContainer");

			((oItem?.expandFields as INewsLink[]) || []).forEach((oField) => {
				oFieldVBox.addItem(
					new HBox("", {
						items: [
							new Label("", {
								text: oField.label + ":",
								tooltip: oField.label
							}),
							new Text("", {
								text: oField.value
							})
						]
					}).addStyleClass("newsListItemContainer")
				);
			});
			oFieldVBox.setVisible(false);

			return new CustomListItem(this.getId() + "--idNewsDetailItem" + "--" + i, {
				content: [
					new VBox(`${this.getId()}--newsList--${i}`, {
						items: [
							new Title(`${this.getId()}--newsTitle--${i}`, {
								text: (oItem.Title as INewsLink).value,
								titleStyle: "H6"
							}),
							new Text(`${this.getId()}--newsText--${i}`, {
								text: (oItem.Description as INewsLink).value
							}),
							new HBox(`${this.getId()}--newsHBox--${i}`, {
								items: [
									new Label(`${this.getId()}--newsLabel--${i}`, {
										text: (oItem.Type as INewsLink).label + ":",
										tooltip: (oItem.Type as INewsLink).label
									}),
									new Text(`${this.getId()}--newsItemText--${i}`, {
										text: (oItem.Type as INewsLink).value
									})
								]
							}).addStyleClass("newsListItemContainer"),
							new HBox(`${this.getId()}--newsListItemBox--${i}`, {
								items: [
									new Label(`${this.getId()}--newsListItemLabel--${i}`, {
										text: this._i18nBundle.getText("readMoreLink") + ":",
										tooltip: (oItem.Link as INewsParam).value.label + ""
									}),
									new Link(`${this.getId()}--newsListItemLink--${i}`, {
										href: (oItem.Link as INewsParam).value.value + "",
										text: (oItem.Link as INewsParam).text,
										target: "_blank"
									})
								]
							}).addStyleClass("newsListItemContainer"),
							oFieldVBox,
							new Button(`${this.getId()}--expand--${i}`, {
								text: this._i18nBundle.getText("expand") as string,
								press: this.handleShowNewsFeedDetails.bind(this),
								customData: new CustomData({
									key: "index",
									value: i
								})
							})
						]
					}).addStyleClass("newsListItemContainer")
				]
			}).addStyleClass("newsListItem");
		} else {
			return new CustomListItem(this.getId() + "--idNewsDetailItem" + "--" + i, {
				content: [
					new VBox({
						items: [
							new HTML({
								content: oItem.description as string
							})
						]
					}).addStyleClass("newsListItemContainer")
				]
			}).addStyleClass("newsListItem");
		}
	}

	/**
	 * Creates the dialog which contains the news detail items
	 * @returns {void}
	 */
	private createNewsGroupDialog(): void {
		//create the dialog template without binding
		if (!this.oNewsGroupDialog) {
			this.oNewsGroupImage = new Image(recycleId(`${this.getId()}-custNewsImage`), {
				width: "100%",
				height: "15rem",
				src: "/resources/sap/cux/home/img/CustomNewsFeed/SupplyChain/3.jpg"
			});
			this.oNewsList = new List(recycleId(`${this.getId()}-custNewsList`));
			this.oNewsGroupDialog = new Dialog(recycleId(`${this.getId()}-custNewsFeedDetailsDialog`), {
				title: this.getTitle(),
				contentWidth: "52rem",
				contentHeight: "100%",
				content: [this.oNewsGroupImage, this.oNewsList],
				buttons: [
					new Button(recycleId(`${this.getId()}-custNewsFeedDetailsCloseBtn`), {
						text: this._i18nBundle.getText("Close"),
						press: this.closeNewsGroupDialog.bind(this),
						type: "Transparent"
					})
				]
			});
			this.addDependent(this.oNewsGroupDialog);
		}
	}

	/**
	 * Closes the news details dialog
	 * @returns {void}
	 */
	private closeNewsGroupDialog(): void {
		// Close the dialog first
		if (this.oNewsGroupDialog) {
			this.oNewsGroupDialog.close();
		}
	}

	/**
	 * Handles the click on the show more button of news detail items in news group dialog
	 * @param {Event} oEvent
	 * @returns {void}
	 */
	private handleShowNewsFeedDetails(oEvent: Event): void {
		const listItemIndex = oEvent.getSource<Button>().data("index") as number;
		const fieldsVBox = Element.getElementById(this.getId() + "--idNewsFieldsBox" + "--" + listItemIndex) as VBox;
		const fieldExpanded: boolean = fieldsVBox.getVisible();
		fieldsVBox.setVisible(!fieldExpanded);
		const sButtonShowText = fieldExpanded
			? (this._i18nBundle.getText("expand") as string)
			: (this._i18nBundle.getText("collapse") as string);
		oEvent.getSource<Button>().setText(sButtonShowText);
	}
}
