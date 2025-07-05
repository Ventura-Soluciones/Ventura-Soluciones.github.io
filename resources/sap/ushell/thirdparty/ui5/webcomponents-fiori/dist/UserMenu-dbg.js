/*!
 * Copyright (c) 2009-2025 SAP SE, All Rights Reserved
 */
sap.ui.define([
  "sap/ui/core/webc/WebComponent",
  "sap/ushell/thirdparty/ui5/webcomponents-fiori",
  "sap/ushell/thirdparty/UserMenu",
], function(
  WebComponentBaseClass,
) {
  "use strict";

  const WrapperClass = WebComponentBaseClass.extend("@ui5/webcomponents-fiori.UserMenu", {
    metadata:
{
  "namespace": "@ui5/webcomponents-fiori",
  "tag": "ui5-user-menu-16d3c820",
  "interfaces": [],
  "properties": {
    "open": {
      "type": "boolean",
      "mapping": "property",
      "defaultValue": false
    },
    "showManageAccount": {
      "type": "boolean",
      "mapping": "property",
      "defaultValue": false
    },
    "showOtherAccounts": {
      "type": "boolean",
      "mapping": "property",
      "defaultValue": false
    },
    "showEditAccounts": {
      "type": "boolean",
      "mapping": "property",
      "defaultValue": false
    },
    "showEditButton": {
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
    "menuItems": {
      "type": "@ui5/webcomponents-fiori.UserMenuItem",
      "multiple": true
    },
    "accounts": {
      "type": "@ui5/webcomponents-fiori.UserMenuAccount",
      "multiple": true,
      "slot": "accounts"
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
    "avatarClick": {},
    "manageAccountClick": {},
    "editAccountsClick": {},
    "changeAccount": {},
    "itemClick": {},
    "open": {},
    "close": {},
    "signOutClick": {}
  },
  "getters": [],
  "methods": [],
  "defaultAggregation": "menuItems",
  "library": "@ui5/webcomponents-fiori.library",
  "designtime": "@ui5/webcomponents-fiori/designtime/UserMenu.designtime"
}
  });


  return WrapperClass;

});
