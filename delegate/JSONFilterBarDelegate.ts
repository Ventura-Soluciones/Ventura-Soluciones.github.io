/* eslint-disable require-await */
import Element from "sap/ui/core/Element";
import FilterBarDelegate from "sap/ui/mdc/FilterBarDelegate";
import FilterField from "sap/ui/mdc/FilterField";

// Define the JSONPropertyInfo interface and mock data
interface IPropertyInfo {
    key: string;
    dataType: string;
    required?: boolean;
    label: string;
    maxConditions?: number;
}

// Mock JSONPropertyInfo data
const JSONPropertyInfo: IPropertyInfo[] = [
    {
        key: "name",
        dataType: "sap.ui.model.type.String",
        label: "Name",
        maxConditions: 1
    },
    {
        key: "height",
        dataType: "sap.ui.model.type.Integer",
        label: "Height",
        maxConditions: 1
    },
    {
        key: "prominence",
        dataType: "sap.ui.model.type.Float",
        label: "Prominence",
        maxConditions: -1
    },
    {
        key: "parent_mountain",
        dataType: "sap.ui.model.type.Boolean",
        label: "Has parent mountain",
        maxConditions: 1
    },
    {
        key: "first_ascent",
        dataType: "sap.ui.model.odata.type.Date",
        label: "First Ascent",
        maxConditions: 1
    },
    {
        key: "rank",
        dataType: "sap.ui.model.type.Integer",
        label: "Rank",
        maxConditions: 1
    }
];

interface IFilterBar {
    getId(): string;
}

interface IFilterField {
    destroy(): void;
}

const JSONFilterBarDelegate = Object.assign({}, FilterBarDelegate);

JSONFilterBarDelegate.fetchProperties = async (): Promise<IPropertyInfo[]> => JSONPropertyInfo;

const _createFilterField = async (sId: string, oProperty: IPropertyInfo, oFilterBar: IFilterBar): Promise<FilterField> => {
    const sPropertyName = oProperty.key;
    const oFilterField = new FilterField(sId, {
        dataType: oProperty.dataType,
        conditions: "{$filters>/conditions/" + sPropertyName + '}' as any,
        propertyKey: sPropertyName,
        required: oProperty.required,
        label: oProperty.label,
        maxConditions: oProperty.maxConditions,
        delegate: {name: "sap/ui/mdc/field/FieldBaseDelegate", payload: {}}
    });
    return oFilterField;
};

JSONFilterBarDelegate.addItem = async (oFilterBar: IFilterBar, sPropertyName: string): Promise<FilterField> => {
    const oProperty = JSONPropertyInfo.find((oPI: IPropertyInfo) => oPI.key === sPropertyName);
    const sId = oFilterBar.getId() + "--filter--" + sPropertyName;
    const existingElement = Element.getElementById(sId);
    if (existingElement && existingElement instanceof FilterField) {
        return existingElement;
    }
    if (!oProperty) {
        throw new Error(`Property ${sPropertyName} not found in JSONPropertyInfo`);
    }
    return await _createFilterField(sId, oProperty, oFilterBar);
};

JSONFilterBarDelegate.removeItem = async (oFilterBar: IFilterBar, oFilterField: IFilterField): Promise<boolean> => {
    oFilterField.destroy();
    return true; // allow default handling
};

export default JSONFilterBarDelegate; 