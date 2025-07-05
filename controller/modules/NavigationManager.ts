import MessageBox from "sap/m/MessageBox";
import Event from "sap/ui/base/Event";
import type UIComponent from "sap/ui/core/UIComponent";

/**
 * NavigationManager - Handles page navigation logic
 */
export class NavigationManager {
    private controller: any;

    constructor(controller: any) {
        this.controller = controller;
    }

    public navigateToPage(sKey: string, currentUser: any): void {
        console.log("Navegando a la clave:", sKey);
        
        if (sKey === 'configuracion' && currentUser?.role !== 'admin') {
            MessageBox.error("No tiene permisos para acceder a la configuración");
            return;
        }
        
        const oComponent = this.controller.getOwnerComponent() as UIComponent;
        const oRouter = oComponent.getRouter();
        
        // Map page keys to route names
        const routeMap: { [key: string]: string } = {
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

    public onSideNavigationItemSelect(oEvent: Event<any>): void {
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

    public onSideNavItemSelect(oEvent: any): void {
        this.onSideNavigationItemSelect(oEvent);
    }

    public onMenuButtonPress(): void {
        const toolPage = this.controller.byId("toolPage2") as any;
        if (toolPage && typeof toolPage.setSideExpanded === "function" && typeof toolPage.getSideExpanded === "function") {
            toolPage.setSideExpanded(!toolPage.getSideExpanded());
        }
    }
} 