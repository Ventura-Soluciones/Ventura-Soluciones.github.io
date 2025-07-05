// Copyright (c) 2009-2025 SAP SE, All Rights Reserved

sap.ui.define(function () {
    "use strict";

    // application context
    var Ui5ComponentHandle = function (oComponent) {
        this._oComponent = oComponent;
    };

    Ui5ComponentHandle.onBeforeApplicationInstanceCreated = function (/*oComponentConfig*/) {
        sap.ui.require([
            "sap/ushell/Fiori20AdapterTest"
        ], function () { });
    };

    Ui5ComponentHandle.prototype.getInstance = function () {
        return this._oComponent;
    };

    Ui5ComponentHandle.prototype.getMetadata = function () {
        return this._oComponent.getMetadata();
    };

    Ui5ComponentHandle.prototype.getComponentName = function () {
        return this._oComponent.getMetadata().getComponentName();
    };

    Ui5ComponentHandle.prototype.destroy = function () {
        if (this._oComponent && !this._oComponent.isDestroyed()) {
            return this._oComponent.destroy();
        }
    };

    return Ui5ComponentHandle;
});
