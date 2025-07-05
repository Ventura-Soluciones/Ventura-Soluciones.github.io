sap.ui.define(['sap/ushell/thirdparty/webcomponents-base', 'sap/ushell/thirdparty/webcomponents', 'sap/ushell/thirdparty/event-strict', 'sap/ushell/thirdparty/Icons', 'sap/ushell/thirdparty/i18n-defaults', 'sap/ushell/thirdparty/ListItemTemplate', 'sap/ushell/thirdparty/MenuItem2', 'sap/ushell/thirdparty/ListItemCustom', 'sap/ushell/thirdparty/BusyIndicator', 'sap/ushell/thirdparty/List', 'sap/ushell/thirdparty/Button2', 'sap/ushell/thirdparty/information', 'sap/ushell/thirdparty/toLowercaseEnumValue', 'sap/ushell/thirdparty/Icon', 'sap/ushell/thirdparty/Label'], (function (webcomponentsBase, webcomponents, eventStrict, Icons, i18nDefaults, ListItemTemplate, MenuItem, ListItemCustom, BusyIndicator, List, Button, information, toLowercaseEnumValue, Icon, Label) { 'use strict';

    function MenuSeparatorTemplate() {
        return (i18nDefaults.jsx(ListItemCustom.ListItemCustom, { class: "ui5-menu-separator", _forcedAccessibleRole: "separator", disabled: true }));
    }

    Icons.p("@ui5/webcomponents-theming", "sap_horizon", async () => i18nDefaults.defaultThemeBase);
    Icons.p("@ui5/webcomponents", "sap_horizon", async () => i18nDefaults.defaultTheme);
    var menuSeparatorCss = `:host{border-top:.0625rem solid var(--sapGroup_ContentBorderColor);min-height:.125rem}.ui5-menu-separator{border:inherit;min-height:inherit;background:inherit;opacity:1}
`;

    var __decorate$1 = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    /**
     * @class
     * The `ui5-menu-separator` represents a horizontal line to separate menu items inside a `ui5-menu`.
     * @constructor
     * @extends ListItemBase
     * @implements {IMenuItem}
     * @public
     * @since 2.0.0
     */
    let MenuSeparator = class MenuSeparator extends BusyIndicator.ListItemBase {
        get isSeparator() {
            return true;
        }
        get classes() {
            return {
                main: {
                    "ui5-menu-separator": true,
                },
            };
        }
        /**
         * @override
         */
        get _focusable() {
            return false;
        }
        /**
         * @override
         */
        get _pressable() {
            return false;
        }
    };
    MenuSeparator = __decorate$1([
        webcomponentsBase.m({
            tag: "ui5-menu-separator",
            renderer: i18nDefaults.d,
            styles: [menuSeparatorCss],
            template: MenuSeparatorTemplate,
        })
    ], MenuSeparator);
    MenuSeparator.define();

    function MenuTemplate() {
        return (i18nDefaults.jsxs(ListItemTemplate.ResponsivePopover, { id: `${this._id}-menu-rp`, class: "ui5-menu-rp", placement: "Bottom", verticalAlign: "Bottom", horizontalAlign: this.horizontalAlign, opener: this.opener, open: this.open, preventInitialFocus: true, hideArrow: true, allowTargetOverlap: true, accessibleName: this.acessibleNameText, onBeforeOpen: this._beforePopoverOpen, onOpen: this._afterPopoverOpen, onBeforeClose: this._beforePopoverClose, onClose: this._afterPopoverClose, children: [this.isPhone &&
                    i18nDefaults.jsxs("div", { slot: "header", class: "ui5-menu-dialog-header", children: [i18nDefaults.jsx("div", { class: "ui5-menu-dialog-title", children: i18nDefaults.jsx("h1", { children: this.headerText }) }), i18nDefaults.jsx(Button.Button, { icon: information.decline, design: "Transparent", "aria-label": this.labelClose, onClick: this._close })] }), i18nDefaults.jsx("div", { id: `${this._id}-menu-main`, children: this.items.length ?
                        (i18nDefaults.jsx(List.List, { id: `${this._id}- menu-list`, selectionMode: "None", loading: this.loading, loadingDelay: this.loadingDelay, separators: "None", accessibleRole: "Menu", onItemClick: this._itemClick, onMouseOver: this._itemMouseOver, onKeyDown: this._itemKeyDown, "onui5-close-menu": this._close, children: i18nDefaults.jsx("slot", {}) }))
                        : this.loading && (i18nDefaults.jsx(BusyIndicator.BusyIndicator, { id: `${this._id}-menu-busy-indicator`, delay: this.loadingDelay, class: "ui5-menu-busy-indicator", active: true })) })] }));
    }

    Icons.p("@ui5/webcomponents-theming", "sap_horizon", async () => i18nDefaults.defaultThemeBase);
    Icons.p("@ui5/webcomponents", "sap_horizon", async () => i18nDefaults.defaultTheme);
    var menuCss = `:host{line-height:initial}::slotted([ui5-menu-item]){line-height:inherit}.ui5-menu-rp[ui5-responsive-popover]::part(header),.ui5-menu-rp[ui5-responsive-popover]::part(content),.ui5-menu-rp[ui5-responsive-popover]::part(footer){padding:0}.ui5-menu-rp[ui5-responsive-popover]{box-shadow:var(--sapContent_Shadow1);border-radius:var(--_ui5-v2-10-0-rc-2_menu_popover_border_radius)}.ui5-menu-busy-indicator{width:100%}.ui5-menu-dialog-header{display:flex;height:var(--_ui5-v2-10-0-rc-2-responsive_popover_header_height);align-items:center;justify-content:space-between;padding:0px 1rem;width:100%;overflow:hidden}.ui5-menu-dialog-title{display:flex;flex-direction:row;align-items:center;justify-content:flex-start;width:calc(100% - 6.5rem);padding-right:1rem;font-family:var(--sapFontHeaderFamily)}.ui5-menu-dialog-title>h1{display:inline-block;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:var(--sapFontHeader5Size)}.ui5-menu-back-button{margin-right:1rem}
`;

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var Menu_1;
    const MENU_OPEN_DELAY = 300;
    /**
     * @class
     *
     * ### Overview
     *
     * `ui5-menu` component represents a hierarchical menu structure.
     *
     * ### Structure
     *
     * The `ui5-menu` can hold two types of entities:
     *
     * - `ui5-menu-item` components
     * - `ui5-menu-separator` - used to separate menu items with a line
     *
     * An arbitrary hierarchy structure can be represented by recursively nesting menu items.
     *
     * ### Keyboard Handling
     *
     * The `ui5-menu` provides advanced keyboard handling.
     * The user can use the following keyboard shortcuts in order to navigate trough the tree:
     *
     * - `Arrow Up` / `Arrow Down` - Navigates up and down the menu items that are currently visible.
     * - `Arrow Right`, `Space` or `Enter` - Opens a sub-menu if there are menu items nested
     * in the currently clicked menu item.
     * - `Arrow Left` or `Escape` - Closes the currently opened sub-menu.
     *
     * when there is `endContent` :
     * - `Arrow Left` or `ArrowRight` - Navigate between the menu item actions and the menu item itself
     * - `Arrow Up` / `Arrow Down` - Navigates up and down the currently visible menu items
     *
     * Note: if the text ditrection is set to Right-to-left (RTL), `Arrow Right` and `Arrow Left` functionality is swapped.
     *
     * ### ES6 Module Import
     *
     * `import "@ui5/webcomponents/dist/Menu.js";`
     * @constructor
     * @extends UI5Element
     * @since 1.3.0
     * @public
     */
    let Menu = Menu_1 = class Menu extends webcomponentsBase.b {
        constructor() {
            super(...arguments);
            /**
             * Indicates if the menu is open.
             * @public
             * @default false
             * @since 1.10.0
             */
            this.open = false;
            /**
             * Determines the horizontal alignment of the menu relative to its opener control.
             * @default "Start"
             * @public
             */
            this.horizontalAlign = "Start";
            /**
             * Defines if a loading indicator would be displayed inside the corresponding ui5-menu popover.
             * @default false
             * @public
             * @since 1.13.0
             */
            this.loading = false;
            /**
             * Defines the delay in milliseconds, after which the loading indicator will be displayed inside the corresponding ui5-menu popover.
             * @default 1000
             * @public
             * @since 1.13.0
             */
            this.loadingDelay = 1000;
        }
        get isRtl() {
            return this.effectiveDir === "rtl";
        }
        get labelClose() {
            return Menu_1.i18nBundle.getText(i18nDefaults.MENU_CLOSE_BUTTON_ARIA_LABEL);
        }
        get isPhone() {
            return Icons.d$1();
        }
        get _popover() {
            return this.shadowRoot.querySelector("[ui5-responsive-popover]");
        }
        get _menuItems() {
            return this.items.filter((item) => !item.isSeparator);
        }
        get acessibleNameText() {
            return Menu_1.i18nBundle.getText(i18nDefaults.MENU_POPOVER_ACCESSIBLE_NAME);
        }
        onBeforeRendering() {
            const siblingsWithIcon = this._menuItems.some(menuItem => !!menuItem.icon);
            this._menuItems.forEach(item => {
                item._siblingsWithIcon = siblingsWithIcon;
            });
        }
        _close() {
            this.open = false;
        }
        _openItemSubMenu(item) {
            clearTimeout(this._timeout);
            if (!item._popover || item._popover.open) {
                return;
            }
            this.fireDecoratorEvent("before-open", {
                item,
            });
            item._popover.opener = item;
            item._popover.open = true;
            item.selected = true;
        }
        _closeItemSubMenu(item) {
            if (item && item._popover) {
                const openedSibling = item._menuItems.find(menuItem => menuItem._popover && menuItem._popover.open);
                if (openedSibling) {
                    this._closeItemSubMenu(openedSibling);
                }
                item._popover.open = false;
                item.selected = false;
            }
        }
        _itemMouseOver(e) {
            if (Icons.f$1()) {
                // respect mouseover only on desktop
                const item = e.target;
                if (this._isInstanceOfMenuItem(item)) {
                    item.focus();
                    // Opens submenu with 300ms delay
                    this._startOpenTimeout(item);
                }
            }
        }
        async focus(focusOptions) {
            await Icons.f$3();
            const firstMenuItem = this._menuItems[0];
            if (firstMenuItem) {
                return firstMenuItem.focus(focusOptions);
            }
            return super.focus(focusOptions);
        }
        _startOpenTimeout(item) {
            clearTimeout(this._timeout);
            this._timeout = setTimeout(() => {
                const opener = item.parentElement;
                const openedSibling = opener && opener._menuItems.find(menuItem => menuItem._popover && menuItem._popover.open);
                if (openedSibling) {
                    this._closeItemSubMenu(openedSibling);
                }
                this._openItemSubMenu(item);
            }, MENU_OPEN_DELAY);
        }
        _itemClick(e) {
            const item = e.detail.item;
            if (!item._popover) {
                const prevented = !this.fireDecoratorEvent("item-click", {
                    "item": item,
                    "text": item.text || "",
                });
                if (!prevented && this._popover) {
                    item.fireDecoratorEvent("close-menu");
                }
            }
            else {
                this._openItemSubMenu(item);
            }
        }
        _itemKeyDown(e) {
            const isTabNextPrevious = webcomponentsBase.B(e) || webcomponentsBase.m$1(e);
            const item = e.target;
            const parentElement = item.parentElement;
            const shouldItemNavigation = webcomponentsBase.D(e) || webcomponentsBase.P(e);
            const shouldOpenMenu = this.isRtl ? webcomponentsBase.K(e) : webcomponentsBase.c(e);
            const shouldCloseMenu = !shouldItemNavigation && !shouldOpenMenu && this._isInstanceOfMenuItem(parentElement);
            if (this._isInstanceOfMenuItem(item)) {
                if (webcomponentsBase.b$1(e) || isTabNextPrevious) {
                    e.preventDefault();
                }
                if (webcomponentsBase.c(e) || webcomponentsBase.K(e)) {
                    item._navigateToEndContent(webcomponentsBase.K(e));
                }
                if (shouldOpenMenu) {
                    this._openItemSubMenu(item);
                }
                else if ((shouldCloseMenu || isTabNextPrevious) && parentElement._popover) {
                    parentElement._popover.open = false;
                    parentElement.selected = false;
                    parentElement._popover.focusOpener();
                }
            }
            else if (webcomponentsBase.D(e)) {
                this._navigateOutOfEndContent(parentElement);
            }
            else if (webcomponentsBase.P(e)) {
                this._navigateOutOfEndContent(parentElement, true);
            }
        }
        _navigateOutOfEndContent(menuItem, isDownwards) {
            const opener = menuItem?.parentElement;
            const currentIndex = opener._menuItems.indexOf(menuItem);
            const nextItem = isDownwards ? opener._menuItems[currentIndex + 1] : opener._menuItems[currentIndex - 1];
            const itemToFocus = nextItem || opener._menuItems[currentIndex];
            itemToFocus.focus();
        }
        _beforePopoverOpen(e) {
            const prevented = !this.fireDecoratorEvent("before-open", {});
            if (prevented) {
                this.open = false;
                e.preventDefault();
            }
        }
        _afterPopoverOpen() {
            this._menuItems[0]?.focus();
            this.fireDecoratorEvent("open");
        }
        _beforePopoverClose(e) {
            const prevented = !this.fireDecoratorEvent("before-close", { escPressed: e.detail.escPressed });
            if (prevented) {
                this.open = true;
                e.preventDefault();
            }
        }
        _afterPopoverClose() {
            this.open = false;
            this.fireDecoratorEvent("close");
        }
        _isInstanceOfMenuItem(object) {
            return "isMenuItem" in object;
        }
    };
    __decorate([
        webcomponentsBase.s()
    ], Menu.prototype, "headerText", void 0);
    __decorate([
        webcomponentsBase.s({ type: Boolean })
    ], Menu.prototype, "open", void 0);
    __decorate([
        webcomponentsBase.s()
    ], Menu.prototype, "horizontalAlign", void 0);
    __decorate([
        webcomponentsBase.s({ type: Boolean })
    ], Menu.prototype, "loading", void 0);
    __decorate([
        webcomponentsBase.s({ type: Number })
    ], Menu.prototype, "loadingDelay", void 0);
    __decorate([
        webcomponentsBase.s({ converter: ListItemTemplate.e })
    ], Menu.prototype, "opener", void 0);
    __decorate([
        webcomponentsBase.d({ "default": true, type: HTMLElement, invalidateOnChildChange: true })
    ], Menu.prototype, "items", void 0);
    __decorate([
        i18nDefaults.i("@ui5/webcomponents")
    ], Menu, "i18nBundle", void 0);
    Menu = Menu_1 = __decorate([
        webcomponentsBase.m({
            tag: "ui5-menu",
            renderer: i18nDefaults.d,
            styles: menuCss,
            template: MenuTemplate,
        })
        /**
         * Fired when an item is being clicked.
         *
         * **Note:** Since 1.17.0 the event is preventable, allowing the menu to remain open after an item is pressed.
         * @param { HTMLElement } item The currently clicked menu item.
         * @param { string } text The text of the currently clicked menu item.
         * @public
         */
        ,
        eventStrict.l("item-click", {
            cancelable: true,
        })
        /**
         * Fired before the menu is opened. This event can be cancelled, which will prevent the menu from opening.
         *
         * **Note:** Since 1.14.0 the event is also fired before a sub-menu opens.
         * @public
         * @since 1.10.0
         * @param { HTMLElement } item The `ui5-menu-item` that triggers opening of the sub-menu or undefined when fired upon root menu opening.
         */
        ,
        eventStrict.l("before-open", {
            bubbles: true,
            cancelable: true,
        })
        /**
         * Fired after the menu is opened.
         * @public
         * @since 1.10.0
         */
        ,
        eventStrict.l("open", {
            bubbles: true,
        })
        /**
         * Fired when the menu is being closed.
         * @private
         */
        ,
        eventStrict.l("close-menu", {
            bubbles: true,
        })
        /**
         * Fired before the menu is closed. This event can be cancelled, which will prevent the menu from closing.
         * @public
         * @param {boolean} escPressed Indicates that `ESC` key has triggered the event.
         * @since 1.10.0
         */
        ,
        eventStrict.l("before-close", {
            bubbles: true,
            cancelable: true,
        })
        /**
         * Fired after the menu is closed.
         * @public
         * @since 1.10.0
         */
        ,
        eventStrict.l("close")
    ], Menu);
    Menu.define();
    var Menu$1 = Menu;

    return Menu$1;

}));
