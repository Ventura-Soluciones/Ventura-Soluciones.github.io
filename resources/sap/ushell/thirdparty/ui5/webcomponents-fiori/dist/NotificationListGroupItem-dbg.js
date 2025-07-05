/*!
 * Copyright (c) 2009-2025 SAP SE, All Rights Reserved
 */
sap.ui.define([
  "sap/ushell/thirdparty/ui5/webcomponents-fiori/dist/NotificationListItemBase",
  "sap/ushell/thirdparty/ui5/webcomponents-fiori",
  "sap/ushell/thirdparty/NotificationListGroupItem",
], function(
  WebComponentBaseClass,
) {
  "use strict";

  const WrapperClass = WebComponentBaseClass.extend("@ui5/webcomponents-fiori.NotificationListGroupItem", {
    metadata:
{
  "namespace": "@ui5/webcomponents-fiori",
  "tag": "ui5-li-notification-group-16d3c820",
  "interfaces": [],
  "properties": {
    "collapsed": {
      "type": "boolean",
      "mapping": "property",
      "defaultValue": false
    },
    "growing": {
      "type": "@ui5/webcomponents.NotificationListGrowingMode",
      "mapping": "property",
      "defaultValue": "None"
    },
    "titleText": {
      "type": "string",
      "mapping": "property"
    },
    "read": {
      "type": "boolean",
      "mapping": "property",
      "defaultValue": false
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
    }
  },
  "aggregations": {
    "items": {
      "type": "@ui5/webcomponents-fiori.NotificationListItem",
      "multiple": true
    }
  },
  "associations": {},
  "events": {
    "toggle": {},
    "loadMore": {}
  },
  "getters": [],
  "methods": [],
  "defaultAggregation": "items",
  "library": "@ui5/webcomponents-fiori.library",
  "designtime": "@ui5/webcomponents-fiori/designtime/NotificationListGroupItem.designtime"
}
  });


  return WrapperClass;

});
