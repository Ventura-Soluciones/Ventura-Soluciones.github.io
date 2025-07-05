/*!
 * Copyright (c) 2009-2025 SAP SE, All Rights Reserved
 */
sap.ui.define([
  "sap/ui/core/webc/WebComponent",
  "sap/ushell/thirdparty/ui5/webcomponents-fiori",
  "sap/ushell/thirdparty/ShellBarSpacer",
], function(
  WebComponentBaseClass,
) {
  "use strict";

  const WrapperClass = WebComponentBaseClass.extend("@ui5/webcomponents-fiori.ShellBarSpacer", {
    metadata:
{
  "namespace": "@ui5/webcomponents-fiori",
  "tag": "ui5-shellbar-spacer-16d3c820",
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
  "library": "@ui5/webcomponents-fiori.library",
  "designtime": "@ui5/webcomponents-fiori/designtime/ShellBarSpacer.designtime"
}
  });


  return WrapperClass;

});
