/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *  * (c) Copyright 2009-2025 SAP SE. All rights reserved
 */

import Log from "sap/base/Log";
import Button from "sap/m/Button";
import CustomListItem from "sap/m/CustomListItem";
import ExpandableText from "sap/m/ExpandableText";
import FlexBox from "sap/m/FlexBox";
import GenericTile from "sap/m/GenericTile";
import HBox from "sap/m/HBox";
import Label from "sap/m/Label";
import { ButtonType } from "sap/m/library";
import List from "sap/m/List";
import { ListBase$SelectionChangeEvent } from "sap/m/ListBase";
import MessageToast from "sap/m/MessageToast";
import { SearchField$SearchEvent } from "sap/m/SearchField";
import Text from "sap/m/Text";
import VBox from "sap/m/VBox";
import Control from "sap/ui/core/Control";
import Fragment from "sap/ui/core/Fragment";
import Context from "sap/ui/model/Context";
import JSONModel from "sap/ui/model/json/JSONModel";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import Container from "sap/ushell/Container";
import Navigation, { Target } from "sap/ushell/services/Navigation";
import SearchableContent, { AppData } from "sap/ushell/services/SearchableContent";
import VisualizationInstantiation from "sap/ushell/services/VisualizationInstantiation";
import AppsContainer from "./AppsContainer";
import BaseLayout from "./BaseLayout";
import BaseSettingsPanel from "./BaseSettingsPanel";
import ContentAdditionDialog from "./ContentAdditionDialog";
import FavAppPanel from "./FavAppPanel";
import { ICustomVisualization, ICustomVizInstance, IVisualization } from "./interface/AppsInterface";
import AppManager from "./utils/AppManager";
import { AI_APP_FINDER_API, AI_APP_FINDER_BASE_URL, CONTENT_ADDITION_PANEL_TYPES, FEATURE_TOGGLES } from "./utils/Constants";

const Constants = {
	DeprecatedInfoText: "deprecated",
	MinQueryLength: 5,
	MaxDescriptionLength: 400
};

enum SearchStatus {
	Idle = "idle",
	Searching = "searching",
	Complete = "complete"
}

enum ErrorType {
	NoResultsFound = "noResultsFound",
	ServiceError = "serviceError",
	ValidationError = "validationError",
	DefaultError = "defaultError"
}

enum TileType {
	Static = "STATIC"
}

interface RawAppData {
	title: string;
	subTitle: string;
	appDescription: string;
	chipID: string;
	tileType: TileType;
	iconUrl: string;
	configuration: string;
}
interface SuggestedApp {
	icon: string;
	title: string;
	chipID: string;
	status: string[];
	subTitle: string;
	description: string;
	isStaticApp: boolean;
	addedToHomePage: boolean;
	vizData?: IVisualization;
}

interface QueryResponse {
	value: RawAppData[];
}

interface ErrorResponse {
	error: {
		code: string;
		message: string;
	};
}

interface Configuration {
	tileConfiguration: string;
}

interface TileConfig {
	display_info_text: string;
	[key: string]: string;
}

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
export default class AppsAdditionPanel extends BaseSettingsPanel {
	private appManagerInstance: AppManager = AppManager.getInstance();
	private vizInstantiationService!: VisualizationInstantiation;
	private allAvailableVisualizations!: IVisualization[];
	private userSelectedApps!: Set<CustomListItem>;
	private appSuggestionList!: List;
	private model!: JSONModel;
	private addAppsButton!: Button;
	private isPanelSupported!: boolean;

	/**
	 * Init lifecycle method
	 *
	 * @public
	 * @override
	 */
	public init(): void {
		super.init();
		this.userSelectedApps = new Set<CustomListItem>();

		//setup panel
		this.setProperty("key", CONTENT_ADDITION_PANEL_TYPES.AI_APP_FINDER);
		this.setProperty("title", this._i18nBundle.getText("addAppsAndTile"));

		//setup actions
		this._setupActions();

		//setup content
		void this._setupContent();

		//setup events
		this.attachEvent("onDialogClose", this.resetPanel.bind(this));
	}

