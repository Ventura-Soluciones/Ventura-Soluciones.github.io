/*!
 * Copyright (c) 2009-2025 SAP SE, All Rights Reserved
 */
sap.ui.define([
  "sap/ui/core/webc/WebComponent",
  "sap/ui/core/EnabledPropagator",
  "sap/ushell/thirdparty/ui5/webcomponents",
  "sap/ushell/thirdparty/Avatar",
], function(
  WebComponentBaseClass,
  EnabledPropagator,
) {
  "use strict";

  const WrapperClass = WebComponentBaseClass.extend("@ui5/webcomponents.Avatar", {
    metadata:
{
  "namespace": "@ui5/webcomponents",
  "tag": "ui5-avatar-16d3c820",
  "interfaces": [
    "@ui5/webcomponents.IAvatarGroupItem"
  ],
  "properties": {
    "enabled": {
      "type": "boolean",
      "defaultValue": "true",
      "mapping": {
        "type": "property",
        "to": "disabled",
        "formatter": "_mapEnabled"
      }
    },
    "interactive": {
      "type": "boolean",
      "mapping": "property",
      "defaultValue": false
    },
    "icon": {
      "type": "string",
      "mapping": "property"
    },
    "fallbackIcon": {
      "type": "string",
      "mapping": "property",
      "defaultValue": "employee"
    },
    "initials": {
      "type": "string",
      "mapping": "property"
    },
    "shape": {
      "type": "@ui5/webcomponents.AvatarShape",
      "mapping": "property",
      "defaultValue": "Circle"
    },
    "size": {
      "type": "@ui5/webcomponents.AvatarSize",
      "mapping": "property",
      "defaultValue": "S"
    },
    "colorScheme": {
      "type": "@ui5/webcomponents.AvatarColorScheme",
      "mapping": "property",
      "defaultValue": "Auto"
    },
    "accessibleName": {
      "type": "string",
      "mapping": "property"
    },
    "accessibilityAttributes": {
      "type": "object",
      "mapping": "property",
      "defaultValue": {}
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
    "image": {
      "type": "sap.ui.core.Control",
      "multiple": true
    },
    "badge": {
      "type": "sap.ui.core.Control",
      "multiple": true,
      "slot": "badge"
    }
  },
  "associations": {},
  "events": {},
  "getters": [],
  "methods": [],
  "defaultAggregation": "image",
  "library": "@ui5/webcomponents.library",
  "designtime": "@ui5/webcomponents/designtime/Avatar.designtime"
}
  });

  EnabledPropagator.call(WrapperClass.prototype);

  return WrapperClass;

});
