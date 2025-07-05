/*!
 * Copyright (c) 2009-2025 SAP SE, All Rights Reserved
 */
sap.ui.define([
  "sap/ushell/thirdparty/ui5/webcomponents/dist/ListItem",
  "sap/ui/core/EnabledPropagator",
  "sap/ushell/thirdparty/ui5/webcomponents",
], function(
  WebComponentBaseClass,
  EnabledPropagator,
) {
  "use strict";

  const WrapperClass = WebComponentBaseClass.extend("@ui5/webcomponents.MenuItem", {
    metadata:
{
  "namespace": "@ui5/webcomponents",
  "tag": "ui5-menu-item-16d3c820",
  "interfaces": [
    "@ui5/webcomponents.IMenuItem"
  ],
  "properties": {
    "text": {
      "type": "string",
      "mapping": "property"
    },
    "additionalText": {
      "type": "string",
      "mapping": "property"
    },
    "icon": {
      "type": "string",
      "mapping": "property"
    },
    "enabled": {
      "type": "boolean",
      "defaultValue": "true",
      "mapping": {
        "type": "property",
        "to": "disabled",
        "formatter": "_mapEnabled"
      }
    },
    "loading": {
      "type": "boolean",
      "mapping": "property",
      "defaultValue": false
    },
    "loadingDelay": {
      "type": "float",
      "mapping": "property",
      "defaultValue": 1000
    },
    "accessibleName": {
      "type": "string",
      "mapping": "property"
    },
    "tooltip": {
      "type": "string",
      "mapping": "property"
    },
    "accessibilityAttributes": {
      "type": "object",
      "mapping": "property",
      "defaultValue": {}
    },
    "type": {
      "type": "@ui5/webcomponents.ListItemType",
      "mapping": "property",
      "defaultValue": "Active"
    },
    "navigated": {
      "type": "boolean",
      "mapping": "property",
      "defaultValue": false
    },
    "highlight": {
      "type": "@ui5/webcomponents.Highlight",
      "mapping": "property",
      "defaultValue": "None"
    },
    "selected": {
      "type": "boolean",
      "mapping": "property",
      "defaultValue": false
    }
  },
  "aggregations": {
    "items": {
      "type": "@ui5/webcomponents.IMenuItem",
      "multiple": true
    },
    "endContent": {
      "type": "sap.ui.core.Control",
      "multiple": true,
      "slot": "endContent"
    },
    "deleteButton": {
      "type": "@ui5/webcomponents.IButton",
      "multiple": true,
      "slot": "deleteButton"
    }
  },
  "associations": {},
  "events": {
    "beforeOpen": {},
    "open": {},
    "beforeClose": {},
    "close": {},
    "detailClick": {}
  },
  "getters": [],
  "methods": [],
  "defaultAggregation": "items",
  "library": "@ui5/webcomponents.library",
  "designtime": "@ui5/webcomponents/designtime/MenuItem.designtime"
}
  });

  EnabledPropagator.call(WrapperClass.prototype);

  return WrapperClass;

});