	/**
	 * Sets up the actions for the Apps Addition Panel.
	 *
	 * @private
	 */
	private _setupActions(): void {
		this.addAppsButton = new Button(`${this.getId()}-add-app-btn`, {
			text: this._i18nBundle.getText("addFromInsightsDialogBtn"),
			type: ButtonType.Emphasized,
			press: () => {
				void this.onPressAddApps();
			}
		});

		this.addAppsButton.bindProperty("enabled", {
			parts: ["/hasError", "/searchStatus", "/userSelectedApps"],
			formatter: (hasError: boolean, searchStatus: SearchStatus, userSelectedApps: string[]) => {
				return !hasError && searchStatus === SearchStatus.Complete && userSelectedApps.length > 0;
			}
		});

		this.addActionButton(this.addAppsButton);
	}

	/**
	 * Sets up the content for the Apps Addition Panel.
	 *
	 * @private
	 * @async
	 */
	private async _setupContent(): Promise<void> {
		this.vizInstantiationService = await Container.getServiceAsync<VisualizationInstantiation>("VisualizationInstantiation");

		//load ui fragment
		const panelContent = (await Fragment.load({
			id: `${this.getId()}-content`,
			name: "sap.cux.home.utils.fragment.appsAdditionContent",
			controller: this
		})) as Control;
		this.addAggregation("content", panelContent);

		//initialize ui model
		this.model = new JSONModel({
			query: "",
			hasError: false,
			errorType: ErrorType.DefaultError,
			errorDescription: "",
			searchStatus: SearchStatus.Idle,
			loadingAnimation: this._generateSearchingAnimation(),
			suggestedAppsCount: 0,
			userSelectedApps: [],
			suggestedApps: []
		});

		panelContent.setModel(this.model);
		panelContent.setModel(new ResourceModel({ bundleName: "sap.cux.home.i18n.messagebundle" }), "i18n");
		this.addAppsButton.setModel(this.model);

		//bind suggested apps list
		this.appSuggestionList = Fragment.byId(`${this.getId()}-content`, "appsList") as List;
		this.appSuggestionList.bindAggregation("items", {
			path: "/suggestedApps",
			factory: this._generateListItem.bind(this)
		});
	}

	/**
	 * Generates a list item for the Apps Addition Panel.
	 *
	 * @private
	 * @param {string} id - The unique ID for the list item.
	 * @param {Context} context - The binding context for the list item.
	 * @returns {CustomListItem} The generated list item control.
	 */
	private _generateListItem(id: string, context: Context): CustomListItem {
		const listItem = new CustomListItem(id, {
			selected: context.getProperty("addedToHomePage") as boolean,
			content: [
				new FlexBox(`${id}-result-container`, {
					renderType: "Bare",
					wrap: "Wrap",
					direction: context.getProperty("isStaticApp") ? "Column" : "Row",
					alignItems: context.getProperty("isStaticApp") ? "Start" : "Center",
					items: [this._getAppPreviewContainer(id, context), this._getAppDetailsContainer(id, context)]
				}).addStyleClass("sapUiSmallMargin")
			]
		});

		//bind associated checkbox to disable it when the app is already added to home page
		listItem.getMultiSelectControl(true).setEnabled(!context.getProperty("addedToHomePage"));

		return listItem;
	}

	/**
	 * Creates a preview container for the suggested app.
	 *
	 * @private
	 * @param {string} id - The unique ID for the container.
	 * @param {Context} context - The binding context for the app.
	 * @returns {HBox} The app preview container.
	 */
	private _getAppPreviewContainer(id: string, context: Context): HBox {
		const container = new HBox(`${id}-suggestedAppContainer`, {
			renderType: "Bare"
		});

		if (context.getProperty("isStaticApp") as boolean) {
			// create generic tile for static app
			container.addItem(
				new GenericTile(`${id}-staticApp`, {
					mode: "IconMode",
					frameType: "TwoByHalf",
					header: context.getProperty("title") as string,
					subheader: context.getProperty("subTitle") as string,
					tileIcon: context.getProperty("icon") as string,
					visible: context.getProperty("isStaticApp") as boolean
				}).addStyleClass("suggestedTile")
			);
		} else {
			// create custom visualization for other apps
			const instance = this.vizInstantiationService.instantiateVisualization(
				context.getProperty("vizData") as ICustomVisualization
			) as ICustomVizInstance;
			instance?.setActive(true);
			instance.setClickable(false);
			container.addItem(instance);
		}

		return container;
	}

