sap.ui.define(['exports', 'sap/ushell/thirdparty/webcomponents-base', 'sap/ushell/thirdparty/i18n-defaults', 'sap/ushell/thirdparty/ListItemTemplate', 'sap/ushell/thirdparty/Icons'], (function (exports, webcomponentsBase, i18nDefaults, ListItemTemplate, Icons) { 'use strict';

    const predefinedHooks = {
        listItemContent,
    };
    function ListItemCustomTemplate(hooks) {
        const currentHooks = { ...predefinedHooks, ...hooks };
        return ListItemTemplate.ListItemTemplate.call(this, currentHooks);
    }
    function listItemContent() {
        return i18nDefaults.jsx("slot", {});
    }

    Icons.p("@ui5/webcomponents-theming", "sap_horizon", async () => i18nDefaults.defaultThemeBase);
    Icons.p("@ui5/webcomponents", "sap_horizon", async () => i18nDefaults.defaultTheme);
    var ListItemCustomCss = `:host(:not([hidden])){display:block}:host{min-height:var(--_ui5-v2-10-0-rc-2_list_item_base_height);height:auto;box-sizing:border-box}.ui5-li-root.ui5-custom-li-root{pointer-events:inherit;min-height:inherit}.ui5-li-root.ui5-custom-li-root .ui5-li-content{pointer-events:inherit}[ui5-checkbox].ui5-li-singlesel-radiobtn,[ui5-radio-button].ui5-li-singlesel-radiobtn{display:flex;align-items:center}.ui5-li-root.ui5-custom-li-root,[ui5-checkbox].ui5-li-singlesel-radiobtn,[ui5-radio-button].ui5-li-singlesel-radiobtn{min-width:var(--_ui5-v2-10-0-rc-2_custom_list_item_rb_min_width)}
`;

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    /**
     * @class
     *
     * A component to be used as custom list item within the `ui5-list`
     * the same way as the standard `ui5-li`.
     *
     * The component accepts arbitrary HTML content to allow full customization.
     * @csspart native-li - Used to style the main li tag of the list item
     * @csspart content - Used to style the content area of the list item
     * @csspart detail-button - Used to style the button rendered when the list item is of type detail
     * @csspart delete-button - Used to style the button rendered when the list item is in delete mode
     * @csspart radio - Used to style the radio button rendered when the list item is in single selection mode
     * @csspart checkbox - Used to style the checkbox rendered when the list item is in multiple selection mode
     * @slot {Node[]} default - Defines the content of the component.
     * @constructor
     * @extends ListItem
     * @public
     */
    let ListItemCustom = class ListItemCustom extends ListItemTemplate.ListItem {
        constructor() {
            super(...arguments);
            /**
             * Defines whether the item is movable.
             * @default false
             * @public
             * @since 2.0.0
             */
            this.movable = false;
        }
        async _onkeydown(e) {
            const isTab = webcomponentsBase.B(e) || webcomponentsBase.m$1(e);
            const isFocused = this.matches(":focus");
            if (!isTab && !isFocused && !webcomponentsBase.so(e)) {
                return;
            }
            await super._onkeydown(e);
        }
        _onkeyup(e) {
            const isTab = webcomponentsBase.B(e) || webcomponentsBase.m$1(e);
            const isFocused = this.matches(":focus");
            if (!isTab && !isFocused && !webcomponentsBase.so(e)) {
                return;
            }
            super._onkeyup(e);
        }
        get classes() {
            const result = super.classes;
            result.main["ui5-custom-li-root"] = true;
            return result;
        }
    };
    __decorate([
        webcomponentsBase.s({ type: Boolean })
    ], ListItemCustom.prototype, "movable", void 0);
    __decorate([
        webcomponentsBase.s()
    ], ListItemCustom.prototype, "accessibleName", void 0);
    ListItemCustom = __decorate([
        webcomponentsBase.m({
            tag: "ui5-li-custom",
            template: ListItemCustomTemplate,
            renderer: i18nDefaults.d,
            styles: [ListItemTemplate.ListItem.styles, ListItemCustomCss],
        })
    ], ListItemCustom);
    ListItemCustom.define();
    var ListItemCustom$1 = ListItemCustom;

    exports.ListItemCustom = ListItemCustom$1;

}));
