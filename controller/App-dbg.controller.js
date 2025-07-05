sap.ui.define(["sap/ui/core/mvc/Controller", "sap/m/MessageToast", "sap/ui/model/json/JSONModel", "sap/m/MessageBox", "../model/formatter", "./modules/UserManager", "./modules/MenuManager", "./modules/PagosMasivosManager", "./modules/NavigationManager"], function (Controller, MessageToast, JSONModel, MessageBox, __formatter, ___modules_UserManager, ___modules_MenuManager, ___modules_PagosMasivosManager, ___modules_NavigationManager) {
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
  const App = Controller.extend("com.vs.extension.finanb1.controller.App", {
    constructor: function constructor() {
      Controller.prototype.constructor.apply(this, arguments);
      this.formatter = formatter;
    },
    onInit: function _onInit() {
      // Initialize managers
      this.userManager = new UserManager();
      this.menuManager = new MenuManager();
      this.pagosMasivosManager = new PagosMasivosManager();
      this.navigationManager = new NavigationManager(this);

      // Load authenticated user
      this.userManager.loadAuthenticatedUser();

      // Set up menu model
      const oView = this.getView();
      if (oView) {
        oView.setModel(this.menuManager.getModel(), "menuModel");
        console.log("Modelo de menú asignado a la vista en onInit");
      }

      // Load menu data
      this.menuManager.loadHardcodedMenuData();
      this.menuManager.filterNavigationByRole(this.userManager.getCurrentUser()?.role || 'user');

      // Initialize PagosMasivos models
      this.pagosMasivosManager.initializeModels();
      this.pagosMasivosManager.setController(this);

      // Set up PagosMasivos model in view
      if (oView) {
        oView.setModel(this.pagosMasivosManager.getFilteredModel(), "planillas");
      }

      // Check for detail navigation
      this.checkForDetailNavigation();

      // Verificar estado de autenticación al inicializar la aplicación
      this.checkAuthentication();
    },
    // ===== NAVIGATION METHODS =====
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
    // ===== PAGOS MASIVOS METHODS =====
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
      console.log("App.controller - onListItemPress triggered!", oEvent);
      this.pagosMasivosManager.onListItemPress(oEvent);
    },
    // ===== PAGOS MASIVOS DETALLE METHODS =====
    onBackToPagosMasivos: function _onBackToPagosMasivos() {
      console.log("App.controller - onBackToPagosMasivos triggered!");
      const oComponent = this.getOwnerComponent();
      const oRouter = oComponent.getRouter();
      oRouter.navTo("RoutePagosMasivos");
    },
    onEditPlanilla: function _onEditPlanilla() {
      const oView = this.getView();
      if (oView) {
        const oModelPlanilla = oView.getModel("planilla");
        if (oModelPlanilla) {
          const planillaData = oModelPlanilla.getData();
          if (planillaData && planillaData.Status === "Creada") {
            MessageToast.show("Función de edición en desarrollo", {
              duration: 2000
            });
            // Aquí se puede implementar la lógica para editar la planilla
          } else {
            MessageBox.error("Solo se pueden editar planillas con estado 'Creada'");
          }
        }
      }
    },
    onAnularPlanilla: function _onAnularPlanilla() {
      const oView = this.getView();
      if (oView) {
        const oModelPlanilla = oView.getModel("planilla");
        if (oModelPlanilla) {
          const planillaData = oModelPlanilla.getData();
          if (planillaData && planillaData.Status === "Creada") {
            MessageBox.confirm("¿Está seguro que desea anular esta planilla?", {
              title: "Confirmar Anulación",
              onClose: sAction => {
                if (sAction === MessageBox.Action.OK) {
                  // Actualizar el estado de la planilla
                  planillaData.Status = "Anulada";
                  oModelPlanilla.setData(planillaData);
                  MessageToast.show("Planilla anulada exitosamente", {
                    duration: 2000
                  });
                }
              }
            });
          } else {
            MessageBox.error("Solo se pueden anular planillas con estado 'Creada'");
          }
        }
      }
    },
    onDownloadPlanilla: function _onDownloadPlanilla() {
      console.log("App.controller - onDownloadPlanilla triggered!");
      this.pagosMasivosManager.onDownloadPlanilla();
    },
    onFechaEjecucionChange: function _onFechaEjecucionChange(oEvent) {
      console.log("App.controller - onFechaEjecucionChange triggered!");
      this.pagosMasivosManager.onFechaEjecucionChange(oEvent);
    },
    onSerieChange: function _onSerieChange(oEvent) {
      console.log("App.controller - onSerieChange triggered!");
      this.pagosMasivosManager.onSerieChange(oEvent);
    },
    onGuardarPlanilla: function _onGuardarPlanilla() {
      console.log("App.controller - onGuardarPlanilla triggered!");
      console.log("App.controller - PagosMasivosManager instance:", this.pagosMasivosManager);
      if (this.pagosMasivosManager) {
        this.pagosMasivosManager.onGuardarPlanilla();
      } else {
        console.error("PagosMasivosManager is not initialized!");
      }
    },
    onAddDocumentos: function _onAddDocumentos() {
      console.log("App.controller - onAddDocumentos triggered!");
      if (this.pagosMasivosManager) {
        this.pagosMasivosManager.onAddDocumentos();
      } else {
        console.error("PagosMasivosManager is not initialized!");
      }
    },
    onDocumentSearch: function _onDocumentSearch(oEvent) {
      console.log("App.controller - onDocumentSearch triggered!");
      if (this.pagosMasivosManager) {
        this.pagosMasivosManager.onDocumentSearch(oEvent);
      }
    },
    onDocumentBankFilterChange: function _onDocumentBankFilterChange(oEvent) {
      console.log("App.controller - onDocumentBankFilterChange triggered!");
      if (this.pagosMasivosManager) {
        this.pagosMasivosManager.onDocumentBankFilterChange(oEvent);
      }
    },
    onDocumentSelectionChange: function _onDocumentSelectionChange(oEvent) {
      console.log("App.controller - onDocumentSelectionChange triggered!");
      if (this.pagosMasivosManager) {
        this.pagosMasivosManager.onDocumentSelectionChange(oEvent);
      }
    },
    onDocumentDialogCancel: function _onDocumentDialogCancel() {
      console.log("App.controller - onDocumentDialogCancel triggered!");
      if (this.pagosMasivosManager) {
        this.pagosMasivosManager.onDocumentDialogCancel();
      }
    },
    onDocumentDialogConfirm: function _onDocumentDialogConfirm() {
      console.log("App.controller - onDocumentDialogConfirm triggered!");
      if (this.pagosMasivosManager) {
        this.pagosMasivosManager.onDocumentDialogConfirm();
      }
    },
    // ===== PRIVATE METHODS =====
    loadPlanillaById: function _loadPlanillaById(planillaId) {
      // Cargar datos de la planilla desde el archivo JSON
      const planillasUrl = "./model/mock/products.json";
      try {
        const oModel = new JSONModel();
        oModel.loadData(planillasUrl, undefined, false);
        const oData = oModel.getData();
        console.log("App.controller - Planilla data loaded:", oData);

        // Buscar la planilla por ID
        const planilla = oData.find(item => item.Id === planillaId);
        if (planilla) {
          console.log("App.controller - Planilla found:", planilla);

          // Crear modelo para la planilla seleccionada
          const oModelPlanilla = new JSONModel();
          oModelPlanilla.setData(planilla);

          // Asignar el modelo a la vista
          const oView = this.getView();
          if (oView) {
            oView.setModel(oModelPlanilla, "planilla");
            console.log("App.controller - Planilla model assigned to view");
          }
        } else {
          console.log("App.controller - Planilla not found, loading fallback data");
          this.loadFallbackPlanillaData(planillaId);
        }
      } catch (error) {
        console.error("App.controller - Exception loading planilla data:", error);
        this.loadFallbackPlanillaData(planillaId);
      }
    },
    loadFallbackPlanillaData: function _loadFallbackPlanillaData(planillaId) {
      console.log("App.controller - Loading fallback planilla data for ID:", planillaId);

      // Datos de respaldo para mostrar en caso de error
      const fallbackData = {
        "Id": planillaId,
        "Name": `Planilla Pago Proveedor ${planillaId}`,
        "DateOfSale": "2024-01-01",
        "Status": "Creada",
        "Quantity": 10,
        "Price": 1000.00,
        "CurrencyCode": "SOL",
        "Bank": "BCP",
        "SupplierName": "Proveedor Ejemplo",
        "Description": "Descripción de ejemplo para la planilla"
      };
      const oModelPlanilla = new JSONModel();
      oModelPlanilla.setData(fallbackData);
      const oView = this.getView();
      if (oView) {
        oView.setModel(oModelPlanilla, "planilla");
        console.log("App.controller - Fallback planilla model assigned to view");
      }
    },
    checkForDetailNavigation: function _checkForDetailNavigation() {
      // Check if we need to navigate to detail page
      const oComponent = this.getOwnerComponent();
      const oRouter = oComponent.getRouter();

      // Get current route parameters
      const oRoute = oRouter.getRoute("RoutePagosMasivosDetalle");
      if (oRoute) {
        oRoute.attachPatternMatched(oEvent => {
          const planillaId = oEvent.getParameter("arguments").planillaId;
          if (planillaId) {
            console.log("App.controller - Navigating to planilla detail:", planillaId);
            this.loadPlanillaById(planillaId);
          }
        });
      }
    },
    checkAuthentication: function _checkAuthentication() {
      // Verificar si el usuario ya está autenticado
      const authData = sessionStorage.getItem("finanb1_auth") || localStorage.getItem("finanb1_auth");
      if (authData) {
        try {
          const parsedAuthData = JSON.parse(authData);
          if (parsedAuthData.isAuthenticated) {
            // Usuario autenticado, redirigir a configuración (página principal)
            const oComponent = this.getOwnerComponent();
            const oRouter = oComponent.getRouter();
            oRouter.navTo("RouteConfiguracion");
          }
        } catch (error) {
          console.error("Error parsing auth data:", error);
        }
      }
    }
  });
  return App;
});
//# sourceMappingURL=App-dbg.controller.js.map
