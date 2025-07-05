/*!
 * Copyright (c) 2009-2025 SAP SE, All Rights Reserved
 */
sap.ui.define([
  "sap/ui/core/webc/WebComponent",
  "sap/ushell/thirdparty/ui5/webcomponents-fiori",
  "sap/ushell/thirdparty/ShellBar",
], function(
  WebComponentBaseClass,
) {
  "use strict";

  const WrapperClass = WebComponentBaseClass.extend("@ui5/webcomponents-fiori.ShellBar", {
    metadata:
{
  "namespace": "@ui5/webcomponents-fiori",
  "tag": "ui5-shellbar-16d3c820",
  "interfaces": [
    "sap.m.IBar",
    "sap.tnt.IToolHeader"
  ],
  "properties": {
    "hideSearchButton": {
      "type": "boolean",
      "mapping": "property",
      "defaultValue": false
    },
    "disableAutoSearchField": {
      "type": "boolean",
      "mapping": "property",
      "defaultValue": false
    },
    "primaryTitle": {
      "type": "string",
      "mapping": "property"
    },
    "secondaryTitle": {
      "type": "string",
      "mapping": "property"
    },
    "notificationsCount": {
      "type": "string",
      "mapping": "property"
    },
    "showNotifications": {
      "type": "boolean",
      "mapping": "property",
      "defaultValue": false
    },
    "showProductSwitch": {
      "type": "boolean",
      "mapping": "property",
      "defaultValue": false
    },
    "accessibilityAttributes": {
      "type": "object",
      "mapping": "property",
      "defaultValue": {}
    },
    "showSearchField": {
      "type": "boolean",
      "mapping": "property",
      "defaultValue": false
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
    "assistant": {
      "type": "sap.ui.core.Control",
      "multiple": true,
      "slot": "assistant"
    },
    "items": {
      "type": "@ui5/webcomponents-fiori.ShellBarItem",
      "multiple": true
    },
    "profile": {
      "type": "sap.ui.core.Control",
      "multiple": true,
      "slot": "profile"
    },
    "logo": {
      "type": "sap.ui.core.Control",
      "multiple": true,
      "slot": "logo"
    },
    "menuItems": {
      "type": "sap.ui.core.Control",
      "multiple": true,
      "slot": "menuItems"
    },
    "searchField": {
      "type": "sap.ui.core.Control",
      "multiple": true,
      "slot": "searchField"
    },
    "startButton": {
      "type": "sap.ui.core.Control",
      "multiple": true,
      "slot": "startButton"
    },
    "content": {
      "type": "sap.ui.core.Control",
      "multiple": true,
      "slot": "content"
    }
  },
  "associations": {},
  "events": {
    "notificationsClick": {},
    "profileClick": {},
    "productSwitchClick": {},
    "logoClick": {},
    "menuItemClick": {},
    "searchButtonClick": {},
    "searchFieldToggle": {},
    "contentItemVisibilityChange": {}
  },
  "getters": [
    "logoDomRef",
    "notificationsDomRef",
    "overflowDomRef",
    "profileDomRef",
    "productSwitchDomRef"
  ],
  "methods": [
    "closeOverflow",
    "getSearchButtonDomRef"
  ],
  "defaultAggregation": "items",
  "library": "@ui5/webcomponents-fiori.library",
  "designtime": "@ui5/webcomponents-fiori/designtime/ShellBar.designtime"
}
  });


  return WrapperClass;

});