	/**
	 * Creates a details container for the suggested app.
	 *
	 * @private
	 * @param {string} id - The unique ID for the container.
	 * @param {Context} context - The binding context for the app.
	 * @returns {VBox} The app details container.
	 */
	private _getAppDetailsContainer(id: string, context: Context): VBox {
		return new VBox(`${id}-app-details-container`, {
			renderType: "Bare",
			gap: "0.5rem",
			items: [
				new Label(`${id}-descriptionLabel`, {
					text: this._i18nBundle.getText("appDescription"),
					showColon: true
				}),
				new ExpandableText(`${id}-description`, {
					text: context.getProperty("description") as string,
					maxCharacters: Constants.MaxDescriptionLength
				}),
				new HBox(`${id}-app-status-container`, {
					renderType: "Bare",
					visible: (context.getProperty("status") as string[]).length > 0,
					items: [
						new Label(`${id}-appStatusLabel`, {
							text: this._i18nBundle.getText("appStatus"),
							showColon: true
						}),
						new HBox(`${id}-app-status-texts`, {
							renderType: "Bare",
							items: this._generateStatusTexts(context.getProperty("status") as string[])
						}).addStyleClass("sapUiTinyMarginBegin statusTextsContainer")
					]
				})
			]
		}).addStyleClass((context.getProperty("isStaticApp") as boolean) ? "sapUiSmallMarginTop" : "sapUiSmallMarginBegin");
	}

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
	public async isSupported(): Promise<boolean> {
		if (this.isPanelSupported === undefined) {
			this.isPanelSupported = false;

			if (this.getFavAppPanel()) {
				try {
					const isFeatureEnabled = await this.appManagerInstance.isFeatureEnabled(FEATURE_TOGGLES.AI_SMART_APPFINDER);
					if (isFeatureEnabled) {
						const navigationService = await Container.getServiceAsync<Navigation>("Navigation");
						const [{ supported }] = await navigationService.isNavigationSupported([
							{
								target: {
									semanticObject: "IntelligentPrompt",
									action: "propose"
								}
							}
						]);

						this.isPanelSupported = supported;
					}
				} catch (error) {
					Log.error((error as Error).message);
				}
			}
		}

		//remove panel if it's not supported
		if (!this.isPanelSupported) {
			this.removeActionButton(this.addAppsButton);
			const contentAdditionDialog = this.getParent() as ContentAdditionDialog;
			contentAdditionDialog.removePanel(this);
			contentAdditionDialog.updateActionButtons();
		}

		return this.isPanelSupported;
	}

	/**
	 * Generates the searching animation SVG as a string.
	 *
	 * @private
	 * @returns {string} The SVG string for the loading animation.
	 */
	private _generateSearchingAnimation(): string {
		return `<svg height="210" fill="none">
            <g>
                <rect height="210" rx="4" fill="white"/>
                <rect x="16" y="143" width="90%" height="8" rx="4" fill="var(--sapContent_Placeholderloading_Background)"/>
                <rect x="16" y="103" width="84%" height="32" rx="4" fill="var(--sapContent_Placeholderloading_Background)"/>
                <rect x="16" y="33" width="90%" height="8" rx="4" fill="var(--sapContent_Placeholderloading_Background)"/>
                <rect x="16" y="16" width="96%" height="12" rx="4" fill="var(--sapContent_Placeholderloading_Background)"/>
            </g>
        </svg>`;
	}

