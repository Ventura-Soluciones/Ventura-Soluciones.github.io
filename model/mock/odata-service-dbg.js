// Mock OData Service for SmartTable
sap.ui.define([
    "sap/ui/base/Object"
], function (BaseObject) {
    "use strict";

    return BaseObject.extend("com.vs.extension.finanb1.model.mock.ODataService", {
        
        constructor: function () {
            BaseObject.call(this);
            this._data = this._loadMockData();
        },

        _loadMockData: function () {
            return [
                {
                    "DocEntry": 1001,
                    "DocNum": "F001-001",
                    "CardCode": "C001",
                    "CardName": "EMPRESA COMERCIAL ABC S.A.C.",
                    "DocType": "Factura",
                    "DocDate": "/Date(1710374400000)/",
                    "DueDate": "/Date(1713052800000)/",
                    "Currency": "SOL",
                    "Total": 1500.00,
                    "Balance": 1500.00,
                    "BankCode": "BCP",
                    "BankName": "BANCO DE CREDITO",
                    "AccountCode": "1041101",
                    "AccountName": "CUENTA CORRIENTE BCP"
                },
                {
                    "DocEntry": 1002,
                    "DocNum": "F001-002",
                    "CardCode": "C002",
                    "CardName": "DISTRIBUIDORA XYZ E.I.R.L.",
                    "DocType": "Factura",
                    "DocDate": "/Date(1710460800000)/",
                    "DueDate": "/Date(1713139200000)/",
                    "Currency": "SOL",
                    "Total": 2300.50,
                    "Balance": 2300.50,
                    "BankCode": "BCP",
                    "BankName": "BANCO DE CREDITO",
                    "AccountCode": "1041101",
                    "AccountName": "CUENTA CORRIENTE BCP"
                },
                {
                    "DocEntry": 1003,
                    "DocNum": "F001-003",
                    "CardCode": "C003",
                    "CardName": "SERVICIOS INTEGRALES S.A.",
                    "DocType": "Factura",
                    "DocDate": "/Date(1710547200000)/",
                    "DueDate": "/Date(1713225600000)/",
                    "Currency": "SOL",
                    "Total": 850.75,
                    "Balance": 850.75,
                    "BankCode": "BCP",
                    "BankName": "BANCO DE CREDITO",
                    "AccountCode": "1041101",
                    "AccountName": "CUENTA CORRIENTE BCP"
                },
                {
                    "DocEntry": 1004,
                    "DocNum": "F001-004",
                    "CardCode": "C004",
                    "CardName": "CONSTRUCCIONES MODERNAS S.A.C.",
                    "DocType": "Factura",
                    "DocDate": "/Date(1710633600000)/",
                    "DueDate": "/Date(1713312000000)/",
                    "Currency": "SOL",
                    "Total": 4200.00,
                    "Balance": 4200.00,
                    "BankCode": "BCP",
                    "BankName": "BANCO DE CREDITO",
                    "AccountCode": "1041101",
                    "AccountName": "CUENTA CORRIENTE BCP"
                },
                {
                    "DocEntry": 1005,
                    "DocNum": "F001-005",
                    "CardCode": "C005",
                    "CardName": "TECNOLOGIA AVANZADA E.I.R.L.",
                    "DocType": "Factura",
                    "DocDate": "/Date(1710720000000)/",
                    "DueDate": "/Date(1713398400000)/",
                    "Currency": "SOL",
                    "Total": 1800.25,
                    "Balance": 1800.25,
                    "BankCode": "BCP",
                    "BankName": "BANCO DE CREDITO",
                    "AccountCode": "1041101",
                    "AccountName": "CUENTA CORRIENTE BCP"
                }
            ];
        },

        getAvailableDocuments: function () {
            return this._data;
        },

        getAvailableDocumentsCount: function () {
            return this._data.length;
        }
    });
}); 