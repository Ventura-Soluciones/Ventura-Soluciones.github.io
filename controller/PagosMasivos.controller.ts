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
export default class PagosMasivos extends Controller {
    public formatter = formatter;
    
    // Gestores para diferentes funcionalidades
    public userManager: UserManager;
    public menuManager: MenuManager;
    public pagosMasivosManager: PagosMasivosManager;
    public navigationManager: NavigationManager;

    public onInit(): void {
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
    }

    // ===== MÉTODOS DE NAVEGACIÓN =====
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

    // ===== MÉTODOS DE PAGOS MASIVOS =====
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
        console.log("PagosMasivos.controller - onListItemPress triggered!", oEvent);
        this.pagosMasivosManager.onListItemPress(oEvent);
    }


} 