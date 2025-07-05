import BaseComponent from "sap/ui/core/UIComponent";
import { createDeviceModel } from "./model/models";
import JSONModel from "sap/ui/model/json/JSONModel";

/**
 * @namespace com.vs.extension.finanb1
 */
export default class Component extends BaseComponent {

	public static metadata = {
		manifest: "json",
        interfaces: [
            "sap.ui.core.IAsyncContentCreation"
        ]
	};

	public init(): void {
		// Llamar la función init del componente base
		super.init();

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
}