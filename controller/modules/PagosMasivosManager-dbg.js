sap.ui.define(["sap/ui/model/json/JSONModel", "sap/m/MessageToast", "sap/m/MessageBox"], function (JSONModel, MessageToast, MessageBox) {
  "use strict";

  /**
   * PagosMasivosManager - Handles all PagosMasivos-related logic
   */
  class PagosMasivosManager {
    constructor() {
      this.oOriginalModel = new JSONModel();
      this.oFilteredModel = new JSONModel();
    }
    initializeModels() {
      console.log("PagosMasivosManager - Initializing models...");
      // Cargar datos originales
      const planillasUrl = "./model/mock/planillas.json";
      try {
        this.oOriginalModel.loadData(planillasUrl, undefined, false);
        console.log("PagosMasivosManager - Data loaded from URL:", this.oOriginalModel.getData());
      } catch (error) {
        console.log("PagosMasivosManager - Error loading data, using fallback:", error);
        this.loadFallbackData();
        return;
      }

      // Ordenar los datos por DocEntry descendente
      this.sortPlanillasByDocEntry();

      // Crear modelo filtrado
      this.oFilteredModel.setData(this.oOriginalModel.getData());
      console.log("PagosMasivosManager - Filtered model data:", this.oFilteredModel.getData());
    }
    getFilteredModel() {
      return this.oFilteredModel;
    }
    getOriginalModel() {
      return this.oOriginalModel;
    }
    sortPlanillasByDocEntry() {
      const data = this.oOriginalModel.getData();
      if (data && data.PlanillasCollection && Array.isArray(data.PlanillasCollection)) {
        // Ordenar por DocEntry descendente
        data.PlanillasCollection.sort((a, b) => {
          const docEntryA = parseInt(a.DocEntry) || 0;
          const docEntryB = parseInt(b.DocEntry) || 0;
          return docEntryB - docEntryA; // Descendente (mayor a menor)
        });

        // Actualizar el modelo con los datos ordenados
        this.oOriginalModel.setData(data);
        console.log("PagosMasivosManager - Planillas ordenadas por DocEntry descendente");
      }
    }
    loadFallbackData() {
      const fallbackData = {
        "PlanillasCollection": [{
          "Id": "HT-1000",
          "Name": "Planilla Pago Proveedor 10003",
          "DateOfSale": "2025-03-26",
          "Status": "Ejecutada",
          "Quantity": 10,
          "Price": 1000.34,
          "CurrencyCode": "SOL",
          "Bank": "BCP"
        }, {
          "Id": "HT-1001",
          "Name": "Planilla Pago Proveedor 10004",
          "DateOfSale": "2024-04-17",
          "Status": "Creada",
          "Quantity": 20,
          "Price": 1249,
          "CurrencyCode": "USD",
          "Bank": "BBVA"
        }, {
          "Id": "HT-1003",
          "Name": "Planilla Pago Proveedor 10005",
          "DateOfSale": "2024-04-09",
          "Status": "Anulada",
          "Quantity": 15,
          "Price": 1650,
          "CurrencyCode": "SOL",
          "Bank": "Interbank"
        }, {
          "Id": "HT-1007",
          "Name": "Planilla Pago Proveedor 10006",
          "DateOfSale": "2024-05-17",
          "Status": "Creada",
          "Quantity": 15,
          "Price": 299,
          "CurrencyCode": "USD",
          "Bank": "Scotiabank"
        }, {
          "Id": "HT-1010",
          "Name": "Planilla Pago Proveedor 10007",
          "DateOfSale": "2024-02-22",
          "Status": "Ejecutada",
          "Quantity": 16,
          "Price": 1999,
          "CurrencyCode": "SOL",
          "Bank": "BCP"
        }, {
          "Id": "HT-1011",
          "Name": "Planilla Pago Proveedor 10008",
          "DateOfSale": "2024-03-15",
          "Status": "Creada",
          "Quantity": 12,
          "Price": 850,
          "CurrencyCode": "SOL",
          "Bank": "BBVA"
        }, {
          "Id": "HT-1012",
          "Name": "Planilla Pago Proveedor 10009",
          "DateOfSale": "2024-06-10",
          "Status": "Ejecutada",
          "Quantity": 8,
          "Price": 1200,
          "CurrencyCode": "USD",
          "Bank": "Interbank"
        }, {
          "Id": "HT-1013",
          "Name": "Planilla Pago Proveedor 10010",
          "DateOfSale": "2024-07-22",
          "Status": "Anulada",
          "Quantity": 25,
          "Price": 2100,
          "CurrencyCode": "SOL",
          "Bank": "Scotiabank"
        }, {
          "Id": "HT-1014",
          "Name": "Planilla Pago Proveedor 10011",
          "DateOfSale": "2024-08-05",
          "Status": "Creada",
          "Quantity": 18,
          "Price": 950,
          "CurrencyCode": "BCP",
          "Bank": "BCP"
        }, {
          "Id": "HT-1015",
          "Name": "Planilla Pago Proveedor 10012",
          "DateOfSale": "2024-09-12",
          "Status": "Ejecutada",
          "Quantity": 22,
          "Price": 1750,
          "CurrencyCode": "USD",
          "Bank": "BBVA"
        }]
      };
      this.oOriginalModel.setData(fallbackData);
      this.oFilteredModel.setData(fallbackData);
    }

    // Manejadores de eventos para PagosMasivos
    onDateRangeChange(oEvent) {
      console.log("PagosMasivos - Rango de fechas cambiado:", oEvent.getParameter("value"));
      this.applyFilters();
    }
    onStatusChange(oEvent) {
      this.applyFilters();
    }
    onBancoChange(oEvent) {
      this.applyFilters();
    }
    onClearFilters() {
      // Limpiar filtro de rango de fechas
      const dateRangeFilter = this.getControlById("pagosMasivosDateRangeFilter");
      if (dateRangeFilter) {
        dateRangeFilter.setValue("");
      }

      // Limpiar filtro de estado
      const statusFilter = this.getControlById("pagosMasivosStatusFilter");
      if (statusFilter) {
        statusFilter.setSelectedKey("");
      }

      // Limpiar filtro de banco
      const bancoFilter = this.getControlById("pagosMasivosBancoFilter");
      if (bancoFilter) {
        bancoFilter.setSelectedKey("");
      }

      // Restablecer datos originales
      this.oFilteredModel.setData(this.oOriginalModel.getData());
      MessageToast.show("Filtros limpiados desde Pagos Masivos Controller", {
        duration: 2000
      });
    }
    onNuevaPlanillaButtonPress() {
      console.log("PagosMasivosManager - onNuevaPlanillaButtonPress triggered!");

      // Crear una nueva planilla con datos por defecto
      this.createNewPlanilla();

      // Navegar a la página de detalle en modo creación
      this.navigateToDetailPage();
    }
    createNewPlanilla() {
      console.log("PagosMasivosManager - Creating new planilla...");

      // Generar un nuevo DocEntry (en un entorno real, esto vendría del backend)
      const newDocEntry = this.generateNewDocEntry();

      // Crear datos de planilla por defecto
      const newPlanillaData = {
        "DocEntry": newDocEntry,
        "DocNum": newDocEntry,
        "Period": new Date().getMonth() + 1,
        "Instance": 0,
        "Series": -1,
        "Handwrtten": "N",
        "Status": "O",
        "RequestStatus": "W",
        "Creator": "manager",
        "Remark": null,
        "Canceled": "N",
        "Object": "VS_OPMP",
        "LogInst": null,
        "UserSign": 1,
        "Transfered": "N",
        "CreateDate": new Date().toISOString().split('T')[0] + "T00:00:00Z",
        "CreateTime": new Date().toTimeString().split(' ')[0],
        "UpdateDate": new Date().toISOString().split('T')[0] + "T00:00:00Z",
        "UpdateTime": new Date().toTimeString().split(' ')[0],
        "DataSource": "I",
        "U_CUENTA": null,
        "U_IDBANCO": null,
        "U_NMBANCO": null,
        "U_CCBANCO": null,
        "U_MONEDA": null,
        "U_GLACCOUNT": null,
        "U_SERIE": null,
        "U_ESTADO": "C",
        // Creada
        "U_FECHA": new Date().toISOString().split('T')[0] + "T00:00:00Z",
        "U_FECHAP": null,
        "U_TC": null,
        "U_RETEN": null,
        "U_FECHAV": null,
        "U_IDSN": null,
        "U_NMSN": null,
        "U_GLOSA": "Nueva planilla de pagos masivos",
        "U_TOTAL": 0.0,
        "U_IDPAGO": null,
        "U_SUBTOTAL": 0.0,
        "U_REF": null,
        "U_NOPBAN": null,
        "U_IDSUC": null,
        "U_NMSUC": null,
        "U_FCAJA": -1,
        "U_CONTA": 0,
        "VS_PMP1Collection": [],
        "isNewPlanilla": true // Indicador para identificar que es una nueva planilla
      };
      console.log("PagosMasivosManager - New planilla data created:", newPlanillaData);

      // Crear modelo para la nueva planilla
      const oModelPlanilla = new JSONModel();
      oModelPlanilla.setData(newPlanillaData);

      // Asignar el modelo a la vista
      const oView = this.getController().getView();
      if (oView) {
        oView.setModel(oModelPlanilla, "planilla");
        console.log("PagosMasivosManager - New planilla model assigned to view");

        // Cargar las series para el ComboBox
        this.loadSeriesData();
      }
    }
    generateNewDocEntry() {
      // En un entorno real, esto vendría del backend
      // Por ahora, generamos un número basado en la fecha actual
      const now = new Date();
      const timestamp = now.getTime();
      return Math.floor(timestamp / 1000) % 10000; // Número de 4 dígitos
    }
    onSerieChange(oEvent) {
      console.log("PagosMasivosManager - onSerieChange triggered");
      console.log("PagosMasivosManager - Event parameters:", oEvent.getParameters());
      const selectedItem = oEvent.getParameter("selectedItem");
      const selectedKey = oEvent.getParameter("selectedItem")?.getKey();
      const newValue = oEvent.getParameter("newValue");
      console.log("PagosMasivosManager - Selected item:", selectedItem);
      console.log("PagosMasivosManager - Selected key:", selectedKey);
      console.log("PagosMasivosManager - New value:", newValue);
      if (!selectedItem) {
        console.log("No se seleccionó ningún item");
        return;
      }
      const key = selectedItem.getKey();
      console.log("PagosMasivosManager - Serie seleccionada (key):", key);

      // Actualizar el modelo con la serie seleccionada
      const planillaModel = this.getController().getView().getModel("planilla");
      if (planillaModel) {
        console.log("PagosMasivosManager - Current U_SERIE value:", planillaModel.getProperty("/U_SERIE"));
        planillaModel.setProperty("/U_SERIE", key);
        console.log("PagosMasivosManager - Updated U_SERIE value:", planillaModel.getProperty("/U_SERIE"));

        // Forzar la actualización del modelo
        planillaModel.refresh(true);
      } else {
        console.error("PagosMasivosManager - Planilla model not found");
      }
    }
    onGuardarPlanilla() {
      console.log("PagosMasivosManager - Guardando planilla...");
      const oView = this.getController().getView();
      if (!oView) {
        console.error("View not found");
        return;
      }
      const planillaModel = oView.getModel("planilla");
      if (!planillaModel) {
        console.error("Planilla model not found");
        return;
      }
      const planillaData = planillaModel.getData();
      console.log("Datos de la planilla a guardar:", planillaData);

      // Verificar si es una nueva planilla
      if (planillaData.isNewPlanilla) {
        this.createPlanillaInMockDatabase(planillaData);
      } else {
        this.updatePlanillaInMockDatabase(planillaData);
      }
    }
    createPlanillaInMockDatabase(newPlanilla) {
      // Cargar el archivo JSON actual
      const planillaDetailUrl = "./model/mock/planilla-object.json";
      fetch(planillaDetailUrl).then(response => response.json()).then(data => {
        // Remover el indicador isNewPlanilla
        const {
          isNewPlanilla,
          ...planillaToSave
        } = newPlanilla;

        // Agregar la nueva planilla al array
        data.planillas.push(planillaToSave);
        console.log("Nueva planilla agregada al mock database:", planillaToSave);

        // Simular envío al servidor
        this.simulateServerCreate(planillaToSave);

        // Mostrar mensaje de éxito
        MessageToast.show("Planilla creada exitosamente", {
          duration: 3000
        });

        // Navegar de vuelta a la lista
        this.navigateBackToList();
      }).catch(error => {
        console.error("Error al crear la planilla:", error);
        MessageBox.error("Error al crear la planilla");
      });
    }
    updatePlanillaInMockDatabase(updatedPlanilla) {
      // Cargar el archivo JSON actual
      const planillaDetailUrl = "./model/mock/planilla-object.json";
      fetch(planillaDetailUrl).then(response => response.json()).then(data => {
        // Buscar la planilla por DocEntry
        const planillas = data.planillas || [];
        const planillaIndex = planillas.findIndex(item => item.DocEntry === updatedPlanilla.DocEntry);
        console.log("Planilla index:", planillaIndex);
        if (planillaIndex !== -1) {
          // Actualizar la planilla existente
          planillas[planillaIndex] = {
            ...planillas[planillaIndex],
            ...updatedPlanilla,
            "UpdateDate": new Date().toISOString().split('T')[0] + "T00:00:00Z",
            "UpdateTime": new Date().toTimeString().split(' ')[0]
          };
          console.log("Planilla actualizada en el mock database:", planillas[planillaIndex]);

          // Simular envío al servidor (en un entorno real, esto será una llamada API al backend) 
          // solo enviamos la data necesaria para evitar sobrecarga de datos
          const simplifiedData = {
            "DocEntry": planillas[planillaIndex].DocEntry,
            "U_SERIE": planillas[planillaIndex].U_SERIE,
            "U_FECHAP": planillas[planillaIndex].U_FECHAP,
            "U_NOPBAN": planillas[planillaIndex].U_NOPBAN
          };
          this.simulateServerUpdate(simplifiedData);

          // Mostrar mensaje de éxito
          MessageToast.show("Planilla guardada exitosamente", {
            duration: 3000
          });
        } else {
          console.error("Planilla no encontrada en el mock database");
          MessageBox.error("Error: No se pudo encontrar la planilla para actualizar");
        }
      }).catch(error => {
        console.error("Error al cargar el mock database:", error);
        MessageBox.error("Error al cargar los datos de la planilla");
      });
    }
    simulateServerUpdate(data) {
      // En un entorno real, aquí haríamos una llamada API como:
      // fetch('/api/planillas', {
      //     method: 'PUT', PUT PARA ACTUALIZAR LÍNEAS EN CASO SE HAYA MODIFICADO LA CANTIDAD DE LÍNEAS
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(data)
      // });

      // Mostrar el payload en un MessageBox para texto más largo
      MessageBox.information("Backend POST/EjecutarPlanilla - Payload: " + JSON.stringify(data, null, 2), {
        title: "Datos enviados al backend",
        details: "Esta información se enviaría al servidor en un entorno real"
      });
      console.log("Simulando actualización en el servidor...");
      console.log("Datos que se enviarían al servidor:", data);
    }
    simulateServerCreate(data) {
      // En un entorno real, aquí haríamos una llamada API como:
      // fetch('/api/planillas', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(data)
      // });

      // Mostrar el payload en un MessageBox para texto más largo
      MessageBox.information("Backend POST/CrearPlanilla - Payload: " + JSON.stringify(data, null, 2), {
        title: "Datos enviados al backend",
        details: "Esta información se enviaría al servidor en un entorno real"
      });
      console.log("Simulando creación en el servidor...");
      console.log("Datos que se enviarían al servidor:", data);
    }
    onFechaEjecucionChange(oEvent) {
      const selectedDate = oEvent.getParameter("value");
      console.log("Fecha de ejecución seleccionada:", selectedDate);
      if (!selectedDate) {
        return;
      }

      // Obtener el valor original antes del cambio
      const datePicker = oEvent.getSource();
      const originalValue = this.getController().getView().getModel("planilla").getProperty("/U_FECHAP");
      console.log("Valor original de la fecha:", originalValue);

      // Prevenir que el modelo se actualice automáticamente
      oEvent.preventDefault();

      // Formatear la fecha para buscar en el JSON
      let dateStr;
      if (selectedDate instanceof Date) {
        dateStr = selectedDate.toISOString().split('T')[0]; // Obtener solo la parte de la fecha (YYYY-MM-DD)
      } else if (typeof selectedDate === 'string') {
        // Si es un string, necesitamos convertir el formato localizado a ISO
        try {
          // Parsear el formato "7 ago 2025" manualmente
          const dateParts = selectedDate.split(' ');
          if (dateParts.length === 3) {
            const day = parseInt(dateParts[0]);
            const monthStr = dateParts[1].toLowerCase();
            const year = parseInt(dateParts[2]);

            // Mapeo de meses en español
            const monthMap = {
              'ene': 0,
              'feb': 1,
              'mar': 2,
              'abr': 3,
              'may': 4,
              'jun': 5,
              'jul': 6,
              'ago': 7,
              'sep': 8,
              'oct': 9,
              'nov': 10,
              'dic': 11
            };
            const month = monthMap[monthStr];
            if (month !== undefined && !isNaN(day) && !isNaN(year)) {
              const date = new Date(year, month, day);
              dateStr = date.toISOString().split('T')[0]; // Convertir a formato YYYY-MM-DD
            } else {
              console.error("No se pudo parsear la fecha:", selectedDate);
              return;
            }
          } else {
            // Intentar con el constructor de Date como fallback
            const date = new Date(selectedDate);
            if (isNaN(date.getTime())) {
              console.error("No se pudo parsear la fecha:", selectedDate);
              return;
            }
            dateStr = date.toISOString().split('T')[0]; // Convertir a formato YYYY-MM-DD
          }
        } catch (error) {
          console.error("Error al convertir la fecha:", error);
          return;
        }
      } else {
        console.error("Formato de fecha no válido:", selectedDate);
        return;
      }

      // Cargar los tipos de cambio
      const tiposCambioUrl = "./model/mock/tipos-cambio.json";
      fetch(tiposCambioUrl).then(response => response.json()).then(data => {
        // Buscar el tipo de cambio para USD en la fecha seleccionada

        console.log("PagosMasivosManager - Fecha:", dateStr);
        const exchangeRate = data.ExchangeRates.find(rate => rate.Currency === "USD" && rate.Date.startsWith(dateStr));
        if (exchangeRate) {
          // Actualizar el campo de tipo de cambio y la fecha
          const planillaModel = this.getController().getView().getModel("planilla");
          if (planillaModel) {
            planillaModel.setProperty("/U_TC", exchangeRate.Rate);
            planillaModel.setProperty("/U_FECHAP", selectedDate);
            MessageToast.show(`Tipo de cambio USD actualizado: ${exchangeRate.Rate}`, {
              duration: 2000
            });
          }
        } else {
          // No se encontró tipo de cambio, mantener la fecha original
          console.log("No se encontró tipo de cambio para la fecha:", dateStr);

          // Revertir el DatePicker a su valor original
          let formattedOriginalValue = originalValue;
          if (originalValue && typeof originalValue === 'string') {
            try {
              const originalDate = new Date(originalValue);
              if (!isNaN(originalDate.getTime())) {
                // Formatear en el formato esperado por el DatePicker (dd MMM yyyy)
                formattedOriginalValue = originalDate.toLocaleDateString('es-ES', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                });
              }
            } catch (error) {
              console.error("Error al formatear la fecha original:", error);
            }
          }
          datePicker.setValue(formattedOriginalValue);

          // Mostrar mensaje de error
          MessageBox.error(`No existe tipo de cambio para la fecha ${dateStr}`, {
            title: "Error de Tipo de Cambio",
            details: "Por favor seleccione otra fecha"
          });
        }
      }).catch(error => {
        console.error("Error cargando tipos de cambio:", error);
        MessageBox.error("Error al cargar los tipos de cambio", {
          title: "Error",
          details: error.message
        });
      });
    }
    onDownloadPlanilla() {
      console.log("onDownloadPlanilla called from PagosMasivosManager!");
      const oView = this.getController().getView();
      if (!oView) {
        console.error("PagosMasivosManager - No view found");
        MessageToast.show("Error: No se pudo acceder a la vista", {
          duration: 2000
        });
        return;
      }
      const oModel = oView.getModel("planilla");
      if (!oModel) {
        console.error("PagosMasivosManager - No planilla model found");
        MessageToast.show("Error: No se encontraron datos para descargar", {
          duration: 2000
        });
        return;
      }
      const planillaData = oModel.getData();
      console.log("PagosMasivosManager - Downloading planilla data:", planillaData);
      if (!planillaData) {
        console.error("PagosMasivosManager - No planilla data found");
        MessageToast.show("Error: No hay datos de planilla disponibles", {
          duration: 2000
        });
        return;
      }
      try {
        // Create a JSON file with the planilla data
        const jsonData = JSON.stringify(planillaData, null, 2);
        console.log("PagosMasivosManager - JSON data created:", jsonData.substring(0, 200) + "...");
        const blob = new Blob([jsonData], {
          type: 'application/json;charset=utf-8'
        });
        console.log("PagosMasivosManager - Blob created, size:", blob.size);
        const url = URL.createObjectURL(blob);
        console.log("PagosMasivosManager - URL created:", url);

        // Create a temporary link element to trigger download
        const link = document.createElement('a');
        link.href = url;
        link.download = `planilla_${planillaData.Id || 'detalle'}_${new Date().toISOString().split('T')[0]}.json`;
        link.style.display = 'none';
        console.log("PagosMasivosManager - Download filename:", link.download);

        // Add to DOM, click, and remove
        document.body.appendChild(link);
        console.log("PagosMasivosManager - Link added to DOM");
        link.click();
        console.log("PagosMasivosManager - Link clicked");

        // Small delay before cleanup
        setTimeout(() => {
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
          console.log("PagosMasivosManager - Cleanup completed");
        }, 100);
        MessageToast.show("Archivo descargado exitosamente", {
          duration: 2000
        });
      } catch (error) {
        console.error("PagosMasivosManager - Error during download:", error);
        MessageToast.show("Error al descargar el archivo", {
          duration: 2000
        });

        // Fallback: try to open in new window
        try {
          const jsonData = JSON.stringify(planillaData, null, 2);
          const newWindow = window.open('', '_blank');
          if (newWindow) {
            newWindow.document.write('<pre>' + jsonData + '</pre>');
            newWindow.document.title = `Planilla ${planillaData.Id || 'detalle'}`;
            console.log("PagosMasivosManager - Fallback: opened in new window");
          }
        } catch (fallbackError) {
          console.error("PagosMasivosManager - Fallback also failed:", fallbackError);
        }
      }
    }
    onListItemPress(oEvent) {
      console.log("PagosMasivosManager - onListItemPress triggered!", oEvent);

      // Get the list item that was clicked
      const oItem = oEvent.getParameter("listItem");
      if (!oItem) {
        console.log("PagosMasivosManager - No listItem parameter found");
        return;
      }
      console.log("PagosMasivosManager - List item:", oItem);

      // Try to get the binding context from the list item
      let oContext = oItem.getBindingContext("planillas");
      if (!oContext) {
        console.log("PagosMasivosManager - Trying without model name...");
        oContext = oItem.getBindingContext();
      }
      if (!oContext || !oContext.getObject) {
        console.log("PagosMasivosManager - No context or getObject found");
        console.log("PagosMasivosManager - Context:", oContext);

        // Try to get the data directly from the list
        const list = this.getControlById("pagosMasivosPlanillasList");
        if (list) {
          console.log("PagosMasivosManager - List found:", list);
          const items = list.getItems();
          console.log("PagosMasivosManager - List items count:", items.length);

          // Find the clicked item by comparing with the list item
          for (let i = 0; i < items.length; i++) {
            if (items[i] === oItem) {
              console.log("PagosMasivosManager - Found clicked item at index:", i);
              const model = list.getModel("planillas");
              if (model) {
                const data = model.getData();
                const planillas = data?.PlanillasCollection || [];
                if (planillas[i]) {
                  console.log("PagosMasivosManager - Found planilla data:", planillas[i]);
                  this.handlePlanillaSelection(planillas[i]);
                  return;
                }
              }
              break;
            }
          }
          console.log("PagosMasivosManager - Clicked item not found in list items");
        }
        return;
      }
      const oPlanilla = oContext.getObject();
      console.log("PagosMasivosManager - Planilla data:", oPlanilla);
      this.handlePlanillaSelection(oPlanilla);
    }
    handlePlanillaSelection(oPlanilla) {
      if (oPlanilla && oPlanilla.DocEntry) {
        const planillaId = oPlanilla.DocEntry;
        console.log("PagosMasivosManager - Found planilla with ID:", planillaId, "from planilla:", oPlanilla);
        console.log("PagosMasivosManager - Planilla ID:", planillaId);

        // Cargar datos de la planilla
        this.loadPlanillaById(planillaId);

        // Navegar a la página de detalle usando routing
        const oComponent = this.getController().getOwnerComponent();
        const oRouter = oComponent.getRouter();
        oRouter.navTo("RoutePagosMasivosDetalle", {
          planillaId: planillaId
        });
      } else {
        console.log("PagosMasivosManager - No valid planilla ID found");
      }
    }
    loadPlanillaById(planillaId) {
      console.log("PagosMasivosManager - Loading planilla by ID:", planillaId);

      // Cargar datos detallados desde el archivo planilla-object.json
      const planillaDetailUrl = "./model/mock/planilla-object.json";
      try {
        const oDetailModel = new JSONModel();

        // Load data synchronously first
        oDetailModel.loadData(planillaDetailUrl, undefined, false);
        const oData = oDetailModel.getData();
        console.log("PagosMasivosManager - Planilla detail data loaded:", oData);
        const planillas = oData?.planillas || [];
        console.log("PagosMasivosManager - Available planillas:", planillas);

        // Buscar la planilla por ID (convert to number for comparison)
        const planillaIdNum = parseInt(planillaId);
        const planilla = planillas.find(item => item.DocEntry === planillaIdNum);
        if (planilla) {
          console.log("PagosMasivosManager - Planilla found in detail data:", planilla);

          // Log all lines if they exist
          if (planilla.VS_PMP1Collection && planilla.VS_PMP1Collection.length > 0) {
            console.log("PagosMasivosManager - Planilla Lines count:", planilla.VS_PMP1Collection.length);
            console.log("PagosMasivosManager - Planilla Lines:", planilla.VS_PMP1Collection);

            // Log each line individually
            planilla.VS_PMP1Collection.forEach((line, index) => {
              console.log(`PagosMasivosManager - Line ${index + 1}:`, {
                LineId: line.LineId,
                DocEntry: line.DocEntry,
                DocNum: line.DocNum,
                NumAtCard: line.NumAtCard,
                CardCode: line.CardCode,
                CardName: line.CardName,
                DocDate: line.DocDate,
                DocDueDate: line.DocDueDate,
                TaxDate: line.TaxDate,
                TaxCode: line.TaxCode,
                TaxAmount: line.TaxAmount,
                TaxAmountFC: line.TaxAmountFC,
                DocTotal: line.DocTotal,
                DocTotalFC: line.DocTotalFC,
                WithholdingTax: line.WithholdingTax
              });
            });
          } else {
            console.log("PagosMasivosManager - No lines found for this planilla");
          }

          // Crear modelo para la planilla seleccionada
          const oModelPlanilla = new JSONModel();
          oModelPlanilla.setData(planilla);

          // Asignar el modelo a la vista
          const oView = this.getController().getView();
          if (oView) {
            oView.setModel(oModelPlanilla, "planilla");
            console.log("PagosMasivosManager - Planilla model assigned to view");

            // Cargar también las series
            this.loadSeriesData();
          }
        } else {
          console.log("PagosMasivosManager - Planilla not found in detail data, trying fallback");
          this.loadFallbackPlanillaData(planillaId);
        }
      } catch (error) {
        console.error("PagosMasivosManager - Exception loading planilla detail data:", error);
        this.loadFallbackPlanillaData(planillaId);
      }
    }
    loadFallbackPlanillaData(planillaId) {
      console.log("PagosMasivosManager - Loading fallback planilla data for ID:", planillaId);

      // Datos de respaldo para mostrar en caso de error
      const fallbackData = {
        "DocEntry": parseInt(planillaId),
        "DocNum": parseInt(planillaId),
        "U_CUENTA": "1041101",
        "U_IDBANCO": "BCP",
        "U_NMBANCO": "BANCO DE CREDITO",
        "U_CCBANCO": "1941985504094",
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
        "VS_PMP1Collection": [{
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
        }]
      };
      const oModelPlanilla = new JSONModel();
      oModelPlanilla.setData(fallbackData);
      const oView = this.getController().getView();
      if (oView) {
        oView.setModel(oModelPlanilla, "planilla");
        console.log("PagosMasivosManager - Fallback planilla model assigned to view");

        // Cargar también las series
        this.loadSeriesData();
      }
    }
    loadSeriesData() {
      console.log("PagosMasivosManager - Loading series data...");
      const seriesUrl = "./model/mock/series-pago.json";
      fetch(seriesUrl).then(response => {
        console.log("PagosMasivosManager - Series response status:", response.status);
        return response.json();
      }).then(data => {
        console.log("PagosMasivosManager - Series data received:", data);
        const oView = this.getController().getView();
        if (oView) {
          const oModelSeries = new JSONModel();
          oModelSeries.setData(data);
          oView.setModel(oModelSeries, "series");
          console.log("PagosMasivosManager - Series model assigned to view");
          console.log("PagosMasivosManager - Series model data:", oModelSeries.getData());
        } else {
          console.error("PagosMasivosManager - View not found when loading series");
        }
      }).catch(error => {
        console.error("Error cargando series:", error);
      });
    }
    navigateToDetailPage() {
      console.log("PagosMasivosManager - Navigating to detail page");
      const oComponent = this.getController().getOwnerComponent();
      const oRouter = oComponent.getRouter();

      // For new planillas, navigate without ID
      oRouter.navTo("RoutePagosMasivosDetalle", {
        planillaId: "new"
      });
      console.log("PagosMasivosManager - Navigation to detail completed");
    }
    navigateBackToList() {
      console.log("PagosMasivosManager - Navigating back to list");
      const oComponent = this.getController().getOwnerComponent();
      const oRouter = oComponent.getRouter();
      oRouter.navTo("RoutePagosMasivos");
      console.log("PagosMasivosManager - Navigation back completed");
    }
    applyFilters() {
      const aFilters = [];

      // Filtro de rango de fechas
      const dateRangeFilter = this.getControlById("pagosMasivosDateRangeFilter");
      if (dateRangeFilter && dateRangeFilter.getValue()) {
        const dateRangeValue = dateRangeFilter.getValue();
        console.log("PagosMasivos - Filtro de rango de fechas:", dateRangeFilter);
        console.log("PagosMasivos - Valor del rango de fechas:", dateRangeValue);

        // DateRangeSelection devuelve un string en formato "startDate - endDate"
        if (dateRangeValue && typeof dateRangeValue === 'string' && dateRangeValue.includes(' - ')) {
          const [startDateStr, endDateStr] = dateRangeValue.split(' - ');
          if (startDateStr) {
            const startDate = new Date(startDateStr);
            aFilters.push({
              path: "DateOfSale",
              operator: "GE",
              value: startDate
            });
          }
          if (endDateStr) {
            const endDate = new Date(endDateStr);
            aFilters.push({
              path: "DateOfSale",
              operator: "LE",
              value: endDate
            });
          }
        }
      }

      // Filtro de estado
      const statusFilter = this.getControlById("pagosMasivosStatusFilter");
      if (statusFilter && statusFilter.getSelectedKey() && statusFilter.getSelectedKey() !== "") {
        aFilters.push({
          path: "U_ESTADO",
          operator: "EQ",
          value: statusFilter.getSelectedKey()
        });
      }

      // Filtro de banco
      const bancoFilter = this.getControlById("pagosMasivosBancoFilter");
      if (bancoFilter && bancoFilter.getSelectedKey() && bancoFilter.getSelectedKey() !== "") {
        aFilters.push({
          path: "U_IDBANCO",
          operator: "EQ",
          value: bancoFilter.getSelectedKey()
        });
      }

      // Aplicar filtros a datos originales
      const originalData = this.oOriginalModel.getData();
      let filteredData = originalData;
      if (aFilters.length > 0) {
        filteredData = this.filterData(originalData, aFilters);
      }
      this.oFilteredModel.setData(filteredData);
    }
    filterData(data, filters) {
      if (!data || !data.PlanillasCollection) {
        return data;
      }
      const filteredItems = data.PlanillasCollection.filter(item => {
        return filters.every(filter => {
          const value = item[filter.path];
          const filterValue = filter.value;
          switch (filter.operator) {
            case "EQ":
              return value === filterValue;
            case "GE":
              if (filter.path === "DateOfSale") {
                const itemDate = new Date(value);
                return itemDate >= filterValue;
              }
              return value >= filterValue;
            case "LE":
              if (filter.path === "DateOfSale") {
                const itemDate = new Date(value);
                return itemDate <= filterValue;
              }
              return value <= filterValue;
            default:
              return true;
          }
        });
      });
      return {
        ...data,
        PlanillasCollection: filteredItems
      };
    }

    // Helper methods
    getControlById(controlId) {
      // This would need to be implemented to get controls from the view
      // For now, we'll need to pass the controller reference
      return null;
    }
    getOwnerComponent() {
      // This would need to be implemented to get the component
      // For now, we'll need to pass the component reference
      return null;
    }

    // Method to set controller reference for accessing controls
    setController(controller) {
      console.log("PagosMasivosManager - Setting controller reference:", controller);
      this.controller = controller;
      this.getControlById = controlId => {
        const control = controller.byId(controlId);
        console.log("PagosMasivosManager - Getting control by ID:", controlId, control);
        return control;
      };
      this.getOwnerComponent = () => controller.getOwnerComponent();
    }

    // Method to get controller reference
    getController() {
      return this.controller;
    }

    // Document Selection Methods
    onAddDocumentos() {
      console.log("PagosMasivosManager - onAddDocumentos triggered");

      // Check if we're in creation mode
      const planillaModel = this.getController().getView().getModel("planilla");
      if (!planillaModel) {
        console.error("PagosMasivosManager - Planilla model not found");
        return;
      }
      const planillaData = planillaModel.getData();
      if (!planillaData.isNewPlanilla) {
        MessageToast.show("Solo se pueden agregar documentos en modo creación", {
          duration: 3000
        });
        return;
      }

      // Load available documents
      this.loadAvailableDocuments();

      // Open the dialog
      const dialog = this.getController().byId("documentSelectionDialog");
      if (dialog) {
        dialog.open();
      } else {
        console.error("PagosMasivosManager - Document selection dialog not found");
      }
    }
    loadAvailableDocuments() {
      console.log("PagosMasivosManager - Loading available documents...");
      const documentsUrl = "./model/mock/available-documents.json";
      fetch(documentsUrl).then(response => {
        console.log("PagosMasivosManager - Documents response status:", response.status);
        return response.json();
      }).then(data => {
        console.log("PagosMasivosManager - Documents data received:", data);

        // Get current planilla data to check for existing documents
        const planillaModel = this.getController().getView().getModel("planilla");
        const currentLines = planillaModel ? planillaModel.getData().VS_PMP1Collection || [] : [];
        console.log("PagosMasivosManager - Current planilla lines:", currentLines.length);
        if (currentLines.length > 0) {
          console.log("PagosMasivosManager - Planilla lines details:");
          currentLines.forEach((line, index) => {
            console.log(`  Line ${index}: U_NUMDOC="${line.U_NUMDOC}", U_IDSN="${line.U_IDSN}"`);
          });
        }
        console.log("PagosMasivosManager - Available documents:", data.documents.length);
        console.log("PagosMasivosManager - First few available documents:");
        data.documents.slice(0, 3).forEach((doc, index) => {
          console.log(`  Doc ${index}: DocNum="${doc.DocNum}", CardCode="${doc.CardCode}"`);
        });

        // Add selected property and check if already in planilla for each document
        data.documents.forEach(doc => {
          doc.selected = false;

          // Always initialize to false first
          doc.alreadyInPlanilla = false;

          // Only check against existing lines if there are any
          if (currentLines.length > 0) {
            console.log(`PagosMasivosManager - Checking document ${doc.DocNum} (${doc.CardCode}) against ${currentLines.length} planilla lines`);
            const isAlreadyAdded = currentLines.some(line => {
              const matches = line.U_NUMDOC === doc.DocNum && line.U_IDSN === doc.CardCode;
              console.log(`PagosMasivosManager - Comparing: "${line.U_NUMDOC}" === "${doc.DocNum}" && "${line.U_IDSN}" === "${doc.CardCode}" = ${matches}`);
              if (matches) {
                console.log(`PagosMasivosManager - Document ${doc.DocNum} (${doc.CardCode}) matches planilla line ${line.U_NUMDOC} (${line.U_IDSN})`);
              }
              return matches;
            });
            doc.alreadyInPlanilla = isAlreadyAdded;
          } else {
            console.log(`PagosMasivosManager - No planilla lines to check against for document ${doc.DocNum}`);
          }
          console.log(`PagosMasivosManager - Document ${doc.DocNum} (${doc.CardCode}) - alreadyInPlanilla: ${doc.alreadyInPlanilla}`);
        });

        // Prepare model data
        const modelData = {
          documents: data.documents,
          selectedTotal: 0,
          selectedCount: 0,
          existingCount: 0
        };
        const oView = this.getController().getView();
        if (oView) {
          const oModelDocuments = new JSONModel();
          oModelDocuments.setData(modelData);
          oView.setModel(oModelDocuments, "availableDocuments");
          console.log("PagosMasivosManager - Available documents model assigned to view");
        } else {
          console.error("PagosMasivosManager - View not found when loading documents");
        }
      }).catch(error => {
        console.error("Error cargando documentos disponibles:", error);
        MessageToast.show("Error al cargar documentos disponibles", {
          duration: 3000
        });
      });
    }
    onDocumentSearch(oEvent) {
      const searchTerm = oEvent.getParameter("query").toLowerCase();
      console.log("PagosMasivosManager - Document search:", searchTerm);
      const documentsModel = this.getController().getView().getModel("availableDocuments");
      if (!documentsModel) return;
      const data = documentsModel.getData();
      const documents = data.documents;

      // Filter documents based on search term
      const filteredDocuments = documents.filter(doc => {
        return doc.CardName.toLowerCase().includes(searchTerm) || doc.DocNum.toLowerCase().includes(searchTerm) || doc.CardCode.toLowerCase().includes(searchTerm);
      });

      // Update the model with filtered data
      documentsModel.setProperty("/documents", filteredDocuments);
    }
    onDocumentBankFilterChange(oEvent) {
      const selectedBank = oEvent.getParameter("selectedItem").getKey();
      console.log("PagosMasivosManager - Document bank filter:", selectedBank);

      // Reload original data and apply filter
      this.loadAvailableDocuments();
      if (selectedBank) {
        const documentsModel = this.getController().getView().getModel("availableDocuments");
        if (!documentsModel) return;
        const data = documentsModel.getData();
        const documents = data.documents;

        // Filter documents by bank
        const filteredDocuments = documents.filter(doc => {
          return doc.BankCode === selectedBank;
        });

        // Update the model with filtered data
        documentsModel.setProperty("/documents", filteredDocuments);
      }
    }
    onDocumentSelectionChange(oEvent) {
      console.log("PagosMasivosManager - Document selection changed");
      const documentsModel = this.getController().getView().getModel("availableDocuments");
      if (!documentsModel) return;
      const data = documentsModel.getData();
      const documents = data.documents;

      // Get current planilla data to check for existing documents
      const planillaModel = this.getController().getView().getModel("planilla");
      const currentLines = planillaModel ? planillaModel.getData().VS_PMP1Collection || [] : [];

      // Get selected items from the table
      const table = this.getController().byId("availableDocumentsTable");
      const selectedItems = table.getSelectedItems();

      // Update selected property for each document and check if it's already in planilla
      documents.forEach(doc => {
        doc.selected = selectedItems.some(item => {
          const context = item.getBindingContext("availableDocuments");
          return context && context.getProperty("DocEntry") === doc.DocEntry;
        });

        // Always initialize to false first
        doc.alreadyInPlanilla = false;

        // Only check against existing lines if there are any
        if (currentLines.length > 0) {
          const isAlreadyAdded = currentLines.some(line => {
            const matches = line.U_NUMDOC === doc.DocNum && line.U_IDSN === doc.CardCode;
            if (matches) {
              console.log(`PagosMasivosManager - Selection change: Document ${doc.DocNum} (${doc.CardCode}) matches planilla line ${line.U_NUMDOC} (${line.U_IDSN})`);
            }
            return matches;
          });
          doc.alreadyInPlanilla = isAlreadyAdded;
        }
      });

      // Calculate selected total and count (excluding already existing documents)
      const selectedDocuments = documents.filter(doc => doc.selected && !doc.alreadyInPlanilla);
      const selectedTotal = selectedDocuments.reduce((sum, doc) => sum + doc.Balance, 0);
      const selectedCount = selectedDocuments.length;

      // Count documents that are selected but already in planilla
      const selectedButExisting = documents.filter(doc => doc.selected && doc.alreadyInPlanilla);
      const existingCount = selectedButExisting.length;

      // Update the model
      documentsModel.setProperty("/selectedTotal", selectedTotal);
      documentsModel.setProperty("/selectedCount", selectedCount);
      documentsModel.setProperty("/existingCount", existingCount);
      documentsModel.refresh(true);

      // Show warning if user selected documents that are already in planilla
      if (existingCount > 0) {
        console.log(`PagosMasivosManager - ${existingCount} selected document(s) already exist in planilla`);
      }
    }
    onDocumentDialogCancel() {
      console.log("PagosMasivosManager - Document dialog cancelled");
      const dialog = this.getController().byId("documentSelectionDialog");
      if (dialog) {
        dialog.close();
      }
    }
    onDocumentDialogConfirm() {
      console.log("PagosMasivosManager - Document dialog confirmed");
      const documentsModel = this.getController().getView().getModel("availableDocuments");
      if (!documentsModel) return;
      const data = documentsModel.getData();
      const selectedDocuments = data.documents.filter(doc => doc.selected);
      if (selectedDocuments.length === 0) {
        MessageToast.show("No hay documentos seleccionados", {
          duration: 3000
        });
        return;
      }

      // Filter out documents that are already in the planilla
      const planillaModel = this.getController().getView().getModel("planilla");
      const currentLines = planillaModel ? planillaModel.getData().VS_PMP1Collection || [] : [];
      const validDocuments = selectedDocuments.filter(doc => {
        const isAlreadyInPlanilla = currentLines.some(line => {
          return line.U_NUMDOC === doc.DocNum && line.U_IDSN === doc.CardCode;
        });
        if (isAlreadyInPlanilla) {
          console.log(`PagosMasivosManager - Document ${doc.DocNum} already in planilla, skipping`);
        }
        return !isAlreadyInPlanilla;
      });
      if (validDocuments.length === 0) {
        MessageToast.show("Todos los documentos seleccionados ya existen en la planilla", {
          duration: 3000
        });
        return;
      }
      if (validDocuments.length < selectedDocuments.length) {
        const duplicateCount = selectedDocuments.length - validDocuments.length;
        MessageToast.show(`${duplicateCount} documento(s) duplicado(s) fueron omitidos`, {
          duration: 3000
        });
      }

      // Add valid documents to the planilla
      this.addDocumentsToPlanilla(validDocuments);

      // Close the dialog
      const dialog = this.getController().byId("documentSelectionDialog");
      if (dialog) {
        dialog.close();
      }
      MessageToast.show(`${validDocuments.length} documento(s) agregado(s) a la planilla`, {
        duration: 3000
      });
    }
    addDocumentsToPlanilla(selectedDocuments) {
      console.log("PagosMasivosManager - Adding documents to planilla:", selectedDocuments);
      const planillaModel = this.getController().getView().getModel("planilla");
      if (!planillaModel) return;
      const planillaData = planillaModel.getData();
      const currentLines = planillaData.VS_PMP1Collection || [];

      // Convert documents to planilla lines (no need to check for duplicates as they're already filtered)
      const newLines = selectedDocuments.map((doc, index) => {
        const lineId = currentLines.length + index + 1;
        return {
          LineId: lineId,
          DocEntry: doc.DocEntry,
          DocNum: doc.DocNum,
          NumAtCard: doc.DocNum,
          CardCode: doc.CardCode,
          CardName: doc.CardName,
          DocDate: doc.DocDate,
          DocDueDate: doc.DueDate,
          TaxDate: doc.DocDate,
          TaxCode: "",
          TaxAmount: 0,
          TaxAmountFC: 0,
          DocTotal: doc.Total,
          DocTotalFC: doc.Total,
          WithholdingTax: 0,
          // Planilla specific fields
          U_NUMDOC: doc.DocNum,
          U_IDSN: doc.CardCode,
          U_NMSN: doc.CardName,
          U_FDOCU: doc.DocDate,
          U_FVENC: doc.DueDate,
          U_IMPORTE: doc.Total,
          U_SALDO: doc.Balance,
          U_RETLOC: 0,
          U_PAGLOC0: doc.Balance,
          U_CTAINF: doc.BankCode,
          U_CCORRI: doc.AccountCode,
          U_MONINF: doc.Currency
        };
      });

      // Add new lines to existing lines
      const updatedLines = [...currentLines, ...newLines];
      planillaData.VS_PMP1Collection = updatedLines;

      // Recalculate totals
      this.recalculatePlanillaTotals(planillaData);

      // Update the model
      planillaModel.setData(planillaData);
      planillaModel.refresh(true);
      console.log("PagosMasivosManager - Documents added to planilla. Total lines:", updatedLines.length);
      console.log("PagosMasivosManager - Documents added:", selectedDocuments.length);
    }
    recalculatePlanillaTotals(planillaData) {
      const lines = planillaData.VS_PMP1Collection || [];

      // Calculate totals
      const total = lines.reduce((sum, line) => sum + (line.U_IMPORTE || 0), 0);
      const reten = lines.reduce((sum, line) => sum + (line.U_RETLOC || 0), 0);
      const subtotal = total - reten;

      // Update planilla totals
      planillaData.U_TOTAL = total;
      planillaData.U_RETEN = reten;
      planillaData.U_SUBTOTAL = subtotal;
      console.log("PagosMasivosManager - Planilla totals recalculated:", {
        total,
        reten,
        subtotal
      });
    }
  }
  var __exports = {
    __esModule: true
  };
  __exports.PagosMasivosManager = PagosMasivosManager;
  return __exports;
});
//# sourceMappingURL=PagosMasivosManager-dbg.js.map
