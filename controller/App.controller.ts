import Controller from "sap/ui/core/mvc/Controller";
import MessageToast from "sap/m/MessageToast";
import JSONModel from "sap/ui/model/json/JSONModel";
import MessageBox from "sap/m/MessageBox";
import formatter from "../model/formatter";
import Event from "sap/ui/base/Event";
import type UIComponent from "sap/ui/core/UIComponent";
import { UserManager } from "./modules/UserManager";
import { MenuManager } from "./modules/MenuManager";
import { PagosMasivosManager } from "./modules/PagosMasivosManager";
import { NavigationManager } from "./modules/NavigationManager";

/**
 * @namespace com.vs.extension.finanb1.controller
 */
export default class App extends Controller {
    public formatter = formatter;
    
    // Managers for different concerns
    public userManager: UserManager;
    public menuManager: MenuManager;
    public pagosMasivosManager: PagosMasivosManager;
    public navigationManager: NavigationManager;

    public onInit(): void {
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
    }

    // ===== NAVIGATION METHODS =====
    public onSideNavigationItemSelect(oEvent: Event): void {
        this.navigationManager.onSideNavigationItemSelect(oEvent);
    }

    public onSideNavItemSelect(oEvent: any): void {
        this.navigationManager.onSideNavItemSelect(oEvent);
    }

    public onMenuButtonPress(): void {
        this.navigationManager.onMenuButtonPress();
    }

    public onLogout(): void {
        MessageBox.confirm("¿Está seguro que desea cerrar sesión?", {
            title: "Confirmar Cierre de Sesión",
            onClose: (sAction: string) => {
                if (sAction === MessageBox.Action.OK) {
                    this.userManager.logout();
                    MessageToast.show("Sesión cerrada exitosamente", { duration: 2000 });
                    const oComponent = this.getOwnerComponent() as UIComponent;
                    const oRouter = oComponent.getRouter();
                    oRouter.navTo("RouteLogin");
                }
            }
        });
    }

    // ===== PAGOS MASIVOS METHODS =====
    public onDateRangeChange(oEvent: any): void {
        this.pagosMasivosManager.onDateRangeChange(oEvent);
    }

    public onStatusChange(oEvent: any): void {
        this.pagosMasivosManager.onStatusChange(oEvent);
    }

    public onBancoChange(oEvent: any): void {
        this.pagosMasivosManager.onBancoChange(oEvent);
    }

    public onClearFilters(): void {
        this.pagosMasivosManager.onClearFilters();
    }

    public onNuevaPlanillaButtonPress(): void {
        this.pagosMasivosManager.onNuevaPlanillaButtonPress();
    }

    public onListItemPress(oEvent: Event): void {
        console.log("App.controller - onListItemPress triggered!", oEvent);
        this.pagosMasivosManager.onListItemPress(oEvent);
    }

    // ===== PAGOS MASIVOS DETALLE METHODS =====
    public onBackToPagosMasivos(): void {
        console.log("App.controller - onBackToPagosMasivos triggered!");
        const oComponent = this.getOwnerComponent() as UIComponent;
        const oRouter = oComponent.getRouter();
        oRouter.navTo("RoutePagosMasivos");
    }

    public onEditPlanilla(): void {
        const oView = this.getView();
        if (oView) {
            const oModelPlanilla = oView.getModel("planilla") as JSONModel;
            if (oModelPlanilla) {
                const planillaData = oModelPlanilla.getData();
                if (planillaData && planillaData.Status === "Creada") {
                    MessageToast.show("Función de edición en desarrollo", { duration: 2000 });
                    // Aquí se puede implementar la lógica para editar la planilla
                } else {
                    MessageBox.error("Solo se pueden editar planillas con estado 'Creada'");
                }
            }
        }
    }

    public onAnularPlanilla(): void {
        const oView = this.getView();
        if (oView) {
            const oModelPlanilla = oView.getModel("planilla") as JSONModel;
            if (oModelPlanilla) {
                const planillaData = oModelPlanilla.getData();
                if (planillaData && planillaData.Status === "Creada") {
                    MessageBox.confirm("¿Está seguro que desea anular esta planilla?", {
                        title: "Confirmar Anulación",
                        onClose: (sAction: string) => {
                            if (sAction === MessageBox.Action.OK) {
                                // Actualizar el estado de la planilla
                                planillaData.Status = "Anulada";
                                oModelPlanilla.setData(planillaData);
                                MessageToast.show("Planilla anulada exitosamente", { duration: 2000 });
                            }
                        }
                    });
                } else {
                    MessageBox.error("Solo se pueden anular planillas con estado 'Creada'");
                }
            }
        }
    }

