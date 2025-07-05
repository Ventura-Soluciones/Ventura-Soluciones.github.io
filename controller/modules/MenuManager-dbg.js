sap.ui.define(["sap/ui/model/json/JSONModel"], function (JSONModel) {
  "use strict";

  /**
   * MenuManager - Handles navigation menu logic
   */
  class MenuManager {
    constructor() {
      this.oModel = new JSONModel();
    }
    getModel() {
      return this.oModel;
    }
    loadHardcodedMenuData() {
      const hardcodedMenuData = {
        "selectedKey": "pagosMasivos",
        "navigation": [{
          "key": "configuracion",
          "text": "Configuración",
          "icon": "sap-icon://settings"
        }, {
          "key": "pagosMasivos",
          "text": "Pagos Masivos",
          "icon": "sap-icon://money-bills"
        }, {
          "key": "detracciones",
          "text": "Detracciones",
          "icon": "sap-icon://document"
        }],
        "fixedNavigation": []
      };
      console.log("Cargando datos de menú hardcodeados:", hardcodedMenuData);
      this.oModel.setData(hardcodedMenuData);
    }
    filterNavigationByRole(userRole) {
      console.log("Filtrando navegación por rol:", userRole);
      const aNavigation = this.oModel.getProperty("/navigation") || [];
      console.log("Navegación original:", aNavigation);
      const aFilteredNavigation = aNavigation.filter(item => {
        if (userRole === 'admin') return true;
        if (item.key === 'configuracion') return false;
        return true;
      });
      console.log("Navegación filtrada:", aFilteredNavigation);
      this.oModel.setProperty("/navigation", aFilteredNavigation);
      const sSelectedKey = this.oModel.getProperty("/selectedKey");
      const bKeyExists = aFilteredNavigation.some(item => item.key === sSelectedKey);
      if (!bKeyExists && aFilteredNavigation.length > 0) {
        this.oModel.setProperty("/selectedKey", aFilteredNavigation[0].key);
      }
      console.log("Datos finales del modelo:", this.oModel.getData());

      // Forzar actualización de la vista
      this.oModel.refresh(true);
      console.log("Modelo de menú actualizado");
    }
    setSelectedKey(key) {
      this.oModel.setProperty("/selectedKey", key);
    }
    getSelectedKey() {
      return this.oModel.getProperty("/selectedKey");
    }
  }
  var __exports = {
    __esModule: true
  };
  __exports.MenuManager = MenuManager;
  return __exports;
});
//# sourceMappingURL=MenuManager-dbg.js.map
