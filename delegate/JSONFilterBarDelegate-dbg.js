sap.ui.define(["sap/ui/core/Element", "sap/ui/mdc/FilterBarDelegate", "sap/ui/mdc/FilterField"], function (Element, FilterBarDelegate, FilterField) {
  "use strict";

  // Define the JSONPropertyInfo interface and mock data

  // Mock JSONPropertyInfo data
  const JSONPropertyInfo = [{
    key: "name",
    dataType: "sap.ui.model.type.String",
    label: "Name",
    maxConditions: 1
  }, {
    key: "height",
    dataType: "sap.ui.model.type.Integer",
    label: "Height",
    maxConditions: 1
  }, {
    key: "prominence",
    dataType: "sap.ui.model.type.Float",
    label: "Prominence",
    maxConditions: -1
  }, {
    key: "parent_mountain",
    dataType: "sap.ui.model.type.Boolean",
    label: "Has parent mountain",
    maxConditions: 1
  }, {
    key: "first_ascent",
    dataType: "sap.ui.model.odata.type.Date",
    label: "First Ascent",
    maxConditions: 1
  }, {
    key: "rank",
    dataType: "sap.ui.model.type.Integer",
    label: "Rank",
    maxConditions: 1
  }];
  const JSONFilterBarDelegate = Object.assign({}, FilterBarDelegate);
  JSONFilterBarDelegate.fetchProperties = async () => JSONPropertyInfo;
  const _createFilterField = async (sId, oProperty, oFilterBar) => {
    const sPropertyName = oProperty.key;
    const oFilterField = new FilterField(sId, {
      dataType: oProperty.dataType,
      conditions: "{$filters>/conditions/" + sPropertyName + '}',
      propertyKey: sPropertyName,
      required: oProperty.required,
      label: oProperty.label,
      maxConditions: oProperty.maxConditions,
      delegate: {
        name: "sap/ui/mdc/field/FieldBaseDelegate",
        payload: {}
      }
    });
    return oFilterField;
  };
  JSONFilterBarDelegate.addItem = async (oFilterBar, sPropertyName) => {
    const oProperty = JSONPropertyInfo.find(oPI => oPI.key === sPropertyName);
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
  JSONFilterBarDelegate.removeItem = async (oFilterBar, oFilterField) => {
    oFilterField.destroy();
    return true; // allow default handling
  };
  return JSONFilterBarDelegate;
});
//# sourceMappingURL=JSONFilterBarDelegate-dbg.js.map
