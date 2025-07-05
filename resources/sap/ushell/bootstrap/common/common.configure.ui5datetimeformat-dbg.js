// Copyright (c) 2009-2025 SAP SE, All Rights Reserved

/**
 * @fileOverview Configure the UI5Settings for Date and Time Format for the 'CDM'
 *               platform.
 *
 * @version 1.136.1
 */
sap.ui.define([
    "sap/base/i18n/Formatting",
    "sap/base/Log",
    "sap/base/util/ObjectPath"
], function (Formatting, Log, ObjectPath) {
    "use strict";

    return configureUI5DateTimeFormat;

    /**
     * This function configures the UI5 settings for Date and Time Format.
     * Note: TimeZone is not taken into account.
     *
     * @param {object} oUshellConfig
     *     the Ushell Configuration Settings
     *     It shall be like oUshellConfig.services.Contaainer.adapter.config
     *     if not undefined values for date and time format is set.
     *
     * @private
     */
    function configureUI5DateTimeFormat (oUshellConfig) {
        var oUserProfileDefaults = ObjectPath.get("services.Container.adapter.config.userProfile.defaults", oUshellConfig);

        var sMessageDate = "Date Format is incorrectly set for the User";
        var sMessageTime = "Time Format is incorrectly set for the User";

        try {
            var sSapDateFormat = oUserProfileDefaults && oUserProfileDefaults.sapDateFormat;
            Formatting.setABAPDateFormat(sSapDateFormat);
        } catch (e) {
            Log.error(sMessageDate, e.stack, "sap/ushell/bootstrap/common/common.configure.ui5datetimeformat");
        }

        try {
            var sSapTimeFormat = oUserProfileDefaults && oUserProfileDefaults.sapTimeFormat;
            Formatting.setABAPTimeFormat(sSapTimeFormat);
        } catch (e) {
            Log.error(sMessageTime, e.stack, "sap/ushell/bootstrap/common/common.configure.ui5datetimeformat");
        }
    }
}, /* bExport = */ false);
