/*!
 * Copyright (c) 2009-2025 SAP SE, All Rights Reserved
 */
sap.ui.define([
  "sap/ui/core/webc/WebComponent",
  "sap/ushell/thirdparty/ui5/webcomponents",
  "sap/ushell/thirdparty/Menu",
], function(
  WebComponentBaseClass,
) {
  "use strict";

  const WrapperClass = WebComponentBaseClass.extend("@ui5/webcomponents.Menu", {
    metadata:
{
  "namespace": "@ui5/webcomponents",
  "tag": "ui5-menu-16d3c820",
  "interfaces": [],
  "properties": {
    "headerText": {
      "type": "string",
      "mapping": "property"
    },
    "open": {
      "type": "boolean",
      "mapping": "property",
      "defaultValue": false
    },
    "horizontalAlign": {
      "type": "@ui5/webcomponents.PopoverHorizontalAlign",
      "mapping": "property",
      "defaultValue": "Start"
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
    "text": {
      "type": "string",
      "mapping": "textContent"
    },
    "width": {
      "type": "sap.ui.core.CSSSize",
      "mapping": "style"
    },
    "height": {
      "type": "sap.ui.core.CSSSize",
      "mapping": "style"
    }
  },
  "aggregations": {
    "items": {
      "type": "@ui5/webcomponents.IMenuItem",
      "multiple": true
    }
  },
  "associations": {
    "opener": {
      "type": "sap.ui.core.Control",
      "mapping": {
        "type": "property",
        "to": "opener"
      }
    }
  },
  "events": {
    "itemClick": {},
    "beforeOpen": {},
    "open": {},
    "beforeClose": {},
    "close": {}
  },
  "getters": [],
  "methods": [],
  "defaultAggregation": "items",
  "library": "@ui5/webcomponents.library",
  "designtime": "@ui5/webcomponents/designtime/Menu.designtime"
}
  });


  return WrapperClass;

});
