// Copyright (c) 2009-2025 SAP SE, All Rights Reserved
/**
 * @fileOverview The Search adapter for the demo platform.
 *
 * @version 1.136.1
 */
sap.ui.define([
], function () {
    "use strict";

    var SearchAdapter = function (oSystem, sParameter, oAdapterConfiguration) {
        this.isSearchAvailable = function () {
            return Promise.resolve(true);
        };
    };


	return SearchAdapter;
});
