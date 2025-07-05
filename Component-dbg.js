sap.ui.define(["sap/ui/core/UIComponent", "./model/models", "sap/ui/model/json/JSONModel"], function (BaseComponent, ___model_models, JSONModel) {
  "use strict";

  const createDeviceModel = ___model_models["createDeviceModel"];
  /**
   * @namespace com.vs.extension.finanb1
   */
  const Component = BaseComponent.extend("com.vs.extension.finanb1.Component", {
    metadata: {
      manifest: "json",
      interfaces: ["sap.ui.core.IAsyncContentCreation"]
    },
    init: function _init() {
      // Llamar la función init del componente base
      BaseComponent.prototype.init.call(this);

      // Establecer el modelo de dispositivo
      this.setModel(createDeviceModel(), "device");

      // Establecer el modelo global para el estado de navegación
      const oGlobalModel = new JSONModel({
        selectedPlanillaId: null,
        showDetail: false
      });
      this.setModel(oGlobalModel, "global");

      // Habilitar enrutamiento
      this.getRouter().initialize();
    }
  });
  return Component;
});
//# sourceMappingURL=Component-dbg.js.map
