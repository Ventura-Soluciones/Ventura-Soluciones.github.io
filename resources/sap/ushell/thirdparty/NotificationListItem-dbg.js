sap.ui.define(['sap/ushell/thirdparty/webcomponents-base', 'sap/ushell/thirdparty/webcomponents', 'sap/ushell/thirdparty/webcomponents-fiori', 'sap/ushell/thirdparty/Tag', 'sap/ushell/thirdparty/event-strict', 'sap/ushell/thirdparty/overflow', 'sap/ushell/thirdparty/information', 'sap/ushell/thirdparty/Button2', 'sap/ushell/thirdparty/i18n-defaults', 'sap/ushell/thirdparty/NotificationListItemBase', 'sap/ushell/thirdparty/Icons', 'sap/ushell/thirdparty/i18n-defaults2', 'sap/ushell/thirdparty/BusyIndicator', 'sap/ushell/thirdparty/Icon', 'sap/ushell/thirdparty/Link', 'sap/ushell/thirdparty/parameters-bundle.css', 'sap/ushell/thirdparty/toLowercaseEnumValue', 'sap/ushell/thirdparty/Label'], (function (webcomponentsBase, webcomponents, webcomponentsFiori, Tag, eventStrict, overflow, information, Button, i18nDefaults, NotificationListItemBase, Icons, i18nDefaults$1, BusyIndicator, Icon, Link, parametersBundle_css, toLowercaseEnumValue, Label) { 'use strict';

	var iconError = "error";

	var iconAlert = "alert";

	var iconInformation = "information";

	/**
	 * Different types of NotificationListItemImportance.
	 *
	 * @public
	 */
	var NotificationListItemImportance;
	(function (NotificationListItemImportance) {
	    /**
	     * @public
	     */
	    NotificationListItemImportance["Standard"] = "Standard";
	    /**
	     * @public
	     */
	    NotificationListItemImportance["Important"] = "Important";
	})(NotificationListItemImportance || (NotificationListItemImportance = {}));
	var NotificationListItemImportance$1 = NotificationListItemImportance;

	const name$1 = "high-priority";
	const pathData$1 = "M256 0q53 0 99.5 20T437 75t55 81.5 20 99.5-20 99.5-55 81.5-81.5 55-99.5 20-99.5-20T75 437t-55-81.5T0 256t20-99.5T75 75t81.5-55T256 0zm0 96q-15 0-25.5 11t-9.5 26l11 164q0 10 7 16.5t17 6.5 17-6.5 7-16.5l11-164q1-15-9.5-26T256 96zm0 329q15 0 25.5-11t10.5-26-11-25.5-26-10.5-25 10.5-10 25.5 10 26 26 11z";
	const ltr$1 = false;
	const collection$1 = "SAP-icons-v4";
	const packageName$1 = "@ui5/webcomponents-icons";

	Icons.f(name$1, { pathData: pathData$1, ltr: ltr$1, collection: collection$1, packageName: packageName$1 });

	const name = "high-priority";
	const pathData = "M256 0q53 0 99.5 20T437 75t55 81.5 20 99.5-20 99.5-55 81.5-81.5 55-99.5 20-99.5-20T75 437t-55-81.5T0 256t20-99.5T75 75t81.5-55T256 0zm-32 288q0 14 9 23t23 9 23-9 9-23V128q0-14-9-23t-23-9-23 9-9 23v160zm32 128q14 0 23-9t9-23-9-23-23-9-23 9-9 23 9 23 23 9z";
	const ltr = false;
	const collection = "SAP-icons-v5";
	const packageName = "@ui5/webcomponents-icons";

	Icons.f(name, { pathData, ltr, collection, packageName });

	var iconHighPriority = "high-priority";

	function NotificationListItemTemplate() {
	    return (i18nDefaults.jsxs("li", { class: this.itemClasses, onFocusIn: this._onfocusin, onKeyDown: this._onkeydown, onKeyUp: this._onkeyup, onClick: this._onclick, tabindex: this.forcedTabIndex ? parseInt(this.forcedTabIndex) : undefined, "aria-labelledby": this.ariaLabelledBy, "aria-level": this._ariaLevel, children: [this.loading && (i18nDefaults.jsx("span", { id: `${this._id}-loading`, class: "ui5-hidden-text", children: this.loadingText })), i18nDefaults.jsx(BusyIndicator.BusyIndicator, { id: `${this._id}-busyIndicator`, delay: this.loadingDelay, active: this.loading, inert: this.loading, class: "ui5-nli-loading", children: i18nDefaults.jsxs("div", { class: "ui5-nli-content-wrapper", children: [i18nDefaults.jsxs("div", { class: {
	                                "ui5-nli-content": true,
	                                "ui5-nli-content-with-importance": this.hasImportance,
	                            }, children: [this.hasImportance && (i18nDefaults.jsxs(Tag.Tag, { id: `${this._id}-importance`, class: "ui5-nli-importance", design: "Set2", colorScheme: "2", wrappingType: "None", children: [i18nDefaults.jsx(Icon.Icon, { name: iconHighPriority, slot: "icon" }), this.importanceText] })), i18nDefaults.jsxs("div", { class: "ui5-nli-title-text-wrapper", children: [this.hasState && (i18nDefaults.jsx(Icon.Icon, { class: "ui5-state-icon", name: this.statusIconName, showTooltip: true, accessibleName: this.stateText, design: this.statusIconDesign })), i18nDefaults.jsxs("div", { id: `${this._id}-title-text`, class: "ui5-nli-title-text", part: "title-text", children: [i18nDefaults.jsx("span", { class: "ui5-hidden-text", children: this.stateText }), this.titleText] })] }), i18nDefaults.jsx("span", { id: `${this._id}-read`, class: "ui5-hidden-text", children: this.readText }), this.hasDesc && (i18nDefaults.jsx("div", { id: `${this._id}-description`, class: "ui5-nli-description", children: i18nDefaults.jsx("slot", {}) })), i18nDefaults.jsxs("div", { class: "ui5-nli-footer", children: [i18nDefaults.jsx("div", { id: `${this._id}-footnotes`, class: "ui5-nli-footnotes", children: this.footerItems.map(item => {
	                                                return (i18nDefaults.jsxs(i18nDefaults.Fragment, { children: [i18nDefaults.jsx("slot", { name: item.slotName }), item.showDivider && i18nDefaults.jsx("div", { class: "ui5-nli-footer-divider", "aria-hidden": "true", children: "\u00B7" })] }));
	                                            }) }), i18nDefaults.jsx(Link.Link, { class: "ui5-nli-footer-showMore", hidden: this.hideShowMore, onClick: this._onShowMoreClick, wrappingType: "None", href: "#" // --without href ENTER does not trigger click
	                                            , accessibleName: this.moreLinkAccessibleName, accessibleRole: "Button", accessibilityAttributes: this.moreLinkAccessibilityAttributes, children: this.showMoreText })] })] }), i18nDefaults.jsxs("div", { class: "ui5-nli-actions", children: [this.showMenu && (i18nDefaults.jsx(Button.Button, { icon: overflow.overflow, design: "Transparent", onClick: this._onBtnMenuClick, class: "ui5-nli-menu-btn", tooltip: this.menuBtnAccessibleName, accessibilityAttributes: this.menuButtonAccessibilityAttributes })), this.showClose && (i18nDefaults.jsx(Button.Button, { icon: information.decline, class: "ui5-nli-close-btn", design: "Transparent", onClick: this._onBtnCloseClick, tooltip: this.closeBtnAccessibleName, accessibleName: this.closeBtnAccessibleName }))] }), i18nDefaults.jsx("div", { class: "ui5-nli-avatar", "aria-hidden": "true", children: i18nDefaults.jsx("slot", { name: "avatar" }) }), i18nDefaults.jsx("slot", { name: "menu" })] }) })] }));
	}

	Icons.p("@ui5/webcomponents-theming", "sap_horizon", async () => i18nDefaults.defaultThemeBase);
	Icons.p("@ui5/webcomponents-fiori", "sap_horizon", async () => parametersBundle_css.defaultTheme);
	var NotificationListItemCss = `.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}:host(:not([hidden])){display:block;max-width:100%;min-height:var(--_ui5-v2-10-0-rc-2_list_item_base_height);background:var(--ui5-v2-10-0-rc-2-listitem-background-color);cursor:pointer}.ui5-nli-focusable:focus{outline:none}:host([desktop]) .ui5-nli-focusable:focus:not(.ui5-nli-group-root):after,.ui5-nli-focusable:focus-visible:not(.ui5-nli-group-root):after{content:"";border:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);position:absolute;inset:0;pointer-events:none}.ui5-state-icon{min-width:1rem;min-height:1rem;padding-inline-end:var(--_ui5-v2-10-0-rc-2-notification_item-state-icon-padding)}:host(:not([wrapping-type="Normal"])) .ui5-nli-title-text{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}:host(:not([wrapping-type="Normal"])) .ui5-nli-description{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}:host([_show-more-pressed]) .ui5-nli-title-text{-webkit-line-clamp:unset}:host([_show-more-pressed]) .ui5-nli-description{-webkit-line-clamp:unset}:host([read]) .ui5-nli-title-text{font-weight:400}:host(:first-of-type){border-top-left-radius:var(--_ui5-v2-10-0-rc-2-notification_item-border-radius);border-top-right-radius:var(--_ui5-v2-10-0-rc-2-notification_item-border-radius)}:host(:last-of-type){border-bottom-left-radius:var(--_ui5-v2-10-0-rc-2-notification_item-border-radius);border-bottom-right-radius:var(--_ui5-v2-10-0-rc-2-notification_item-border-radius)}:host(:first-of-type) .ui5-nli-focusable:after{border-top-left-radius:var(--_ui5-v2-10-0-rc-2-notification_item-border-radius);border-top-right-radius:var(--_ui5-v2-10-0-rc-2-notification_item-border-radius)}:host(:last-of-type) .ui5-nli-focusable:after{border-bottom-left-radius:var(--_ui5-v2-10-0-rc-2-notification_item-border-radius);border-bottom-right-radius:var(--_ui5-v2-10-0-rc-2-notification_item-border-radius)}:host([has-border]){border-bottom:var(--_ui5-v2-10-0-rc-2-notification_item-border-bottom)}:host([ui5-li-notification]){margin:var(--_ui5-v2-10-0-rc-2-notification_item-margin);border-left:var(--_ui5-v2-10-0-rc-2-notification_item-border-top-left-right);border-right:var(--_ui5-v2-10-0-rc-2-notification_item-border-top-left-right);border-top:var(--_ui5-v2-10-0-rc-2-notification_item-border-top-left-right);border-radius:var(--_ui5-v2-10-0-rc-2-notification_item-border-radius);list-style:none}.ui5-nli-root{position:relative;width:100%;box-sizing:border-box;cursor:pointer;border-radius:var(--_ui5-v2-10-0-rc-2-notification_item-border-radius);border:1px solid transparent}.ui5-nli-root:hover{background-color:var(--_ui5-v2-10-0-rc-2-notification_item-background-color-hover);border-radius:var(--_ui5-v2-10-0-rc-2-notification_item-border-radius)}:host([desktop]) .ui5-nli-root:focus:active,.ui5-nli-root:focus-visible:active{background-color:var(--_ui5-v2-10-0-rc-2-notification_item-background-color-active);border-radius:var(--_ui5-v2-10-0-rc-2-notification_item-border-radius);border:var(--_ui5-v2-10-0-rc-2-notification_item-border-active)}.ui5-nli-content-wrapper{width:100%;display:flex;flex-direction:row-reverse;padding-inline:var(--_ui5-v2-10-0-rc-2-notification_item-root-padding-inline);padding-block:1rem;position:relative;box-sizing:border-box}.ui5-nli-content{display:flex;flex-direction:column;flex:1;min-width:0;width:100%;padding-inline:var(--_ui5-v2-10-0-rc-2-notification_item-content-padding);font-family:"72override",var(--sapFontFamily);box-sizing:border-box}.ui5-nli-content.ui5-nli-content-with-importance{margin-bottom:2rem}.ui5-nli-actions{position:absolute;top:.5rem;right:.5rem}:dir(rtl) .ui5-nli-actions{left:.5rem;right:auto}.ui5-nli-title-text-wrapper{display:flex;flex-direction:row}.ui5-nli-title-text{display:flex;margin-bottom:var(--_ui5-v2-10-0-rc-2-notification_item-title-margin-bottom);box-sizing:border-box;color:var(--sapGroup_TitleTextColor);font-weight:700;font-size:var(--sapFontHeader6Size)}.ui5-nli-two-buttons .ui5-nli-title-text{padding-inline-end:var(--_ui5-v2-10-0-rc-2-notification_item-title-padding-end-two-buttons)}.ui5-nli-one-button .ui5-nli-title-text{padding-inline-end:var(--_ui5-v2-10-0-rc-2-notification_item-title-padding-end-one-button)}.ui5-nli-description{display:flex;margin-top:var(--_ui5-v2-10-0-rc-2-notification_item-description-margin-top);color:var(--sapTextColor);font-size:var(--sapFontSize);box-sizing:border-box}.ui5-nli-footer{display:flex;color:var(--sapContent_LabelColor);font-size:var(--sapFontSize);margin-top:var(--_ui5-v2-10-0-rc-2-notification_item-footer-margin-top);box-sizing:border-box;align-items:center}.ui5-nli-footer-divider{position:relative;align-items:center;margin-inline:.5rem}.ui5-nli-footnotes{display:flex;min-width:0}.ui5-nli-footer-showMore{margin-inline-start:1rem}.ui5-nli-importance{width:fit-content;position:absolute;bottom:1rem}::slotted([slot^="footnotes"]){color:var(--sapContent_LabelColor);font-size:var(--sapFontSize);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.ui5-nli-menu-btn{margin-inline-end:.125rem}:host([desktop]) .ui5-nli-focusable:not(.ui5-nli-group-root):focus:after,.ui5-nli-focusable:not(.ui5-nli-group-root):focus-visible:after{border-radius:var(--_ui5-v2-10-0-rc-2-notification_item-border-radius);top:var(--_ui5-v2-10-0-rc-2-notification_item-focus-offset);right:var(--_ui5-v2-10-0-rc-2-notification_item-focus-offset);bottom:var(--_ui5-v2-10-0-rc-2-notification_item-focus-offset);left:var(--_ui5-v2-10-0-rc-2-notification_item-focus-offset)}[ui5-busy-indicator]{width:100%;border-radius:var(--_ui5-v2-10-0-rc-2-notification_item-border-radius)}
`;

	/**
	 * Different Icon semantic designs.
	 * @public
	 */
	var IconDesign;
	(function (IconDesign) {
	    /**
	     * Contrast design
	     * @public
	     */
	    IconDesign["Contrast"] = "Contrast";
	    /**
	     * Critical design
	     * @public
	     */
	    IconDesign["Critical"] = "Critical";
	    /**
	     * Default design (brand design)
	     * @public
	    */
	    IconDesign["Default"] = "Default";
	    /**
	     * info type
	     * @public
	     */
	    IconDesign["Information"] = "Information";
	    /**
	     * Negative design
	     * @public
	     */
	    IconDesign["Negative"] = "Negative";
	    /**
	     * Neutral design
	     * @public
	     */
	    IconDesign["Neutral"] = "Neutral";
	    /**
	     * Design that indicates an icon which isn't interactive
	     * @public
	     */
	    IconDesign["NonInteractive"] = "NonInteractive";
	    /**
	     * Positive design
	     * @public
	     */
	    IconDesign["Positive"] = "Positive";
	})(IconDesign || (IconDesign = {}));
	var IconDesign$1 = IconDesign;

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var NotificationListItem_1;
	/**
	 * Defines the icons name corresponding to the notification's status indicator.
	 */
	const ICON_PER_STATUS_NAME = {
	    [information.o.Negative]: iconError,
	    [information.o.Critical]: iconAlert,
	    [information.o.Positive]: Tag.selectedAccount,
	    [information.o.Information]: iconInformation,
	    [information.o.None]: "",
	};
	/**
	 * Defines the icons design (color) corresponding to the notification's status indicator.
	 */
	const ICON_PER_STATUS_DESIGN = {
	    [information.o.Negative]: IconDesign$1.Negative,
	    [information.o.Critical]: IconDesign$1.Critical,
	    [information.o.Positive]: IconDesign$1.Positive,
	    [information.o.Information]: IconDesign$1.Information,
	    [information.o.None]: undefined,
	};
	/**
	 * @class
	 *
	 * ### Overview
	 * The `ui5-li-notification` is a type of list item, meant to display notifications.
	 *
	 * The component has a rich set of various properties that allows the user to set `avatar`, `menu`, `titleText`, descriptive `content`
	 * and `footnotes` to fully describe a notification.
	 *
	 * The user can:
	 *
	 * - display a `Close` button
	 * - can control whether the `titleText` and `description` should wrap or truncate
	 * and display a `ShowMore` button to switch between less and more information
	 * - add actions by using the `ui5-menu` component
	 *
	 * **Note:** Adding custom actions by using the `ui5-notification-action` component is deprecated as of version 2.0!
	 *
	 * ### Usage
	 * The component should be used inside a `ui5-notification-list`.
	 *
	 * ### Keyboard Handling
	 *
	 * #### Basic Navigation
	 * The user can use the following keyboard shortcuts to perform actions (such as select, delete):
	 *
	 * - [Enter] - select an item (trigger "item-click" event)
	 * - [Delete] - close an item (trigger "item-close" event)
	 *
	 * #### Fast Navigation
	 * This component provides a fast navigation using the following keyboard shortcuts:
	 *
	 * - [Shift] + [Enter] - 'More'/'Less' link will be triggered
	 * - [Shift] + [F10] - 'Menu' (Actions) button will be triggered (clicked)
	 *
	 * ### ES6 Module Import
	 *
	 * `import "@ui5/webcomponents-fiori/dist/NotificationListItem.js";`
	 *
	 * @constructor
	 * @extends NotificationListItemBase
	 * @since 1.0.0-rc.8
	 * @public
	 * @csspart title-text - Used to style the titleText of the notification list item
	 */
	let NotificationListItem = NotificationListItem_1 = class NotificationListItem extends NotificationListItemBase.NotificationListItemBase {
	    constructor() {
	        super();
	        /**
	        * Defines if the `titleText` and `description` should wrap,
	        * they truncate by default.
	        *
	        * **Note:** by default the `titleText` and `description`,
	        * and a `ShowMore/Less` button would be displayed.
	        * @default "None"
	        * @public
	        * @since 1.0.0-rc.15
	        */
	        this.wrappingType = "None";
	        /**
	         * Defines the status indicator of the item.
	         * @default "None"
	         * @public
	         */
	        this.state = "None";
	        /**
	         * Defines if the `Close` button would be displayed.
	         * @default false
	         * @public
	         */
	        this.showClose = false;
	        /**
	         * Defines the `Important` label of the item.
	         * @default "Standard"
	         * @public
	         */
	        this.importance = "Standard";
	        /**
	        * Defines the state of the `titleText` and `description`,
	        * if less or more information is displayed.
	        * @private
	        */
	        this._showMorePressed = false;
	        /**
	        * Defines the visibility of the `showMore` button.
	        * @private
	        */
	        this._showMore = false;
	        // the titleText overflow height
	        this._titleTextOverflowHeight = 0;
	        // the description overflow height
	        this._descOverflowHeight = 0;
	        // the resize handler
	        this._onResizeBound = this.onResize.bind(this);
	    }
	    onEnterDOM() {
	        super.onEnterDOM();
	        webcomponentsBase.f.register(this, this._onResizeBound);
	    }
	    onExitDOM() {
	        webcomponentsBase.f.deregister(this, this._onResizeBound);
	    }
	    get hasState() {
	        return this.state !== information.o.None;
	    }
	    get hasDesc() {
	        return Button.t(this.description);
	    }
	    get hasImportance() {
	        return this.importance !== NotificationListItemImportance$1.Standard;
	    }
	    get hasFootNotes() {
	        return !!this.footnotes.length;
	    }
	    get showMoreText() {
	        if (this._showMorePressed) {
	            return NotificationListItem_1.i18nFioriBundle.getText(i18nDefaults$1.NOTIFICATION_LIST_ITEM_SHOW_LESS);
	        }
	        return NotificationListItem_1.i18nFioriBundle.getText(i18nDefaults$1.NOTIFICATION_LIST_ITEM_SHOW_MORE);
	    }
	    get menuBtnAccessibleName() {
	        return NotificationListItem_1.i18nFioriBundle.getText(i18nDefaults$1.NOTIFICATION_LIST_ITEM_MENU_BTN_TITLE);
	    }
	    get moreLinkAccessibleName() {
	        return this._showMorePressed ? NotificationListItem_1.i18nFioriBundle.getText(i18nDefaults$1.NOTIFICATION_LIST_ITEM_MORE_LINK_LABEL_TRUNCATE) : NotificationListItem_1.i18nFioriBundle.getText(i18nDefaults$1.NOTIFICATION_LIST_ITEM_MORE_LINK_LABEL_FULL);
	    }
	    get closeBtnAccessibleName() {
	        return NotificationListItem_1.i18nFioriBundle.getText(i18nDefaults$1.NOTIFICATION_LIST_ITEM_CLOSE_BTN_TITLE);
	    }
	    get hideShowMore() {
	        if (this.wrappingType === overflow.WrappingType.None && this._showMore) {
	            return undefined;
	        }
	        return true;
	    }
	    get titleTextHeight() {
	        return this.titleTextDOM.offsetHeight;
	    }
	    get descriptionHeight() {
	        return this.descriptionDOM.offsetHeight;
	    }
	    get titleTextOverflows() {
	        const titleText = this.titleTextDOM;
	        if (!titleText) {
	            return false;
	        }
	        return titleText.offsetHeight < titleText.scrollHeight;
	    }
	    get descriptionOverflows() {
	        const description = this.descriptionDOM;
	        if (!description) {
	            return false;
	        }
	        return description.offsetHeight < description.scrollHeight;
	    }
	    get footerItems() {
	        return this.footnotes.map((el, idx, arr) => {
	            return {
	                slotName: el._individualSlot,
	                showDivider: idx !== arr.length - 1,
	            };
	        });
	    }
	    get ariaLabelledBy() {
	        const id = this._id;
	        if (this.loading) {
	            return `${id}-loading`;
	        }
	        const ids = [];
	        if (this.hasImportance) {
	            ids.push(`${id}-importance`);
	        }
	        if (this.hasTitleText) {
	            ids.push(`${id}-title-text`);
	        }
	        ids.push(`${id}-read`);
	        if (this.hasDesc) {
	            ids.push(`${id}-description`);
	        }
	        if (this.hasFootNotes) {
	            ids.push(`${id}-footnotes`);
	        }
	        return ids.join(" ");
	    }
	    get itemClasses() {
	        const classes = ["ui5-nli-root", "ui5-nli-focusable"];
	        if (this.getMenu() && this.showClose) {
	            classes.push("ui5-nli-two-buttons");
	        }
	        else if (this.getMenu() || this.showClose) {
	            classes.push("ui5-nli-one-button");
	        }
	        return classes.join(" ");
	    }
	    get statusIconName() {
	        return ICON_PER_STATUS_NAME[this.state];
	    }
	    get statusIconDesign() {
	        return ICON_PER_STATUS_DESIGN[this.state];
	    }
	    get importanceText() {
	        let text;
	        if (this.hasImportance) {
	            text = NotificationListItem_1.i18nFioriBundle.getText(i18nDefaults$1.NOTIFICATION_LIST_ITEM_IMPORTANT_TXT);
	        }
	        else {
	            text = "";
	        }
	        return text;
	    }
	    get stateText() {
	        if (this.state === information.o.Positive) {
	            return NotificationListItem_1.i18nFioriBundle.getText(i18nDefaults$1.NOTIFICATION_LIST_ITEM_POSITIVE_STATUS_TXT);
	        }
	        if (this.state === information.o.Critical) {
	            return NotificationListItem_1.i18nFioriBundle.getText(i18nDefaults$1.NOTIFICATION_LIST_ITEM_CRITICAL_STATUS_TXT);
	        }
	        if (this.state === information.o.Negative) {
	            return NotificationListItem_1.i18nFioriBundle.getText(i18nDefaults$1.NOTIFICATION_LIST_ITEM_NEGATIVE_STATUS_TXT);
	        }
	        if (this.state === information.o.Information) {
	            return NotificationListItem_1.i18nFioriBundle.getText(i18nDefaults$1.NOTIFICATION_LIST_ITEM_INFORMATION_STATUS_TXT);
	        }
	        return "";
	    }
	    get readText() {
	        return this.read ? NotificationListItem_1.i18nFioriBundle.getText(i18nDefaults$1.NOTIFICATION_LIST_ITEM_READ) : NotificationListItem_1.i18nFioriBundle.getText(i18nDefaults$1.NOTIFICATION_LIST_ITEM_UNREAD);
	    }
	    get menuButtonAccessibilityAttributes() {
	        return {
	            hasPopup: "menu",
	        };
	    }
	    get moreLinkAccessibilityAttributes() {
	        return {
	            expanded: this._showMorePressed,
	        };
	    }
	    get showMenu() {
	        return !!this.getMenu();
	    }
	    /**
	     * Event handlers
	     */
	    _onclick() {
	        this.fireItemPress();
	    }
	    _onShowMoreClick(e) {
	        e.preventDefault();
	        this._toggleShowMorePressed();
	    }
	    async _onkeydown(e) {
	        await super._onkeydown(e);
	        if (webcomponentsBase.ro(e)) {
	            e.preventDefault();
	        }
	    }
	    _onkeyup(e) {
	        super._onkeyup(e);
	        const space = webcomponentsBase.i(e);
	        if (space && this.getFocusDomRef().matches(":has(:focus-within)")) {
	            e.preventDefault();
	            this._toggleShowMorePressed();
	            return;
	        }
	        if (webcomponentsBase.V(e)) {
	            this.fireDecoratorEvent("close", { item: this });
	        }
	        if (webcomponentsBase.ro(e)) {
	            this._onBtnMenuClick();
	        }
	        if (webcomponentsBase.d$1(e)) {
	            this._toggleShowMorePressed();
	        }
	    }
	    _onBtnCloseClick() {
	        this.fireDecoratorEvent("close", { item: this });
	    }
	    _onBtnMenuClick() {
	        if (this.getMenu()) {
	            this.openMenu();
	        }
	    }
	    _toggleShowMorePressed() {
	        this._showMorePressed = !this._showMorePressed;
	    }
	    openMenu() {
	        const menu = this.getMenu();
	        menu.opener = this.menuButtonDOM;
	        menu.open = true;
	    }
	    getMenu() {
	        const menu = this.querySelector("[ui5-menu]");
	        return menu;
	    }
	    /**
	     * Private
	     */
	    fireItemPress() {
	        if (this.getFocusDomRef().matches(":has(:focus-within)")) {
	            return;
	        }
	        // NotificationListItem will never be assigned to a variable of type ListItemBase
	        // typescipt complains here, if that is the case, the parameter to the _press event handler could be a ListItemBase item,
	        // but this is never the case, all components are used by their class and never assigned to a variable with a type of ListItemBase
	        this.fireDecoratorEvent("_press", { item: this });
	    }
	    onResize() {
	        if (this.wrappingType === overflow.WrappingType.Normal) {
	            this._showMore = false;
	            return;
	        }
	        const titleTextWouldOverflow = this.titleTextHeight > this._titleTextOverflowHeight;
	        const descWouldOverflow = this.hasDesc && this.descriptionHeight > this._descOverflowHeight;
	        const overflows = titleTextWouldOverflow || descWouldOverflow;
	        if (this._showMorePressed && overflows) {
	            this._showMore = true;
	            return;
	        }
	        if (this.titleTextOverflows || this.descriptionOverflows) {
	            this._titleTextOverflowHeight = this.titleTextHeight;
	            this._descOverflowHeight = this.hasDesc ? this.descriptionHeight : 0;
	            this._showMore = true;
	            return;
	        }
	        this._showMore = false;
	    }
	};
	__decorate([
	    webcomponentsBase.s()
	], NotificationListItem.prototype, "wrappingType", void 0);
	__decorate([
	    webcomponentsBase.s()
	], NotificationListItem.prototype, "state", void 0);
	__decorate([
	    webcomponentsBase.s({ type: Boolean })
	], NotificationListItem.prototype, "showClose", void 0);
	__decorate([
	    webcomponentsBase.s()
	], NotificationListItem.prototype, "importance", void 0);
	__decorate([
	    webcomponentsBase.s({ type: Boolean })
	], NotificationListItem.prototype, "_showMorePressed", void 0);
	__decorate([
	    webcomponentsBase.s({ type: Boolean })
	], NotificationListItem.prototype, "_showMore", void 0);
	__decorate([
	    webcomponentsBase.d()
	], NotificationListItem.prototype, "avatar", void 0);
	__decorate([
	    webcomponentsBase.d()
	], NotificationListItem.prototype, "menu", void 0);
	__decorate([
	    webcomponentsBase.d({ type: HTMLElement, individualSlots: true })
	], NotificationListItem.prototype, "footnotes", void 0);
	__decorate([
	    webcomponentsBase.d({ type: Node, "default": true })
	], NotificationListItem.prototype, "description", void 0);
	__decorate([
	    Tag.o(".ui5-nli-title-text")
	], NotificationListItem.prototype, "titleTextDOM", void 0);
	__decorate([
	    Tag.o(".ui5-nli-menu-btn")
	], NotificationListItem.prototype, "menuButtonDOM", void 0);
	__decorate([
	    Tag.o(".ui5-nli-description")
	], NotificationListItem.prototype, "descriptionDOM", void 0);
	NotificationListItem = NotificationListItem_1 = __decorate([
	    webcomponentsBase.m({
	        tag: "ui5-li-notification",
	        languageAware: true,
	        styles: [
	            NotificationListItemCss,
	        ],
	        renderer: i18nDefaults.d,
	        template: NotificationListItemTemplate,
	    }),
	    eventStrict.l("_press", {
	        bubbles: true,
	    })
	    /**
	     * Fired when the `Close` button is pressed.
	     * @param {HTMLElement} item the closed item.
	     * @public
	     */
	    ,
	    eventStrict.l("close", {
	        bubbles: true,
	    })
	], NotificationListItem);
	NotificationListItem.define();
	var NotificationListItem$1 = NotificationListItem;

	return NotificationListItem$1;

}));
