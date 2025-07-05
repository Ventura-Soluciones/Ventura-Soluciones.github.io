// Copyright (c) 2009-2025 SAP SE, All Rights Reserved

/**
 * @file Custom API Module for the SAP Business Client aka NWBC.
 */
sap.ui.define([
    "sap/base/util/deepExtend",
    "sap/ui/core/theming/Parameters",
    "sap/ushell/Config",
    "sap/ushell/Container",
    "sap/ushell/utils",
    "sap/ushell/utils/UrlParsing",
    "sap/ushell/services/NavTargetResolutionInternal"
], (
    deepExtend,
    ThemingParameters,
    Config,
    Container,
    ushellUtils,
    UrlParsing
    /* NavTargetResolutionInternal - here to async preload the module */
) => {
    "use strict";

    /**
     * @alias sap.ushell.api.SAPBusinessClient
     * @namespace
     * @description This class provides helper functions for the SAP Business Client aka NWBC.
     *
     * @since 1.134.0
     * @private
     * @ui5-restricted SAPBusiness Client / NWBC
     */
    class SAPBusinessClient {

        /**
         * Gets the user's current theme.
         * @returns {string} The current user theme including the URL to the theme's repository.
         * @since 1.134.0
         * @private
         * @ui5-restricted SAP Business Client / NWBC
         */
        getTheme () {
            const oUser = Container.getUser();
            return oUser.getTheme(oUser.constants.themeFormat.THEME_NAME_PLUS_URL);
        }

        /**
         * Resolves a navigation target taking into account the sap-system
         *
         * Used by the SAP Business Client browser in order to get a resolved target corresponding to a certain configuration object describing the target.
         *
         * @param {object} oNavigationArguments
         *  <pre>
         *   {
         *     target : {
         *       semanticObject : "semantic object",
         *       action : "action",
         *     },
         *     params :  {
         *       "sap-system-src": "e.g. sid(UR5.120)",
         *       "sap-system": {
         *         ... data related to the sap-system
         *       },
         *       "sap-ushell-navmode": "explace"
         *     }
         *   }
         * </pre>
         * @returns {Promise<{url: string, text: string}>} Promise that resolves an object with the resolved url and description text:
         *   <pre>
         *   {
         *     "url": "/sap/bc/",
         *     "text": "My targetmapping description"
         *   }
         *   </pre>
         *
         * @since 1.134.0
         * @private
         * @ui5-restricted SAP Business Client / NWBC
         */
        async resolveNavigationTarget (oNavigationArguments) {
            const oArgsClone = deepExtend({}, oNavigationArguments);
            const sHashFragment = UrlParsing.constructShellHash(oArgsClone);
            const oInternalNavigationService = await Container.getServiceAsync("NavTargetResolutionInternal");
            const oResolvedHash = await ushellUtils.promisify(oInternalNavigationService.resolveHashFragment(`#${sHashFragment}`));
            return { url: oResolvedHash.url, text: oResolvedHash.text };
        }

        /**
         * Get the current logo URL.
         * Logo priority:
         *  1) Custom Company logo URL (might be a base64 encoded string)
         *  2) theme logo
         *  3) SAP logo
         *  4) empty string
         *
         * @returns {string} Logo URL. It is possibly a base64 encoded string. If no logo exists, even an SAP Logo, an empty string is returned.
         * @since 1.134.0
         * @private
         * @ui5-restricted SAP Business Client / NWBC
         */
        getLogo () {
            const sCustomCompanyLogoUrl = Config.last("/core/companyLogo/url");

            if (sCustomCompanyLogoUrl !== "") {
                return sCustomCompanyLogoUrl;
            }

            const sThemeLogo = ThemingParameters.get({
                name: "sapUiGlobalLogo",
                callback: () => { }
            });

            if (sThemeLogo) {
                // check given logo URL: Is it valid?
                const aMatch = /url[\s]*\('?"?([^'")]*)'?"?\)/.exec(sThemeLogo);
                if (aMatch) {
                    return aMatch[1];
                }
            }
            if (sThemeLogo === "none") {
                return sap.ui.require.toUrl("sap/ushell/themes/base/img/SAPLogo.svg");
            }

            return "";
        }
    }
    return new SAPBusinessClient();
});
