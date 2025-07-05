sap.ui.define(["sap/ui/core/mvc/Controller", "sap/m/MessageToast", "sap/m/MessageBox", "../model/formatter", "./modules/UserManager", "./modules/MenuManager", "./modules/PagosMasivosManager", "./modules/NavigationManager"], function (Controller, MessageToast, MessageBox, __formatter, ___modules_UserManager, ___modules_MenuManager, ___modules_PagosMasivosManager, ___modules_NavigationManager) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const formatter = _interopRequireDefault(__formatter);
  const UserManager = ___modules_UserManager["UserManager"];
  const MenuManager = ___modules_MenuManager["MenuManager"];
  const PagosMasivosManager = ___modules_PagosMasivosManager["PagosMasivosManager"];
  const NavigationManager = ___modules_NavigationManager["NavigationManager"];
  /**
   * @namespace com.vs.extension.finanb1.controller
   */
  const PagosMasivos = Controller.extend("com.vs.extension.finanb1.controller.PagosMasivos", {
    constructor: function constructor() {
      Controller.prototype.constructor.apply(this, arguments);
      this.formatter = formatter;
    },
    onInit: function _onInit() {
      // Inicializar gestores
      this.userManager = new UserManager();
      this.menuManager = new MenuManager();
      this.pagosMasivosManager = new PagosMasivosManager();
      this.navigationManager = new NavigationManager(this);

      // Cargar usuario autenticado
      this.userManager.loadAuthenticatedUser();

      // Configurar modelo del menú
      const oView = this.getView();
      if (oView) {
        oView.setModel(this.menuManager.getModel(), "menuModel");
        console.log("Modelo de menú asignado a la vista en onInit");
      }

      // Cargar datos del menú
      this.menuManager.loadHardcodedMenuData();
      this.menuManager.filterNavigationByRole(this.userManager.getCurrentUser()?.role || 'user');

      // Inicializar modelos de PagosMasivos
      this.pagosMasivosManager.initializeModels();
      this.pagosMasivosManager.setController(this);

      // Configurar modelo de PagosMasivos en la vista
      if (oView) {
        oView.setModel(this.pagosMasivosManager.getFilteredModel(), "planillas");
      }
    },
    // ===== MÉTODOS DE NAVEGACIÓN =====
    onSideNavigationItemSelect: function _onSideNavigationItemSelect(oEvent) {
      this.navigationManager.onSideNavigationItemSelect(oEvent);
    },
    onSideNavItemSelect: function _onSideNavItemSelect(oEvent) {
      this.navigationManager.onSideNavItemSelect(oEvent);
    },
    onMenuButtonPress: function _onMenuButtonPress() {
      this.navigationManager.onMenuButtonPress();
    },
    onLogout: function _onLogout() {
      MessageBox.confirm("¿Está seguro que desea cerrar sesión?", {
        title: "Confirmar Cierre de Sesión",
        onClose: sAction => {
          if (sAction === MessageBox.Action.OK) {
            this.userManager.logout();
            MessageToast.show("Sesión cerrada exitosamente", {
              duration: 2000
            });
            const oComponent = this.getOwnerComponent();
            const oRouter = oComponent.getRouter();
            oRouter.navTo("RouteLogin");
          }
        }
      });
    },
    // ===== MÉTODOS DE PAGOS MASIVOS =====
    onDateRangeChange: function _onDateRangeChange(oEvent) {
      this.pagosMasivosManager.onDateRangeChange(oEvent);
    },
    onStatusChange: function _onStatusChange(oEvent) {
      this.pagosMasivosManager.onStatusChange(oEvent);
    },
    onBancoChange: function _onBancoChange(oEvent) {
      this.pagosMasivosManager.onBancoChange(oEvent);
    },
    onClearFilters: function _onClearFilters() {
      this.pagosMasivosManager.onClearFilters();
    },
    onNuevaPlanillaButtonPress: function _onNuevaPlanillaButtonPress() {
      this.pagosMasivosManager.onNuevaPlanillaButtonPress();
    },
    onListItemPress: function _onListItemPress(oEvent) {
      console.log("PagosMasivos.controller - onListItemPress triggered!", oEvent);
      this.pagosMasivosManager.onListItemPress(oEvent);
    }
  });
  return PagosMasivos;
});
//# sourceMappingURL=PagosMasivos-dbg.controller.js.map
