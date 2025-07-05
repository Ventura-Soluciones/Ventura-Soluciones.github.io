sap.ui.define(['sap/ushell/thirdparty/webcomponents-base', 'sap/ushell/thirdparty/webcomponents', 'sap/ushell/thirdparty/webcomponents-fiori', 'sap/ushell/thirdparty/MenuItem2', 'sap/ushell/thirdparty/Icons', 'sap/ushell/thirdparty/i18n-defaults', 'sap/ushell/thirdparty/parameters-bundle.css', 'sap/ushell/thirdparty/event-strict', 'sap/ushell/thirdparty/information', 'sap/ushell/thirdparty/ListItemTemplate', 'sap/ushell/thirdparty/BusyIndicator', 'sap/ushell/thirdparty/Label', 'sap/ushell/thirdparty/List', 'sap/ushell/thirdparty/toLowercaseEnumValue', 'sap/ushell/thirdparty/Icon', 'sap/ushell/thirdparty/Button2'], (function (webcomponentsBase, webcomponents, webcomponentsFiori, MenuItem, Icons, i18nDefaults, parametersBundle_css, eventStrict, information, ListItemTemplate, BusyIndicator, Label, List, toLowercaseEnumValue, Icon, Button) { 'use strict';

    function UserMenuItemTemplate() {
        return [MenuItem.MenuItemTemplate.call(this)];
    }

    Icons.p("@ui5/webcomponents-theming", "sap_horizon", async () => i18nDefaults.defaultThemeBase);
    Icons.p("@ui5/webcomponents-fiori", "sap_horizon", async () => parametersBundle_css.defaultTheme);
    var userMenuItemCss = `:host{height:40px;margin-block:.5rem}:host(:last-of-type){margin-bottom:0}:host(:first-of-type){margin-top:0}
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
     * ### Overview
     *
     * `ui5-user-menu-item` is the item to use inside a `ui5-user-menu`.
     * An arbitrary hierarchy structure can be represented by recursively nesting menu items.
     *
     * ### Usage
     *
     * `ui5-user-menu-item` represents a node in a `ui5-user-menu`. The user menu itself is rendered as a list,
     * and each `ui5-menu-item` is represented by a menu item in that menu. Therefore, you should only use
     * `ui5-user-menu-item` directly in your apps. The `ui5-menu` menu item is internal for the menu, and not intended for public use.
     *
     * ### ES6 Module Import
     *
     * `import "@ui5/webcomponents-fiori/dist/UserMenuItem.js";`
     * @constructor
     * @extends MenuItem
     * @experimental
     * @public
     * @since 2.5.0
     */
    let UserMenuItem = class UserMenuItem extends MenuItem.MenuItem {
        get _menuItems() {
            return this.items.filter(item => !item.isSeparator);
        }
    };
    __decorate([
        webcomponentsBase.d({ "default": true, type: HTMLElement, invalidateOnChildChange: true })
    ], UserMenuItem.prototype, "items", void 0);
    UserMenuItem = __decorate([
        webcomponentsBase.m({
            tag: "ui5-user-menu-item",
            template: UserMenuItemTemplate,
            styles: [MenuItem.MenuItem.styles, userMenuItemCss],
        })
    ], UserMenuItem);
    UserMenuItem.define();
    var UserMenuItem$1 = UserMenuItem;

    return UserMenuItem$1;

}));
