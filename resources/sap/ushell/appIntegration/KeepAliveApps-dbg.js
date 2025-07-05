// Copyright (c) 2009-2025 SAP SE, All Rights Reserved
sap.ui.define([
], function (
) {
    "use strict";

    function KeepAliveApps () {
        var oMainStorage = {};

        //for qunit
        this._clean = function () {
            oMainStorage = {};
        };

        this.get = function (sKey) {
            if (sKey && oMainStorage.hasOwnProperty(sKey)) {
                return oMainStorage[sKey];
            }
            return undefined;
        };

        this.set = function (sKey, oValue) {
            if (sKey) {
                oMainStorage[sKey] = oValue;
            }
        };

        this.removeById = function (sKey) {
            if (sKey && oMainStorage.hasOwnProperty(sKey)) {
                delete oMainStorage[sKey];
            }
        };

        /**
         * Removes all entries related to a given container
         * @param {sap.ushell.appIntegration.ApplicationContainer} oApplicationContainer
         * @param {function} [fnBeforeRemove]
         */
        this.removeByContainer = function (oApplicationContainer, fnBeforeRemove) {
            this.forEach((oStorageEntry, sKey) => {
                if (oStorageEntry.container === oApplicationContainer) {
                    if (fnBeforeRemove) {
                        fnBeforeRemove(oStorageEntry);
                    }
                    this.removeById(sKey);
                }
            });
        };

        this.forEach = function (fnCallback) {
            Object.keys(oMainStorage).forEach(function (key) {
                fnCallback.apply(this, [oMainStorage[key], key, this]);
            });
        };

        this.length = function () {
            return Object.keys(oMainStorage).length;
        };
    }

    return new KeepAliveApps();
});
