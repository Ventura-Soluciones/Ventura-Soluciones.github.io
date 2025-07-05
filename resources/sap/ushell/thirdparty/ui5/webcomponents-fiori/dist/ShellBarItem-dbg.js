/*!
 * Copyright (c) 2009-2025 SAP SE, All Rights Reserved
 */
sap.ui.define([
  "sap/ui/core/webc/WebComponent",
  "sap/ushell/thirdparty/ui5/webcomponents-fiori",
  "sap/ushell/thirdparty/ShellBarItem",
], function(
  WebComponentBaseClass,
) {
  "use strict";

  const WrapperClass = WebComponentBaseClass.extend("@ui5/webcomponents-fiori.ShellBarItem", {
    metadata:
{
  "namespace": "@ui5/webcomponents-fiori",
  "tag": "ui5-shellbar-item-16d3c820",
  "interfaces": [],
  "properties": {
    "icon": {
      "type": "string",
      "mapping": "property"
    },
    "text": {
      "type": "string",
      "mapping": "property"
    },
    "count": {
      "type": "string",
      "mapping": "property"
    },
    "accessibilityAttributes": {
      "type": "object",
      "mapping": "property",
      "defaultValue": {}
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
  "aggregations": {},
  "associations": {},
  "events": {
    "click": {}
  },
  "getters": [],
  "methods": [],
  "library": "@ui5/webcomponents-fiori.library",
  "designtime": "@ui5/webcomponents-fiori/designtime/ShellBarItem.designtime"
}
  });


  return WrapperClass;

});