	/**
	 * Resets the panel to its default state.
	 *
	 * @private
	 */
	public resetPanel(): void {
		const defaultModelProperties = {
			query: "",
			hasError: false,
			searchStatus: SearchStatus.Idle,
			suggestedAppsCount: 0,
			userSelectedApps: [],
			suggestedApps: []
		};

		this.model.setData({ ...this.model.getData(), ...defaultModelProperties } as object);
		this.userSelectedApps.clear();
	}

	/**
	 * Handles the "Go" button press event for searching suggested apps.
	 *
	 * @private
	 * @async
	 * @param {SearchField$SearchEvent} event - The search event triggered by the user.
	 */
	public async onPressGo(event: SearchField$SearchEvent): Promise<void> {
		// reset panel if clear button is pressed
		if (event.getParameter("clearButtonPressed")) {
			this.resetPanel();
			return;
		}

		// validate query
		const query = this.model.getProperty("/query") as string;
		if (!this.isValidQuery(query)) return;

		try {
			// initiate search
			this.model.setProperty("/hasError", false);
			this.model.setProperty("/searchStatus", SearchStatus.Searching);
			this.appSuggestionList.removeSelections(true);

			const rawApps = await this.fetchAppsFromSearch(query);
			// suggest apps if there are results and search is not cancelled
			if (rawApps.length > 0 && this.model.getProperty("/searchStatus") === SearchStatus.Searching) {
				const allVisualizations = await this.fetchAllAvailableVisualizations();
				const favoriteApps = await this.appManagerInstance.fetchFavVizs(true, true);
				const insightsApps = await this.appManagerInstance.fetchInsightApps(true, this._i18nBundle.getText("insights") as string);

				// generate suggested apps
				const apps = this._generateApps(rawApps, allVisualizations, [...favoriteApps, ...insightsApps]);
				const suggestedApps = await this._filterUnsupportedApps(apps);

				// update model with filtered apps
				this.model.setProperty("/suggestedApps", suggestedApps);
				this.model.setProperty("/suggestedAppsCount", suggestedApps.length);
			}
		} catch (err) {
			Log.error((err as Error).message);
			this._handleError();
		} finally {
			// update search status only if search is not cancelled
			if (this.model.getProperty("/searchStatus") === SearchStatus.Searching) {
				this.model.setProperty("/searchStatus", SearchStatus.Complete);
			}
		}
	}

	/**
	 * Filters out unsupported apps based on accessibility.
	 *
	 * @private
	 * @param {SuggestedApp[]} apps - The list of suggested apps to filter.
	 * @returns {Promise<SuggestedApp[]>} A promise that resolves to the filtered list of supported apps.
	 */
	private async _filterUnsupportedApps(apps: SuggestedApp[]): Promise<SuggestedApp[]> {
		const intents = apps.map((app) => app.vizData?.target) || [];
		const navigationService = await Container.getServiceAsync<Navigation>("Navigation");
		const supportedAppIndices = await navigationService.isNavigationSupported(intents as Target[]);

		return apps.filter((_, index) => supportedAppIndices[index]);
	}

	/**
	 * Generates suggested apps from raw app data and visualizations.
	 *
	 * @private
	 * @param {RawAppData[]} rawApps - The raw app data to process.
	 * @param {IVisualization[]} allVisualizations - All available visualizations.
	 * @param {ICustomVisualization[]} homePageVisualizations - Visualizations available in homepage.
	 * @returns {SuggestedApp[]} The list of suggested apps.
	 */
	private _generateApps(
		rawApps: RawAppData[],
		allVisualizations: IVisualization[],
		homePageVisualizations: ICustomVisualization[]
	): SuggestedApp[] {
		return rawApps.map((app) => {
			const vizData = allVisualizations.find((viz) => viz.vizId === app.chipID);
			const addedToHomePage = homePageVisualizations.some((viz) => viz.visualization?.vizId === app.chipID);
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
		}) as SuggestedApp[];
	}

