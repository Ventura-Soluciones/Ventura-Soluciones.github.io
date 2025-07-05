/*!
 * Copyright (c) 2009-2025 SAP SE, All Rights Reserved
 */
sap.ui.define([
  "sap/ui/core/webc/WebComponent",
  "sap/ushell/thirdparty/ui5/webcomponents",
], function(
  WebComponentBaseClass,
) {
  "use strict";

  const WrapperClass = WebComponentBaseClass.extend("@ui5/webcomponents.ListItemBase", {
    metadata:
{
  "namespace": "@ui5/webcomponents",
  "interfaces": [],
  "properties": {
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
  "aggregations": {},
  "associations": {},
  "events": {},
  "getters": [],
  "methods": [],
  "library": "@ui5/webcomponents.library",
  "designtime": "@ui5/webcomponents/designtime/ListItemBase.designtime"
}
  });


  return WrapperClass;

});
