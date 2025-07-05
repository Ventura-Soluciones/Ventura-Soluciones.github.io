sap.ui.define(["sap/m/MessageBox"], function (MessageBox) {
  "use strict";

  /**
   * NavigationManager - Handles page navigation logic
   */
  class NavigationManager {
    constructor(controller) {
      this.controller = controller;
    }
    navigateToPage(sKey, currentUser) {
      console.log("Navegando a la clave:", sKey);
      if (sKey === 'configuracion' && currentUser?.role !== 'admin') {
        MessageBox.error("No tiene permisos para acceder a la configuración");
        return;
      }
      const oComponent = this.controller.getOwnerComponent();
      const oRouter = oComponent.getRouter();

      // Map page keys to route names
      const routeMap = {
        'configuracion': 'RouteConfiguracion',
        'pagosMasivos': 'RoutePagosMasivos',
        'detracciones': 'RouteDetracciones'
      };
      const routeName = routeMap[sKey];
      if (routeName) {
        console.log("Navegando a la ruta:", routeName);
        oRouter.navTo(routeName);
      } else {
        console.error("Ruta no encontrada para la clave:", sKey);
      }
    }
    onSideNavigationItemSelect(oEvent) {
      console.log("Evento de navegación activado:", oEvent);

      // Para TNT SideNavigation, necesitamos obtener la clave seleccionada del modelo
      const oView = this.controller.getView();
      if (!oView) {
        console.error("No se encontró la vista");
        return;
      }
      const oModel = oView.getModel("menuModel");
      if (!oModel) {
        console.error("No se encontró menuModel");
        return;
      }

      // Obtener la clave seleccionada del modelo
      const selectedKey = oModel.getProperty("/selectedKey");
      console.log("Clave seleccionada del modelo:", selectedKey);
      if (selectedKey) {
        this.navigateToPage(selectedKey, this.controller.userManager?.getCurrentUser());
      }
    }
    onSideNavItemSelect(oEvent) {
      this.onSideNavigationItemSelect(oEvent);
    }
    onMenuButtonPress() {
      const toolPage = this.controller.byId("toolPage2");
      if (toolPage && typeof toolPage.setSideExpanded === "function" && typeof toolPage.getSideExpanded === "function") {
        toolPage.setSideExpanded(!toolPage.getSideExpanded());
      }
    }
  }
  var __exports = {
    __esModule: true
  };
  __exports.NavigationManager = NavigationManager;
  return __exports;
});
//# sourceMappingURL=NavigationManager-dbg.js.map