	/**
	 * Validates the query string based on minimum length.
	 *
	 * @private
	 * @param {string} query - The query string to validate.
	 * @returns {boolean} True if the query is valid, otherwise false.
	 */
	private isValidQuery(query: string): boolean {
		return Boolean(query?.trim() && query.trim().length >= Constants.MinQueryLength);
	}

	/**
	 * Fetches all available visualizations for the user.
	 *
	 * @private
	 * @async
	 * @returns {Promise<IVisualization[]>} A promise that resolves to the list of visualizations.
	 */
	private async fetchAllAvailableVisualizations(): Promise<IVisualization[]> {
		if (!this.allAvailableVisualizations) {
			const searchableContentService = await Container.getServiceAsync<SearchableContent>("SearchableContent");
			const allAvailableApps = await searchableContentService.getApps({ enableVisualizationPreview: false });
			this.allAvailableVisualizations = allAvailableApps.reduce((visualizations: IVisualization[], currentApp: AppData) => {
				return visualizations.concat(currentApp.visualizations);
			}, []);
		}

		return this.allAvailableVisualizations;
	}

	/**
	 * Fetches a CSRF token for secure API requests.
	 *
	 * @private
	 * @async
	 * @returns {Promise<string | null>} A promise that resolves to the CSRF token or null if fetching fails.
	 */
	private async _fetchCSRFToken(): Promise<string | null> {
		try {
			const response = await fetch(AI_APP_FINDER_BASE_URL, { method: "GET", headers: { "X-CSRF-Token": "Fetch" } });
			return response.headers.get("X-CSRF-Token");
		} catch (error) {
			Log.error("Failed to fetch CSRF token", error as Error);
			return null;
		}
	}

	/**
	 * Fetches apps from the search API based on the query.
	 *
	 * @private
	 * @async
	 * @param {string} query - The search query string.
	 * @returns {Promise<RawAppData[]>} A promise that resolves to the list of raw app data.
	 */
	private async fetchAppsFromSearch(query: string): Promise<RawAppData[]> {
		try {
			const token = await this._fetchCSRFToken();
			const headers = {
				"Content-Type": "application/json",
				...(token && { "X-CSRF-Token": token })
			};

			const response = await fetch(AI_APP_FINDER_API, {
				method: "POST",
				headers,
				body: JSON.stringify({ UserInput: query })
			});

			// handle error responses
			if (!response.ok) {
				const errorResponse = (await response.json()) as ErrorResponse;
				this._handleError(errorResponse.error?.message || "");
				return [];
			}

			const queryResult = (await response.json()) as QueryResponse;
			return queryResult.value || [];
		} catch (error) {
			Log.error((error as Error).message);
			this._handleError();
			return [];
		}
	}

	/**
	 * Retrieves status texts for an app based on its configuration and homepage status.
	 *
	 * @private
	 * @param {string} configuration - The app's configuration string.
	 * @param {boolean} addedToHomePage - Indicates if the app is already added to the homepage.
	 * @returns {string[]} An array of status texts for the app.
	 */
	private getAppStatusTexts(configuration: string, addedToHomePage: boolean): string[] {
		let statusTexts = [];

		if (addedToHomePage) {
			statusTexts.push(this._i18nBundle.getText("alreadyAddedApp") as string);
		}
		if (configuration) {
			try {
				const parsedConfig = JSON.parse(configuration) as Configuration;
				const tileConfig = JSON.parse(parsedConfig?.tileConfiguration) as TileConfig;
				const infoText = (tileConfig?.display_info_text || "").toLowerCase();
				if (infoText === Constants.DeprecatedInfoText) {
					statusTexts.push(this._i18nBundle.getText("deprecatedApp") as string);
				}
			} catch (error: unknown) {
				Log.warning((error as Error).message);
			}
		}

		return statusTexts;
	}

	/**
	 * Generates status text controls for the provided status texts.
	 *
	 * @private
	 * @param {string[]} stausTexts - The list of status texts.
	 * @returns {Text[]} An array of Text controls with applied styles.
	 */
	private _generateStatusTexts(stausTexts: string[]): Text[] {
		return stausTexts.map((status) => {
			return new Text({
				text: this._i18nBundle.getText(status)
			}).addStyleClass(this.applyStatusClass(status));
		});
	}

