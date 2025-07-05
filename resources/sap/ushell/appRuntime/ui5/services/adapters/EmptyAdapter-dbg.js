// Copyright (c) 2009-2025 SAP SE, All Rights Reserved
sap.ui.define([
    "sap/ui/thirdparty/jquery"
], function (
    jQuery
) {
    "use strict";

    var EmptyAdapter = function () {
        this.getSite = function() {
            return new jQuery.Deferred().resolve({}).promise();
        };
        this.getInbounds = function() {
            return new jQuery.Deferred().resolve([]).promise();
        };
    };

    return EmptyAdapter;
});
