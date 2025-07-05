import Controller from "sap/ui/core/mvc/Controller";
import MessageToast from "sap/m/MessageToast";
import JSONModel from "sap/ui/model/json/JSONModel";
import MessageBox from "sap/m/MessageBox";
import Dialog from "sap/m/Dialog";
import formatter from "../model/formatter";
import Event from "sap/ui/base/Event";
import type UIComponent from "sap/ui/core/UIComponent";
import { UserManager } from "./modules/UserManager";
import { MenuManager } from "./modules/MenuManager";
import { PagosMasivosManager } from "./modules/PagosMasivosManager";
import { NavigationManager } from "./modules/NavigationManager";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";


/**
 * @namespace com.vs.extension.finanb1.controller
 */
export default class PagosMasivosDetalle extends Controller {
    public formatter = formatter;
    
    // Gestores para diferentes funcionalidades
    public userManager: UserManager;
    public menuManager: MenuManager;
    public pagosMasivosManager: PagosMasivosManager;
    public navigationManager: NavigationManager;

    // Propiedades para FilterBar
    private oModel: any;
    private oFilterBar: any;
    private oTable: any;
    private _filterTimer: any;


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
        
        // Configurar modelo de documentos disponibles
        if (oView) {
            this.oModel = new JSONModel();
			this.oModel.loadData("./model/mock/available-documents.json", undefined, false);
			oView.setModel(this.oModel, "oModel");

            // Cargar datos de cuentas bancarias
            const cuentasBancariasModel = new JSONModel();
            cuentasBancariasModel.loadData("./model/mock/cuentas-bancarias.json", undefined, false);
            oView.setModel(cuentasBancariasModel, "cuentasBancarias");
            
            // Asegurar que los datos de cuentas bancarias se carguen
            cuentasBancariasModel.attachRequestCompleted(() => {
                console.log("Modelo de cuentas bancarias cargado");
            });

            this.oFilterBar = this.getView()?.byId("filterbar");
            this.oTable = this.getView()?.byId("table");
            
            // Inicializar temporizador de debounce para filtrado automático
            this._filterTimer = null;
            
            // Asegurar que la tabla muestre todos los datos inicialmente después de cargar el modelo
            this.oModel.attachRequestCompleted(() => {
                console.log("Modelo de documentos disponibles cargado");
                // Inicializar alreadyInPlanilla a false para todos los documentos
                const data = this.oModel.getData();
                if (data && data.documents) {
                    data.documents.forEach((doc: any) => {
                        doc.alreadyInPlanilla = false;
                    });
                    this.oModel.setData(data);
                }
                this._clearTableFilters();
            });
        }
        

        
        // Verificar navegación a detalle
        this.checkForDetailNavigation();
    }

//MÉTODOS DE FILTROS
public onExit(): void {
    this.oModel = null;
    this.oFilterBar = null;
    this.oTable = null;
}

public onSelectionChange(oEvent: Event): void {
    // Aplicar filtro inmediatamente
    this._debouncedSearch();
}

public onDateRangeChange(oEvent: Event): void {
    // Aplicar filtro inmediatamente
    this._debouncedSearch();
}

private _debouncedSearch(iDelay?: number): void {
    const delay = iDelay || 0;
    
    // Limpiar temporizador existente
    if (this._filterTimer) {
        clearTimeout(this._filterTimer);
    }
    
    // Establecer nuevo temporizador
    this._filterTimer = setTimeout(() => {
        this.onSearch();
    }, delay);
}

public onSearch(): void {
    const aTableFilters = this.oFilterBar.getFilterGroupItems().reduce((aResult: any[], oFilterGroupItem: any) => {
        const oControl = oFilterGroupItem.getControl();
        
        // Manejar controles MultiComboBox (filtros de texto)
        if (oControl && oControl.getSelectedKeys) {
            const aSelectedKeys = oControl.getSelectedKeys();
            const aFilters = aSelectedKeys.map((sSelectedKey: string) => {
                // Mapear nombres de filtros a campos reales de datos
                let fieldPath = oFilterGroupItem.getName();
                if (fieldPath === "Name") fieldPath = "DocType";
                else if (fieldPath === "Category") fieldPath = "CardCode";
                else if (fieldPath === "SupplierName") fieldPath = "BankCode";
                
                return new Filter({
                    path: fieldPath,
                    operator: FilterOperator.Contains,
                    value1: sSelectedKey
                });
            });

            if (aSelectedKeys.length > 0) {
                aResult.push(new Filter({
                    filters: aFilters,
                    and: false
                }));
            }
        }
        // Manejar controles DateRangeSelection (filtros de rango de fechas)
        else if (oControl && oControl.getValue) {
            const sValue = oControl.getValue();
            if (sValue && sValue !== "") {
                const aDateRange = sValue.split(" - ");
                if (aDateRange.length === 2) {
                    const sStartDate = aDateRange[0];
                    const sEndDate = aDateRange[1];
                    
                    // Solo aplicar filtro si ambas fechas están seleccionadas
                    if (sStartDate && sEndDate && sStartDate !== "" && sEndDate !== "") {
                        aResult.push(new Filter({
                            path: "DocDate", // Mapear al campo de fecha del documento
                            operator: FilterOperator.BT,
                            value1: sStartDate,
                            value2: sEndDate
                        }));
                    }
                }
            }
        }

        return aResult;
    }, []);

    if (this.oTable && this.oTable.getBinding("items")) {
        this.oTable.getBinding("items").filter(aTableFilters);
    }
}



private _clearTableFilters(): void {
    // Limpiar filtros existentes para mostrar todos los datos
    if (this.oTable && this.oTable.getBinding("items")) {
        this.oTable.getBinding("items").filter([]);
    }
    
    // Depuración: Registrar los datos para ver qué está disponible
    this._logTableData();
}

