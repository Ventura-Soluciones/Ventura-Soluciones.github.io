sap.ui.define(['exports', 'sap/ushell/thirdparty/webcomponents-base', 'sap/ushell/thirdparty/webcomponents', 'sap/ushell/thirdparty/i18n-defaults', 'sap/ushell/thirdparty/event-strict', 'sap/ushell/thirdparty/Icons', 'sap/ushell/thirdparty/information', 'sap/ushell/thirdparty/ListItemTemplate', 'sap/ushell/thirdparty/Button2', 'sap/ushell/thirdparty/List', 'sap/ushell/thirdparty/BusyIndicator', 'sap/ushell/thirdparty/Icon'], (function (exports, webcomponentsBase, webcomponents, i18nDefaults, eventStrict, Icons, information, ListItemTemplate, Button, List, BusyIndicator, Icon) { 'use strict';

	const name$1 = "nav-back";
	const pathData$1 = "M375.5 426q9 9 9 22.5t-9 22.5q-10 10-23 10t-23-10l-192-192q-9-9-9-22.5t9-22.5l191-193q10-10 23-10t22 10q10 9 10 22t-10 23l-157 159q-5 5-5 11.5t5 11.5z";
	const ltr$1 = false;
	const accData$1 = information.ICON_NAV_BACK;
	const collection$1 = "SAP-icons-v4";
	const packageName$1 = "@ui5/webcomponents-icons";

	Icons.f(name$1, { pathData: pathData$1, ltr: ltr$1, accData: accData$1, collection: collection$1, packageName: packageName$1 });

	const name = "nav-back";
	const pathData = "M326 96q11 0 18.5 7.5T352 122q0 10-8 18L223 256l121 116q8 8 8 18 0 11-7.5 18.5T326 416q-10 0-17-7L168 274q-8-6-8-18 0-11 8-19l141-134q7-7 17-7z";
	const ltr = false;
	const accData = information.ICON_NAV_BACK;
	const collection = "SAP-icons-v5";
	const packageName = "@ui5/webcomponents-icons";

	Icons.f(name, { pathData, ltr, accData, collection, packageName });

	var navBackIcon = "nav-back";

	const predefinedHooks = {
	    listItemContent,
	    iconBegin,
	};
	function MenuItemTemplate(hooks) {
	    const currentHooks = { ...predefinedHooks, ...hooks };
	    return i18nDefaults.jsxs(i18nDefaults.Fragment, { children: [ListItemTemplate.ListItemTemplate.call(this, currentHooks), listItemPostContent.call(this)] });
	}
	function listItemContent() {
	    return (i18nDefaults.jsxs(i18nDefaults.Fragment, { children: [this.text && i18nDefaults.jsx("div", { class: "ui5-menu-item-text", children: this.text }), rightContent.call(this)] }));
	}
	function rightContent() {
	    switch (true) {
	        case this.hasSubmenu:
	            return (i18nDefaults.jsx("div", { class: "ui5-menu-item-submenu-icon", children: i18nDefaults.jsx(Icon.Icon, { part: "subicon", name: ListItemTemplate.slimArrowRight, class: "ui5-menu-item-icon-end" }) }));
	        case this.hasEndContent:
	            return i18nDefaults.jsx("slot", { name: "endContent" });
	        case !!this.additionalText:
	            return (i18nDefaults.jsx("span", { part: "additional-text", class: "ui5-li-additional-text", "aria-hidden": this._accInfo.ariaHidden, children: this.additionalText }));
	    }
	}
	function iconBegin() {
	    if (this.hasIcon) {
	        return i18nDefaults.jsx(Icon.Icon, { class: "ui5-li-icon", name: this.icon });
	    }
	    if (this._siblingsWithIcon) {
	        return i18nDefaults.jsx("div", { class: "ui5-menu-item-dummy-icon" });
	    }
	}
	function listItemPostContent() {
	    return this.hasSubmenu && i18nDefaults.jsxs(ListItemTemplate.ResponsivePopover, { id: `${this._id}-menu-rp`, class: "ui5-menu-rp ui5-menu-rp-sub-menu", preventInitialFocus: true, preventFocusRestore: true, hideArrow: true, allowTargetOverlap: true, placement: this.placement, verticalAlign: "Top", accessibleName: this.acessibleNameText, onBeforeOpen: this._beforePopoverOpen, onOpen: this._afterPopoverOpen, onBeforeClose: this._beforePopoverClose, onClose: this._afterPopoverClose, children: [this.isPhone && (i18nDefaults.jsx(i18nDefaults.Fragment, { children: i18nDefaults.jsxs("div", { slot: "header", class: "ui5-menu-dialog-header", children: [i18nDefaults.jsx(Button.Button, { icon: navBackIcon, class: "ui5-menu-back-button", design: "Transparent", "aria-label": this.labelBack, onClick: this._close }), i18nDefaults.jsx("div", { class: "ui5-menu-dialog-title", children: i18nDefaults.jsx("div", { children: this.text }) }), i18nDefaults.jsx(Button.Button, { icon: information.decline, design: "Transparent", "aria-label": this.labelClose, onClick: this._closeAll })] }) })), i18nDefaults.jsx("div", { id: `${this._id}-menu-main`, children: this.items.length ? (i18nDefaults.jsx(List.List, { id: `${this._id}-menu-list`, selectionMode: "None", separators: "None", accessibleRole: "Menu", loading: this.loading, loadingDelay: this.loadingDelay, "onui5-close-menu": this._close, children: i18nDefaults.jsx("slot", {}) })) : this.loading && i18nDefaults.jsx(BusyIndicator.BusyIndicator, { id: `${this._id}-menu-busy-indicator`, delay: this.loadingDelay, class: "ui5-menu-busy-indicator", active: true }) })] });
	}

	Icons.p("@ui5/webcomponents-theming", "sap_horizon", async () => i18nDefaults.defaultThemeBase);
	Icons.p("@ui5/webcomponents", "sap_horizon", async () => i18nDefaults.defaultTheme);
	var menuItemCss = `:host{line-height:initial}::slotted([ui5-menu-item]){line-height:inherit}.ui5-menu-rp[ui5-responsive-popover]::part(header),.ui5-menu-rp[ui5-responsive-popover]::part(content),.ui5-menu-rp[ui5-responsive-popover]::part(footer){padding:0}.ui5-menu-rp[ui5-responsive-popover]{box-shadow:var(--sapContent_Shadow1);border-radius:var(--_ui5-v2-10-0-rc-2_menu_popover_border_radius)}.ui5-menu-busy-indicator{width:100%}.ui5-menu-dialog-header{display:flex;height:var(--_ui5-v2-10-0-rc-2-responsive_popover_header_height);align-items:center;justify-content:space-between;padding:0px 1rem;width:100%;overflow:hidden}.ui5-menu-dialog-title{display:flex;flex-direction:row;align-items:center;justify-content:flex-start;width:calc(100% - 6.5rem);padding-right:1rem;font-family:var(--sapFontHeaderFamily)}.ui5-menu-dialog-title>h1{display:inline-block;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:var(--sapFontHeader5Size)}.ui5-menu-back-button{margin-right:1rem}.ui5-menu-rp.ui5-menu-rp-sub-menu{margin-top:.25rem;margin-inline:var(--_ui5-v2-10-0-rc-2_menu_submenu_margin_offset)}.ui5-menu-rp.ui5-menu-rp-sub-menu[actual-placement=Start]{margin-top:.25rem;margin-inline:var(--_ui5-v2-10-0-rc-2_menu_submenu_placement_type_left_margin_offset)}:host([disabled]){pointer-events:initial;opacity:initial}:host([disabled])::part(content){opacity:var(--_ui5-v2-10-0-rc-2-listitembase_disabled_opacity)}:host([disabled][actionable]:not([active]):not([selected]):hover),:host([disabled][active][actionable]){background:var(--ui5-v2-10-0-rc-2-listitem-background-color)}:host([active]:not([disabled])),:host([active]:not([disabled])):hover{background-color:var(--sapList_Active_Background)}:host(:not([active]):not([selected]):not([disabled]):hover){background-color:var(--sapList_Hover_Background)}:host([disabled][active][actionable]) .ui5-li-root .ui5-li-icon{color:var(--sapContent_NonInteractiveIconColor)}:host([active]:not([disabled]))::part(content),:host([active]:not([disabled]))::part(additional-text),:host([active]:not([disabled])) .ui5-li-root .ui5-li-icon{color:var(--sapList_Active_TextColor)}:host([focused]:not([active]):not([disabled])){background-color:var(--sapList_Hover_Background)}:host::part(additional-text){margin:unset;margin-inline-start:1rem;color:var(--sapContent_LabelColor);min-width:max-content}.ui5-menu-item-text{width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;pointer-events:none;display:inline-block}.ui5-menu-item-dummy-icon{visibility:hidden}:host::part(title){font-size:var(--sapFontSize);padding-top:.125rem}:host([icon]:not([is-phone]))::part(title),:host([is-phone]:not([icon=""]))::part(title){padding-top:0}:host(:not([is-phone]))::part(native-li){padding:var(--_ui5-v2-10-0-rc-2_menu_item_padding)}:host::part(content){padding-inline-end:.25rem}.ui5-menu-item-submenu-icon{min-width:var(--_ui5-v2-10-0-rc-2_list_item_icon_size);min-height:var(--_ui5-v2-10-0-rc-2_list_item_icon_size);display:inline-block;vertical-align:middle;pointer-events:none}.ui5-menu-item-icon-end{display:inline-block;vertical-align:middle;padding-inline-start:.5rem;pointer-events:none;position:absolute;inset-inline-end:var(--_ui5-v2-10-0-rc-2_menu_item_submenu_icon_right)}.ui5-menu-item-submenu-icon .ui5-menu-item-icon-end{color:var(--sapContent_NonInteractiveIconColor)}.ui5-menu-item-dummy-icon{min-width:var(--_ui5-v2-10-0-rc-2_list_item_icon_size);min-height:var(--_ui5-v2-10-0-rc-2_list_item_icon_size);display:inline-block;vertical-align:middle;padding-inline-end:.5rem;pointer-events:none}
`;

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var MenuItem_1;
	/**
	 * @class
	 *
	 * ### Overview
	 *
	 * `ui5-menu-item` is the item to use inside a `ui5-menu`.
	 * An arbitrary hierarchy structure can be represented by recursively nesting menu items.
	 *
	 * ### Usage
	 *
	 * `ui5-menu-item` represents a node in a `ui5-menu`. The menu itself is rendered as a list,
	 * and each `ui5-menu-item` is represented by a list item in that list. Therefore, you should only use
	 * `ui5-menu-item` directly in your apps. The `ui5-li` list item is internal for the list, and not intended for public use.
	 *
	 * ### ES6 Module Import
	 *
	 * `import "@ui5/webcomponents/dist/MenuItem.js";`
	 * @constructor
	 * @extends ListItem
	 * @implements {IMenuItem}
	 * @since 1.3.0
	 * @public
	 */
	let MenuItem = MenuItem_1 = class MenuItem extends ListItemTemplate.ListItem {
	    constructor() {
	        super();
	        /**
	         * Defines whether `ui5-menu-item` is in disabled state.
	         *
	         * **Note:** A disabled `ui5-menu-item` is noninteractive.
	         * @default false
	         * @public
	         */
	        this.disabled = false;
	        /**
	         * Defines the delay in milliseconds, after which the loading indicator will be displayed inside the corresponding ui5-menu popover.
	         *
	         * **Note:** If set to `true` a `ui5-busy-indicator` component will be displayed into the related one to the current `ui5-menu-item` sub-menu popover.
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
	        /**
	         * Indicates whether any of the element siblings have icon.
	         */
	        this._siblingsWithIcon = false;
	        this._itemNavigation = new webcomponentsBase.f$1(this, {
	            navigationMode: webcomponentsBase.r.Horizontal,
	            behavior: webcomponentsBase.l.Static,
	            getItemsCallback: () => this._navigableItems,
	        });
	    }
	    get _navigableItems() {
	        return [...this.endContent].filter(item => {
	            return item.hasAttribute("ui5-button")
	                || item.hasAttribute("ui5-link")
	                || (item.hasAttribute("ui5-icon") && item.getAttribute("mode") === "Interactive");
	        });
	    }
	    _navigateToEndContent(isLast) {
	        const item = isLast
	            ? this._navigableItems[this._navigableItems.length - 1]
	            : this._navigableItems[0];
	        if (item) {
	            this._itemNavigation.setCurrentItem(item);
	            this._itemNavigation._focusCurrentItem();
	        }
	    }
	    get placement() {
	        return this.isRtl ? "Start" : "End";
	    }
	    get isRtl() {
	        return this.effectiveDir === "rtl";
	    }
	    get hasSubmenu() {
	        return !!(this.items.length || this.loading) && !this.disabled;
	    }
	    get hasEndContent() {
	        return !!(this.endContent.length);
	    }
	    get hasIcon() {
	        return !!this.icon;
	    }
	    get isSubMenuOpen() {
	        return this._popover?.open;
	    }
	    get ariaLabelledByText() {
	        return `${this.text} ${this.accessibleName}`.trim();
	    }
	    get menuHeaderTextPhone() {
	        return this.text;
	    }
	    get isPhone() {
	        return Icons.d$1();
	    }
	    get labelBack() {
	        return MenuItem_1.i18nBundle.getText(i18nDefaults.MENU_BACK_BUTTON_ARIA_LABEL);
	    }
	    get labelClose() {
	        return MenuItem_1.i18nBundle.getText(i18nDefaults.MENU_CLOSE_BUTTON_ARIA_LABEL);
	    }
	    get acessibleNameText() {
	        return MenuItem_1.i18nBundle.getText(i18nDefaults.MENU_POPOVER_ACCESSIBLE_NAME);
	    }
	    get isSeparator() {
	        return false;
	    }
	    onBeforeRendering() {
	        super.onBeforeRendering();
	        const siblingsWithIcon = this._menuItems.some(menuItem => !!menuItem.icon);
	        this._menuItems.forEach(item => {
	            item._siblingsWithIcon = siblingsWithIcon;
	        });
	    }
	    async focus(focusOptions) {
	        await Icons.f$3();
	        if (this.hasSubmenu && this.isSubMenuOpen) {
	            return this._menuItems[0].focus(focusOptions);
	        }
	        return super.focus(focusOptions);
	    }
	    get _focusable() {
	        return true;
	    }
	    get _accInfo() {
	        const accInfoSettings = {
	            role: this.accessibilityAttributes.role || "menuitem",
	            ariaHaspopup: this.hasSubmenu ? "menu" : undefined,
	            ariaKeyShortcuts: this.accessibilityAttributes.ariaKeyShortcuts,
	            ariaHidden: !!this.additionalText && !!this.accessibilityAttributes.ariaKeyShortcuts ? true : undefined,
	        };
	        return { ...super._accInfo, ...accInfoSettings };
	    }
	    get _popover() {
	        return this.shadowRoot.querySelector("[ui5-responsive-popover]");
	    }
	    get _menuItems() {
	        return this.items.filter((item) => !item.isSeparator);
	    }
	    _closeAll() {
	        if (this._popover) {
	            this._popover.open = false;
	        }
	        this.selected = false;
	        this.fireDecoratorEvent("close-menu");
	    }
	    _close() {
	        if (this._popover) {
	            this._popover.open = false;
	        }
	        this.selected = false;
	    }
	    _beforePopoverOpen(e) {
	        const prevented = !this.fireDecoratorEvent("before-open", {});
	        if (prevented) {
	            e.preventDefault();
	        }
	    }
	    _afterPopoverOpen() {
	        this.items[0]?.focus();
	        this.fireDecoratorEvent("open");
	    }
	    _beforePopoverClose(e) {
	        const prevented = !this.fireDecoratorEvent("before-close", { escPressed: e.detail.escPressed });
	        if (prevented) {
	            e.preventDefault();
	            return;
	        }
	        this.selected = false;
	        if (e.detail.escPressed) {
	            this.focus();
	            if (Icons.d$1()) {
	                this.fireDecoratorEvent("close-menu");
	            }
	        }
	    }
	    _afterPopoverClose() {
	        this.fireDecoratorEvent("close");
	    }
	    get isMenuItem() {
	        return true;
	    }
	};
	__decorate([
	    webcomponentsBase.s()
	], MenuItem.prototype, "text", void 0);
	__decorate([
	    webcomponentsBase.s()
	], MenuItem.prototype, "additionalText", void 0);
	__decorate([
	    webcomponentsBase.s()
	], MenuItem.prototype, "icon", void 0);
	__decorate([
	    webcomponentsBase.s({ type: Boolean })
	], MenuItem.prototype, "disabled", void 0);
	__decorate([
	    webcomponentsBase.s({ type: Boolean })
	], MenuItem.prototype, "loading", void 0);
	__decorate([
	    webcomponentsBase.s({ type: Number })
	], MenuItem.prototype, "loadingDelay", void 0);
	__decorate([
	    webcomponentsBase.s()
	], MenuItem.prototype, "accessibleName", void 0);
	__decorate([
	    webcomponentsBase.s()
	], MenuItem.prototype, "tooltip", void 0);
	__decorate([
	    webcomponentsBase.s({ type: Object })
	], MenuItem.prototype, "accessibilityAttributes", void 0);
	__decorate([
	    webcomponentsBase.s({ type: Boolean, noAttribute: true })
	], MenuItem.prototype, "_siblingsWithIcon", void 0);
	__decorate([
	    webcomponentsBase.d({ "default": true, type: HTMLElement, invalidateOnChildChange: true })
	], MenuItem.prototype, "items", void 0);
	__decorate([
	    webcomponentsBase.d({ type: HTMLElement })
	], MenuItem.prototype, "endContent", void 0);
	__decorate([
	    i18nDefaults.i("@ui5/webcomponents")
	], MenuItem, "i18nBundle", void 0);
	MenuItem = MenuItem_1 = __decorate([
	    webcomponentsBase.m({
	        tag: "ui5-menu-item",
	        renderer: i18nDefaults.d,
	        template: MenuItemTemplate,
	        styles: [ListItemTemplate.ListItem.styles, menuItemCss],
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
	        cancelable: true,
	    })
	    /**
	     * Fired after the menu is opened.
	     * @public
	     */
	    ,
	    eventStrict.l("open")
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
	        cancelable: true,
	    })
	    /**
	     * Fired after the menu is closed.
	     * @public
	     * @since 1.10.0
	     */
	    ,
	    eventStrict.l("close")
	], MenuItem);
	MenuItem.define();
	var MenuItem$1 = MenuItem;

	exports.MenuItem = MenuItem$1;
	exports.MenuItemTemplate = MenuItemTemplate;

}));
