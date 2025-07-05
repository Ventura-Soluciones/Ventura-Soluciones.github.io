import JSONModel from "sap/ui/model/json/JSONModel";

/**
 * MenuManager - Handles navigation menu logic
 */
export class MenuManager {
    private oModel: JSONModel;

    constructor() {
        this.oModel = new JSONModel();
    }

    public getModel(): JSONModel {
        return this.oModel;
    }

    public loadHardcodedMenuData(): void {
        const hardcodedMenuData = {
            "selectedKey": "pagosMasivos",
            "navigation": [
                {
                    "key": "configuracion",
                    "text": "Configuración",
                    "icon": "sap-icon://settings"
                },
                {
                    "key": "pagosMasivos",
                    "text": "Pagos Masivos",
                    "icon": "sap-icon://money-bills"
                },
                {
                    "key": "detracciones",
                    "text": "Detracciones",
                    "icon": "sap-icon://document"
                }
            ],
            "fixedNavigation": []
        };
        
        console.log("Cargando datos de menú hardcodeados:", hardcodedMenuData);
        this.oModel.setData(hardcodedMenuData);
    }

    public filterNavigationByRole(userRole: string): void {
        console.log("Filtrando navegación por rol:", userRole);
        
        const aNavigation = this.oModel.getProperty("/navigation") || [];
        console.log("Navegación original:", aNavigation);
        
        const aFilteredNavigation = aNavigation.filter((item: any) => {
            if (userRole === 'admin') return true;
            if (item.key === 'configuracion') return false;
            return true;
        });
        console.log("Navegación filtrada:", aFilteredNavigation);
        
        this.oModel.setProperty("/navigation", aFilteredNavigation);
        const sSelectedKey = this.oModel.getProperty("/selectedKey");
        const bKeyExists = aFilteredNavigation.some((item: any) => item.key === sSelectedKey);
        if (!bKeyExists && aFilteredNavigation.length > 0) {
            this.oModel.setProperty("/selectedKey", aFilteredNavigation[0].key);
        }
        
        console.log("Datos finales del modelo:", this.oModel.getData());
        
        // Forzar actualización de la vista
        this.oModel.refresh(true);
        console.log("Modelo de menú actualizado");
    }

    public setSelectedKey(key: string): void {
        this.oModel.setProperty("/selectedKey", key);
    }

    public getSelectedKey(): string {
        return this.oModel.getProperty("/selectedKey");
    }
} 