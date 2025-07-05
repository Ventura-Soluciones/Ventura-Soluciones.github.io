/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *  * (c) Copyright 2009-2025 SAP SE. All rights reserved
 */
sap.ui.define(["./library"], function (___library) {
  "use strict";

  const OrientationType = ___library["OrientationType"];
  var __exports = {
    apiVersion: 2,
    /**
     * Renders the control.
     *
     * @public
     * @override
     * @param {RenderManager} rm - The RenderManager object.
     * @param {BaseContainer} control - The BaseContainer control to be rendered.
     */
    render: function (rm, control) {
      rm.openStart("div", control).class("sapCuxBaseContainer");

      //Apply Layout based style classes
      if (control.getProperty("orientation") === OrientationType.SideBySide) {
        rm.class("sapCuxSideBySide");
      } else if (control.getProperty("orientation") === OrientationType.Horizontal) {
        rm.class("sapCuxHorizontal");
      } else {
        rm.class("sapCuxVertical");
      }

      //update width and height
      rm.style("width", control.getWidth());
      rm.style("height", control.getHeight());
      rm.openEnd();

      //render content only if it is loaded, render placeholder otherwise
      const isLazyLoadEnabled = control.getProperty("enableLazyLoad");
      if (!isLazyLoadEnabled || control.getProperty("loaded")) {
        this.renderContent(rm, control);
      } else {
        this.renderCustomPlaceholder(rm, control);
      }
      rm.close("div");
    },
    /**
     * Renders the content of the control.
     *
     * @private
     * @param {RenderManager} rm - The RenderManager object.
     * @param {BaseContainer} control - The BaseContainer control.
     */
    renderContent: function (rm, control) {
      if (control.getContent()?.length > 0) {
        //render header
        rm.openStart("div", control.getId() + "-header").class("sapUiBaseContainerHeader").openEnd();
        rm.renderControl(control._getHeader());
        rm.close("div");

        //render content
        rm.openStart("div", control.getId() + "-content").class("sapUiBaseContainerContent").openEnd();
        rm.renderControl(control._getInnerControl());
        rm.close("div");
      }
    },
    /**
     * Renders custom loader based on container type.
     */
    renderCustomPlaceholder: function (rm, control) {
      try {
        const placeholder = control.getGenericPlaceholder();
        if (!placeholder) {
          rm.openStart("div", control.getId() + "-placeholder").class("sapUiBaseContainerPlaceholder").openEnd().close("div");
          return;
        }
        if (Array.isArray(placeholder)) {
          placeholder.forEach(ctrl => rm.renderControl(ctrl));
        } else {
          rm.renderControl(placeholder);
        }
      } catch (e) {}
    }
  };
  return __exports;
});
//# sourceMappingURL=BaseContainerRenderer-dbg-dbg.js.map