	/**
	 * Applies a CSS class to the status text based on its type.
	 *
	 * @private
	 * @param {string} status - The status text to classify.
	 * @returns {string} The CSS class for the status text.
	 */
	public applyStatusClass(status: string): string {
		if (status === this._i18nBundle.getText("alreadyAddedApp")) {
			return "addedAppStatusText";
		} else if (status === this._i18nBundle.getText("deprecatedApp")) {
			return "deprecatedAppStatusText";
		} else {
			return "";
		}
	}

	/**
	 * Handles the "Add Apps" button press event to add selected apps to favorites.
	 *
	 * @private
	 * @async
	 */
	private async onPressAddApps(): Promise<void> {
		const userSelectedApps = this.model.getProperty("/userSelectedApps") as CustomListItem[];
		const vizIds = userSelectedApps.map((item) => item.getBindingContext()?.getProperty("chipID") as string);
		for (const vizId of vizIds) {
			await this.appManagerInstance.addVisualization(vizId);
		}

		// refresh the favorite apps panel
		await this.refreshFavoriteApps();
		(this.getParent() as ContentAdditionDialog).close();
		MessageToast.show(this._i18nBundle.getText("appAddedToFavorites") as string);
		this.resetPanel();
	}

	/**
	 * Retrieves the AppsContainer instance from the parent layout.
	 *
	 * @private
	 * @returns {AppsContainer | undefined} The AppsContainer instance or undefined if not found.
	 */
	private getAppsContainer(): AppsContainer | undefined {
		const layout = this.getParent()?.getParent() as BaseLayout;
		return layout.getContent().find((container) => container instanceof AppsContainer) as AppsContainer | undefined;
	}

	/**
	 * Retrieves the favorite apps panel from the AppsContainer.
	 *
	 * @private
	 * @returns {FavAppPanel | undefined} The favorite apps panel or undefined if not found.
	 */
	private getFavAppPanel(): FavAppPanel | undefined {
		return this.getAppsContainer()
			?.getContent()
			.find((panel) => panel instanceof FavAppPanel);
	}

	/**
	 * Refreshes the favorite apps panel in the AppsContainer.
	 *
	 * @private
	 * @async
	 */
	private async refreshFavoriteApps(): Promise<void> {
		await this.getAppsContainer()?.refreshPanel(this.getFavAppPanel() as FavAppPanel);
	}

	/**
	 * Handles the selection change event for the suggested apps list.
	 *
	 * @public
	 * @param {ListBase$SelectionChangeEvent} event - The selection change event.
	 */
	public onListSelectionChange(event: ListBase$SelectionChangeEvent): void {
		const listItem = event.getParameter("listItem") as CustomListItem;
		const selected = event.getParameter("selected") as boolean;

		if (!selected) this.userSelectedApps.delete(listItem);
		else {
			const context = listItem.getBindingContext();
			const addedToHomePage = context?.getProperty("addedToHomePage") as boolean;
			if (!addedToHomePage) this.userSelectedApps.add(listItem);
		}

		this.model.setProperty("/userSelectedApps", Array.from(this.userSelectedApps));
	}

	/**
	 * Handles errors by updating the model with error details.
	 *
	 * @private
	 * @param {string} [message=""] - The error message to process.
	 */
	private _handleError(message: string = ""): void {
		const [, errorCode, errorDescription] = message.match(/\((\d{2})\d*\)\s*(.*)/) || [];
		this.model.setProperty("/hasError", true);
		this.model.setProperty("/errorType", this._getErrorType(errorCode));
		this.model.setProperty("/errorDescription", errorDescription || "");
	}

	/**
	 * Determines the error type based on the provided error code.
	 *
	 * @private
	 * @param {string} [errorCode=""] - The error code to evaluate.
	 * @returns {ErrorType} The corresponding error type.
	 */
	private _getErrorType(errorCode: string = ""): ErrorType {
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
}
