// Copyright (c) 2009-2025 SAP SE, All Rights Reserved
/**
 * @file This file contains the ServiceHandler class.
 */
sap.ui.define([
    "sap/base/i18n/Formatting",
    "sap/base/i18n/Localization",
    "sap/base/Log",
    "sap/base/util/deepExtend",
    "sap/ui/core/Element",
    "sap/ui/core/UIComponent",
    "sap/ui/thirdparty/hasher",
    "sap/ushell/appIntegration/PostMessageManager",
    "sap/ushell/appIntegration/PostMessageManager/ExtensionItems",
    "sap/ushell/Container",
    "sap/ushell/EventHub",
    "sap/ushell/library",
    "sap/ushell/services/Navigation/compatibility",
    "sap/ushell/utils",
    "sap/ushell/utils/UrlParsing"
], function (
    Formatting,
    Localization,
    Log,
    deepExtend,
    Element,
    UIComponent,
    hasher,
    PostMessageManager,
    ExtensionItems,
    Container,
    EventHub,
    ushellLibrary,
    navigationCompatibility,
    ushellUtils,
    UrlParsing
) {
    "use strict";

    // shortcut for sap.ushell.ContentNodeType
    const ContentNodeType = ushellLibrary.ContentNodeType;

    let oExtensionItems;
    const oDummyComponent = new UIComponent();

    const oServiceRequestHandlers = {
        "sap.ushell.services.Navigation.getHref": {
            async handler (oMessageBody, oMessageEvent) {
                const { oTarget } = oMessageBody;
                const Navigation = await Container.getServiceAsync("Navigation");

                return Navigation.getHref(oTarget);
            }
        },
        "sap.ushell.services.Navigation.backToPreviousApp": {
            async handler (oMessageBody, oMessageEvent) {
                const Navigation = await Container.getServiceAsync("Navigation");
                return Navigation.backToPreviousApp();
            }
        },
        "sap.ushell.services.Navigation.historyBack": {
            async handler (oMessageBody, oMessageEvent) {
                const { iSteps } = oMessageBody;
                const Navigation = await Container.getServiceAsync("Navigation");

                return Navigation.historyBack(iSteps);
            }
        },
        "sap.ushell.services.Navigation.isInitialNavigation": {
            async handler (oMessageBody, oMessageEvent) {
                const Navigation = await Container.getServiceAsync("Navigation");
                return Navigation.isInitialNavigation();
            }
        },
        "sap.ushell.services.Navigation.navigate": {
            async handler (oMessageBody, oMessageEvent) {
                const { oTarget } = oMessageBody;
                const Navigation = await Container.getServiceAsync("Navigation");

                const oTargetClone = deepExtend({}, oTarget);
                ushellUtils.storeSapSystemToLocalStorage(oTargetClone);

                return Navigation.navigate(oTargetClone);
            }
        },
        "sap.ushell.services.Navigation.getPrimaryIntent": {
            async handler (oMessageBody, oMessageEvent) {
                const { sSemanticObject, oLinkFilter } = oMessageBody;
                const Navigation = await Container.getServiceAsync("Navigation");

                return Navigation.getPrimaryIntent(sSemanticObject, oLinkFilter);
            }
        },
        "sap.ushell.services.Navigation.getLinks": {
            async handler (oMessageBody, oMessageEvent) {
                const oParams = oMessageBody;
                const Navigation = await Container.getServiceAsync("Navigation");

                return Navigation.getLinks(oParams);
            }
        },
        "sap.ushell.services.Navigation.getSemanticObjects": {
            async handler (oMessageBody, oMessageEvent) {
                const Navigation = await Container.getServiceAsync("Navigation");
                return Navigation.getSemanticObjects();
            }
        },
        "sap.ushell.services.Navigation.isNavigationSupported": {
            async handler (oMessageBody, oMessageEvent) {
                const { aTargets } = oMessageBody;
                const Navigation = await Container.getServiceAsync("Navigation");

                return Navigation.isNavigationSupported(aTargets);
            }
        },
        "sap.ushell.services.Navigation.getAppState": {
            async handler (oMessageBody, oMessageEvent) {
                const { sAppStateKey } = oMessageBody;
                const Navigation = await Container.getServiceAsync("Navigation");

                const oAppState = await Navigation.getAppState(oDummyComponent, sAppStateKey);
                delete oAppState._oServiceInstance;

                return oAppState;
            }
        },
        "sap.ushell.services.Navigation.resolveIntent": {
            async handler (oMessageBody, oMessageEvent) {
                const { sHashFragment } = oMessageBody;
                const Navigation = await Container.getServiceAsync("Navigation");

                return Navigation.resolveIntent(sHashFragment);
            }
        },
        "sap.ushell.services.Navigation.isUrlSupported": {
            async handler (oMessageBody, oMessageEvent) {
                const { sUrl } = oMessageBody;
                const Navigation = await Container.getServiceAsync("Navigation");

                return Navigation.isUrlSupported(sUrl);
            }
        },
        "sap.ushell.services.CrossApplicationNavigation.hrefForExternal": {
            async handler (oMessageBody, oMessageEvent) {
                const { oArgs } = oMessageBody;
                const Navigation = await Container.getServiceAsync("Navigation");

                return Navigation.getHref(oArgs);
            }
        },
        "sap.ushell.services.CrossApplicationNavigation.getSemanticObjectLinks": {
            async handler (oMessageBody, oMessageEvent) {
                // beware sSemanticObject may also be an array of argument arrays
                // {sSemanticObject, mParameters, bIgnoreFormFactors }
                const { sSemanticObject, mParameters, bIgnoreFormFactors, bCompactIntents } = oMessageBody;

                return navigationCompatibility.getSemanticObjectLinks(
                    sSemanticObject,
                    mParameters,
                    bIgnoreFormFactors,
                    undefined,
                    undefined,
                    bCompactIntents
                );
            }
        },
        "sap.ushell.services.CrossApplicationNavigation.isIntentSupported": {
            async handler (oMessageBody, oMessageEvent) {
                const { aIntents } = oMessageBody;

                return navigationCompatibility.isIntentSupported(aIntents);
            }
        },
        "sap.ushell.services.CrossApplicationNavigation.isNavigationSupported": {
            async handler (oMessageBody, oMessageEvent) {
                const { aIntents } = oMessageBody;
                const Navigation = await Container.getServiceAsync("Navigation");

                return Navigation.isNavigationSupported(aIntents);
            }
        },
        "sap.ushell.services.CrossApplicationNavigation.backToPreviousApp": {
            async handler (oMessageBody, oMessageEvent) {
                const Navigation = await Container.getServiceAsync("Navigation");
                return Navigation.backToPreviousApp();
            }
        },
        "sap.ushell.services.CrossApplicationNavigation.historyBack": {
            async handler (oMessageBody, oMessageEvent) {
                const { iSteps } = oMessageBody;
                const Navigation = await Container.getServiceAsync("Navigation");

                return Navigation.historyBack(iSteps);
            }
        },
        "sap.ushell.services.CrossApplicationNavigation.getAppStateData": {
            async handler (oMessageBody, oMessageEvent) {
                // note: sAppStateKey may be an array of argument arrays
                const { sAppStateKey: vAppStateKey } = oMessageBody;

                return navigationCompatibility.getAppStateData(vAppStateKey);
            }
        },
        "sap.ushell.services.CrossApplicationNavigation.toExternal": {
            async handler (oMessageBody, oMessageEvent) {
                const { oArgs } = oMessageBody;
                const Navigation = await Container.getServiceAsync("Navigation");

                const oArgsClone = deepExtend({}, oArgs);
                ushellUtils.storeSapSystemToLocalStorage(oArgsClone);

                return Navigation.navigate(oArgsClone);
            }
        },
        "sap.ushell.services.CrossApplicationNavigation.registerBeforeAppCloseEvent": {
            async handler (oMessageBody, oApplicationContainer, oMessageEvent) {
                const oParams = oMessageBody;
                oApplicationContainer.setBeforeAppCloseEvent({
                    enabled: true,
                    params: oParams
                });
            },
            options: {
                provideApplicationContext: true,
                allowInactive: true
            }
        },
        "sap.ushell.services.CrossApplicationNavigation.expandCompactHash": {
            async handler (oMessageBody, oMessageEvent) {
                const { sHashFragment } = oMessageBody;
                const NavTargetResolutionInternal = await Container.getServiceAsync("NavTargetResolutionInternal");

                const oDeferred = NavTargetResolutionInternal.expandCompactHash(sHashFragment);
                return ushellUtils.promisify(oDeferred);
            }
        },
        "sap.ushell.services.CrossApplicationNavigation.getDistinctSemanticObjects": {
            async handler (oMessageBody, oMessageEvent) {
                const Navigation = await Container.getServiceAsync("Navigation");

                return Navigation.getSemanticObjects();
            }
        },
        "sap.ushell.services.CrossApplicationNavigation.getLinks": {
            async handler (oMessageBody, oMessageEvent) {
                const vParams = oMessageBody;

                return navigationCompatibility.getLinks(vParams);
            }
        },
        "sap.ushell.services.CrossApplicationNavigation.getPrimaryIntent": {
            async handler (oMessageBody, oMessageEvent) {
                const { sSemanticObject, mParameters } = oMessageBody;
                const Navigation = await Container.getServiceAsync("Navigation");

                return Navigation.getPrimaryIntent(sSemanticObject, mParameters);
            }
        },
        "sap.ushell.services.CrossApplicationNavigation.hrefForAppSpecificHash": {
            async handler (oMessageBody, oMessageEvent) {
                const { sAppHash } = oMessageBody;
                const Navigation = await Container.getServiceAsync("Navigation");

                return Navigation.getHref(sAppHash);
            }
        },
        "sap.ushell.services.CrossApplicationNavigation.isInitialNavigation": {
            async handler (oMessageBody, oMessageEvent) {
                const Navigation = await Container.getServiceAsync("Navigation");
                return Navigation.isInitialNavigation();
            }
        },
        "sap.ushell.services.CrossApplicationNavigation.getAppState": {
            async handler (oMessageBody, oMessageEvent) {
                const { sAppStateKey } = oMessageBody;
                const Navigation = await Container.getServiceAsync("Navigation");

                const oAppState = await Navigation.getAppState(oDummyComponent, sAppStateKey);
                delete oAppState._oServiceInstance;

                return oAppState;
            }
        },
        "sap.ushell.services.CrossApplicationNavigation.setInnerAppRoute": {
            async handler (oMessageBody, oMessageEvent) {
                const { appSpecificRoute, writeHistory } = oMessageBody;

                const oHash = UrlParsing.parseShellHash(hasher.getHash());

                //do nothing if new is exactly like the current one
                if (oHash.appSpecificRoute === appSpecificRoute) {
                    return;
                }
                oHash.appSpecificRoute = appSpecificRoute;
                const sNewHash = `#${UrlParsing.constructShellHash(oHash)}`;
                hasher.disableBlueBoxHashChangeTrigger = true;
                if (writeHistory === true || writeHistory === "true") {
                    hasher.setHash(sNewHash);
                } else {
                    hasher.replaceHash(sNewHash);
                }
                hasher.disableBlueBoxHashChangeTrigger = false;
            }
        },
        "sap.ushell.services.CrossApplicationNavigation.setInnerAppStateData": {
            handler: (oMessageBody) => {
                return createNewInnerAppState(oMessageBody);
            }
        },
        "sap.ushell.services.CrossApplicationNavigation.resolveIntent": {
            async handler (oMessageBody, oMessageEvent) {
                const { sHashFragment } = oMessageBody;
                const Navigation = await Container.getServiceAsync("Navigation");

                return Navigation.resolveIntent(sHashFragment);
            }
        },
        "sap.ushell.services.AppState.getAppState": {
            async handler (oMessageBody, oMessageEvent) {
                const { sKey } = oMessageBody;
                const AppState = await Container.getServiceAsync("AppState");

                const oDeferred = AppState.getAppState(sKey);

                const oAppState = await ushellUtils.promisify(oDeferred);
                delete oAppState._oServiceInstance;
                return oAppState;
            }
        },
        "sap.ushell.services.AppState._saveAppState": {
            async handler (oMessageBody, oMessageEvent) {
                const { sKey, sData, sAppName, sComponent, bTransient, iPersistencyMethod, oPersistencySettings } = oMessageBody;
                const AppState = await Container.getServiceAsync("AppState");

                const oDeferred = AppState._saveAppState(
                    sKey,
                    sData,
                    sAppName,
                    sComponent,
                    bTransient,
                    iPersistencyMethod,
                    oPersistencySettings
                );
                return ushellUtils.promisify(oDeferred);
            }
        },
        "sap.ushell.services.AppState._loadAppState": {
            async handler (oMessageBody, oMessageEvent) {
                const { sKey } = oMessageBody;
                const AppState = await Container.getServiceAsync("AppState");

                const oDeferred = AppState._loadAppState(sKey);
                return ushellUtils.promisify(oDeferred);
            }
        },
        "sap.ushell.services.AppState.deleteAppState": {
            async handler (oMessageBody, oMessageEvent) {
                const { sKey } = oMessageBody;
                const AppState = await Container.getServiceAsync("AppState");

                const oDeferred = AppState.deleteAppState(sKey);
                return ushellUtils.promisify(oDeferred);
            }
        },
        "sap.ushell.services.AppState.makeStatePersistent": {
            async handler (oMessageBody, oMessageEvent) {
                const { sKey, iPersistencyMethod, oPersistencySettings } = oMessageBody;
                const AppState = await Container.getServiceAsync("AppState");

                const oDeferred = AppState.makeStatePersistent(sKey, iPersistencyMethod, oPersistencySettings);
                return ushellUtils.promisify(oDeferred);
            }
        },
        "sap.ushell.services.Bookmark.addBookmarkUI5": {
            async handler (oMessageBody, oMessageEvent) {
                const { oParameters, vContainer } = oMessageBody;
                const AppLifeCycle = await Container.getServiceAsync("AppLifeCycle");

                const oSystemContext = await AppLifeCycle.getCurrentApplication().getSystemContext();
                stripBookmarkServiceUrlForLocalContentProvider(oParameters, oSystemContext);

                const BookmarkV2 = await Container.getServiceAsync("BookmarkV2");

                return BookmarkV2.addBookmark(oParameters, vContainer, oSystemContext.id);
            }
        },
        // Bookmark@addBookmarkByGroupId is mapped to sap.ushell.services.Bookmark.addBookmark
        // Bookmark@addBookmark is mapped to sap.ushell.services.Bookmark.addBookmarkUI5
        "sap.ushell.services.Bookmark.addBookmark": {
            async handler (oMessageBody, oMessageEvent) {
                /**
                 * @deprecated since 1.120. Deprecated together with the classic homepage.
                 */ // eslint-disable-next-line no-constant-condition
                if (true) {
                    const { oParameters, groupId } = oMessageBody;
                    const BookmarkV2 = await Container.getServiceAsync("BookmarkV2");

                    return BookmarkV2.addBookmarkByGroupId(oParameters, groupId);
                }

                throw new Error("Bookmark.addBookmarkByGroupId is deprecated. Please use BookmarkV2.addBookmark instead.");
            }
        },
        "sap.ushell.services.Bookmark.getShellGroupIDs": {
            async handler (oMessageBody, oMessageEvent) {
                /**
                 * @deprecated since 1.120. Deprecated together with the classic homepage.
                 */ // eslint-disable-next-line no-constant-condition
                if (true) {
                    const BookmarkV2 = await Container.getServiceAsync("BookmarkV2");

                    return BookmarkV2.getShellGroupIDs();
                }

                throw new Error("Bookmark.getShellGroupIDs is deprecated. Please use BookmarkV2.getContentNodes instead.");
            }
        },
        "sap.ushell.services.Bookmark.addCatalogTileToGroup": {
            async handler (oMessageBody, oMessageEvent) {
                Log.error("Bookmark.addCatalogTileToGroup is deprecated. Please use BookmarkV2.addBookmark instead.");

                /**
                 * @deprecated since 1.120. Deprecated together with the classic homepage.
                 */ // eslint-disable-next-line no-constant-condition
                if (true) {
                    const { sCatalogTileId, sGroupId, oCatalogData } = oMessageBody;
                    const Bookmark = await Container.getServiceAsync("Bookmark");

                    const oDeferred = Bookmark.addCatalogTileToGroup(sCatalogTileId, sGroupId, oCatalogData);
                    return ushellUtils.promisify(oDeferred);
                }

                throw new Error("Bookmark.addCatalogTileToGroup is deprecated. Please use BookmarkV2.addBookmark instead.");
            }
        },
        "sap.ushell.services.Bookmark.countBookmarks": {
            async handler (oMessageBody, oMessageEvent) {
                const { sUrl } = oMessageBody;
                const AppLifeCycle = await Container.getServiceAsync("AppLifeCycle");

                const oSystemContext = await AppLifeCycle.getCurrentApplication().getSystemContext();

                const BookmarkV2 = await Container.getServiceAsync("BookmarkV2");

                return BookmarkV2.countBookmarks(sUrl, oSystemContext.id);
            }
        },
        "sap.ushell.services.Bookmark.deleteBookmarks": {
            async handler (oMessageBody, oMessageEvent) {
                const { sUrl } = oMessageBody;
                const AppLifeCycle = await Container.getServiceAsync("AppLifeCycle");

                const oSystemContext = await AppLifeCycle.getCurrentApplication().getSystemContext();

                const BookmarkV2 = await Container.getServiceAsync("BookmarkV2");

                return BookmarkV2.deleteBookmarks(sUrl, oSystemContext.id);
            }
        },
        "sap.ushell.services.Bookmark.updateBookmarks": {
            async handler (oMessageBody, oMessageEvent) {
                const { sUrl, oParameters } = oMessageBody;
                const AppLifeCycle = await Container.getServiceAsync("AppLifeCycle");

                const oSystemContext = await AppLifeCycle.getCurrentApplication().getSystemContext();

                const BookmarkV2 = await Container.getServiceAsync("BookmarkV2");

                return BookmarkV2.updateBookmarks(sUrl, oParameters, oSystemContext.id);
            }
        },
        "sap.ushell.services.Bookmark.getContentNodes": {
            async handler (oMessageBody, oMessageEvent) {
                const BookmarkV2 = await Container.getServiceAsync("BookmarkV2");

                return BookmarkV2.getContentNodes();
            }
        },
        "sap.ushell.services.Bookmark.addCustomBookmark": {
            async handler (oMessageBody, oMessageEvent) {
                const { sVizType, oConfig, vContentNodes } = oMessageBody;
                const AppLifeCycle = await Container.getServiceAsync("AppLifeCycle");

                const oSystemContext = await AppLifeCycle.getCurrentApplication().getSystemContext();

                const BookmarkV2 = await Container.getServiceAsync("BookmarkV2");

                return BookmarkV2.addCustomBookmark(sVizType, oConfig, vContentNodes, oSystemContext.id);
            }
        },
        "sap.ushell.services.Bookmark.countCustomBookmarks": {
            async handler (oMessageBody, oMessageEvent) {
                const { oIdentifier } = oMessageBody;
                const AppLifeCycle = await Container.getServiceAsync("AppLifeCycle");

                const oSystemContext = await AppLifeCycle.getCurrentApplication().getSystemContext();
                oIdentifier.contentProviderId = oSystemContext.id;

                const BookmarkV2 = await Container.getServiceAsync("BookmarkV2");

                return BookmarkV2.countCustomBookmarks(oIdentifier);
            }
        },
        "sap.ushell.services.Bookmark.updateCustomBookmarks": {
            async handler (oMessageBody, oMessageEvent) {
                const { oIdentifier, oConfig } = oMessageBody;
                const AppLifeCycle = await Container.getServiceAsync("AppLifeCycle");

                const oSystemContext = await AppLifeCycle.getCurrentApplication().getSystemContext();
                oIdentifier.contentProviderId = oSystemContext.id;

                const BookmarkV2 = await Container.getServiceAsync("BookmarkV2");

                return BookmarkV2.updateCustomBookmarks(oIdentifier, oConfig);
            }
        },
        "sap.ushell.services.Bookmark.deleteCustomBookmarks": {
            async handler (oMessageBody, oMessageEvent) {
                const { oIdentifier } = oMessageBody;
                const AppLifeCycle = await Container.getServiceAsync("AppLifeCycle");

                const oSystemContext = await AppLifeCycle.getCurrentApplication().getSystemContext();
                oIdentifier.contentProviderId = oSystemContext.id;

                const BookmarkV2 = await Container.getServiceAsync("BookmarkV2");

                return BookmarkV2.deleteCustomBookmarks(oIdentifier);
            }
        },
        "sap.ushell.services.Bookmark.addBookmarkToPage": {
            async handler (oMessageBody, oMessageEvent) {
                const { oParameters, sPageId } = oMessageBody;
                const AppLifeCycle = await Container.getServiceAsync("AppLifeCycle");

                const oSystemContext = await AppLifeCycle.getCurrentApplication().getSystemContext();

                const BookmarkV2 = await Container.getServiceAsync("BookmarkV2");

                return BookmarkV2.addBookmarkToPage(oParameters, sPageId, oSystemContext.id);
            }
        },
        "sap.ushell.services.BookmarkV2.addBookmarkUI5": {
            async handler (oMessageBody, oMessageEvent) {
                const { oParameters, vContainer } = oMessageBody;
                const AppLifeCycle = await Container.getServiceAsync("AppLifeCycle");

                const oSystemContext = await AppLifeCycle.getCurrentApplication().getSystemContext();
                stripBookmarkServiceUrlForLocalContentProvider(oParameters, oSystemContext);

                const BookmarkV2 = await Container.getServiceAsync("BookmarkV2");

                return BookmarkV2.addBookmark(oParameters, vContainer, oSystemContext.id);
            }
        },
        // BookmarkV2@addBookmarkByGroupId is mapped to sap.ushell.services.BookmarkV2.addBookmark
        // BookmarkV2@addBookmark is mapped to sap.ushell.services.BookmarkV2.addBookmarkUI5
        "sap.ushell.services.BookmarkV2.addBookmark": {
            async handler (oMessageBody, oMessageEvent) {
                /**
                 * @deprecated since 1.120. Deprecated together with the classic homepage.
                 */ // eslint-disable-next-line no-constant-condition
                if (true) {
                    const { oParameters, groupId } = oMessageBody;
                    const BookmarkV2 = await Container.getServiceAsync("BookmarkV2");

                    return BookmarkV2.addBookmarkByGroupId(oParameters, groupId);
                }

                throw new Error("BookmarkV2.addBookmarkByGroupId is deprecated. Please use BookmarkV2.addBookmark instead.");
            }
        },
        "sap.ushell.services.BookmarkV2.getShellGroupIDs": {
            async handler (oMessageBody, oMessageEvent) {
                /**
                 * @deprecated since 1.120. Deprecated together with the classic homepage.
                 */ // eslint-disable-next-line no-constant-condition
                if (true) {
                    const BookmarkV2 = await Container.getServiceAsync("BookmarkV2");

                    return BookmarkV2.getShellGroupIDs();
                }

                throw new Error("BookmarkV2.getShellGroupIDs is deprecated. Please use BookmarkV2.getContentNodes instead.");
            }
        },
        "sap.ushell.services.BookmarkV2.countBookmarks": {
            async handler (oMessageBody, oMessageEvent) {
                const { sUrl } = oMessageBody;
                const AppLifeCycle = await Container.getServiceAsync("AppLifeCycle");

                const oSystemContext = await AppLifeCycle.getCurrentApplication().getSystemContext();

                const BookmarkV2 = await Container.getServiceAsync("BookmarkV2");

                return BookmarkV2.countBookmarks(sUrl, oSystemContext.id);
            }
        },
        "sap.ushell.services.BookmarkV2.deleteBookmarks": {
            async handler (oMessageBody, oMessageEvent) {
                const { sUrl } = oMessageBody;
                const AppLifeCycle = await Container.getServiceAsync("AppLifeCycle");

                const oSystemContext = await AppLifeCycle.getCurrentApplication().getSystemContext();

                const BookmarkV2 = await Container.getServiceAsync("BookmarkV2");

                return BookmarkV2.deleteBookmarks(sUrl, oSystemContext.id);
            }
        },
        "sap.ushell.services.BookmarkV2.updateBookmarks": {
            async handler (oMessageBody, oMessageEvent) {
                const { sUrl, oParameters } = oMessageBody;
                const AppLifeCycle = await Container.getServiceAsync("AppLifeCycle");

                const oSystemContext = await AppLifeCycle.getCurrentApplication().getSystemContext();

                const BookmarkV2 = await Container.getServiceAsync("BookmarkV2");

                return BookmarkV2.updateBookmarks(sUrl, oParameters, oSystemContext.id);
            }
        },
        "sap.ushell.services.BookmarkV2.getContentNodes": {
            async handler (oMessageBody, oMessageEvent) {
                const BookmarkV2 = await Container.getServiceAsync("BookmarkV2");

                return BookmarkV2.getContentNodes();
            }
        },
        "sap.ushell.services.BookmarkV2.addCustomBookmark": {
            async handler (oMessageBody, oMessageEvent) {
                const { sVizType, oConfig, vContentNodes } = oMessageBody;
                const AppLifeCycle = await Container.getServiceAsync("AppLifeCycle");

                const oSystemContext = await AppLifeCycle.getCurrentApplication().getSystemContext();

                const BookmarkV2 = await Container.getServiceAsync("BookmarkV2");

                return BookmarkV2.addCustomBookmark(sVizType, oConfig, vContentNodes, oSystemContext.id);
            }
        },
        "sap.ushell.services.BookmarkV2.countCustomBookmarks": {
            async handler (oMessageBody, oMessageEvent) {
                const { oIdentifier } = oMessageBody;
                const AppLifeCycle = await Container.getServiceAsync("AppLifeCycle");

                const oSystemContext = await AppLifeCycle.getCurrentApplication().getSystemContext();
                oIdentifier.contentProviderId = oSystemContext.id;

                const BookmarkV2 = await Container.getServiceAsync("BookmarkV2");

                return BookmarkV2.countCustomBookmarks(oIdentifier);
            }
        },
        "sap.ushell.services.BookmarkV2.updateCustomBookmarks": {
            async handler (oMessageBody, oMessageEvent) {
                const { oIdentifier, oConfig } = oMessageBody;
                const AppLifeCycle = await Container.getServiceAsync("AppLifeCycle");

                const oSystemContext = await AppLifeCycle.getCurrentApplication().getSystemContext();
                oIdentifier.contentProviderId = oSystemContext.id;

                const BookmarkV2 = await Container.getServiceAsync("BookmarkV2");

                return BookmarkV2.updateCustomBookmarks(oIdentifier, oConfig);
            }
        },
        "sap.ushell.services.BookmarkV2.deleteCustomBookmarks": {
            async handler (oMessageBody, oMessageEvent) {
                const { oIdentifier } = oMessageBody;
                const AppLifeCycle = await Container.getServiceAsync("AppLifeCycle");

                const oSystemContext = await AppLifeCycle.getCurrentApplication().getSystemContext();
                oIdentifier.contentProviderId = oSystemContext.id;

                const BookmarkV2 = await Container.getServiceAsync("BookmarkV2");

                return BookmarkV2.deleteCustomBookmarks(oIdentifier);
            }
        },
        "sap.ushell.services.BookmarkV2.addBookmarkToPage": {
            async handler (oMessageBody, oMessageEvent) {
                const { oParameters, sPageId } = oMessageBody;
                const AppLifeCycle = await Container.getServiceAsync("AppLifeCycle");

                const oSystemContext = await AppLifeCycle.getCurrentApplication().getSystemContext();

                const BookmarkV2 = await Container.getServiceAsync("BookmarkV2");

                return BookmarkV2.addBookmarkToPage(oParameters, sPageId, oSystemContext.id);
            }
        },
        "sap.ushell.services.UserInfo.getThemeList": {
            async handler (oMessageBody, oMessageEvent) {
                const UserInfo = await Container.getServiceAsync("UserInfo");

                const oDeferred = UserInfo.getThemeList();

                return ushellUtils.promisify(oDeferred);
            }
        },
        "sap.ushell.services.UserInfo.getShellUserInfo": {
            async handler (oMessageBody, oMessageEvent) {
                const UserInfo = await Container.getServiceAsync("UserInfo");

                return UserInfo.getShellUserInfo();
            }
        },
        "sap.ushell.services.UserInfo.getLanguageList": {
            async handler (oMessageBody, oMessageEvent) {
                const UserInfo = await Container.getServiceAsync("UserInfo");

                const oDeferred = UserInfo.getLanguageList();

                return ushellUtils.promisify(oDeferred);
            }
        },
        "sap.ushell.services.UserInfo.updateUserPreferences": {
            async handler (oMessageBody, oMessageEvent) {
                const { language } = oMessageBody;

                if (language) {
                    const oUser = Container.getUser();
                    oUser.setLanguage(language);
                    const UserInfo = await Container.getServiceAsync("UserInfo");

                    const oDeferred = UserInfo.updateUserPreferences();
                    await ushellUtils.promisify(oDeferred);

                    oUser.resetChangedProperty("language");
                }
            }
        },
        "sap.ushell.services.UserInfo.openThemeManager": {
            async handler (oMessageBody, oMessageEvent) {
                EventHub.emit("openThemeManager", Date.now());
            }
        },
        "sap.ushell.services.UserInfo.getLocaleData": {
            async handler (oMessageBody, oMessageEvent) {
                const oLocaleData = {
                    //date format
                    calendarType: Formatting.getCalendarType(),
                    dateFormatShort: Formatting.getDatePattern("short"),
                    dateFormatMedium: Formatting.getDatePattern("medium"),
                    //number format
                    numberFormatGroup: Formatting.getNumberSymbol("group"),
                    numberFormatDecimal: Formatting.getNumberSymbol("decimal"),
                    //time format
                    timeFormatShort: Formatting.getTimePattern("short"),
                    timeFormatMedium: Formatting.getTimePattern("medium"),
                    //calendar customizing
                    calendarMapping: Formatting.getCustomIslamicCalendarData(),
                    //timezone
                    timeZone: Localization.getTimezone(),
                    //currency formats
                    currencyFormats: Formatting.getCustomCurrencies()
                };
                return oLocaleData;
            }
        },
        "sap.ushell.services.UserDefaultParameters.getValue": {
            async handler (oMessageBody, oMessageEvent) {
                const { sParameterName } = oMessageBody;
                const [AppLifeCycle, UserDefaultParameters] = await Promise.all([
                    Container.getServiceAsync("AppLifeCycle"),
                    Container.getServiceAsync("UserDefaultParameters")
                ]);
                const oSystemContext = await AppLifeCycle.getCurrentApplication().getSystemContext();
                return UserDefaultParameters.getValue(sParameterName, oSystemContext);
            }
        },
        "sap.ushell.services.ShellNavigation.toExternal": {
            async handler (oMessageBody, oMessageEvent) {
                const { oArgs, bWriteHistory } = oMessageBody;
                const ShellNavigationInternal = await Container.getServiceAsync("ShellNavigationInternal");

                ShellNavigationInternal.toExternal(oArgs, undefined, bWriteHistory);
            }
        },
        "sap.ushell.services.ShellNavigation.toAppHash": {
            async handler (oMessageBody, oMessageEvent) {
                const { sAppHash, bWriteHistory } = oMessageBody;
                const ShellNavigationInternal = await Container.getServiceAsync("ShellNavigationInternal");

                ShellNavigationInternal.toAppHash(sAppHash, bWriteHistory);
            }
        },
        "sap.ushell.services.ShellNavigationInternal.toExternal": {
            async handler (oMessageBody, oMessageEvent) {
                const { oArgs, bWriteHistory } = oMessageBody;
                const ShellNavigationInternal = await Container.getServiceAsync("ShellNavigationInternal");

                ShellNavigationInternal.toExternal(oArgs, undefined, bWriteHistory);
            }
        },
        "sap.ushell.services.ShellNavigationInternal.toAppHash": {
            async handler (oMessageBody, oMessageEvent) {
                const { sAppHash, bWriteHistory } = oMessageBody;
                const ShellNavigationInternal = await Container.getServiceAsync("ShellNavigationInternal");

                ShellNavigationInternal.toAppHash(sAppHash, bWriteHistory);
            }
        },
        "sap.ushell.services.NavTargetResolution.getDistinctSemanticObjects": {
            async handler (oMessageBody, oMessageEvent) {
                const NavTargetResolutionInternal = await Container.getServiceAsync("NavTargetResolutionInternal");

                const oDeferred = NavTargetResolutionInternal.getDistinctSemanticObjects();

                return ushellUtils.promisify(oDeferred);
            }
        },
        "sap.ushell.services.NavTargetResolution.expandCompactHash": {
            async handler (oMessageBody, oMessageEvent) {
                const { sHashFragment } = oMessageBody;
                const NavTargetResolutionInternal = await Container.getServiceAsync("NavTargetResolutionInternal");

                const oDeferred = NavTargetResolutionInternal.expandCompactHash(sHashFragment);

                return ushellUtils.promisify(oDeferred);
            }
        },
        "sap.ushell.services.NavTargetResolution.resolveHashFragment": {
            async handler (oMessageBody, oMessageEvent) {
                const { sHashFragment } = oMessageBody;
                const NavTargetResolutionInternal = await Container.getServiceAsync("NavTargetResolutionInternal");

                const oDeferred = NavTargetResolutionInternal.resolveHashFragment(sHashFragment);

                return ushellUtils.promisify(oDeferred);
            }
        },
        "sap.ushell.services.NavTargetResolution.isIntentSupported": {
            async handler (oMessageBody, oMessageEvent) {
                const { aIntents } = oMessageBody;
                const NavTargetResolutionInternal = await Container.getServiceAsync("NavTargetResolutionInternal");

                // isIntentSupported: [intent1, intent2, ...] => { intent1: result1, intent2: result2, ... }
                // isNavigationSupported: [intent1, intent2, ...] => [result1, result2, ...]
                const oDeferred = NavTargetResolutionInternal.isNavigationSupported(aIntents);
                const aResults = await ushellUtils.promisify(oDeferred);

                return aResults.reduce((oResult, oIntentSupported, iIndex) => {
                    const sIntent = aIntents[iIndex];
                    oResult[sIntent] = oIntentSupported;
                    return oResult;
                }, {});
            }
        },
        "sap.ushell.services.NavTargetResolution.isNavigationSupported": {
            async handler (oMessageBody, oMessageEvent) {
                const { aIntents } = oMessageBody;
                const NavTargetResolutionInternal = await Container.getServiceAsync("NavTargetResolutionInternal");

                const oDeferred = NavTargetResolutionInternal.isNavigationSupported(aIntents);

                return ushellUtils.promisify(oDeferred);
            }
        },
        "sap.ushell.services.NavTargetResolutionInternal.getDistinctSemanticObjects": {
            async handler (oMessageBody, oMessageEvent) {
                const NavTargetResolutionInternal = await Container.getServiceAsync("NavTargetResolutionInternal");

                const oDeferred = NavTargetResolutionInternal.getDistinctSemanticObjects();

                return ushellUtils.promisify(oDeferred);
            }
        },
        "sap.ushell.services.NavTargetResolutionInternal.expandCompactHash": {
            async handler (oMessageBody, oMessageEvent) {
                const { sHashFragment } = oMessageBody;
                const NavTargetResolutionInternal = await Container.getServiceAsync("NavTargetResolutionInternal");

                const oDeferred = NavTargetResolutionInternal.expandCompactHash(sHashFragment);

                return ushellUtils.promisify(oDeferred);
            }
        },
        "sap.ushell.services.NavTargetResolutionInternal.resolveHashFragment": {
            async handler (oMessageBody, oMessageEvent) {
                const { sHashFragment } = oMessageBody;
                const NavTargetResolutionInternal = await Container.getServiceAsync("NavTargetResolutionInternal");

                const oDeferred = NavTargetResolutionInternal.resolveHashFragment(sHashFragment);

                return ushellUtils.promisify(oDeferred);
            }
        },
        "sap.ushell.services.NavTargetResolutionInternal.isIntentSupported": {
            async handler (oMessageBody, oMessageEvent) {
                const { aIntents } = oMessageBody;
                const NavTargetResolutionInternal = await Container.getServiceAsync("NavTargetResolutionInternal");

                // isIntentSupported: [intent1, intent2, ...] => { intent1: result1, intent2: result2, ... }
                // isNavigationSupported: [intent1, intent2, ...] => [result1, result2, ...]
                const oDeferred = NavTargetResolutionInternal.isNavigationSupported(aIntents);
                const aResults = await ushellUtils.promisify(oDeferred);

                return aResults.reduce((oResult, oIntentSupported, iIndex) => {
                    const sIntent = aIntents[iIndex];
                    oResult[sIntent] = oIntentSupported;
                    return oResult;
                }, {});
            }
        },
        "sap.ushell.services.NavTargetResolutionInternal.isNavigationSupported": {
            async handler (oMessageBody, oMessageEvent) {
                const { aIntents } = oMessageBody;
                const NavTargetResolutionInternal = await Container.getServiceAsync("NavTargetResolutionInternal");

                const oDeferred = NavTargetResolutionInternal.isNavigationSupported(aIntents);

                return ushellUtils.promisify(oDeferred);
            }
        },
        "sap.ushell.services.Renderer.addHeaderItem": {
            async handler (oMessageBody, oApplicationContainer, oMessageEvent) {
                const { sId, sTooltip, sIcon, iFloatingNumber, bVisible, bCurrentState, aStates } = oMessageBody;
                const FrameBoundExtension = await Container.getServiceAsync("FrameBoundExtension");

                const oItem = await FrameBoundExtension.createHeaderItem({
                    id: sId,
                    tooltip: sTooltip,
                    icon: sIcon,
                    floatingNumber: iFloatingNumber,
                    press: function () {
                        PostMessageManager.sendRequest(
                            "sap.ushell.appRuntime.buttonClick",
                            { buttonId: sId },
                            oApplicationContainer.getPostMessageTarget(),
                            oApplicationContainer.getPostMessageTargetOrigin(),
                            false // bWaitForResponse
                        );
                    }
                }, {
                    position: "begin"
                });

                oExtensionItems.storeItem(sId, oItem);
                oExtensionItems.applyItemVisibility(oItem, bVisible, bCurrentState, aStates);
            },
            options: {
                provideApplicationContext: true
            }
        },
        "sap.ushell.services.Renderer.addHeaderEndItem": {
            async handler (oMessageBody, oApplicationContainer, oMessageEvent) {
                const { sId, sTooltip, sIcon, iFloatingNumber, bVisible, bCurrentState, aStates } = oMessageBody;
                const FrameBoundExtension = await Container.getServiceAsync("FrameBoundExtension");

                const oItem = await FrameBoundExtension.createHeaderItem({
                    id: sId,
                    tooltip: sTooltip,
                    icon: sIcon,
                    floatingNumber: iFloatingNumber,
                    press: function () {
                        PostMessageManager.sendRequest(
                            "sap.ushell.appRuntime.buttonClick",
                            { buttonId: sId },
                            oApplicationContainer.getPostMessageTarget(),
                            oApplicationContainer.getPostMessageTargetOrigin(),
                            false // bWaitForResponse
                        );
                    }
                }, {
                    position: "end"
                });

                oExtensionItems.storeItem(sId, oItem);
                oExtensionItems.applyItemVisibility(oItem, bVisible, bCurrentState, aStates);
            },
            options: {
                provideApplicationContext: true
            }
        },
        "sap.ushell.services.Renderer.showHeaderItem": {
            async handler (oMessageBody, oMessageEvent) {
                const { aIds: vIds, bCurrentState, aStates } = oMessageBody;

                const aIds = Array.isArray(vIds) ? vIds : [vIds];

                oExtensionItems.visitItems(aIds, (oItem) => {
                    oExtensionItems.applyItemVisibility(oItem, true, bCurrentState, aStates);
                });
            }
        },
        "sap.ushell.services.Renderer.showHeaderEndItem": {
            async handler (oMessageBody, oMessageEvent) {
                const { aIds: vIds, bCurrentState, aStates } = oMessageBody;

                const aIds = Array.isArray(vIds) ? vIds : [vIds];

                oExtensionItems.visitItems(aIds, (oItem) => {
                    oExtensionItems.applyItemVisibility(oItem, true, bCurrentState, aStates);
                });
            }
        },
        "sap.ushell.services.Renderer.hideHeaderItem": {
            async handler (oMessageBody, oMessageEvent) {
                const { aIds: vIds, bCurrentState, aStates } = oMessageBody;

                const aIds = Array.isArray(vIds) ? vIds : [vIds];

                oExtensionItems.visitItems(aIds, (oItem) => {
                    oExtensionItems.applyItemVisibility(oItem, false, bCurrentState, aStates);
                });
            }
        },
        "sap.ushell.services.Renderer.hideHeaderEndItem": {
            async handler (oMessageBody, oMessageEvent) {
                const { aIds: vIds, bCurrentState, aStates } = oMessageBody;

                const aIds = Array.isArray(vIds) ? vIds : [vIds];

                oExtensionItems.visitItems(aIds, (oItem) => {
                    oExtensionItems.applyItemVisibility(oItem, false, bCurrentState, aStates);
                });
            }
        },
        "sap.ushell.services.Renderer.setHeaderTitle": { // secondTitle
            async handler (oMessageBody, oMessageEvent) {
                const { sTitle } = oMessageBody;
                const Extension = await Container.getServiceAsync("Extension");

                Extension.setSecondTitle(sTitle);
            }
        },
        "sap.ushell.services.Renderer.setHeaderVisibility": {
            async handler (oMessageBody, oMessageEvent) {
                const { bVisible, bCurrentState, aStates } = oMessageBody;
                const oRenderer = Container.getRendererInternal("fiori2");

                oRenderer.setHeaderVisibility(bVisible, !!bCurrentState, aStates);
            }
        },
        "sap.ushell.services.Renderer.createShellHeadItem": {
            async handler (oMessageBody, oApplicationContainer, oMessageEvent) {
                const { params } = oMessageBody;
                params.press = async function () {
                    PostMessageManager.sendRequest(
                        "sap.ushell.appRuntime.buttonClick",
                        { buttonId: params.id },
                        oApplicationContainer.getPostMessageTarget(),
                        oApplicationContainer.getPostMessageTargetOrigin(),
                        false // bWaitForResponse
                    );
                };

                const [ShellHeadItem] = await ushellUtils.requireAsync(["sap/ushell/ui/shell/ShellHeadItem"]);

                // eslint-disable-next-line no-new
                new ShellHeadItem(params);
            },
            options: {
                provideApplicationContext: true
            }
        },
        "sap.ushell.services.Renderer.showActionButton": {
            async handler (oMessageBody, oMessageEvent) {
                const { aIds: vIds, bCurrentState, aStates } = oMessageBody;

                const aIds = Array.isArray(vIds) ? vIds : [vIds];

                oExtensionItems.visitItems(aIds, (oItem) => {
                    oExtensionItems.applyItemVisibility(oItem, true, bCurrentState, aStates);
                });
            }
        },
        "sap.ushell.services.Renderer.hideActionButton": {
            async handler (oMessageBody, oMessageEvent) {
                const { aIds: vIds, bCurrentState, aStates } = oMessageBody;

                const aIds = Array.isArray(vIds) ? vIds : [vIds];

                oExtensionItems.visitItems(aIds, (oItem) => {
                    oExtensionItems.applyItemVisibility(oItem, false, bCurrentState, aStates);
                });
            }
        },
        "sap.ushell.services.Renderer.addUserAction": {
            async handler (oMessageBody, oApplicationContainer, oMessageEvent) {
                const { controlType, oControlProperties, bIsVisible, bCurrentState, aStates } = oMessageBody.oParameters;
                const Extension = await Container.getServiceAsync("Extension");

                oControlProperties.press = async function () {
                    PostMessageManager.sendRequest(
                        "sap.ushell.appRuntime.buttonClick",
                        { buttonId: oControlProperties.id },
                        oApplicationContainer.getPostMessageTarget(),
                        oApplicationContainer.getPostMessageTargetOrigin(),
                        false // bWaitForResponse
                    );
                };

                const oItem = await Extension.createUserAction(oControlProperties, {
                    controlType
                });

                oExtensionItems.storeItem(oControlProperties.id, oItem);
                oExtensionItems.applyItemVisibility(oItem, bIsVisible, bCurrentState, aStates);
            },
            options: {
                provideApplicationContext: true
            }
        },
        "sap.ushell.services.Renderer.addOptionsActionSheetButton": {
            async handler (oMessageBody, oApplicationContainer, oMessageEvent) {
                const vButtons = oMessageBody;
                const [Button] = await ushellUtils.requireAsync(["sap/m/Button"]);
                const Extension = await Container.getServiceAsync("Extension");

                const aButtons = Array.isArray(vButtons) ? vButtons : [vButtons];

                aButtons.forEach(async (oButton) => {
                    destroyControl(oButton.id);

                    // eslint-disable-next-line no-new
                    new Button({
                        id: oButton.id,
                        text: oButton.text,
                        icon: oButton.icon,
                        tooltip: oButton.tooltip,
                        press: async function () {
                            PostMessageManager.sendRequest(
                                "sap.ushell.appRuntime.buttonClick",
                                { buttonId: oButton.id },
                                oApplicationContainer.getPostMessageTarget(),
                                oApplicationContainer.getPostMessageTargetOrigin(),
                                false // bWaitForResponse
                            );
                        }
                    });

                    const oItem = await Extension.createUserAction({
                        id: oButton.id
                    });

                    oExtensionItems.storeItem(oButton.id, oItem);
                    oExtensionItems.applyItemVisibility(oItem, true, true, oButton.aStates);
                });
            },
            options: {
                provideApplicationContext: true
            }
        },
        "sap.ushell.services.Renderer.removeOptionsActionSheetButton": {
            async handler (oMessageBody, oMessageEvent) {
                const vButtons = oMessageBody;

                const aButtons = Array.isArray(vButtons) ? vButtons : [vButtons];

                aButtons.forEach((oButton) => {
                    const oItem = oExtensionItems.getItem(oButton.id);
                    if (oItem) {
                        oExtensionItems.applyItemVisibility(oItem, false, true, oButton.aStates);

                        return destroyControl(oButton.id);
                    }
                    Log.warning(`User action with id ${oButton.id} not found`);
                });
            }
        },
        "sap.ushell.services.Renderer.updateHeaderItem": {
            async handler (oMessageBody, oMessageEvent) {
                const { sId, oControlProperties } = oMessageBody;

                // we only support update of floatingNumber
                if (!Object.hasOwn(oControlProperties, "floatingNumber")) {
                    return;
                }

                const oItem = oExtensionItems.getItem(sId);

                if (oItem?.getControl) {
                    const oControl = await oItem.getControl();
                    oControl?.setFloatingNumber?.(oControlProperties.floatingNumber);
                }
            }
        },
        "sap.ushell.services.Renderer.destroyButton": {
            async handler (oMessageBody, oMessageEvent) {
                const { aIds: vIds } = oMessageBody;

                const aIds = Array.isArray(vIds) ? vIds : [vIds];

                aIds.forEach((sId) => {
                    destroyControl(sId);
                });
            }
        },
        "sap.ushell.services.Extension.createHeaderItem": {
            async handler (oMessageBody, oApplicationContainer, oMessageEvent) {
                const { controlProperties, events, parameters } = oMessageBody;
                const sItemId = oExtensionItems.generateItemId();

                events.forEach((sEventName) => {
                    controlProperties[sEventName] = async function () {
                        PostMessageManager.sendRequest(
                            "sap.ushell.services.Extension.handleControlEvent",
                            {
                                eventName: sEventName,
                                itemId: sItemId
                            },
                            oApplicationContainer.getPostMessageTarget(),
                            oApplicationContainer.getPostMessageTargetOrigin(),
                            false // bWaitForResponse
                        );
                    };
                });

                const Extension = await Container.getServiceAsync("Extension");
                const oItem = await Extension.createHeaderItem(controlProperties, parameters);
                oExtensionItems.storeItem(sItemId, oItem);

                return {
                    itemId: sItemId
                };
            },
            options: {
                provideApplicationContext: true
            }
        },
        "sap.ushell.services.Extension.createUserAction": {
            async handler (oMessageBody, oApplicationContainer, oMessageEvent) {
                const { controlProperties, events, parameters } = oMessageBody;
                const sItemId = oExtensionItems.generateItemId();

                events.forEach((sEventName) => {
                    controlProperties[sEventName] = async function () {
                        PostMessageManager.sendRequest(
                            "sap.ushell.services.Extension.handleControlEvent",
                            {
                                eventName: sEventName,
                                itemId: sItemId
                            },
                            oApplicationContainer.getPostMessageTarget(),
                            oApplicationContainer.getPostMessageTargetOrigin(),
                            false // bWaitForResponse
                        );
                    };
                });

                const Extension = await Container.getServiceAsync("Extension");
                const oItem = await Extension.createUserAction(controlProperties, parameters);
                oExtensionItems.storeItem(sItemId, oItem);

                return {
                    itemId: sItemId
                };
            },
            options: {
                provideApplicationContext: true
            }
        },
        "sap.ushell.services.Extension.Item.destroy": {
            async handler (oMessageBody, oMessageEvent) {
                const { itemId } = oMessageBody;

                const oItem = oExtensionItems.getItem(itemId);
                if (oItem?.destroy) {
                    oItem.destroy();
                    oExtensionItems.removeItem(itemId);
                }
            }
        },
        "sap.ushell.services.Extension.Item.showForCurrentApp": {
            async handler (oMessageBody, oMessageEvent) {
                const { itemId } = oMessageBody;

                const oItem = oExtensionItems.getItem(itemId);
                if (oItem?.showForCurrentApp) {
                    oItem.showForCurrentApp();
                }
            }
        },
        "sap.ushell.services.Extension.Item.hideForCurrentApp": {
            async handler (oMessageBody, oMessageEvent) {
                const { itemId } = oMessageBody;

                const oItem = oExtensionItems.getItem(itemId);
                if (oItem?.hideForCurrentApp) {
                    oItem.hideForCurrentApp();
                }
            }
        },
        "sap.ushell.services.Extension.Item.showForAllApps": {
            async handler (oMessageBody, oMessageEvent) {
                const { itemId } = oMessageBody;

                const oItem = oExtensionItems.getItem(itemId);
                if (oItem?.showForAllApps) {
                    oItem.showForAllApps();
                }
            }
        },
        "sap.ushell.services.Extension.Item.hideForAllApps": {
            async handler (oMessageBody, oMessageEvent) {
                const { itemId } = oMessageBody;

                const oItem = oExtensionItems.getItem(itemId);
                if (oItem?.hideForAllApps) {
                    oItem.hideForAllApps();
                }
            }
        },
        "sap.ushell.services.Extension.Item.showOnHome": {
            async handler (oMessageBody, oMessageEvent) {
                const { itemId } = oMessageBody;

                const oItem = oExtensionItems.getItem(itemId);
                if (oItem?.showOnHome) {
                    oItem.showOnHome();
                }
            }
        },
        "sap.ushell.services.Extension.Item.hideOnHome": {
            async handler (oMessageBody, oMessageEvent) {
                const { itemId } = oMessageBody;

                const oItem = oExtensionItems.getItem(itemId);
                if (oItem?.hideOnHome) {
                    oItem.hideOnHome();
                }
            }
        },
        "sap.ushell.services.Extension.setSecondTitle": {
            async handler (oMessageBody, oMessageEvent) {
                const { title } = oMessageBody;
                const Extension = await Container.getServiceAsync("Extension");

                return Extension.setSecondTitle(title);
            }
        },
        "sap.ushell.services.LaunchPage.getGroupsForBookmarks": {
            async handler (oMessageBody, oMessageEvent) {
                /**
                 * @deprecated since 1.120. Deprecated together with the classic homepage.
                 */ // eslint-disable-next-line no-constant-condition
                if (true) {
                    const FlpLaunchPage = await Container.getServiceAsync("FlpLaunchPage");

                    const oDeferred = FlpLaunchPage.getGroupsForBookmarks();

                    return ushellUtils.promisify(oDeferred);
                }

                throw new Error("LaunchPage.getGroupsForBookmarks is deprecated. Please use BookmarkV2.getContentNodes instead.");
            }
        },
        "sap.ushell.services.Menu.getSpacesPagesHierarchy": {
            async handler (oMessageBody, oMessageEvent) {
                const Menu = await Container.getServiceAsync("Menu");

                const aContentNodes = Menu.getContentNodes([ContentNodeType.Space, ContentNodeType.Page]);

                return aContentNodes.map(({ id: spaceId, label: spaceLabel, children }) => {
                    return {
                        id: spaceId,
                        title: spaceLabel,
                        pages: (children || []).map(({ id: pageId, label: pageLabel }) => {
                            return {
                                id: pageId,
                                title: pageLabel
                            };
                        })
                    };
                });
            }
        },
        "sap.ushell.services.CommonDataModel.getAllPages": {
            async handler (oMessageBody, oMessageEvent) {
                const CommonDataModel = await Container.getServiceAsync("CommonDataModel");

                return CommonDataModel.getAllPages();
            }
        },
        "sap.ushell.services.UITracer.trace": {
            async handler (oMessageBody, oMessageEvent) {
                const { trace } = oMessageBody;
                await Container.getServiceAsync("UITracer");

                EventHub.emit("UITracer.trace", trace);
            }
        },
        "sap.ushell.services.SearchableContent.getApps": {
            async handler (oMessageBody, oMessageEvent) {
                const oOptions = oMessageBody.oOptions || {};
                const SearchableContent = await Container.getServiceAsync("SearchableContent");

                return SearchableContent.getApps(oOptions);
            }
        },
        "sap.ushell.services.ReferenceResolver.resolveReferences": {
            async handler (oMessageBody, oMessageEvent) {
                const { aReferences } = oMessageBody;
                const ReferenceResolver = await Container.getServiceAsync("ReferenceResolver");

                return ReferenceResolver.resolveReferences(aReferences);
            }
        }
    };

    async function createNewInnerAppState (oMessageBody) {
        const { sData } = oMessageBody;
        let oValue;

        if (sData !== undefined) {
            try {
                oValue = JSON.parse(sData);
            } catch (e) {
                oValue = sData;
            }
        } else {
            oValue = "";
        }

        const AppState = await Container.getServiceAsync("AppState");
        const oNewAppState = AppState.createEmptyAppState();

        oNewAppState.setData(oValue);
        oNewAppState.save();
        const sNewAppStateKey = oNewAppState.getKey();

        let sHash = hasher.getHash();
        if (sHash.indexOf("&/") > 0) {
            if (sHash.indexOf("sap-iapp-state=") > 0) {
                const sCurrAppStateKey = /(?:sap-iapp-state=)([^&/]+)/.exec(sHash)[1];
                sHash = sHash.replace(sCurrAppStateKey, sNewAppStateKey);
            } else {
                sHash = `${sHash}/sap-iapp-state=${sNewAppStateKey}`;
            }
        } else {
            sHash = `${sHash}&/sap-iapp-state=${sNewAppStateKey}`;
        }

        hasher.disableBlueBoxHashChangeTrigger = true;
        hasher.replaceHash(sHash);
        hasher.disableBlueBoxHashChangeTrigger = false;

        return sNewAppStateKey;
    }

    /**
     * Helper function for removing the service URL of dynamic bookmark tiles
     * if the bookmark is created from a local service provider
     * <p>
     * This is a short-term mitigation for customer incident 57472/2021.
     * The service URLs for dynamic tiles created as bookmark for apps created
     * locally on CF (either manually or deployed to the local HTML5 repo) cannot
     * be correctly constructed, because the path prefix cannot be resolved.
     * As intermediate workaround, we remove the service URL to avoid the display
     * of the ERROR state.
     *
     * @private
     * @param {object} oParameters parameters for bookmark creation
     * @param {object} oSystemContext the system context for bookmark creation
     */
    function stripBookmarkServiceUrlForLocalContentProvider (oParameters, oSystemContext) {
        if (!oParameters || !oParameters.serviceUrl || !oSystemContext) {
            return;
        }

        if (oSystemContext.id === "" || oSystemContext.id === "saas_approuter") {
            oParameters.serviceUrl = undefined;

            Log.warning("Dynamic data bookmarks tiles are not supported for local content providers");
        }
    }

    /**
     * Destroys a control by its ID.
     * Does nothing if the control does not exist.
     * @param {string} sControlId The ID of the control.
     *
     * @since 1.125.0
     * @private
     */
    function destroyControl (sControlId) {
        const oControl = Element.getElementById(sControlId);
        if (oControl?.destroy) {
            oControl.destroy();
        }
    }

    return {
        register () {
            oExtensionItems = new ExtensionItems();

            Object.keys(oServiceRequestHandlers).forEach((sServiceRequest) => {
                const oHandler = oServiceRequestHandlers[sServiceRequest];
                PostMessageManager.setRequestHandler(sServiceRequest, oHandler.handler, oHandler.options);
            });
        },

        // for testing,
        stripBookmarkServiceUrlForLocalContentProvider
    };
});
