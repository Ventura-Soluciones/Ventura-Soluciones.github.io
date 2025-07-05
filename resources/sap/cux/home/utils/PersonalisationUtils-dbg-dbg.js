/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *  * (c) Copyright 2009-2025 SAP SE. All rights reserved
 */
sap.ui.define(["sap/ui/base/Object", "sap/ui/core/Component"], function (BaseObject, Component) {
  "use strict";

  const defaultContainerId = "sap.cux";

  /**
   *
   * Provides the util methods used for UshellPersonalizer.
   *
   * @extends sap.ui.BaseObject
   *
   * @author SAP SE
   * @version 0.0.1
   * @since 1.122.0
   *
   * @private
   * @experimental Since 1.122
   * @hidden
   *
   * @alias sap.cux.home.utils.PersonalisationUtils
   */
  const PersonalisationUtils = BaseObject.extend("sap.cux.home.utils.PersonalisationUtils", {
    constructor: function _constructor() {
      BaseObject.prototype.constructor.call(this);
    },
    getPersContainerId: function _getPersContainerId(oManagedObject) {
      let bNewId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (this.persContainerId && !bNewId) {
        return this.persContainerId;
      }
      return `${Component.getOwnerIdFor(oManagedObject)}--${defaultContainerId}`;
    },
    setPersContainerId: function _setPersContainerId(persContainerId) {
      this.persContainerId = persContainerId;
    },
    getOwnerComponent: function _getOwnerComponent(oManagedObject) {
      return Component.getOwnerComponentFor(oManagedObject);
    }
  });
  var __exports = new PersonalisationUtils();
  return __exports;
});
//# sourceMappingURL=PersonalisationUtils-dbg-dbg.js.map