private _logTableData(): void {
    // Método de depuración para verificar qué datos están disponibles
    const oView = this.getView();
    if (!oView) return;
    
    const oModel = oView.getModel();
    if (!oModel) return;
    
    const aData = oModel.getProperty("/documents");
    if (!aData) return;
    
    console.log("Total de documentos:", aData.length);
    console.log("Primeros documentos:", aData.slice(0, 3));
    
    // Registrar datos de filtros disponibles
    const docTypes = oModel.getProperty("/docTypes");
    const suppliers = oModel.getProperty("/suppliers");
    const banks = oModel.getProperty("/banks");
    
    console.log("Tipos de documento disponibles:", docTypes?.length || 0);
    console.log("Proveedores disponibles:", suppliers?.length || 0);
    console.log("Bancos disponibles:", banks?.length || 0);
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

    // ===== MÉTODOS DE PAGOS MASIVOS DETALLE =====
    public onBackToPagosMasivos(): void {
        console.log("PagosMasivosDetalle.controller - onBackToPagosMasivos triggered!");
        const oComponent = this.getOwnerComponent() as UIComponent;
        const oRouter = oComponent.getRouter();
        oRouter.navTo("RoutePagosMasivos");
    }

    public onNuevaPlanilla(): void {
        console.log("PagosMasivosDetalle.controller - onNuevaPlanilla triggered!");
        // Navigate to new planilla
        const oComponent = this.getOwnerComponent() as UIComponent;
        const oRouter = oComponent.getRouter();
        oRouter.navTo("RoutePagosMasivosDetalle", { planillaId: "new" });
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
                if (planillaData) {
                    MessageBox.confirm("¿Está seguro que desea anular esta planilla?", {
                        title: "Confirmar Anulación",
                        onClose: (sAction: string) => {
                            if (sAction === MessageBox.Action.OK) {
                                // Mock API call to cancel planilla
                                this.mockCancelPlanillaAPI(planillaData.DocEntry);
                            }
                        }
                    });
                } else {
                    MessageBox.error("No se pudo obtener los datos de la planilla");
                }
            } else {
                MessageBox.error("No se pudo acceder al modelo de la planilla");
            }
        } else {
            MessageBox.error("No se pudo acceder a la vista");
        }
    }

    private mockCancelPlanillaAPI(planillaId: number): void {
        console.log("PagosMasivosDetalle.controller - Llamada API simulada: POST /Planilla(" + planillaId + ")/Cancel");
        
        // Simular retraso de llamada API
        setTimeout(() => {
            // Respuesta exitosa simulada
            const mockResponse = {
                success: true,
                message: "Planilla anulada exitosamente",
                planillaId: planillaId,
                timestamp: new Date().toISOString()
            };
            
            console.log("PagosMasivosDetalle.controller - Respuesta API simulada:", mockResponse);
            
            // Mostrar mensaje de éxito
            MessageBox.success("Planilla anulada exitosamente", {
                title: "Operación Exitosa",
                details: `Llamada API: POST /Planilla(${planillaId})/Cancel\nRespuesta: ${JSON.stringify(mockResponse, null, 2)}`,
                onClose: () => {
                    // Actualizar el estado de la planilla en el modelo
                    const oView = this.getView();
                    if (oView) {
                        const oModelPlanilla = oView.getModel("planilla") as JSONModel;
                        if (oModelPlanilla) {
                            const planillaData = oModelPlanilla.getData();
                            if (planillaData) {
                                planillaData.U_ESTADO = "A"; // Anulada
                                oModelPlanilla.refresh(true);
                                console.log("PagosMasivosDetalle.controller - Estado de planilla actualizado a 'Anulada'");
                            }
                        }
                    }
                }
            });
        }, 1000); // Retraso de 1 segundo para simular llamada API
    }

    public onDownloadPlanilla(): void {
        console.log("PagosMasivosDetalle.controller - onDownloadPlanilla triggered!");
        this.pagosMasivosManager.onDownloadPlanilla();
    }

    public onFechaEjecucionChange(oEvent: any): void {
        console.log("PagosMasivosDetalle.controller - onFechaEjecucionChange triggered!");
        this.pagosMasivosManager.onFechaEjecucionChange(oEvent);
    }

    public onSerieChange(oEvent: any): void {
        console.log("PagosMasivosDetalle.controller - onSerieChange triggered!");
        this.pagosMasivosManager.onSerieChange(oEvent);
    }

    public onCuentaBancariaChange(oEvent: any): void {
        console.log("PagosMasivosDetalle.controller - onCuentaBancariaChange activado");
        
        const oView = this.getView();
        if (!oView) return;
        
        const selectedItem = oEvent.getParameter("selectedItem");
        if (!selectedItem) {
            console.log("No se seleccionó ninguna cuenta bancaria");
            return;
        }
        
        const selectedKey = selectedItem.getKey();
        console.log("PagosMasivosDetalle.controller - Cuenta bancaria seleccionada (clave):", selectedKey);
        
        // Obtener el modelo de cuentas bancarias para encontrar la cuenta seleccionada
        const cuentasBancariasModel = oView.getModel("cuentasBancarias") as JSONModel;
        if (!cuentasBancariasModel) {
            console.error("PagosMasivosDetalle.controller - Modelo de cuentas bancarias no encontrado");
            return;
        }
        
        const cuentasBancarias = cuentasBancariasModel.getData();
        const selectedAccount = cuentasBancarias.value.find((account: any) => account.AccNo === selectedKey);
        
        if (!selectedAccount) {
            console.error("PagosMasivosDetalle.controller - Cuenta seleccionada no encontrada");
            return;
        }
        
        console.log("PagosMasivosDetalle.controller - Cuenta seleccionada:", selectedAccount);
        
        // Actualizar el modelo de planilla con los datos de la cuenta seleccionada
        const planillaModel = oView.getModel("planilla") as JSONModel;
        if (planillaModel) {
            // Actualizar los campos basándose en la cuenta seleccionada
            planillaModel.setProperty("/U_CUENTA", selectedAccount.AccNo);
            planillaModel.setProperty("/U_IDBANCO", selectedAccount.BankCode);
            planillaModel.setProperty("/U_NMBANCO", selectedAccount.BankCode); // Usando BankCode como nombre del banco por ahora
            planillaModel.setProperty("/U_MONEDA", selectedAccount.Branch);
            planillaModel.setProperty("/U_GLACCOUNT", selectedAccount.GLAccount);
            
            console.log("PagosMasivosDetalle.controller - Planilla actualizada con datos de cuenta:", {
                U_CUENTA: selectedAccount.AccNo,
                U_IDBANCO: selectedAccount.BankCode,
                U_NMBANCO: selectedAccount.BankCode,
                U_MONEDA: selectedAccount.Branch,
                U_GLACCOUNT: selectedAccount.GLAccount
            });
            
            // Forzar actualización del modelo
            planillaModel.refresh(true);
        } else {
            console.error("PagosMasivosDetalle.controller - Modelo de planilla no encontrado");
        }
    }

    public onGuardarPlanilla(): void {
        console.log("PagosMasivosDetalle.controller - onGuardarPlanilla triggered!");
        
        const oView = this.getView();
        if (!oView) {
            MessageBox.error("No se pudo acceder a la vista");
            return;
        }
        
        const oModelPlanilla = oView.getModel("planilla") as JSONModel;
        if (!oModelPlanilla) {
            MessageBox.error("No se pudo acceder al modelo de la planilla");
            return;
        }
        
        const planillaData = oModelPlanilla.getData();
        if (!planillaData) {
            MessageBox.error("No se pudo obtener los datos de la planilla");
            return;
        }
        
        // Verificar si es una nueva planilla
        console.log("PagosMasivosDetalle.controller - Valor de isNewPlanilla:", planillaData.isNewPlanilla);
        console.log("PagosMasivosDetalle.controller - Datos de planilla:", planillaData);
        
        if (planillaData.isNewPlanilla === true) {
            // Validar campos requeridos para nueva planilla
            const validationResult = this.validateNewPlanilla(planillaData);
            
            if (!validationResult.isValid) {
                MessageBox.error(validationResult.message, {
                    title: "Validación Requerida"
                });
                return;
            }
            
            // Mostrar confirmación para crear nueva planilla
            MessageBox.confirm("¿Está seguro que desea crear esta planilla?", {
                title: "Confirmar Creación",
                onClose: (sAction: string) => {
                    if (sAction === MessageBox.Action.OK) {
                        // Llamada API simulada para crear planilla
                        this.mockCreatePlanillaAPI(planillaData);
                    }
                }
            });
        } else {
            // Para planillas existentes, solo mostrar un mensaje
            MessageBox.information("Esta planilla ya existe. Use 'Ejecutar' para procesarla.");
        }
    }

    public onEjecutarPlanilla(): void {
        console.log("PagosMasivosDetalle.controller - onEjecutarPlanilla triggered!");
        
        const oView = this.getView();
        if (!oView) {
            MessageBox.error("No se pudo acceder a la vista");
            return;
        }
        
        const oModelPlanilla = oView.getModel("planilla") as JSONModel;
        if (!oModelPlanilla) {
            MessageBox.error("No se pudo acceder al modelo de la planilla");
            return;
        }
        
        const planillaData = oModelPlanilla.getData();
        if (!planillaData) {
            MessageBox.error("No se pudo obtener los datos de la planilla");
            return;
        }
        
        // Verificar que la planilla esté en estado "Creada"
        if (planillaData.U_ESTADO !== "C") {
            MessageBox.warning("Solo se pueden ejecutar planillas con estado 'Creada'");
            return;
        }
        
        // Validar que tenga al menos un documento
        if (!planillaData.VS_PMP1Collection || planillaData.VS_PMP1Collection.length === 0) {
            MessageBox.warning("La planilla debe tener al menos un documento para ser ejecutada");
            return;
        }
        
        // Mostrar confirmación para ejecutar la planilla
        MessageBox.confirm("¿Está seguro que desea ejecutar esta planilla?", {
            title: "Confirmar Ejecución",
            onClose: (sAction: string) => {
                if (sAction === MessageBox.Action.OK) {
                    // Llamada API simulada para ejecutar planilla
                    this.mockExecutePlanillaAPI(planillaData);
                }
            }
        });
    }

    private mockCreatePlanillaAPI(planillaData: any): void {
        console.log("PagosMasivosDetalle.controller - Llamada API simulada: POST /Planilla");
        console.log("PagosMasivosDetalle.controller - Datos enviados:", planillaData);
        
        // Simular retraso de llamada API
        setTimeout(() => {
            // Respuesta exitosa simulada
            const mockResponse = {
                success: true,
                message: "Planilla creada exitosamente",
                planillaId: Math.floor(Math.random() * 1000) + 100, // ID aleatorio
                timestamp: new Date().toISOString(),
                createdPlanilla: {
                    ...planillaData,
                    DocEntry: Math.floor(Math.random() * 1000) + 100,
                    isNewPlanilla: false,
                    U_ESTADO: "C" // Creada
                }
            };
            
            console.log("PagosMasivosDetalle.controller - Respuesta API simulada:", mockResponse);
            
            // Mostrar mensaje de éxito con detalles de la API
            MessageBox.success("Planilla creada exitosamente", {
                title: "Operación Exitosa",
                details: `Llamada API: POST /Planilla\nDatos enviados: ${JSON.stringify(planillaData, null, 2)}\nRespuesta: ${JSON.stringify(mockResponse, null, 2)}`,
                onClose: () => {
                    // Actualizar la planilla con los datos de respuesta
                    const oView = this.getView();
                    if (oView) {
                        const oModelPlanilla = oView.getModel("planilla") as JSONModel;
                        if (oModelPlanilla) {
                            // Actualizar con los datos de la planilla creada
                            oModelPlanilla.setData(mockResponse.createdPlanilla);
                            oModelPlanilla.refresh(true);
                            console.log("PagosMasivosDetalle.controller - Planilla actualizada con datos creados");
                        }
                    }
                }
            });
        }, 1500); // Retraso de 1.5 segundos para simular llamada API
    }

    private mockExecutePlanillaAPI(planillaData: any): void {
        console.log("PagosMasivosDetalle.controller - Llamada API simulada: POST /Planilla(" + planillaData.DocEntry + ")/Execute");
        
        // Preparar solo los datos requeridos para la ejecución
        const executeData = {
            DocEntry: planillaData.DocEntry,
            U_FECHAP: planillaData.U_FECHAP,
            U_TC: planillaData.U_TC,
            U_NOPBAN: planillaData.U_NOPBAN
        };
        
        console.log("PagosMasivosDetalle.controller - Datos enviados para ejecución:", executeData);
        
        // Simular retraso de llamada API
        setTimeout(() => {
            // Respuesta exitosa simulada
            const mockResponse = {
                success: true,
                message: "Planilla ejecutada exitosamente",
                planillaId: planillaData.DocEntry,
                timestamp: new Date().toISOString(),
                executedPlanilla: {
                    ...planillaData,
                    U_ESTADO: "E" // Ejecutada
                }
            };
            
            console.log("PagosMasivosDetalle.controller - Respuesta API simulada:", mockResponse);
            
            // Mostrar mensaje de éxito con detalles de la API
            MessageBox.success("Planilla ejecutada exitosamente", {
                title: "Operación Exitosa",
                details: `Llamada API: POST /Planilla(${planillaData.DocEntry})/Execute\nDatos enviados: ${JSON.stringify(executeData, null, 2)}\nRespuesta: ${JSON.stringify(mockResponse, null, 2)}`,
                onClose: () => {
                    // Actualizar la planilla con los datos de respuesta
                    const oView = this.getView();
                    if (oView) {
                        const oModelPlanilla = oView.getModel("planilla") as JSONModel;
                        if (oModelPlanilla) {
                            // Actualizar con los datos de la planilla ejecutada
                            oModelPlanilla.setData(mockResponse.executedPlanilla);
                            oModelPlanilla.refresh(true);
                            console.log("PagosMasivosDetalle.controller - Planilla actualizada con datos ejecutados");
                        }
                    }
                }
            });
        }, 2000); // Retraso de 2 segundos para simular llamada API
    }

    private validateNewPlanilla(planillaData: any): { isValid: boolean; message: string } {
        console.log("PagosMasivosDetalle.controller - Validando nueva planilla:", planillaData);
        
        const errors: string[] = [];
        
        // Validar Cuenta Bancaria
        if (!planillaData.U_CUENTA) {
            errors.push("• Cuenta Bancaria es requerida");
        }
        
        // Validar Serie
        if (!planillaData.U_SERIE) {
            errors.push("• Serie es requerida");
        }
        
        // Validar Fecha de Ejecución
        if (!planillaData.U_FECHAP) {
            errors.push("• Fecha de Ejecución es requerida");
        }
        
        // Validar Tipo de Cambio
        if (!planillaData.U_TC) {
            errors.push("• Tipo de Cambio es requerido");
        }
        
        // Validar al menos un documento
        if (!planillaData.VS_PMP1Collection || planillaData.VS_PMP1Collection.length === 0) {
            errors.push("• Al menos un documento es requerido");
        }
        
        if (errors.length > 0) {
            const message = "Por favor complete los siguientes campos requeridos:\n\n" + errors.join("\n");
            return { isValid: false, message: message };
        }
        
        return { isValid: true, message: "" };
    }

    public onAddDocumentos(): void {
        console.log("PagosMasivosDetalle.controller - onAddDocumentos triggered!");
        if (this.pagosMasivosManager) {
            this.pagosMasivosManager.onAddDocumentos();
        } else {
            console.error("PagosMasivosManager is not initialized!");
        }
    }

    public onDocumentSearch(oEvent: any): void {
        console.log("PagosMasivosDetalle.controller - onDocumentSearch triggered!");
        if (this.pagosMasivosManager) {
            this.pagosMasivosManager.onDocumentSearch(oEvent);
        }
    }



    public onDocumentBankFilterChange(oEvent: any): void {
        console.log("PagosMasivosDetalle.controller - onDocumentBankFilterChange triggered!");
        if (this.pagosMasivosManager) {
            this.pagosMasivosManager.onDocumentBankFilterChange(oEvent);
        }
    }



    public onDocumentSelectionChange(oEvent: any): void {
        console.log("PagosMasivosDetalle.controller - onDocumentSelectionChange triggered!");
        if (this.pagosMasivosManager) {
            this.pagosMasivosManager.onDocumentSelectionChange(oEvent);
        }
    }

    public onDocumentDialogCancel(): void {
        console.log("PagosMasivosDetalle.controller - onDocumentDialogCancel triggered!");
        if (this.pagosMasivosManager) {
            this.pagosMasivosManager.onDocumentDialogCancel();
        }
    }

    public onDocumentDialogConfirm(): void {
        console.log("PagosMasivosDetalle.controller - onDocumentDialogConfirm triggered!");
        
        const oView = this.getView();
        if (!oView) return;
        
        const oTable = oView.byId("table") as any;
        if (!oTable) return;
        
        const aSelectedItems = oTable.getSelectedItems();
        if (aSelectedItems.length === 0) {
            MessageBox.warning("Por favor seleccione al menos un documento.");
            return;
        }
        
        // Obtener el modelo de planilla
        const oPlanillaModel = oView.getModel("planilla") as JSONModel;
        if (!oPlanillaModel) return;
        
        const planillaData = oPlanillaModel.getData();
        if (!planillaData) return;
        
        // Obtener documentos actuales en la planilla
        const currentDocuments = planillaData.VS_PMP1Collection || [];
        
        // Obtener números de documentos existentes para evitar duplicados
        const existingDocNums = currentDocuments.map((doc: any) => doc.U_NUMDOC);
        const documentsToAdd: any[] = [];
        const skippedDocuments: any[] = [];
        
        // Agregar documentos seleccionados a la planilla (evitando duplicados)
        aSelectedItems.forEach((oItem: any) => {
            const documentData = oItem.getBindingContext("oModel").getObject();
            
            // Verificar si el documento ya está en la planilla
            if (existingDocNums.includes(documentData.DocNum)) {
                skippedDocuments.push(documentData.DocNum);
                return; // Omitir este documento
            }
            
            // Crear nueva línea de elemento para la planilla
            const newLine = {
                DocEntry: planillaData.DocEntry,
                LineId: currentDocuments.length + documentsToAdd.length + 1,
                VisOrder: currentDocuments.length + documentsToAdd.length + 1,
                Object: "VS_OPMP",
                LogInst: null,
                U_CHECK: "Y",
                U_IDPAGO: planillaData.U_IDPAGO,
                U_TIPDOC: documentData.DocType,
                U_IDDOC: documentData.DocEntry,
                U_LINDOC: 0,
                U_OBJDOC: "18",
                U_CUODOC: "1",
                U_IDSN: documentData.CardCode,
                U_NMSN: documentData.CardName,
                U_RUC: documentData.CardCode,
                U_NUMDOC: documentData.DocNum,
                U_MONDOC: documentData.Currency,
                U_IMPORTE: documentData.Total,
                U_SALDO: documentData.Balance,
                U_PAGONETO: documentData.Balance,
                U_PAGLOC: documentData.Balance,
                U_PAGEXT: 0,
                U_RETLOC: 0, // Valor por defecto 0 ya que RetLoc no existe en documentos disponibles
                U_RETEXT: 0,
                U_FVENC: documentData.DueDate,
                U_FCONT: documentData.DocDate,
                U_FDOCU: documentData.DocDate,
                U_CCORRI: documentData.CuentaBancaria,
                U_CTAINF: documentData.BankCode,
                U_MONINF: documentData.Currency,
                U_RETCOD: "",
                U_RETPOR: 0,
                U_ESTADO: "1",
                U_SL: documentData.Balance,
                U_SE: 0,
                U_RL: 0, // Valor por defecto 0 ya que RetLoc no existe en documentos disponibles
                U_RE: 0,
                U_BL: 0,
                U_BE: 0,
                U_IL: documentData.Balance,
                U_REF2: documentData.DocNum,
                U_PAGLOC0: documentData.Balance, // Usar Balance como PAGLOC0 ya que PAGLOC0 no existe
                U_PAGEXT0: 0,
                U_RETLOC0: 0, // Valor por defecto 0 ya que RetLoc no existe en documentos disponibles
                U_RETEXT0: 0,
                U_MPBB: "2"
            };
            
            documentsToAdd.push(newLine);
        });
        
        // Agregar nuevos documentos a la planilla
        currentDocuments.push(...documentsToAdd);
        
        // Actualizar el modelo de planilla
        planillaData.VS_PMP1Collection = currentDocuments;
        
        // Recalcular totales después de agregar documentos
        this.recalculatePlanillaTotals(planillaData);
        
        // Actualizar el modelo con datos recalculados
        oPlanillaModel.setData(planillaData);
        oPlanillaModel.refresh(true);
        
        // Actualizar el estado de ya agregado en el modal
        this.updateAlreadyAddedStatus();
        
        // Cerrar el diálogo
        const oDialog = oView.byId("documentSelectionDialog") as any;
        if (oDialog) {
            oDialog.close();
        }
        
        // Limpiar selección de tabla
        oTable.removeSelections();
        
        // Mostrar mensaje apropiado
        if (documentsToAdd.length > 0 && skippedDocuments.length > 0) {
            MessageToast.show(`${documentsToAdd.length} documento(s) agregado(s), ${skippedDocuments.length} ya existían.`);
        } else if (documentsToAdd.length > 0) {
            MessageToast.show(`${documentsToAdd.length} documento(s) agregado(s) a la planilla.`);
        } else if (skippedDocuments.length > 0) {
            MessageBox.warning("Todos los documentos seleccionados ya están en la planilla.");
        } else {
            MessageBox.warning("Por favor seleccione al menos un documento.");
        }
    }

    private updateAlreadyAddedStatus(): void {
        this.markAlreadyAddedDocuments();
    }

    public onDeletePlanillaLine(oEvent: any): void {
        console.log("PagosMasivosDetalle.controller - Delete planilla line triggered");
        
        const oView = this.getView();
        if (!oView) {
            return;
        }

        const oPlanillaModel = oView.getModel("planilla") as JSONModel;
        if (!oPlanillaModel) {
            console.log("Planilla model not found");
            return;
        }

        // Get the button that was clicked
        const button = oEvent.getSource();
        const listItem = button.getParent().getParent();
        const bindingContext = listItem.getBindingContext("planilla");
        
        if (!bindingContext) {
            console.log("No binding context found");
            return;
        }

        // Get the line data
        const lineData = bindingContext.getObject();
        const lineIndex = bindingContext.getPath().split("/").pop();
        
        console.log("Deleting line:", lineData);
        console.log("Line index:", lineIndex);
        
        // Show confirmation dialog
        MessageBox.confirm(
            `¿Está seguro que desea eliminar el documento ${lineData.U_NUMDOC}?`,
            {
                title: "Confirmar eliminación",
                onClose: (action: string) => {
                    if (action === MessageBox.Action.OK) {
                        this.deletePlanillaLine(parseInt(lineIndex));
                    }
                }
            }
        );
    }

    private deletePlanillaLine(lineIndex: number): void {
        console.log("PagosMasivosDetalle.controller - Deleting line at index:", lineIndex);
        
        const oView = this.getView();
        if (!oView) {
            return;
        }

        const oPlanillaModel = oView.getModel("planilla") as JSONModel;
        if (!oPlanillaModel) {
            console.log("Planilla model not found");
            return;
        }

        const planillaData = oPlanillaModel.getData();
        if (!planillaData || !planillaData.VS_PMP1Collection) {
            console.log("No planilla data found");
            return;
        }

        // Remove the line from the collection
        const updatedLines = planillaData.VS_PMP1Collection.filter((line: any, index: number) => index !== lineIndex);
        
        // Update the planilla data
        planillaData.VS_PMP1Collection = updatedLines;
        
        // Recalculate totals
        this.recalculatePlanillaTotals(planillaData);
        
        // Update the model
        oPlanillaModel.setData(planillaData);
        oPlanillaModel.refresh(true);
        
        console.log("Line deleted successfully");
        MessageToast.show("Línea eliminada correctamente", { duration: 3000 });
        
        // Update the available documents to reflect the change
        this.updateAlreadyAddedStatus();
    }

    private recalculatePlanillaTotals(planillaData: any): void {
        console.log("PagosMasivosDetalle.controller - Recalculando totales de planilla");
        
        if (!planillaData || !planillaData.VS_PMP1Collection) {
            return;
        }

        const lines = planillaData.VS_PMP1Collection;
        
        // Calcular totales
        const totalImporte = lines.reduce((sum: number, line: any) => sum + (line.U_IMPORTE || 0), 0);
        const totalRetencion = lines.reduce((sum: number, line: any) => sum + (line.U_RETLOC || 0), 0);
        const totalPagoFinal = lines.reduce((sum: number, line: any) => sum + (line.U_PAGLOC0 || 0), 0);
        
        // Actualizar totales de planilla
        planillaData.U_TOTAL = totalImporte;
        planillaData.U_RETEN = totalRetencion;
        planillaData.U_SUBTOTAL = totalPagoFinal;
        
        console.log("Totales actualizados:", {
            total: totalImporte,
            retencion: totalRetencion,
            subtotal: totalPagoFinal
        });
    }

    public onDeleteSelectedLines(): void {
        console.log("PagosMasivosDetalle.controller - Delete selected lines triggered");
        
        const oView = this.getView();
        if (!oView) {
            return;
        }

        const oPlanillaModel = oView.getModel("planilla") as JSONModel;
        if (!oPlanillaModel) {
            console.log("Planilla model not found");
            return;
        }

        const planillaData = oPlanillaModel.getData();
        if (!planillaData || !planillaData.VS_PMP1Collection) {
            console.log("No planilla data found");
            return;
        }

        // Get the table
        const oTable = oView.byId("planillaLinesTable") as any;
        if (!oTable) {
            console.log("Planilla table not found");
            return;
        }

        // Get selected items
        const selectedItems = oTable.getSelectedItems();
        if (selectedItems.length === 0) {
            MessageBox.warning("Por favor seleccione al menos una línea para eliminar.");
            return;
        }

        // Obtener los documentos a eliminar
        const documentsToDelete = selectedItems.map((item: any) => {
            const bindingContext = item.getBindingContext("planilla");
            return bindingContext ? bindingContext.getObject() : null;
        }).filter((doc: any) => doc !== null);

        if (documentsToDelete.length === 0) {
            MessageBox.warning("No se pudieron obtener los documentos seleccionados.");
            return;
        }

        // Mostrar diálogo de confirmación
        const documentNames = documentsToDelete.map((doc: any) => doc.U_NUMDOC).join(", ");
        MessageBox.confirm(
            `¿Está seguro que desea eliminar los siguientes documentos?\n${documentNames}`,
            {
                title: "Confirmar eliminación múltiple",
                onClose: (action: string) => {
                    if (action === MessageBox.Action.OK) {
                        this.deleteSelectedPlanillaLines(documentsToDelete);
                    }
                }
            }
        );
    }

    private deleteSelectedPlanillaLines(documentsToDelete: any[]): void {
        console.log("PagosMasivosDetalle.controller - Deleting selected lines:", documentsToDelete);
        
        const oView = this.getView();
        if (!oView) {
            return;
        }

        const oPlanillaModel = oView.getModel("planilla") as JSONModel;
        if (!oPlanillaModel) {
            console.log("Planilla model not found");
            return;
        }

        const planillaData = oPlanillaModel.getData();
        if (!planillaData || !planillaData.VS_PMP1Collection) {
            console.log("No planilla data found");
            return;
        }

        // Obtener números de documentos a eliminar
        const documentNumbersToDelete = documentsToDelete.map((doc: any) => doc.U_NUMDOC);
        
        // Eliminar las líneas de la colección
        const updatedLines = planillaData.VS_PMP1Collection.filter((line: any) => 
            !documentNumbersToDelete.includes(line.U_NUMDOC)
        );
        
        // Actualizar los datos de la planilla
        planillaData.VS_PMP1Collection = updatedLines;
        
        // Recalcular totales
        this.recalculatePlanillaTotals(planillaData);
        
        // Actualizar el modelo
        oPlanillaModel.setData(planillaData);
        oPlanillaModel.refresh(true);
        
        // Limpiar selección de tabla
        const oTable = oView.byId("planillaLinesTable") as any;
        if (oTable) {
            oTable.removeSelections();
        }
        
        console.log("Líneas seleccionadas eliminadas exitosamente");
        MessageToast.show(`${documentsToDelete.length} línea(s) eliminada(s) correctamente`, { duration: 3000 });
        
        // Actualizar los documentos disponibles para reflejar el cambio
        this.updateAlreadyAddedStatus();
    }

    // ===== MÉTODOS PRIVADOS =====
    private loadPlanillaById(planillaId: string): void {
        // Cargar datos de la planilla desde el archivo JSON
        const planillasUrl = "./model/mock/planilla-object.json";
        
        try {
            const oModel = new JSONModel();
            oModel.loadData(planillasUrl, undefined, false);
            const oData = oModel.getData();
            console.log("PagosMasivosDetalle.controller - Datos de planilla cargados:", oData);
            
            // Buscar la planilla por ID en el array de planillas (convertir a número para comparación)
            const planillas = oData.planillas || [];
            const planillaIdNum = parseInt(planillaId);
            const planilla = planillas.find((item: any) => item.DocEntry === planillaIdNum);
            
            if (planilla) {
                console.log("PagosMasivosDetalle.controller - Planilla encontrada:", planilla);
                
                // Agregar la propiedad isNewPlanilla como false para planillas existentes
                const planillaWithMode = {
                    ...planilla,
                    isNewPlanilla: false
                };
                
                // Crear modelo para la planilla seleccionada
                const oModelPlanilla = new JSONModel();
                oModelPlanilla.setData(planillaWithMode);
                
                // Asignar el modelo a la vista
                const oView = this.getView();
                if (oView) {
                    oView.setModel(oModelPlanilla, "planilla");
                    console.log("PagosMasivosDetalle.controller - Modelo de planilla asignado a la vista");
                    
                    // Cargar también las series
                    this.pagosMasivosManager.loadSeriesData();
                    
                    // Cargar cuentas bancarias para el ComboBox
                    const cuentasBancariasModel = new JSONModel();
                    cuentasBancariasModel.loadData("./model/mock/cuentas-bancarias.json", undefined, false);
                    oView.setModel(cuentasBancariasModel, "cuentasBancarias");
                    
                    cuentasBancariasModel.attachRequestCompleted(() => {
                        console.log("PagosMasivosDetalle.controller - Cuentas bancarias cargadas para planilla existente");
                        // Forzar actualización del modelo de planilla para asegurar que el ComboBox funcione
                        oModelPlanilla.refresh(true);
                    });
                }
            } else {
                console.log("PagosMasivosDetalle.controller - Planilla no encontrada, cargando datos de respaldo");
                this.loadFallbackPlanillaData(planillaId);
            }
        } catch (error) {
            console.error("PagosMasivosDetalle.controller - Excepción al cargar datos de planilla:", error);
            this.loadFallbackPlanillaData(planillaId);
        }
    }

        private loadFallbackPlanillaData(planillaId: string): void {
        console.log("PagosMasivosDetalle.controller - Cargando datos de respaldo para planilla ID:", planillaId);
        
        // Datos de respaldo para mostrar en caso de error
        const fallbackData = {
            "DocEntry": planillaId,
            "DocNum": parseInt(planillaId),
            "isNewPlanilla": false,
            "U_CUENTA": "194-1985504-0-94",
            "U_IDBANCO": "BCP",
            "U_NMBANCO": "BANCO DE CREDITO",
            "U_CCBANCO": "1941985504094",
            "U_GLACCOUNT": "1041101",
            "U_MONEDA": "SOL",
            "U_SERIE": 24,
            "U_ESTADO": "E",
            "U_FECHA": "2024-03-21T00:00:00Z",
            "U_FECHAP": "2024-03-21T00:00:00Z",
            "U_TC": 3.701,
            "U_RETEN": null,
            "U_FECHAV": null,
            "U_IDSN": null,
            "U_NMSN": null,
            "U_GLOSA": "PG F/VARIAS",
            "U_TOTAL": 19516.06,
            "U_IDPAGO": 1977,
            "U_SUBTOTAL": 19516.06,
            "U_REF": null,
            "U_NOPBAN": "09627515",
            "U_IDSUC": null,
            "U_NMSUC": null,
            "U_FCAJA": -1,
            "U_CONTA": 0,
            "VS_PMP1Collection": [
                {
                    "DocEntry": parseInt(planillaId),
                    "LineId": 1,
                    "VisOrder": 1,
                    "Object": "VS_OPMP",
                    "LogInst": null,
                    "U_CHECK": "Y",
                    "U_IDPAGO": 1971,
                    "U_TIPDOC": "Factura",
                    "U_IDDOC": 3617,
                    "U_LINDOC": 0,
                    "U_OBJDOC": "18",
                    "U_CUODOC": "1",
                    "U_IDSN": "PL10081644867",
                    "U_NMSN": "BUSTAMANTE DAVILA MARIA ELIZABETH",
                    "U_RUC": "10081644867",
                    "U_NUMDOC": "E001-78",
                    "U_MONDOC": "SOL",
                    "U_IMPORTE": 288,
                    "U_SALDO": 288,
                    "U_PAGONETO": 288,
                    "U_PAGLOC": 288,
                    "U_PAGEXT": 0,
                    "U_RETLOC": 0,
                    "U_RETEXT": 0,
                    "U_FVENC": "2024-03-15T00:00:00Z",
                    "U_FCONT": "2024-03-15T00:00:00Z",
                    "U_FDOCU": "2024-03-15T00:00:00Z",
                    "U_CCORRI": "19394614129025",
                    "U_CTAINF": "BCP",
                    "U_MONINF": "SOL",
                    "U_RETCOD": "",
                    "U_RETPOR": 0,
                    "U_ESTADO": "1",
                    "U_SL": 288,
                    "U_SE": 0,
                    "U_RL": 0,
                    "U_RE": 0,
                    "U_BL": 0,
                    "U_BE": 0,
                    "U_IL": 288,
                    "U_REF2": "01E001-78",
                    "U_PAGLOC0": 0,
                    "U_PAGEXT0": 0,
                    "U_RETLOC0": 0,
                    "U_RETEXT0": 0,
                    "U_MPBB": "2"
                }
            ]
        };
        
        const oModelPlanilla = new JSONModel();
        oModelPlanilla.setData(fallbackData);
        
        const oView = this.getView();
        if (oView) {
            oView.setModel(oModelPlanilla, "planilla");
            console.log("PagosMasivosDetalle.controller - Modelo de planilla de respaldo asignado a la vista");
            
            // Cargar también las series
            this.pagosMasivosManager.loadSeriesData();
            
            // Cargar cuentas bancarias para el ComboBox
            const cuentasBancariasModel = new JSONModel();
            cuentasBancariasModel.loadData("./model/mock/cuentas-bancarias.json", undefined, false);
            oView.setModel(cuentasBancariasModel, "cuentasBancarias");
            
            cuentasBancariasModel.attachRequestCompleted(() => {
                console.log("PagosMasivosDetalle.controller - Cuentas bancarias cargadas para planilla de respaldo");
                // Forzar actualización del modelo de planilla para asegurar que el ComboBox funcione
                oModelPlanilla.refresh(true);
            });
        }
    }

    private checkForDetailNavigation(): void {
        // Verificar si necesitamos navegar a la página de detalle
        const oComponent = this.getOwnerComponent() as UIComponent;
        const oRouter = oComponent.getRouter();
        
        // Obtener parámetros de la ruta actual
        const oRoute = oRouter.getRoute("RoutePagosMasivosDetalle");
        if (oRoute) {
            oRoute.attachPatternMatched((oEvent: any) => {
                const planillaId = oEvent.getParameter("arguments").planillaId;
                if (planillaId && planillaId !== "new") {
                    console.log("PagosMasivosDetalle.controller - Navegando al detalle de planilla:", planillaId);
                    this.loadPlanillaById(planillaId);
                } else if (planillaId === "new") {
                    console.log("PagosMasivosDetalle.controller - Creando nueva planilla");
                    this.pagosMasivosManager.createNewPlanilla();
                }
            });
        }
    }



    public onDocumentDialogAfterOpen(): void {
        console.log("PagosMasivosDetalle.controller - Diálogo abierto, marcando documentos existentes");
        
        const oView = this.getView();
        if (!oView) {
            return;
        }

        // Obtener el modelo de planilla para verificar documentos existentes
        const oPlanillaModel = oView.getModel("planilla") as JSONModel;
        const oModel = oView.getModel("oModel") as JSONModel;
        
        if (!oPlanillaModel || !oModel) {
            console.log("Modelos no encontrados");
            return;
        }
        
        const planillaData = oPlanillaModel.getData();
        const availableDocuments = oModel.getData();
        
        console.log("Datos de planilla:", planillaData);
        console.log("Datos de documentos disponibles:", availableDocuments);
        
        if (!planillaData || !availableDocuments) {
            console.log("No hay datos disponibles");
            return;
        }
        
        // Verificar si los documentos están cargados
        if (!availableDocuments.documents || availableDocuments.documents.length === 0) {
            console.log("Documentos aún no cargados, esperando datos...");
            // Esperar a que el modelo se cargue
            oModel.attachRequestCompleted(() => {
                setTimeout(() => {
                    this.markAlreadyAddedDocuments();
                }, 100);
            });
            return;
        }
        
        // Agregar un pequeño retraso para asegurar que los datos estén correctamente vinculados
        setTimeout(() => {
            this.markAlreadyAddedDocuments();
        }, 100);
    }

    private markAlreadyAddedDocuments(): void {
        console.log("=== INICIO markAlreadyAddedDocuments ===");
        const oView = this.getView();
        if (!oView) {
            console.log("Vista no encontrada");
            return;
        }
        
        const oPlanillaModel = oView.getModel("planilla") as JSONModel;
        const oModel = oView.getModel("oModel") as JSONModel;
        
        if (!oPlanillaModel || !oModel) {
            console.log("Modelos no encontrados");
            return;
        }
        
        const planillaData = oPlanillaModel.getData();
        const availableDocuments = oModel.getData();
        
        console.log("Claves de datos de planilla:", planillaData ? Object.keys(planillaData) : "null");
        console.log("Claves de documentos disponibles:", availableDocuments ? Object.keys(availableDocuments) : "null");
        
        if (!planillaData || !availableDocuments || !availableDocuments.documents) {
            console.log("Faltan datos para marcar documentos");
            return;
        }
        
        // Verificar si los datos de planilla están correctamente cargados
        if (!planillaData.VS_PMP1Collection) {
            console.log("VS_PMP1Collection de planilla no encontrada, inicializando como vacía");
            planillaData.VS_PMP1Collection = [];
            oPlanillaModel.setData(planillaData);
        }
        
        // Obtener números de documentos existentes en la planilla
        const existingDocNums = (planillaData.VS_PMP1Collection || []).map((doc: any) => doc.U_NUMDOC);
        console.log("Documentos existentes en planilla:", existingDocNums);
        console.log("Cantidad de documentos disponibles:", availableDocuments.documents.length);
        console.log("Longitud de VS_PMP1Collection de planilla:", planillaData.VS_PMP1Collection ? planillaData.VS_PMP1Collection.length : 0);
        
        // Siempre inicializar alreadyInPlanilla a false primero
        console.log("Inicializando todos los documentos a alreadyInPlanilla = false");
        availableDocuments.documents.forEach((doc: any, index: number) => {
            doc.alreadyInPlanilla = false;
            console.log(`Documento ${index}: ${doc.DocNum} - alreadyInPlanilla establecido a false`);
        });
        
        // Solo marcar documentos si realmente hay documentos existentes en la planilla
        if (!planillaData.VS_PMP1Collection || planillaData.VS_PMP1Collection.length === 0) {
            console.log("No hay documentos existentes en planilla, todos los documentos marcados como no agregados");
            // Asegurar que todos los documentos estén marcados como no agregados
            availableDocuments.documents.forEach((doc: any, index: number) => {
                doc.alreadyInPlanilla = false;
                console.log(`Documento ${index}: ${doc.DocNum} - alreadyInPlanilla establecido a false (planilla vacía)`);
            });
        } else {
            // Marcar documentos como ya en la planilla
            let markedCount = 0;
            availableDocuments.documents.forEach((doc: any, index: number) => {
                const isAlreadyAdded = existingDocNums.includes(doc.DocNum);
                doc.alreadyInPlanilla = isAlreadyAdded;
                console.log(`Documento ${index}: ${doc.DocNum} - verificando contra existentes: ${existingDocNums.join(', ')} - alreadyInPlanilla establecido a ${isAlreadyAdded}`);
                if (isAlreadyAdded) {
                    markedCount++;
                }
            });
            console.log(`Marcados ${markedCount} documentos como ya agregados de ${availableDocuments.documents.length} total`);
        }
        
        // Actualizar el modelo
        console.log("Actualizando modelo con datos modificados");
        oModel.setData(availableDocuments);
        console.log("=== FIN markAlreadyAddedDocuments ===");
    }


} 