/*!
 * Copyright (c) 2009-2025 SAP SE, All Rights Reserved
 */
sap.ui.define([
  "sap/ushell/thirdparty/ui5/webcomponents/dist/MenuItem",
  "sap/ushell/thirdparty/ui5/webcomponents-fiori",
  "sap/ushell/thirdparty/UserMenuItem",
], function(
  WebComponentBaseClass,
) {
  "use strict";

  const WrapperClass = WebComponentBaseClass.extend("@ui5/webcomponents-fiori.UserMenuItem", {
    metadata:
{
  "namespace": "@ui5/webcomponents-fiori",
  "tag": "ui5-user-menu-item-16d3c820",
  "interfaces": [],
  "properties": {},
  "aggregations": {
    "items": {
      "type": "@ui5/webcomponents-fiori.UserMenuItem",
      "multiple": true
    }
  },
  "associations": {},
  "events": {},
  "getters": [],
  "methods": [],
  "defaultAggregation": "items",
  "library": "@ui5/webcomponents-fiori.library",
  "designtime": "@ui5/webcomponents-fiori/designtime/UserMenuItem.designtime"
}
  });


  return WrapperClass;

});