    public onDownloadPlanilla(): void {
        console.log("App.controller - onDownloadPlanilla triggered!");
        this.pagosMasivosManager.onDownloadPlanilla();
    }

    public onFechaEjecucionChange(oEvent: any): void {
        console.log("App.controller - onFechaEjecucionChange triggered!");
        this.pagosMasivosManager.onFechaEjecucionChange(oEvent);
    }

    public onSerieChange(oEvent: any): void {
        console.log("App.controller - onSerieChange triggered!");
        this.pagosMasivosManager.onSerieChange(oEvent);
    }

    public onGuardarPlanilla(): void {
        console.log("App.controller - onGuardarPlanilla triggered!");
        console.log("App.controller - PagosMasivosManager instance:", this.pagosMasivosManager);
        if (this.pagosMasivosManager) {
            this.pagosMasivosManager.onGuardarPlanilla();
        } else {
            console.error("PagosMasivosManager is not initialized!");
        }
    }

    public onAddDocumentos(): void {
        console.log("App.controller - onAddDocumentos triggered!");
        if (this.pagosMasivosManager) {
            this.pagosMasivosManager.onAddDocumentos();
        } else {
            console.error("PagosMasivosManager is not initialized!");
        }
    }

    public onDocumentSearch(oEvent: any): void {
        console.log("App.controller - onDocumentSearch triggered!");
        if (this.pagosMasivosManager) {
            this.pagosMasivosManager.onDocumentSearch(oEvent);
        }
    }

    public onDocumentBankFilterChange(oEvent: any): void {
        console.log("App.controller - onDocumentBankFilterChange triggered!");
        if (this.pagosMasivosManager) {
            this.pagosMasivosManager.onDocumentBankFilterChange(oEvent);
        }
    }

    public onDocumentSelectionChange(oEvent: any): void {
        console.log("App.controller - onDocumentSelectionChange triggered!");
        if (this.pagosMasivosManager) {
            this.pagosMasivosManager.onDocumentSelectionChange(oEvent);
        }
    }

    public onDocumentDialogCancel(): void {
        console.log("App.controller - onDocumentDialogCancel triggered!");
        if (this.pagosMasivosManager) {
            this.pagosMasivosManager.onDocumentDialogCancel();
        }
    }

    public onDocumentDialogConfirm(): void {
        console.log("App.controller - onDocumentDialogConfirm triggered!");
        if (this.pagosMasivosManager) {
            this.pagosMasivosManager.onDocumentDialogConfirm();
        }
    }

    // ===== PRIVATE METHODS =====
    private loadPlanillaById(planillaId: string): void {
        // Cargar datos de la planilla desde el archivo JSON
        const planillasUrl = "./model/mock/products.json";
        
        try {
            const oModel = new JSONModel();
            oModel.loadData(planillasUrl, undefined, false);
            const oData = oModel.getData();
            console.log("App.controller - Planilla data loaded:", oData);
            
            // Buscar la planilla por ID
            const planilla = oData.find((item: any) => item.Id === planillaId);
            
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
    }

    private loadFallbackPlanillaData(planillaId: string): void {
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
    }

    private checkForDetailNavigation(): void {
        // Check if we need to navigate to detail page
        const oComponent = this.getOwnerComponent() as UIComponent;
        const oRouter = oComponent.getRouter();
        
        // Get current route parameters
        const oRoute = oRouter.getRoute("RoutePagosMasivosDetalle");
        if (oRoute) {
            oRoute.attachPatternMatched((oEvent: any) => {
                const planillaId = oEvent.getParameter("arguments").planillaId;
                if (planillaId) {
                    console.log("App.controller - Navigating to planilla detail:", planillaId);
                    this.loadPlanillaById(planillaId);
                }
            });
        }
    }

    private checkAuthentication(): void {
        // Verificar si el usuario ya está autenticado
        const authData = sessionStorage.getItem("finanb1_auth") || localStorage.getItem("finanb1_auth");
        
        if (authData) {
            try {
                const parsedAuthData = JSON.parse(authData);
                if (parsedAuthData.isAuthenticated) {
                    // Usuario autenticado, redirigir a configuración (página principal)
                    const oComponent = this.getOwnerComponent() as UIComponent;
                    const oRouter = oComponent.getRouter();
                    oRouter.navTo("RouteConfiguracion");
                }
            } catch (error) {
                console.error("Error parsing auth data:", error);
            }
        }
    }
}