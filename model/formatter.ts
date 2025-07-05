const formatter = {
    status: (sStatus: string): string => {
        switch (sStatus) {
            case "E":
                return "Success";
            case "C":
                return "Warning";
            case "A":
                return "Error";

            default:
                return "None";
        }
    },
    
    estadoText: (sStatus: string): string => {
        switch (sStatus) {
            case "E":
                return "Ejecutada";
            case "C":
                return "Creada";
            case "A":
                return "Anulada";
            default:
                return sStatus;
        }
    },
    
    date: (sDate: string): string => {
        if (!sDate) return "";
        
        try {
            const date = new Date(sDate);
            return date.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            });
        } catch (error) {
            return sDate;
        }
    },
    
    odataDate: (sDate: string): string => {
        if (!sDate) return "";
        
        try {
            // Handle OData date format: /Date(timestamp)/
            if (sDate.startsWith('/Date(') && sDate.endsWith(')/')) {
                const timestamp = parseInt(sDate.substring(6, sDate.length - 2));
                const date = new Date(timestamp);
                return date.toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                });
            } else {
                // Handle regular date format
                const date = new Date(sDate);
                return date.toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit'
                });
            }
        } catch (error) {
            return sDate;
        }
    },
    
    currency: (fAmount: number): string => {
        if (fAmount === null || fAmount === undefined || fAmount === 0) return "0.00";
        
        return fAmount.toLocaleString('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    },
    
    negativeCurrency: (fAmount: number): string => {
        if (fAmount === null || fAmount === undefined || fAmount === 0) return "0.00";
        
        return (-fAmount).toLocaleString('es-ES', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    },
    
    isEditable: (sStatus: string): boolean => {
        return sStatus === "C"; // Only editable when status is "Creada"
    },
    
    isDocumentSelectable: (doc: any, currentLines: any[]): boolean => {
        if (!doc || !currentLines) return true;
        
        // Check if document already exists in current lines
        return !currentLines.some((line: any) => {
            return line.U_NUMDOC === doc.DocNum && line.U_IDSN === doc.CardCode;
        });
    },
    
    isNewPlanilla: (isNew: boolean): boolean => {
        return isNew === true;
    }
};

export default formatter; 