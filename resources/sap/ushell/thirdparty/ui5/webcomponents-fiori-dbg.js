/*!
 * Copyright (c) 2009-2025 SAP SE, All Rights Reserved
 */
sap.ui.define([
	"sap/ushell/thirdparty/webcomponents-fiori",
  "sap/ui/base/DataType",
  "sap/ushell/thirdparty/ui5/webcomponents",
  "sap/ushell/thirdparty/ui5/webcomponents-base",
], function(
	WebCPackage,
  DataType,
) {
  "use strict";
  const { registerEnum } = DataType;

  const pkg = {
    "_ui5metadata":
{
  "name": "@ui5/webcomponents-fiori",
  "version": "2.10.0-rc.2",
  "dependencies": [
    "sap.ui.core"
  ],
  "types": [
    "@ui5/webcomponents-fiori.FCLLayout",
    "@ui5/webcomponents-fiori.IllustrationMessageDesign",
    "@ui5/webcomponents-fiori.IllustrationMessageType",
    "@ui5/webcomponents-fiori.MediaGalleryItemLayout",
    "@ui5/webcomponents-fiori.MediaGalleryLayout",
    "@ui5/webcomponents-fiori.MediaGalleryMenuHorizontalAlign",
    "@ui5/webcomponents-fiori.MediaGalleryMenuVerticalAlign",
    "@ui5/webcomponents-fiori.NavigationLayoutMode",
    "@ui5/webcomponents-fiori.NotificationListItemImportance",
    "@ui5/webcomponents-fiori.PageBackgroundDesign",
    "@ui5/webcomponents-fiori.SearchMode",
    "@ui5/webcomponents-fiori.SideContentFallDown",
    "@ui5/webcomponents-fiori.SideContentPosition",
    "@ui5/webcomponents-fiori.SideContentVisibility",
    "@ui5/webcomponents-fiori.SideNavigationItemDesign",
    "@ui5/webcomponents-fiori.TimelineGrowingMode",
    "@ui5/webcomponents-fiori.TimelineLayout",
    "@ui5/webcomponents-fiori.UploadCollectionSelectionMode",
    "@ui5/webcomponents-fiori.UploadState",
    "@ui5/webcomponents-fiori.ViewSettingsDialogMode",
    "@ui5/webcomponents-fiori.WizardContentLayout"
  ],
  "interfaces": [],
  "controls": [
    "@ui5/webcomponents-fiori.BarcodeScannerDialog",
    "@ui5/webcomponents-fiori.DynamicPage",
    "@ui5/webcomponents-fiori.DynamicPageHeader",
    "@ui5/webcomponents-fiori.DynamicPageTitle",
    "@ui5/webcomponents-fiori.DynamicSideContent",
    "@ui5/webcomponents-fiori.FilterItem",
    "@ui5/webcomponents-fiori.FilterItemOption",
    "@ui5/webcomponents-fiori.FlexibleColumnLayout",
    "@ui5/webcomponents-fiori.IllustratedMessage",
    "@ui5/webcomponents-fiori.MediaGallery",
    "@ui5/webcomponents-fiori.MediaGalleryItem",
    "@ui5/webcomponents-fiori.NavigationLayout",
    "@ui5/webcomponents-fiori.NotificationList",
    "@ui5/webcomponents-fiori.NotificationListGroupItem",
    "@ui5/webcomponents-fiori.NotificationListItem",
    "@ui5/webcomponents-fiori.Page",
    "@ui5/webcomponents-fiori.ProductSwitch",
    "@ui5/webcomponents-fiori.ProductSwitchItem",
    "@ui5/webcomponents-fiori.Search",
    "@ui5/webcomponents-fiori.SearchItem",
    "@ui5/webcomponents-fiori.SearchItemGroup",
    "@ui5/webcomponents-fiori.SearchMessageArea",
    "@ui5/webcomponents-fiori.SearchScope",
    "@ui5/webcomponents-fiori.ShellBar",
    "@ui5/webcomponents-fiori.ShellBarItem",
    "@ui5/webcomponents-fiori.ShellBarSpacer",
    "@ui5/webcomponents-fiori.SideNavigation",
    "@ui5/webcomponents-fiori.SideNavigationGroup",
    "@ui5/webcomponents-fiori.SideNavigationItem",
    "@ui5/webcomponents-fiori.SideNavigationSubItem",
    "@ui5/webcomponents-fiori.SortItem",
    "@ui5/webcomponents-fiori.Timeline",
    "@ui5/webcomponents-fiori.TimelineGroupItem",
    "@ui5/webcomponents-fiori.TimelineItem",
    "@ui5/webcomponents-fiori.UploadCollection",
    "@ui5/webcomponents-fiori.UploadCollectionItem",
    "@ui5/webcomponents-fiori.UserMenu",
    "@ui5/webcomponents-fiori.UserMenuAccount",
    "@ui5/webcomponents-fiori.UserMenuItem",
    "@ui5/webcomponents-fiori.UserSettingsDialog",
    "@ui5/webcomponents-fiori.UserSettingsItem",
    "@ui5/webcomponents-fiori.UserSettingsView",
    "@ui5/webcomponents-fiori.ViewSettingsDialog",
    "@ui5/webcomponents-fiori.Wizard",
    "@ui5/webcomponents-fiori.WizardStep"
  ],
  "elements": [],
  "rootPath": "../"
}
  };

	if (WebCPackage) {
		Object.keys(WebCPackage).forEach((key) => {
			if (key !== "default") {
				pkg[key] = WebCPackage[key];
			} else {
				if (typeof WebCPackage[key] === "object") {
					Object.assign(pkg, WebCPackage[key]);
				}
			}
		});
	}

  pkg["FCLLayout"] = {
    "OneColumn": "OneColumn",
    "TwoColumnsStartExpanded": "TwoColumnsStartExpanded",
    "TwoColumnsMidExpanded": "TwoColumnsMidExpanded",
    "ThreeColumnsMidExpanded": "ThreeColumnsMidExpanded",
    "ThreeColumnsEndExpanded": "ThreeColumnsEndExpanded",
    "ThreeColumnsStartExpandedEndHidden": "ThreeColumnsStartExpandedEndHidden",
    "ThreeColumnsMidExpandedEndHidden": "ThreeColumnsMidExpandedEndHidden",
    "ThreeColumnsStartHiddenMidExpanded": "ThreeColumnsStartHiddenMidExpanded",
    "ThreeColumnsStartHiddenEndExpanded": "ThreeColumnsStartHiddenEndExpanded",
    "MidColumnFullScreen": "MidColumnFullScreen",
    "EndColumnFullScreen": "EndColumnFullScreen",
  };
  registerEnum("@ui5/webcomponents-fiori.FCLLayout", pkg["FCLLayout"]);
  pkg["IllustrationMessageDesign"] = {
    "Auto": "Auto",
    "Base": "Base",
    "Dot": "Dot",
    "Spot": "Spot",
    "Dialog": "Dialog",
    "Scene": "Scene",
  };
  registerEnum("@ui5/webcomponents-fiori.IllustrationMessageDesign", pkg["IllustrationMessageDesign"]);
  pkg["IllustrationMessageType"] = {
    "BeforeSearch": "BeforeSearch",
    "NewMail": "NewMail",
    "NoActivities": "NoActivities",
    "NoColumnsSet": "NoColumnsSet",
    "NoData": "NoData",
    "NoMail": "NoMail",
    "NoMail_v1": "NoMail_v1",
    "NoEntries": "NoEntries",
    "NoNotifications": "NoNotifications",
    "NoSavedItems": "NoSavedItems",
    "NoSavedItems_v1": "NoSavedItems_v1",
    "NoSearchResults": "NoSearchResults",
    "NoTasks": "NoTasks",
    "NoTasks_v1": "NoTasks_v1",
    "NoDimensionsSet": "NoDimensionsSet",
    "UnableToLoad": "UnableToLoad",
    "UnableToLoadImage": "UnableToLoadImage",
    "UnableToUpload": "UnableToUpload",
    "UploadToCloud": "UploadToCloud",
    "AddColumn": "AddColumn",
    "AddPeople": "AddPeople",
    "AddDimensions": "AddDimensions",
    "BalloonSky": "BalloonSky",
    "Connection": "Connection",
    "EmptyCalendar": "EmptyCalendar",
    "EmptyList": "EmptyList",
    "EmptyPlanningCalendar": "EmptyPlanningCalendar",
    "ErrorScreen": "ErrorScreen",
    "FilterTable": "FilterTable",
    "GroupTable": "GroupTable",
    "NoFilterResults": "NoFilterResults",
    "PageNotFound": "PageNotFound",
    "ReloadScreen": "ReloadScreen",
    "ResizeColumn": "ResizeColumn",
    "SearchEarth": "SearchEarth",
    "SearchFolder": "SearchFolder",
    "SignOut": "SignOut",
    "SimpleBalloon": "SimpleBalloon",
    "SimpleBell": "SimpleBell",
    "SimpleCalendar": "SimpleCalendar",
    "SimpleCheckMark": "SimpleCheckMark",
    "SimpleConnection": "SimpleConnection",
    "SimpleEmptyDoc": "SimpleEmptyDoc",
    "SimpleEmptyList": "SimpleEmptyList",
    "SimpleError": "SimpleError",
    "SimpleMagnifier": "SimpleMagnifier",
    "SimpleMail": "SimpleMail",
    "SimpleNoSavedItems": "SimpleNoSavedItems",
    "SimpleNotFoundMagnifier": "SimpleNotFoundMagnifier",
    "SimpleReload": "SimpleReload",
    "SimpleTask": "SimpleTask",
    "SleepingBell": "SleepingBell",
    "SortColumn": "SortColumn",
    "SuccessBalloon": "SuccessBalloon",
    "SuccessCheckMark": "SuccessCheckMark",
    "SuccessHighFive": "SuccessHighFive",
    "SuccessScreen": "SuccessScreen",
    "Survey": "Survey",
    "Tent": "Tent",
    "UploadCollection": "UploadCollection",
    "TntAvatar": "TntAvatar",
    "TntCalculator": "TntCalculator",
    "TntChartArea": "TntChartArea",
    "TntChartArea2": "TntChartArea2",
    "TntChartBar": "TntChartBar",
    "TntChartBPMNFlow": "TntChartBPMNFlow",
    "TntChartBullet": "TntChartBullet",
    "TntChartDoughnut": "TntChartDoughnut",
    "TntChartFlow": "TntChartFlow",
    "TntChartGantt": "TntChartGantt",
    "TntChartOrg": "TntChartOrg",
    "TntChartPie": "TntChartPie",
    "TntCodePlaceholder": "TntCodePlaceholder",
    "TntCompany": "TntCompany",
    "TntCompass": "TntCompass",
    "TntComponents": "TntComponents",
    "TntDialog": "TntDialog",
    "TntExternalLink": "TntExternalLink",
    "TntFaceID": "TntFaceID",
    "TntFingerprint": "TntFingerprint",
    "TntHandshake": "TntHandshake",
    "TntHelp": "TntHelp",
    "TntLock": "TntLock",
    "TntMission": "TntMission",
    "TntMissionFailed": "TntMissionFailed",
    "TntNoApplications": "TntNoApplications",
    "TntNoFlows": "TntNoFlows",
    "TntNoUsers": "TntNoUsers",
    "TntRadar": "TntRadar",
    "TntRoadMap": "TntRoadMap",
    "TntSecrets": "TntSecrets",
    "TntServices": "TntServices",
    "TntSessionExpired": "TntSessionExpired",
    "TntSessionExpiring": "TntSessionExpiring",
    "TntSettings": "TntSettings",
    "TntSuccess": "TntSuccess",
    "TntSuccessfulAuth": "TntSuccessfulAuth",
    "TntSystems": "TntSystems",
    "TntTeams": "TntTeams",
    "TntTools": "TntTools",
    "TntTutorials": "TntTutorials",
    "TntUnableToLoad": "TntUnableToLoad",
    "TntUnlock": "TntUnlock",
    "TntUnsuccessfulAuth": "TntUnsuccessfulAuth",
    "TntUser2": "TntUser2",
  };
  registerEnum("@ui5/webcomponents-fiori.IllustrationMessageType", pkg["IllustrationMessageType"]);
  pkg["MediaGalleryItemLayout"] = {
    "Square": "Square",
    "Wide": "Wide",
  };
  registerEnum("@ui5/webcomponents-fiori.MediaGalleryItemLayout", pkg["MediaGalleryItemLayout"]);
  pkg["MediaGalleryLayout"] = {
    "Auto": "Auto",
    "Vertical": "Vertical",
    "Horizontal": "Horizontal",
  };
  registerEnum("@ui5/webcomponents-fiori.MediaGalleryLayout", pkg["MediaGalleryLayout"]);
  pkg["MediaGalleryMenuHorizontalAlign"] = {
    "Left": "Left",
    "Right": "Right",
  };
  registerEnum("@ui5/webcomponents-fiori.MediaGalleryMenuHorizontalAlign", pkg["MediaGalleryMenuHorizontalAlign"]);
  pkg["MediaGalleryMenuVerticalAlign"] = {
    "Top": "Top",
    "Bottom": "Bottom",
  };
  registerEnum("@ui5/webcomponents-fiori.MediaGalleryMenuVerticalAlign", pkg["MediaGalleryMenuVerticalAlign"]);
  pkg["NavigationLayoutMode"] = {
    "Auto": "Auto",
    "Collapsed": "Collapsed",
    "Expanded": "Expanded",
  };
  registerEnum("@ui5/webcomponents-fiori.NavigationLayoutMode", pkg["NavigationLayoutMode"]);
  pkg["NotificationListItemImportance"] = {
    "Standard": "Standard",
    "Important": "Important",
  };
  registerEnum("@ui5/webcomponents-fiori.NotificationListItemImportance", pkg["NotificationListItemImportance"]);
  pkg["PageBackgroundDesign"] = {
    "List": "List",
    "Solid": "Solid",
    "Transparent": "Transparent",
  };
  registerEnum("@ui5/webcomponents-fiori.PageBackgroundDesign", pkg["PageBackgroundDesign"]);
  pkg["SearchMode"] = {
    "Default": "Default",
    "Scoped": "Scoped",
  };
  registerEnum("@ui5/webcomponents-fiori.SearchMode", pkg["SearchMode"]);
  pkg["SideContentFallDown"] = {
    "BelowXL": "BelowXL",
    "BelowL": "BelowL",
    "BelowM": "BelowM",
    "OnMinimumWidth": "OnMinimumWidth",
  };
  registerEnum("@ui5/webcomponents-fiori.SideContentFallDown", pkg["SideContentFallDown"]);
  pkg["SideContentPosition"] = {
    "End": "End",
    "Start": "Start",
  };
  registerEnum("@ui5/webcomponents-fiori.SideContentPosition", pkg["SideContentPosition"]);
  pkg["SideContentVisibility"] = {
    "AlwaysShow": "AlwaysShow",
    "ShowAboveL": "ShowAboveL",
    "ShowAboveM": "ShowAboveM",
    "ShowAboveS": "ShowAboveS",
    "NeverShow": "NeverShow",
  };
  registerEnum("@ui5/webcomponents-fiori.SideContentVisibility", pkg["SideContentVisibility"]);
  pkg["SideNavigationItemDesign"] = {
    "Default": "Default",
    "Action": "Action",
  };
  registerEnum("@ui5/webcomponents-fiori.SideNavigationItemDesign", pkg["SideNavigationItemDesign"]);
  pkg["TimelineGrowingMode"] = {
    "Button": "Button",
    "Scroll": "Scroll",
    "None": "None",
  };
  registerEnum("@ui5/webcomponents-fiori.TimelineGrowingMode", pkg["TimelineGrowingMode"]);
  pkg["TimelineLayout"] = {
    "Vertical": "Vertical",
    "Horizontal": "Horizontal",
  };
  registerEnum("@ui5/webcomponents-fiori.TimelineLayout", pkg["TimelineLayout"]);
  pkg["UploadCollectionSelectionMode"] = {
    "None": "None",
    "Single": "Single",
    "SingleStart": "SingleStart",
    "SingleEnd": "SingleEnd",
    "SingleAuto": "SingleAuto",
    "Multiple": "Multiple",
  };
  registerEnum("@ui5/webcomponents-fiori.UploadCollectionSelectionMode", pkg["UploadCollectionSelectionMode"]);
  pkg["UploadState"] = {
    "Complete": "Complete",
    "Error": "Error",
    "Ready": "Ready",
    "Uploading": "Uploading",
  };
  registerEnum("@ui5/webcomponents-fiori.UploadState", pkg["UploadState"]);
  pkg["ViewSettingsDialogMode"] = {
    "Sort": "Sort",
    "Filter": "Filter",
  };
  registerEnum("@ui5/webcomponents-fiori.ViewSettingsDialogMode", pkg["ViewSettingsDialogMode"]);
  pkg["WizardContentLayout"] = {
    "MultipleSteps": "MultipleSteps",
    "SingleStep": "SingleStep",
  };
  registerEnum("@ui5/webcomponents-fiori.WizardContentLayout", pkg["WizardContentLayout"]);


	return pkg;
});
