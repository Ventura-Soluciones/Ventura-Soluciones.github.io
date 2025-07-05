sap.ui.define(['exports', 'sap/ushell/thirdparty/webcomponents-base', 'sap/ushell/thirdparty/i18n-defaults', 'sap/ushell/thirdparty/BusyIndicator', 'sap/ushell/thirdparty/event-strict', 'sap/ushell/thirdparty/Icons', 'sap/ushell/thirdparty/information', 'sap/ushell/thirdparty/List', 'sap/ushell/thirdparty/toLowercaseEnumValue', 'sap/ushell/thirdparty/Icon', 'sap/ushell/thirdparty/Button2', 'sap/ushell/thirdparty/Label'], (function (exports, webcomponentsBase, i18nDefaults, BusyIndicator, eventStrict, Icons, information, List, toLowercaseEnumValue, Icon, Button, Label) { 'use strict';

	const name$d = "slim-arrow-right";
	const pathData$d = "M357.5 233q10 10 10 23t-10 23l-165 165q-12 11-23 0t0-23l160-159q6-6 0-12l-159-159q-5-5-5-11t5-11 11-5 11 5z";
	const ltr$d = false;
	const collection$d = "SAP-icons-v4";
	const packageName$d = "@ui5/webcomponents-icons";

	Icons.f(name$d, { pathData: pathData$d, ltr: ltr$d, collection: collection$d, packageName: packageName$d });

	const name$c = "slim-arrow-right";
	const pathData$c = "M186 416q-11 0-18.5-7.5T160 390q0-10 8-18l121-116-121-116q-8-8-8-18 0-11 7.5-18.5T186 96q10 0 17 7l141 134q8 8 8 19 0 12-8 18L203 409q-7 7-17 7z";
	const ltr$c = false;
	const collection$c = "SAP-icons-v5";
	const packageName$c = "@ui5/webcomponents-icons";

	Icons.f(name$c, { pathData: pathData$c, ltr: ltr$c, collection: collection$c, packageName: packageName$c });

	var slimArrowRight = "slim-arrow-right";

	const e={toAttribute(t){return t instanceof HTMLElement?null:t},fromAttribute(t){return t}};

	const name$b = "edit";
	const pathData$b = "M475 104q5 7 5 12 0 6-5 11L150 453q-4 4-8 4L32 480l22-110q0-5 4-9L384 36q4-4 11-4t11 4zm-121 99l-46-45L84 381l46 46zm87-88l-46-44-64 64 45 45z";
	const ltr$b = false;
	const collection$b = "SAP-icons-v4";
	const packageName$b = "@ui5/webcomponents-icons";

	Icons.f(name$b, { pathData: pathData$b, ltr: ltr$b, collection: collection$b, packageName: packageName$b });

	const name$a = "edit";
	const pathData$a = "M505 94q7 7 7 18t-6 17L130 505q-7 7-18 7H26q-11 0-18.5-7.5T0 486v-86q1-10 6-16L382 7q7-7 18-7t18 7zm-55 18l-50-50-50 50 50 50zm-86 86l-50-50L62 400l50 50z";
	const ltr$a = false;
	const collection$a = "SAP-icons-v5";
	const packageName$a = "@ui5/webcomponents-icons";

	Icons.f(name$a, { pathData: pathData$a, ltr: ltr$a, collection: collection$a, packageName: packageName$a });

	var edit = "edit";

	/**
	 * Different types of Highlight .
	 *
	 * @public
	 */
	var Highlight;
	(function (Highlight) {
	    /**
	     * @public
	     */
	    Highlight["None"] = "None";
	    /**
	     * @public
	     */
	    Highlight["Positive"] = "Positive";
	    /**
	     * @public
	     */
	    Highlight["Critical"] = "Critical";
	    /**
	     * @public
	     */
	    Highlight["Negative"] = "Negative";
	    /**
	     * @public
	     */
	    Highlight["Information"] = "Information";
	})(Highlight || (Highlight = {}));
	var Highlight$1 = Highlight;

	/**
	 * Different list item types.
	 * @public
	 */
	var ListItemType;
	(function (ListItemType) {
	    /**
	     * Indicates the list item does not have any active feedback when item is pressed.
	     * @public
	     */
	    ListItemType["Inactive"] = "Inactive";
	    /**
	     * Indicates that the item is clickable via active feedback when item is pressed.
	     * @public
	     */
	    ListItemType["Active"] = "Active";
	    /**
	     * Enables detail button of the list item that fires detail-click event.
	     * @public
	     */
	    ListItemType["Detail"] = "Detail";
	    /**
	     * Enables the type of navigation, which is specified to add an arrow at the end of the items and fires navigate-click event.
	     * @public
	     */
	    ListItemType["Navigation"] = "Navigation";
	})(ListItemType || (ListItemType = {}));
	var ListItemType$1 = ListItemType;

	Icons.p("@ui5/webcomponents-theming", "sap_horizon", async () => i18nDefaults.defaultThemeBase);
	Icons.p("@ui5/webcomponents", "sap_horizon", async () => i18nDefaults.defaultTheme);
	var styles = `.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}:host([navigated]) .ui5-li-root .ui5-li-navigated{width:.1875rem;position:absolute;right:0;top:0;bottom:0;background-color:var(--sapList_SelectionBorderColor)}:host([active][actionable]) .ui5-li-root .ui5-li-icon{color:var(--sapList_Active_TextColor)}:host([active][actionable]) .ui5-li-title,:host([active][actionable]) .ui5-li-desc,:host([active][actionable]) .ui5-li-additional-text{color:var(--sapList_Active_TextColor)}:host([active][actionable]) .ui5-li-additional-text{text-shadow:none}:host([additional-text-state="Critical"]) .ui5-li-additional-text{color:var(--sapCriticalTextColor)}:host([additional-text-state="Positive"]) .ui5-li-additional-text{color:var(--sapPositiveTextColor)}:host([additional-text-state="Negative"]) .ui5-li-additional-text{color:var(--sapNegativeTextColor)}:host([additional-text-state="Information"]) .ui5-li-additional-text{color:var(--sapInformativeTextColor)}:host([has-title][description]){height:5rem}:host([has-title][image]){height:5rem}:host([_has-image]){height:5rem}:host([image]) .ui5-li-content{height:3rem}::slotted(img[slot="image"]){width:var(--_ui5-v2-10-0-rc-2_list_item_img_size);height:var(--_ui5-v2-10-0-rc-2_list_item_img_size);border-radius:var(--ui5-v2-10-0-rc-2-avatar-border-radius);object-fit:contain}::slotted([ui5-icon][slot="image"]){color:var(--sapContent_NonInteractiveIconColor);min-width:var(--_ui5-v2-10-0-rc-2_list_item_icon_size);min-height:var(--_ui5-v2-10-0-rc-2_list_item_icon_size);padding-inline-end:var(--_ui5-v2-10-0-rc-2_list_item_icon_padding-inline-end)}::slotted([ui5-avatar][slot="image"]){min-width:var(--_ui5-v2-10-0-rc-2_list_item_img_size);min-height:var(--_ui5-v2-10-0-rc-2_list_item_img_size);margin-top:var(--_ui5-v2-10-0-rc-2_list_item_img_top_margin);margin-bottom:var(--_ui5-v2-10-0-rc-2_list_item_img_bottom_margin);margin-inline-end:var(--_ui5-v2-10-0-rc-2_list_item_img_hn_margin)}:host([wrapping-type="None"][description]) .ui5-li-root{padding:1rem}:host([description]) .ui5-li-content{height:3rem}:host([has-title][description]) .ui5-li-title{padding-bottom:.375rem}.ui5-li-text-wrapper{flex-direction:column}:host([description]) .ui5-li-text-wrapper{height:100%;justify-content:space-between;padding:.125rem 0}.ui5-li-description-info-wrapper{display:flex;justify-content:space-between}.ui5-li-additional-text,:host(:not([wrapping-type="Normal"])) .ui5-li-title,.ui5-li-desc{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}:host([wrapping-type="Normal"]){height:auto}:host([wrapping-type="Normal"]) .ui5-li-content{margin:var(--_ui5-v2-10-0-rc-2_list_item_content_vertical_offset) 0}.ui5-li-desc{color:var(--sapContent_LabelColor);font-size:var(--sapFontSize)}:host([description]) .ui5-li-additional-text{align-self:flex-end}.ui5-li-icon{min-width:var(--_ui5-v2-10-0-rc-2_list_item_icon_size);min-height:var(--_ui5-v2-10-0-rc-2_list_item_icon_size);color:var(--sapContent_NonInteractiveIconColor);padding-inline-end:var(--_ui5-v2-10-0-rc-2_list_item_icon_padding-inline-end)}:host([icon-end]) .ui5-li-icon{padding-inline-start:var(--_ui5-v2-10-0-rc-2_list_item_icon_padding-inline-end)}.ui5-li-detailbtn,.ui5-li-deletebtn{display:flex;align-items:center;margin-left:var(--_ui5-v2-10-0-rc-2_list_buttons_left_space)}.ui5-li-multisel-cb,.ui5-li-singlesel-radiobtn{flex-shrink:0}:host([description]) .ui5-li-singlesel-radiobtn{align-self:flex-start;margin-top:var(--_ui5-v2-10-0-rc-2_list_item_selection_btn_margin_top)}:host([description]) .ui5-li-multisel-cb{align-self:flex-start;margin-top:var(--_ui5-v2-10-0-rc-2_list_item_selection_btn_margin_top)}:host([ui5-li][_selection-mode="SingleStart"]) .ui5-li-root{padding-inline:0 1rem}:host([ui5-li][_selection-mode="Multiple"]) .ui5-li-root{padding-inline:0 1rem}:host([ui5-li][_selection-mode="SingleEnd"]) .ui5-li-root{padding-inline:1rem 0}:host [ui5-checkbox].ui5-li-singlesel-radiobtn{margin-right:var(--_ui5-v2-10-0-rc-2_list_item_cb_margin_right)}.ui5-li-highlight{position:absolute;width:.375rem;bottom:0;left:0;top:0;border-inline-end:.0625rem solid var(--ui5-v2-10-0-rc-2-listitem-background-color);box-sizing:border-box}:host([highlight="Negative"]) .ui5-li-highlight{background:var(--sapNegativeTextColor)}:host([highlight="Critical"]) .ui5-li-highlight{background:var(--sapCriticalTextColor)}:host([highlight="Positive"]) .ui5-li-highlight{background:var(--sapPositiveTextColor)}:host([highlight="Information"]) .ui5-li-highlight{background:var(--sapInformativeTextColor)}:host([wrapping-type="Normal"][description]),:host([wrapping-type="Normal"][has-title][description]),:host([wrapping-type="Normal"][has-title][image]){height:auto;min-height:5rem}:host([wrapping-type="Normal"][description]) .ui5-li-content,:host([wrapping-type="Normal"][image]) .ui5-li-content{height:auto;min-height:3rem}:host([wrapping-type="Normal"][has-title][description]) .ui5-li-title{padding-bottom:.75rem}:host([wrapping-type="Normal"][additional-text]) .ui5-li-additional-text{padding-inline-start:.75rem}:host([wrapping-type="Normal"]) .ui5-li-description-info-wrapper{flex-direction:column}:host([wrapping-type="Normal"]) .ui5-li-description-info-wrapper .ui5-li-additional-text{white-space:normal}:host([wrapping-type="Normal"]) .ui5-li-multisel-cb,:host([wrapping-type="Normal"]) .ui5-li-singlesel-radiobtn{display:flex;align-self:flex-start}:host([wrapping-type="Normal"][description]) .ui5-li-multisel-cb,:host([wrapping-type="Normal"][description]) .ui5-li-singlesel-radiobtn{margin-top:0}:host([wrapping-type="Normal"]) .ui5-li-icon,:host([wrapping-type="Normal"]) .ui5-li-image{display:flex;align-self:flex-start}:host([wrapping-type="Normal"][icon-end]) .ui5-li-icon{margin-top:var(--_ui5-v2-10-0-rc-2_list_item_content_vertical_offset)}:host([wrapping-type="Normal"]) ::slotted([ui5-avatar][slot="image"]){margin-top:0;margin-bottom:0}:host([wrapping-type="Normal"]) .ui5-li-detailbtn,:host([wrapping-type="Normal"]) .ui5-li-deletebtn{margin-inline-start:.875rem}
`;

	Icons.p("@ui5/webcomponents-theming", "sap_horizon", async () => i18nDefaults.defaultThemeBase);
	Icons.p("@ui5/webcomponents", "sap_horizon", async () => i18nDefaults.defaultTheme);
	var listItemAdditionalTextCss = `.ui5-li-additional-text{margin:0 .25rem;color:var(--sapNeutralTextColor);font-size:var(--sapFontSize);min-width:3.75rem;text-align:end;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
`;

	var __decorate$7 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var ListItem_1;
	/**
	 * @class
	 * A class to serve as a base
	 * for the `ListItemStandard` and `ListItemCustom` classes.
	 * @constructor
	 * @abstract
	 * @extends ListItemBase
	 * @public
	 */
	let ListItem = ListItem_1 = class ListItem extends BusyIndicator.ListItemBase {
	    constructor() {
	        super();
	        /**
	         * Defines the visual indication and behavior of the list items.
	         * Available options are `Active` (by default), `Inactive`, `Detail` and `Navigation`.
	         *
	         * **Note:** When set to `Active` or `Navigation`, the item will provide visual response upon press and hover,
	         * while with type `Inactive` and `Detail` - will not.
	         * @default "Active"
	         * @public
	        */
	        this.type = "Active";
	        /**
	         * Defines the additional accessibility attributes that will be applied to the component.
	         * The following fields are supported:
	         *
	         * - **ariaSetsize**: Defines the number of items in the current set  when not all items in the set are present in the DOM.
	         * **Note:** The value is an integer reflecting the number of items in the complete set. If the size of the entire set is unknown, set `-1`.
	         *
	         * 	- **ariaPosinset**: Defines an element's number or position in the current set when not all items are present in the DOM.
	         * 	**Note:** The value is an integer greater than or equal to 1, and less than or equal to the size of the set when that size is known.
	         *
	         * @default {}
	         * @public
	         * @since 1.15.0
	         */
	        this.accessibilityAttributes = {};
	        /**
	         * The navigated state of the list item.
	         * If set to `true`, a navigation indicator is displayed at the end of the list item.
	         * @default false
	         * @public
	         * @since 1.10.0
	         */
	        this.navigated = false;
	        /**
	         * Indicates if the list item is active, e.g pressed down with the mouse or the keyboard keys.
	         * @private
	        */
	        this.active = false;
	        /**
	         * Defines the highlight state of the list items.
	         * Available options are: `"None"` (by default), `"Positive"`, `"Critical"`, `"Information"` and `"Negative"`.
	         * @default "None"
	         * @public
	         * @since 1.24
	         */
	        this.highlight = "None";
	        /**
	         * Used to define the role of the list item.
	         * @private
	         * @default "ListItem"
	         * @since 1.3.0
	         *
	         */
	        this.accessibleRole = "ListItem";
	        this._selectionMode = "None";
	        /**
	         * Defines the current media query size.
	         * @default "S"
	         * @private
	         */
	        this.mediaRange = "S";
	        this.deactivateByKey = (e) => {
	            if (webcomponentsBase.b$1(e)) {
	                this.deactivate();
	            }
	        };
	        this.deactivate = () => {
	            if (this.active) {
	                this.active = false;
	            }
	        };
	    }
	    onBeforeRendering() {
	        super.onBeforeRendering();
	        this.actionable = (this.type === ListItemType$1.Active || this.type === ListItemType$1.Navigation) && (this._selectionMode !== List.ListSelectionMode.Delete);
	    }
	    onEnterDOM() {
	        super.onEnterDOM();
	        document.addEventListener("mouseup", this.deactivate);
	        document.addEventListener("touchend", this.deactivate);
	        document.addEventListener("keyup", this.deactivateByKey);
	    }
	    onExitDOM() {
	        document.removeEventListener("mouseup", this.deactivate);
	        document.removeEventListener("keyup", this.deactivateByKey);
	        document.removeEventListener("touchend", this.deactivate);
	    }
	    async _onkeydown(e) {
	        if ((webcomponentsBase.i(e) || webcomponentsBase.b$1(e)) && this._isTargetSelfFocusDomRef(e)) {
	            return;
	        }
	        super._onkeydown(e);
	        const itemActive = this.type === ListItemType$1.Active, itemNavigated = this.typeNavigation;
	        if ((webcomponentsBase.i(e) || webcomponentsBase.b$1(e)) && (itemActive || itemNavigated)) {
	            this.activate();
	        }
	        if (webcomponentsBase.so(e)) {
	            const activeElement = webcomponentsBase.t();
	            const focusDomRef = this.getFocusDomRef();
	            if (activeElement === focusDomRef) {
	                const firstFocusable = await BusyIndicator.b(focusDomRef);
	                firstFocusable?.focus();
	            }
	            else {
	                focusDomRef.focus();
	            }
	        }
	    }
	    _onkeyup(e) {
	        super._onkeyup(e);
	        if (webcomponentsBase.i(e) || webcomponentsBase.b$1(e)) {
	            this.deactivate();
	        }
	        if (this.modeDelete && webcomponentsBase.V(e)) {
	            this.onDelete();
	        }
	    }
	    _onmousedown() {
	        this.activate();
	    }
	    _onmouseup() {
	        if (this.getFocusDomRef().matches(":has(:focus-within)")) {
	            return;
	        }
	        this.deactivate();
	    }
	    _ontouchend() {
	        this._onmouseup();
	    }
	    _onfocusin(e) {
	        super._onfocusin(e);
	        if (e.target !== this.getFocusDomRef()) {
	            this.deactivate();
	        }
	    }
	    _onfocusout(e) {
	        if (e.target !== this.getFocusDomRef()) {
	            return;
	        }
	        this.deactivate();
	    }
	    _ondragstart(e) {
	        if (!e.dataTransfer) {
	            return;
	        }
	        if (e.target === this._listItem) {
	            this.setAttribute("data-moving", "");
	            e.dataTransfer.dropEffect = "move";
	            e.dataTransfer.effectAllowed = "move";
	        }
	    }
	    _ondragend(e) {
	        if (e.target === this._listItem) {
	            this.removeAttribute("data-moving");
	        }
	    }
	    _isTargetSelfFocusDomRef(e) {
	        const target = e.target, focusDomRef = this.getFocusDomRef();
	        return target !== focusDomRef;
	    }
	    /**
	     * Called when selection components in Single (ui5-radio-button)
	     * and Multi (ui5-checkbox) selection modes are used.
	     */
	    onMultiSelectionComponentPress(e) {
	        if (this.isInactive) {
	            return;
	        }
	        this.fireDecoratorEvent("selection-requested", { item: this, selected: e.target.checked, selectionComponentPressed: true });
	    }
	    onSingleSelectionComponentPress(e) {
	        if (this.isInactive) {
	            return;
	        }
	        this.fireDecoratorEvent("selection-requested", { item: this, selected: !e.target.checked, selectionComponentPressed: true });
	    }
	    activate() {
	        if (this.type === ListItemType$1.Active || this.type === ListItemType$1.Navigation) {
	            this.active = true;
	        }
	    }
	    onDelete() {
	        this.fireDecoratorEvent("selection-requested", { item: this, selectionComponentPressed: false });
	    }
	    onDetailClick() {
	        this.fireDecoratorEvent("detail-click", { item: this, selected: this.selected });
	    }
	    fireItemPress(e) {
	        if (this.isInactive) {
	            return;
	        }
	        super.fireItemPress(e);
	        if (document.activeElement !== this) {
	            this.focus();
	        }
	    }
	    get isInactive() {
	        return this.type === ListItemType$1.Inactive || this.type === ListItemType$1.Detail;
	    }
	    get placeSelectionElementBefore() {
	        return this._selectionMode === List.ListSelectionMode.Multiple
	            || this._selectionMode === List.ListSelectionMode.SingleStart;
	    }
	    get placeSelectionElementAfter() {
	        return !this.placeSelectionElementBefore
	            && (this._selectionMode === List.ListSelectionMode.SingleEnd || this._selectionMode === List.ListSelectionMode.Delete);
	    }
	    get modeSingleSelect() {
	        return [
	            List.ListSelectionMode.SingleStart,
	            List.ListSelectionMode.SingleEnd,
	            List.ListSelectionMode.Single,
	        ].includes(this._selectionMode);
	    }
	    get modeMultiple() {
	        return this._selectionMode === List.ListSelectionMode.Multiple;
	    }
	    get modeDelete() {
	        return this._selectionMode === List.ListSelectionMode.Delete;
	    }
	    get typeDetail() {
	        return this.type === ListItemType$1.Detail;
	    }
	    get typeNavigation() {
	        return this.type === ListItemType$1.Navigation;
	    }
	    get typeActive() {
	        return this.type === ListItemType$1.Active;
	    }
	    get _ariaSelected() {
	        if (this.modeMultiple || this.modeSingleSelect) {
	            return this.selected;
	        }
	        return undefined;
	    }
	    get listItemAccessibleRole() {
	        return (this._forcedAccessibleRole || this.accessibleRole.toLowerCase());
	    }
	    get ariaSelectedText() {
	        let ariaSelectedText;
	        // Selected state needs to be supported separately since now the role mapping is list -> listitem[]
	        // to avoid the issue of nesting interactive elements, ex. (option -> radio/checkbox);
	        // The text is added to aria-describedby because as part of the aria-labelledby
	        // the whole content of the item is readout when the aria-labelledby value is changed.
	        if (this._ariaSelected !== undefined) {
	            ariaSelectedText = this._ariaSelected ? ListItem_1.i18nBundle.getText(i18nDefaults.LIST_ITEM_SELECTED) : ListItem_1.i18nBundle.getText(i18nDefaults.LIST_ITEM_NOT_SELECTED);
	        }
	        return ariaSelectedText;
	    }
	    get deleteText() {
	        return ListItem_1.i18nBundle.getText(i18nDefaults.DELETE);
	    }
	    get hasDeleteButtonSlot() {
	        return !!this.deleteButton.length;
	    }
	    get _accessibleNameRef() {
	        if (this.accessibleName) {
	            // accessibleName is set - return labels excluding content
	            return `${this._id}-invisibleText`;
	        }
	        // accessibleName is not set - return _accInfo.listItemAriaLabel including content
	        return `${this._id}-content ${this._id}-invisibleText`;
	    }
	    get ariaLabelledByText() {
	        const texts = [
	            this._accInfo.listItemAriaLabel,
	            this.accessibleName,
	            this.typeActive ? ListItem_1.i18nBundle.getText(i18nDefaults.LIST_ITEM_ACTIVE) : undefined,
	        ].filter(Boolean);
	        return texts.join(" ");
	    }
	    get _accInfo() {
	        return {
	            role: this.listItemAccessibleRole,
	            ariaExpanded: undefined,
	            ariaLevel: undefined,
	            ariaLabel: ListItem_1.i18nBundle.getText(i18nDefaults.ARIA_LABEL_LIST_ITEM_CHECKBOX),
	            ariaLabelRadioButton: ListItem_1.i18nBundle.getText(i18nDefaults.ARIA_LABEL_LIST_ITEM_RADIO_BUTTON),
	            ariaSelectedText: this.ariaSelectedText,
	            ariaHaspopup: this.accessibilityAttributes.hasPopup,
	            setsize: this.accessibilityAttributes.ariaSetsize,
	            posinset: this.accessibilityAttributes.ariaPosinset,
	            tooltip: this.tooltip,
	        };
	    }
	    get _hasHighlightColor() {
	        return this.highlight !== Highlight$1.None;
	    }
	    get hasConfigurableMode() {
	        return true;
	    }
	    get _listItem() {
	        return this.shadowRoot.querySelector("li");
	    }
	};
	__decorate$7([
	    webcomponentsBase.s()
	], ListItem.prototype, "type", void 0);
	__decorate$7([
	    webcomponentsBase.s({ type: Object })
	], ListItem.prototype, "accessibilityAttributes", void 0);
	__decorate$7([
	    webcomponentsBase.s({ type: Boolean })
	], ListItem.prototype, "navigated", void 0);
	__decorate$7([
	    webcomponentsBase.s()
	], ListItem.prototype, "tooltip", void 0);
	__decorate$7([
	    webcomponentsBase.s({ type: Boolean })
	], ListItem.prototype, "active", void 0);
	__decorate$7([
	    webcomponentsBase.s()
	], ListItem.prototype, "highlight", void 0);
	__decorate$7([
	    webcomponentsBase.s({ type: Boolean })
	], ListItem.prototype, "selected", void 0);
	__decorate$7([
	    webcomponentsBase.s()
	], ListItem.prototype, "accessibleRole", void 0);
	__decorate$7([
	    webcomponentsBase.s()
	], ListItem.prototype, "_forcedAccessibleRole", void 0);
	__decorate$7([
	    webcomponentsBase.s()
	], ListItem.prototype, "_selectionMode", void 0);
	__decorate$7([
	    webcomponentsBase.s()
	], ListItem.prototype, "mediaRange", void 0);
	__decorate$7([
	    webcomponentsBase.d()
	], ListItem.prototype, "deleteButton", void 0);
	__decorate$7([
	    i18nDefaults.i("@ui5/webcomponents")
	], ListItem, "i18nBundle", void 0);
	ListItem = ListItem_1 = __decorate$7([
	    webcomponentsBase.m({
	        languageAware: true,
	        renderer: i18nDefaults.d,
	        styles: [
	            BusyIndicator.ListItemBase.styles,
	            listItemAdditionalTextCss,
	            styles,
	        ],
	    })
	    /**
	     * Fired when the user clicks on the detail button when type is `Detail`.
	     * @public
	     */
	    ,
	    eventStrict.l("detail-click", {
	        bubbles: true,
	    }),
	    eventStrict.l("selection-requested", {
	        bubbles: true,
	    })
	], ListItem);
	var ListItem$1 = ListItem;

	function PopubBlockLayerTemplate() {
	    return (i18nDefaults.jsx("div", { class: "ui5-block-layer", onKeyDown: this._preventBlockLayerFocus, onMouseDown: this._preventBlockLayerFocus }));
	}

	function PopupTemplate(hooks) {
	    return (i18nDefaults.jsxs(i18nDefaults.Fragment, { children: [PopubBlockLayerTemplate.call(this), i18nDefaults.jsxs("section", { "root-element": true, style: this.styles.root, class: this.classes.root, role: this._role, "aria-modal": this._ariaModal, "aria-label": this._ariaLabel, "aria-labelledby": this._ariaLabelledBy, onKeyDown: this._onkeydown, onFocusOut: this._onfocusout, onMouseUp: this._onmouseup, onMouseDown: this._onmousedown, children: [i18nDefaults.jsx("span", { class: "first-fe", "data-ui5-focus-trap": true, role: "none", tabIndex: 0, onFocusIn: this.forwardToLast }), (hooks?.beforeContent || beforeContent$2).call(this), i18nDefaults.jsx("div", { style: this.styles.content, class: this.classes.content, onScroll: this._scroll, part: "content", children: i18nDefaults.jsx("slot", {}) }), (hooks?.afterContent || afterContent$2).call(this), i18nDefaults.jsx("span", { class: "last-fe", "data-ui5-focus-trap": true, role: "none", tabIndex: 0, onFocusIn: this.forwardToFirst })] })] }));
	}
	function beforeContent$2() { }
	function afterContent$2() { }

	/**
	 * Different types of Title level.
	 * @public
	 */
	var TitleLevel;
	(function (TitleLevel) {
	    /**
	     * Renders `h1` tag.
	     * @public
	     */
	    TitleLevel["H1"] = "H1";
	    /**
	     * Renders `h2` tag.
	     * @public
	     */
	    TitleLevel["H2"] = "H2";
	    /**
	     * Renders `h3` tag.
	     * @public
	     */
	    TitleLevel["H3"] = "H3";
	    /**
	     * Renders `h4` tag.
	     * @public
	     */
	    TitleLevel["H4"] = "H4";
	    /**
	     * Renders `h5` tag.
	     * @public
	     */
	    TitleLevel["H5"] = "H5";
	    /**
	     * Renders `h6` tag.
	     * @public
	     */
	    TitleLevel["H6"] = "H6";
	})(TitleLevel || (TitleLevel = {}));
	var TitleLevel$1 = TitleLevel;

	function TitleTemplate() {
	    return (i18nDefaults.jsx(i18nDefaults.Fragment, { children: title.call(this, this.level) }));
	}
	function title(titleLevel) {
	    switch (titleLevel) {
	        case "H1":
	            return (i18nDefaults.jsx("h1", { class: "ui5-title-root", children: titleInner.call(this) }));
	        case "H2":
	            return (i18nDefaults.jsx("h2", { class: "ui5-title-root", children: titleInner.call(this) }));
	        case "H3":
	            return (i18nDefaults.jsx("h3", { class: "ui5-title-root", children: titleInner.call(this) }));
	        case "H4":
	            return (i18nDefaults.jsx("h4", { class: "ui5-title-root", children: titleInner.call(this) }));
	        case "H5":
	            return (i18nDefaults.jsx("h5", { class: "ui5-title-root", children: titleInner.call(this) }));
	        case "H6":
	            return (i18nDefaults.jsx("h6", { id: `${this._id}-inner`, class: "ui5-title-root", children: titleInner.call(this) }));
	        default:
	            return (i18nDefaults.jsx("h2", { class: "ui5-title-root", children: titleInner.call(this) }));
	    }
	}
	function titleInner() {
	    return (i18nDefaults.jsx("span", { id: `${this._id}-inner`, children: i18nDefaults.jsx("slot", {}) }));
	}

	Icons.p("@ui5/webcomponents-theming", "sap_horizon", async () => i18nDefaults.defaultThemeBase);
	Icons.p("@ui5/webcomponents", "sap_horizon", async () => i18nDefaults.defaultTheme);
	var titleCss = `:host(:not([hidden])){display:block;cursor:text}:host{max-width:100%;color:var(--sapGroup_TitleTextColor);font-size:var(--sapFontHeader5Size);font-family:"72override",var(--sapFontHeaderFamily);text-shadow:var(--sapContent_TextShadow)}.ui5-title-root{display:inline-block;position:relative;font-weight:400;font-size:inherit;box-sizing:border-box;overflow:hidden;text-overflow:ellipsis;max-width:100%;vertical-align:bottom;-webkit-margin-before:0;-webkit-margin-after:0;-webkit-margin-start:0;-webkit-margin-end:0;margin:0;cursor:inherit}:host{white-space:pre-line}:host([wrapping-type="None"]){white-space:nowrap}.ui5-title-root,:host ::slotted(*){white-space:inherit}::slotted(*){font-size:inherit;font-family:inherit;text-shadow:inherit}:host([size="H1"]){font-size:var(--sapFontHeader1Size)}:host([size="H2"]){font-size:var(--sapFontHeader2Size)}:host([size="H3"]){font-size:var(--sapFontHeader3Size)}:host([size="H4"]){font-size:var(--sapFontHeader4Size)}:host([size="H5"]){font-size:var(--sapFontHeader5Size)}:host([size="H6"]){font-size:var(--sapFontHeader6Size)}
`;

	var __decorate$6 = (this && this.__decorate) || function (decorators, target, key, desc) {
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
	 * The `ui5-title` component is used to display titles inside a page.
	 * It is a simple, large-sized text with explicit header/title semantics.
	 *
	 * ### ES6 Module Import
	 *
	 * `import "@ui5/webcomponents/dist/Title.js";`
	 * @constructor
	 * @extends UI5Element
	 * @slot {Node[]} default - Defines the text of the component.
	 * This component supports nesting a `Link` component inside.
	 *
	 * **Note:** Although this slot accepts HTML Elements, it is strongly recommended that you only use text in order to preserve the intended design.
	 * @public
	 */
	let Title = class Title extends webcomponentsBase.b {
	    constructor() {
	        super(...arguments);
	        /**
	         * Defines how the text of a component will be displayed when there is not enough space.
	         *
	         * **Note:** for option "Normal" the text will wrap and the words will not be broken based on hyphenation.
	         * @default "Normal"
	         * @public
	         */
	        this.wrappingType = "Normal";
	        /**
	         * Defines the component level.
	         * Available options are: `"H6"` to `"H1"`.
	         * This property does not influence the style of the component.
	         * Use the property `size` for this purpose instead.
	         * @default "H2"
	         * @public
	         */
	        this.level = "H2";
	        /**
	         * Defines the visual appearance of the title.
	         * Available options are: `"H6"` to `"H1"`.
	         * @default "H5"
	         * @public
	         */
	        this.size = "H5";
	    }
	    get h1() {
	        return this.level === TitleLevel$1.H1;
	    }
	    get h2() {
	        return this.level === TitleLevel$1.H2;
	    }
	    get h3() {
	        return this.level === TitleLevel$1.H3;
	    }
	    get h4() {
	        return this.level === TitleLevel$1.H4;
	    }
	    get h5() {
	        return this.level === TitleLevel$1.H5;
	    }
	    get h6() {
	        return this.level === TitleLevel$1.H6;
	    }
	};
	__decorate$6([
	    webcomponentsBase.s()
	], Title.prototype, "wrappingType", void 0);
	__decorate$6([
	    webcomponentsBase.s()
	], Title.prototype, "level", void 0);
	__decorate$6([
	    webcomponentsBase.s()
	], Title.prototype, "size", void 0);
	Title = __decorate$6([
	    webcomponentsBase.m({
	        tag: "ui5-title",
	        renderer: i18nDefaults.d,
	        template: TitleTemplate,
	        styles: titleCss,
	    })
	], Title);
	Title.define();
	var Title$1 = Title;

	function PopoverTemplate() {
	    return PopupTemplate.call(this, {
	        beforeContent: beforeContent$1,
	        afterContent: afterContent$1,
	    });
	}
	function beforeContent$1() {
	    return (i18nDefaults.jsxs(i18nDefaults.Fragment, { children: [i18nDefaults.jsx("span", { class: "ui5-popover-arrow", style: this.styles.arrow }), this._displayHeader &&
	                i18nDefaults.jsx("header", { class: "ui5-popup-header-root", id: "ui5-popup-header", part: "header", children: this.header.length ?
	                        i18nDefaults.jsx("slot", { name: "header" })
	                        :
	                            i18nDefaults.jsx(Title$1, { level: "H1", class: "ui5-popup-header-text", children: this.headerText }) })] }));
	}
	function afterContent$1() {
	    return (i18nDefaults.jsx(i18nDefaults.Fragment, { children: this._displayFooter && !!this.footer.length &&
	            i18nDefaults.jsx("footer", { class: "ui5-popup-footer-root", part: "footer", children: i18nDefaults.jsx("slot", { name: "footer" }) }) }));
	}

	const m$1=(t,a,e)=>Math.min(Math.max(t,a),Math.max(a,e));

	const r=()=>{const e=webcomponentsBase.t();return e&&typeof e.focus=="function"?e:null},a=e=>{const n=r();return n?l(e,n):false},l=(e,n)=>{let t=e;if(t.shadowRoot&&(t=Array.from(t.shadowRoot.children).find(c=>c.localName!=="style"),!t))return  false;if(t===n)return  true;const o=t.localName==="slot"?t.assignedNodes():t.children;return o?Array.from(o).some(s=>l(s,n)):false},m=(e,n,t)=>e>=t.left&&e<=t.right&&n>=t.top&&n<=t.bottom,f=(e,n)=>{let t,o;if(e instanceof MouseEvent)t=e.clientX,o=e.clientY;else {const s=e.touches[0];t=s.clientX,o=s.clientY;}return m(t,o,n)};function d(e){return "isUI5Element"in e&&"_show"in e}const i=e=>{const n=e.parentElement||e.getRootNode&&e.getRootNode().host;return n&&(d(n)||n===document.documentElement)?n:i(n)};

	/**
	 * Popup accessible roles.
	 * @public
	 */
	var PopupAccessibleRole;
	(function (PopupAccessibleRole) {
	    /**
	     * Represents no ARIA role.
	     * @public
	     */
	    PopupAccessibleRole["None"] = "None";
	    /**
	     * Represents the ARIA role "dialog".
	     * @public
	     */
	    PopupAccessibleRole["Dialog"] = "Dialog";
	    /**
	     * Represents the ARIA role "alertdialog".
	     * @public
	     */
	    PopupAccessibleRole["AlertDialog"] = "AlertDialog";
	})(PopupAccessibleRole || (PopupAccessibleRole = {}));
	var PopupAccessibleRole$1 = PopupAccessibleRole;

	const OpenedPopupsRegistry = Icons.m("OpenedPopupsRegistry", { openedRegistry: [] });
	const addOpenedPopup = (instance, parentPopovers = []) => {
	    if (!OpenedPopupsRegistry.openedRegistry.some(popup => popup.instance === instance)) {
	        OpenedPopupsRegistry.openedRegistry.push({
	            instance,
	            parentPopovers,
	        });
	    }
	    _updateTopModalPopup();
	    if (OpenedPopupsRegistry.openedRegistry.length === 1) {
	        attachGlobalListener();
	    }
	};
	const removeOpenedPopup = (instance) => {
	    OpenedPopupsRegistry.openedRegistry = OpenedPopupsRegistry.openedRegistry.filter(el => {
	        return el.instance !== instance;
	    });
	    _updateTopModalPopup();
	    if (!OpenedPopupsRegistry.openedRegistry.length) {
	        detachGlobalListener();
	    }
	};
	const getOpenedPopups = () => {
	    return [...OpenedPopupsRegistry.openedRegistry];
	};
	const _keydownListener = (event) => {
	    if (!OpenedPopupsRegistry.openedRegistry.length) {
	        return;
	    }
	    if (webcomponentsBase.H(event)) {
	        event.stopPropagation();
	        OpenedPopupsRegistry.openedRegistry[OpenedPopupsRegistry.openedRegistry.length - 1].instance.closePopup(true);
	    }
	};
	const attachGlobalListener = () => {
	    document.addEventListener("keydown", _keydownListener);
	};
	const detachGlobalListener = () => {
	    document.removeEventListener("keydown", _keydownListener);
	};
	const _updateTopModalPopup = () => {
	    let popup;
	    let hasModal = false;
	    for (let i = OpenedPopupsRegistry.openedRegistry.length - 1; i >= 0; i--) {
	        popup = OpenedPopupsRegistry.openedRegistry[i].instance;
	        if (!hasModal && popup.isModal) {
	            popup.isTopModalPopup = true;
	            hasModal = true;
	        }
	        else {
	            popup.isTopModalPopup = false;
	        }
	    }
	};

	Icons.p("@ui5/webcomponents-theming", "sap_horizon", async () => i18nDefaults.defaultThemeBase);
	Icons.p("@ui5/webcomponents", "sap_horizon", async () => i18nDefaults.defaultTheme);
	var popupStlyes = `:host{min-width:1px;overflow:visible;border:none;inset:unset;margin:0;padding:0}
`;

	Icons.p("@ui5/webcomponents-theming", "sap_horizon", async () => i18nDefaults.defaultThemeBase);
	Icons.p("@ui5/webcomponents", "sap_horizon", async () => i18nDefaults.defaultTheme);
	var popupBlockLayerStyles = `.ui5-block-layer{position:fixed;z-index:-1;display:none;inset:-500px;outline:none;pointer-events:all}
`;

	Icons.p("@ui5/webcomponents-theming", "sap_horizon", async () => i18nDefaults.defaultThemeBase);
	Icons.p("@ui5/webcomponents", "sap_horizon", async () => i18nDefaults.defaultTheme);
	var globalStyles = `.ui5-popup-scroll-blocker{overflow:hidden}
`;

	var __decorate$5 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var Popup_1;
	const createBlockingStyle = () => {
	    if (!Icons.S("data-ui5-popup-scroll-blocker")) {
	        Icons.c$5(globalStyles, "data-ui5-popup-scroll-blocker");
	    }
	};
	createBlockingStyle();
	const pageScrollingBlockers = new Set();
	/**
	 * @class
	 * ### Overview
	 * Base class for all popup Web Components.
	 *
	 * If you need to create your own popup-like custom UI5 Web Components.
	 *
	 * 1. The Popup class handles modality:
	 *  - The "isModal" getter can be overridden by derivatives to provide their own conditions when they are modal or not
	 *  - Derivatives may call the "blockPageScrolling" and "unblockPageScrolling" static methods to temporarily remove scrollbars on the html element
	 *  - Derivatives may call the "openPopup" and "closePopup" methods which handle focus, manage the popup registry and for modal popups, manage the blocking layer
	 *
	 *  2. Provides blocking layer (relevant for modal popups only):
	 *   - Controlled by the "open" and "close" methods
	 *
	 * 3. The Popup class "traps" focus:
	 *  - Derivatives may call the "applyInitialFocus" method (usually when opening, to transfer focus inside the popup)
	 *
	 * 4. The template of this component exposes two inline partials you can override in derivatives:
	 *  - beforeContent (upper part of the box, useful for header/title/close button)
	 *  - afterContent (lower part, useful for footer/action buttons)
	 * @constructor
	 * @extends UI5Element
	 * @public
	 */
	let Popup = Popup_1 = class Popup extends webcomponentsBase.b {
	    constructor() {
	        super();
	        /**
	         * Defines if the focus should be returned to the previously focused element,
	         * when the popup closes.
	         * @default false
	         * @public
	         * @since 1.0.0-rc.8
	        */
	        this.preventFocusRestore = false;
	        /**
	         * Allows setting a custom role.
	         * @default "Dialog"
	         * @public
	         * @since 1.10.0
	         */
	        this.accessibleRole = "Dialog";
	        /**
	         * Indicates whether initial focus should be prevented.
	         * @public
	         * @default false
	         * @since 2.0.0
	         */
	        this.preventInitialFocus = false;
	        /**
	         * Indicates if the element is the top modal popup
	         *
	         * This property is calculated automatically
	         * @private
	         * @default false
	         */
	        this.isTopModalPopup = false;
	        /**
	         * @private
	         */
	        this.onPhone = false;
	        /**
	         * @private
	         */
	        this.onDesktop = false;
	        this._opened = false;
	        this._open = false;
	        this._resizeHandler = this._resize.bind(this);
	        this._getRealDomRef = () => {
	            return this.shadowRoot.querySelector("[root-element]");
	        };
	    }
	    onBeforeRendering() {
	        this.onPhone = Icons.d$1();
	        this.onDesktop = Icons.f$1();
	    }
	    onAfterRendering() {
	        Icons.f$3().then(() => {
	            this._updateMediaRange();
	        });
	    }
	    onEnterDOM() {
	        this.setAttribute("popover", "manual");
	        webcomponentsBase.f.register(this, this._resizeHandler);
	        if (Icons.f$1()) {
	            this.setAttribute("desktop", "");
	        }
	        this.tabIndex = -1;
	        if (this.open) {
	            this.showPopover();
	            this.openPopup();
	        }
	    }
	    onExitDOM() {
	        if (this._opened) {
	            Popup_1.unblockPageScrolling(this);
	            this._removeOpenedPopup();
	        }
	        webcomponentsBase.f.deregister(this, this._resizeHandler);
	    }
	    /**
	     * Indicates if the element is open
	     * @public
	     * @default false
	     * @since 1.2.0
	     */
	    set open(value) {
	        if (this._open === value) {
	            return;
	        }
	        this._open = value;
	        if (value) {
	            this.openPopup();
	        }
	        else {
	            this.closePopup();
	        }
	    }
	    get open() {
	        return this._open;
	    }
	    async openPopup() {
	        if (this._opened) {
	            return;
	        }
	        const prevented = !this.fireDecoratorEvent("before-open");
	        if (prevented) {
	            this.open = false;
	            return;
	        }
	        if (this.isModal) {
	            Popup_1.blockPageScrolling(this);
	        }
	        this._focusedElementBeforeOpen = r();
	        this._show();
	        this._opened = true;
	        if (this.getDomRef()) {
	            this._updateMediaRange();
	        }
	        this._addOpenedPopup();
	        this.open = true;
	        // initial focus, if focused element is statically created
	        await this.applyInitialFocus();
	        await Icons.f$3();
	        if (this.isConnected) {
	            this.fireDecoratorEvent("open");
	        }
	    }
	    _resize() {
	        this._updateMediaRange();
	    }
	    /**
	     * Prevents the user from interacting with the content under the block layer
	     */
	    _preventBlockLayerFocus(e) {
	        e.preventDefault();
	    }
	    /**
	     * Temporarily removes scrollbars from the html element
	     * @protected
	     */
	    static blockPageScrolling(popup) {
	        pageScrollingBlockers.add(popup);
	        if (pageScrollingBlockers.size !== 1) {
	            return;
	        }
	        document.documentElement.classList.add("ui5-popup-scroll-blocker");
	    }
	    /**
	     * Restores scrollbars on the html element, if needed
	     * @protected
	     */
	    static unblockPageScrolling(popup) {
	        pageScrollingBlockers.delete(popup);
	        if (pageScrollingBlockers.size !== 0) {
	            return;
	        }
	        document.documentElement.classList.remove("ui5-popup-scroll-blocker");
	    }
	    _scroll(e) {
	        this.fireDecoratorEvent("scroll", {
	            scrollTop: e.target.scrollTop,
	            targetRef: e.target,
	        });
	    }
	    _onkeydown(e) {
	        const isTabOutAttempt = e.target === this._root && webcomponentsBase.m$1(e);
	        // if the popup is closed, focus is already moved, so Enter keydown may result in click on the newly focused element
	        const isEnterOnClosedPopupChild = webcomponentsBase.b$1(e) && !this.open;
	        if (isTabOutAttempt || isEnterOnClosedPopupChild) {
	            e.preventDefault();
	        }
	    }
	    _onfocusout(e) {
	        // relatedTarget is the element, which will get focus. If no such element exists, focus the root.
	        // This happens after the mouse is released in order to not interrupt text selection.
	        if (!e.relatedTarget) {
	            this._shouldFocusRoot = true;
	        }
	    }
	    _onmousedown(e) {
	        if (this.shadowRoot.contains(e.target)) {
	            this._shouldFocusRoot = true;
	        }
	        else {
	            this._shouldFocusRoot = false;
	        }
	    }
	    _onmouseup() {
	        if (this._shouldFocusRoot) {
	            if (Icons.g$2()) {
	                this._root.focus();
	            }
	            this._shouldFocusRoot = false;
	        }
	    }
	    /**
	     * Focus trapping
	     * @private
	     */
	    async forwardToFirst() {
	        const firstFocusable = await BusyIndicator.b(this);
	        if (firstFocusable) {
	            firstFocusable.focus();
	        }
	        else {
	            this._root.focus();
	        }
	    }
	    /**
	     * Focus trapping
	     * @private
	     */
	    async forwardToLast() {
	        const lastFocusable = await BusyIndicator.H(this);
	        if (lastFocusable) {
	            lastFocusable.focus();
	        }
	        else {
	            this._root.focus();
	        }
	    }
	    /**
	     * Use this method to focus the element denoted by "initialFocus", if provided,
	     * or the first focusable element otherwise.
	     * @protected
	     */
	    async applyInitialFocus() {
	        if (!this.preventInitialFocus) {
	            await this.applyFocus();
	        }
	    }
	    /**
	     * Focuses the element denoted by `initialFocus`, if provided,
	     * or the first focusable element otherwise.
	     * @public
	     * @returns Promise that resolves when the focus is applied
	     */
	    async applyFocus() {
	        // do nothing if the standard HTML autofocus is used
	        if (this.querySelector("[autofocus]")) {
	            return;
	        }
	        await this._waitForDomRef();
	        if (this.getRootNode() === this) {
	            return;
	        }
	        let element;
	        if (this.initialFocus) {
	            element = this.getRootNode().getElementById(this.initialFocus)
	                || document.getElementById(this.initialFocus);
	        }
	        element = element || await BusyIndicator.b(this) || this._root; // in case of no focusable content focus the root
	        if (element) {
	            if (element === this._root) {
	                element.tabIndex = -1;
	            }
	            element.focus();
	        }
	    }
	    isFocusWithin() {
	        return a(this._root);
	    }
	    _updateMediaRange() {
	        this.mediaRange = webcomponentsBase.i$2.getCurrentRange(webcomponentsBase.i$2.RANGESETS.RANGE_4STEPS, this.getDomRef().offsetWidth);
	    }
	    /**
	     * Adds the popup to the "opened popups registry"
	     * @protected
	     */
	    _addOpenedPopup() {
	        addOpenedPopup(this);
	    }
	    /**
	     * Closes the popup.
	     */
	    closePopup(escPressed = false, preventRegistryUpdate = false, preventFocusRestore = false) {
	        if (!this._opened) {
	            return;
	        }
	        const prevented = !this.fireDecoratorEvent("before-close", { escPressed });
	        if (prevented) {
	            this.open = true;
	            return;
	        }
	        this._opened = false;
	        if (this.isModal) {
	            Popup_1.unblockPageScrolling(this);
	        }
	        this.hide();
	        this.open = false;
	        if (!preventRegistryUpdate) {
	            this._removeOpenedPopup();
	        }
	        if (!this.preventFocusRestore && !preventFocusRestore) {
	            this.resetFocus();
	        }
	        this.fireDecoratorEvent("close");
	    }
	    /**
	     * Removes the popup from the "opened popups registry"
	     * @protected
	     */
	    _removeOpenedPopup() {
	        removeOpenedPopup(this);
	    }
	    /**
	     * Returns the focus to the previously focused element
	     * @protected
	     */
	    resetFocus() {
	        this._focusedElementBeforeOpen?.focus();
	        this._focusedElementBeforeOpen = null;
	    }
	    /**
	     * Sets "block" display to the popup. The property can be overriden by derivatives of Popup.
	     * @protected
	     */
	    _show() {
	        if (this.isConnected) {
	            this.setAttribute("popover", "manual");
	            this.showPopover();
	        }
	    }
	    /**
	     * Sets "none" display to the popup
	     * @protected
	     */
	    hide() {
	        this.isConnected && this.hidePopover();
	    }
	    /**
	     * Ensures ariaLabel is never null or empty string
	     * @protected
	     */
	    get _ariaLabel() {
	        return toLowercaseEnumValue.A(this);
	    }
	    get _root() {
	        return this.shadowRoot.querySelector(".ui5-popup-root");
	    }
	    get _role() {
	        return (this.accessibleRole === PopupAccessibleRole$1.None) ? undefined : toLowercaseEnumValue.n(this.accessibleRole);
	    }
	    get _ariaModal() {
	        return this.accessibleRole === PopupAccessibleRole$1.None ? undefined : "true";
	    }
	    get contentDOM() {
	        return this.shadowRoot.querySelector(".ui5-popup-content");
	    }
	    get styles() {
	        return {
	            root: {},
	            content: {},
	        };
	    }
	    get classes() {
	        return {
	            root: {
	                "ui5-popup-root": true,
	            },
	            content: {
	                "ui5-popup-content": true,
	            },
	        };
	    }
	};
	__decorate$5([
	    webcomponentsBase.s()
	], Popup.prototype, "initialFocus", void 0);
	__decorate$5([
	    webcomponentsBase.s({ type: Boolean })
	], Popup.prototype, "preventFocusRestore", void 0);
	__decorate$5([
	    webcomponentsBase.s()
	], Popup.prototype, "accessibleName", void 0);
	__decorate$5([
	    webcomponentsBase.s()
	], Popup.prototype, "accessibleNameRef", void 0);
	__decorate$5([
	    webcomponentsBase.s()
	], Popup.prototype, "accessibleRole", void 0);
	__decorate$5([
	    webcomponentsBase.s()
	], Popup.prototype, "mediaRange", void 0);
	__decorate$5([
	    webcomponentsBase.s({ type: Boolean })
	], Popup.prototype, "preventInitialFocus", void 0);
	__decorate$5([
	    webcomponentsBase.s({ type: Boolean, noAttribute: true })
	], Popup.prototype, "isTopModalPopup", void 0);
	__decorate$5([
	    webcomponentsBase.d({ type: HTMLElement, "default": true })
	], Popup.prototype, "content", void 0);
	__decorate$5([
	    webcomponentsBase.s({ type: Boolean })
	], Popup.prototype, "onPhone", void 0);
	__decorate$5([
	    webcomponentsBase.s({ type: Boolean })
	], Popup.prototype, "onDesktop", void 0);
	__decorate$5([
	    webcomponentsBase.s({ type: Boolean })
	], Popup.prototype, "open", null);
	Popup = Popup_1 = __decorate$5([
	    webcomponentsBase.m({
	        renderer: i18nDefaults.d,
	        styles: [popupStlyes, popupBlockLayerStyles],
	        template: PopupTemplate,
	    })
	    /**
	     * Fired before the component is opened. This event can be cancelled, which will prevent the popup from opening.
	     * @public
	     */
	    ,
	    eventStrict.l("before-open", {
	        cancelable: true,
	    })
	    /**
	     * Fired after the component is opened.
	     * @public
	     */
	    ,
	    eventStrict.l("open")
	    /**
	     * Fired before the component is closed. This event can be cancelled, which will prevent the popup from closing.
	     * @public
	     * @param {boolean} escPressed Indicates that `ESC` key has triggered the event.
	     */
	    ,
	    eventStrict.l("before-close", {
	        cancelable: true,
	    })
	    /**
	     * Fired after the component is closed.
	     * @public
	     */
	    ,
	    eventStrict.l("close")
	    /**
	     * Fired whenever the popup content area is scrolled
	     * @private
	     */
	    ,
	    eventStrict.l("scroll", {
	        bubbles: true,
	    })
	], Popup);
	var Popup$1 = Popup;

	const name$9 = "resize-corner";
	const pathData$9 = "M384 160v32q0 12-10 22L182 406q-10 10-22 10h-32zM224 416l160-160v32q0 12-10 22l-96 96q-10 10-22 10h-32zm160-64v32q0 12-10 22t-22 10h-32z";
	const ltr$9 = false;
	const collection$9 = "SAP-icons-v4";
	const packageName$9 = "@ui5/webcomponents-icons";

	Icons.f(name$9, { pathData: pathData$9, ltr: ltr$9, collection: collection$9, packageName: packageName$9 });

	const name$8 = "resize-corner";
	const pathData$8 = "M282 416q-11 0-18.5-7.5T256 390t7-18l109-109q7-7 18-7t18.5 7.5T416 282t-7 18L300 409q-7 7-18 7zm-160 0q-11 0-18.5-7.5T96 390t7-18l269-269q7-7 18-7t18.5 7.5T416 122t-7 18L140 409q-7 7-18 7z";
	const ltr$8 = false;
	const collection$8 = "SAP-icons-v5";
	const packageName$8 = "@ui5/webcomponents-icons";

	Icons.f(name$8, { pathData: pathData$8, ltr: ltr$8, collection: collection$8, packageName: packageName$8 });

	var resizeCorner = "resize-corner";

	function DialogTemplate() {
	    return PopupTemplate.call(this, {
	        beforeContent,
	        afterContent,
	    });
	}
	function beforeContent() {
	    return (i18nDefaults.jsx(i18nDefaults.Fragment, { children: !!this._displayHeader &&
	            i18nDefaults.jsx("header", { children: i18nDefaults.jsxs("div", { class: "ui5-popup-header-root", id: "ui5-popup-header", role: "group", "aria-describedby": this.effectiveAriaDescribedBy, "aria-roledescription": this.ariaRoleDescriptionHeaderText, tabIndex: this._headerTabIndex, onKeyDown: this._onDragOrResizeKeyDown, onMouseDown: this._onDragMouseDown, part: "header", children: [this.hasValueState &&
	                            i18nDefaults.jsx(Icon.Icon, { class: "ui5-dialog-value-state-icon", name: this._dialogStateIcon }), this.header.length ?
	                            i18nDefaults.jsx("slot", { name: "header" })
	                            :
	                                i18nDefaults.jsx(Title$1, { level: "H1", id: "ui5-popup-header-text", class: "ui5-popup-header-text", children: this.headerText }), this.resizable ?
	                            this.draggable ?
	                                i18nDefaults.jsx("span", { id: `${this._id}-descr`, "aria-hidden": "true", class: "ui5-hidden-text", children: this.ariaDescribedByHeaderTextDraggableAndResizable })
	                                :
	                                    i18nDefaults.jsx("span", { id: `${this._id}-descr`, "aria-hidden": "true", class: "ui5-hidden-text", children: this.ariaDescribedByHeaderTextResizable })
	                            :
	                                this.draggable &&
	                                    i18nDefaults.jsx("span", { id: `${this._id}-descr`, "aria-hidden": "true", class: "ui5-hidden-text", children: this.ariaDescribedByHeaderTextDraggable })] }) }) }));
	}
	function afterContent() {
	    return (i18nDefaults.jsxs(i18nDefaults.Fragment, { children: [!!this.footer.length &&
	                i18nDefaults.jsx("footer", { class: "ui5-popup-footer-root", part: "footer", children: i18nDefaults.jsx("slot", { name: "footer" }) }), this._showResizeHandle &&
	                i18nDefaults.jsx("div", { class: "ui5-popup-resize-handle", onMouseDown: this._onResizeMouseDown, children: i18nDefaults.jsx(Icon.Icon, { name: resizeCorner }) })] }));
	}

	Icons.p("@ui5/webcomponents-theming", "sap_horizon", async () => i18nDefaults.defaultThemeBase);
	Icons.p("@ui5/webcomponents", "sap_horizon", async () => i18nDefaults.defaultTheme);
	var PopupsCommonCss = `:host{position:fixed;background:var(--sapGroup_ContentBackground);border-radius:var(--_ui5-v2-10-0-rc-2_popup_border_radius);min-height:2rem;box-sizing:border-box}:host([open]){display:flex}.ui5-popup-root{background:inherit;border-radius:inherit;width:100%;box-sizing:border-box;display:flex;flex-direction:column;overflow:hidden;flex:1 1 auto;outline:none}.ui5-popup-root .ui5-popup-header-root{color:var(--sapPageHeader_TextColor);box-shadow:var(--_ui5-v2-10-0-rc-2_popup_header_shadow);border-bottom:var(--_ui5-v2-10-0-rc-2_popup_header_border)}.ui5-popup-content{color:var(--sapTextColor);flex:auto}.ui5-popup-content:focus{outline:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);outline-offset:calc(-1 * var(--sapContent_FocusWidth));border-radius:var(--_ui5-v2-10-0-rc-2_popup_border_radius)}.ui5-popup-footer-root{background:var(--sapPageFooter_Background);border-top:1px solid var(--sapPageFooter_BorderColor);color:var(--sapPageFooter_TextColor)}.ui5-popup-header-root,.ui5-popup-footer-root,:host([header-text]) .ui5-popup-header-text{margin:0;display:flex;justify-content:center;align-items:center}.ui5-popup-header-root .ui5-popup-header-text{font-weight:var(--_ui5-v2-10-0-rc-2_popup_header_font_weight)}.ui5-popup-content{overflow:auto;box-sizing:border-box}:host([header-text]) .ui5-popup-header-text{min-height:var(--_ui5-v2-10-0-rc-2_popup_default_header_height);max-height:var(--_ui5-v2-10-0-rc-2_popup_default_header_height);line-height:var(--_ui5-v2-10-0-rc-2_popup_default_header_height);text-overflow:ellipsis;overflow:hidden;white-space:nowrap;max-width:100%;display:inline-flex;justify-content:var(--_ui5-v2-10-0-rc-2_popup_header_prop_header_text_alignment)}:host([header-text]) .ui5-popup-header-root{justify-content:var(--_ui5-v2-10-0-rc-2_popup_header_prop_header_text_alignment)}:host(:not([header-text])) .ui5-popup-header-text{display:none}:host([media-range="S"]) .ui5-popup-content{padding:1rem var(--_ui5-v2-10-0-rc-2_popup_content_padding_s)}:host([media-range="M"]) .ui5-popup-content,:host([media-range="L"]) .ui5-popup-content{padding:1rem var(--_ui5-v2-10-0-rc-2_popup_content_padding_m_l)}:host([media-range="XL"]) .ui5-popup-content{padding:1rem var(--_ui5-v2-10-0-rc-2_popup_content_padding_xl)}.ui5-popup-header-root{background:var(--_ui5-v2-10-0-rc-2_popup_header_background)}:host([media-range="S"]) .ui5-popup-header-root,:host([media-range="S"]) .ui5-popup-footer-root{padding-left:var(--_ui5-v2-10-0-rc-2_popup_header_footer_padding_s);padding-right:var(--_ui5-v2-10-0-rc-2_popup_header_footer_padding_s)}:host([media-range="M"]) .ui5-popup-header-root,:host([media-range="L"]) .ui5-popup-header-root,:host([media-range="M"]) .ui5-popup-footer-root,:host([media-range="L"]) .ui5-popup-footer-root{padding-left:var(--_ui5-v2-10-0-rc-2_popup_header_footer_padding_m_l);padding-right:var(--_ui5-v2-10-0-rc-2_popup_header_footer_padding_m_l)}:host([media-range="XL"]) .ui5-popup-header-root,:host([media-range="XL"]) .ui5-popup-footer-root{padding-left:var(--_ui5-v2-10-0-rc-2_popup_header_footer_padding_xl);padding-right:var(--_ui5-v2-10-0-rc-2_popup_header_footer_padding_xl)}
`;

	Icons.p("@ui5/webcomponents-theming", "sap_horizon", async () => i18nDefaults.defaultThemeBase);
	Icons.p("@ui5/webcomponents", "sap_horizon", async () => i18nDefaults.defaultTheme);
	var dialogCSS = `.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}:host{min-width:20rem;min-height:6rem;max-height:94%;max-width:90%;flex-direction:column;box-shadow:var(--sapContent_Shadow3);border-radius:var(--sapElement_BorderCornerRadius)}:host([stretch]){width:90%;height:94%}:host([stretch][on-phone]){width:100%;height:100%;max-height:100%;max-width:100%;border-radius:0;min-width:0}:host([draggable]) .ui5-popup-header-root,:host([draggable]) ::slotted([slot="header"]){cursor:move}:host([draggable]) .ui5-popup-header-root *{cursor:auto}:host([draggable]) .ui5-popup-root{user-select:text}::slotted([slot="header"]){max-width:100%}.ui5-popup-root{display:flex;flex-direction:column;max-width:100vw}.ui5-popup-header-root{position:relative}.ui5-popup-header-root:before{content:"";position:absolute;inset-block-start:auto;inset-block-end:0;inset-inline-start:0;inset-inline-end:0;height:var(--_ui5-v2-10-0-rc-2_dialog_header_state_line_height);background:var(--sapObjectHeader_BorderColor)}:host([state="Negative"]) .ui5-popup-header-root:before{background:var(--sapErrorBorderColor)}:host([state="Information"]) .ui5-popup-header-root:before{background:var(--sapInformationBorderColor)}:host([state="Positive"]) .ui5-popup-header-root:before{background:var(--sapSuccessBorderColor)}:host([state="Critical"]) .ui5-popup-header-root:before{background:var(--sapWarningBorderColor)}.ui5-dialog-value-state-icon{margin-inline-end:.5rem;flex-shrink:0}:host([state="Negative"]) .ui5-dialog-value-state-icon{color:var(--_ui5-v2-10-0-rc-2_dialog_header_error_state_icon_color)}:host([state="Information"]) .ui5-dialog-value-state-icon{color:var(--_ui5-v2-10-0-rc-2_dialog_header_information_state_icon_color)}:host([state="Positive"]) .ui5-dialog-value-state-icon{color:var(--_ui5-v2-10-0-rc-2_dialog_header_success_state_icon_color)}:host([state="Critical"]) .ui5-dialog-value-state-icon{color:var(--_ui5-v2-10-0-rc-2_dialog_header_warning_state_icon_color)}.ui5-popup-header-root{outline:none}:host([desktop]) .ui5-popup-header-root:focus:after,.ui5-popup-header-root:focus-visible:after{content:"";position:absolute;left:var(--_ui5-v2-10-0-rc-2_dialog_header_focus_left_offset);bottom:var(--_ui5-v2-10-0-rc-2_dialog_header_focus_bottom_offset);right:var(--_ui5-v2-10-0-rc-2_dialog_header_focus_right_offset);top:var(--_ui5-v2-10-0-rc-2_dialog_header_focus_top_offset);border:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);border-radius:var(--_ui5-v2-10-0-rc-2_dialog_header_border_radius) var(--_ui5-v2-10-0-rc-2_dialog_header_border_radius) 0 0;pointer-events:none}:host([stretch]) .ui5-popup-content{width:100%;height:100%}.ui5-popup-content{min-height:var(--_ui5-v2-10-0-rc-2_dialog_content_min_height);flex:1 1 auto}.ui5-popup-resize-handle{position:absolute;bottom:-.5rem;inset-inline-end:-.5rem;cursor:var(--_ui5-v2-10-0-rc-2_dialog_resize_cursor);width:1.5rem;height:1.5rem;border-radius:50%}.ui5-popup-resize-handle [ui5-icon]{color:var(--sapButton_Lite_TextColor)}::slotted([slot="footer"]){height:var(--_ui5-v2-10-0-rc-2_dialog_footer_height)}::slotted([slot="footer"][ui5-bar][design="Footer"]){border-top:none}::slotted([slot="header"][ui5-bar]){box-shadow:none}::slotted([slot="footer"][ui5-toolbar]){border:0}:host::backdrop{background-color:var(--_ui5-v2-10-0-rc-2_popup_block_layer_background);opacity:var(--_ui5-v2-10-0-rc-2_popup_block_layer_opacity)}.ui5-block-layer{display:block}
`;

	var __decorate$4 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var Dialog_1;
	/**
	 * Defines the step size at which this component would change by when being dragged or resized with the keyboard.
	 */
	const STEP_SIZE = 16;
	/**
	 * Defines the icons corresponding to the dialog's state.
	 */
	const ICON_PER_STATE = {
	    [information.o.Negative]: "error",
	    [information.o.Critical]: "alert",
	    [information.o.Positive]: "sys-enter-2",
	    [information.o.Information]: "information",
	};
	/**
	 * @class
	 * ### Overview
	 * The `ui5-dialog` component is used to temporarily display some information in a
	 * size-limited window in front of the regular app screen.
	 * It is used to prompt the user for an action or a confirmation.
	 * The `ui5-dialog` interrupts the current app processing as it is the only focused UI element and
	 * the main screen is dimmed/blocked.
	 * The dialog combines concepts known from other technologies where the windows have
	 * names such as dialog box, dialog window, pop-up, pop-up window, alert box, or message box.
	 *
	 * The `ui5-dialog` is modal, which means that a user action is required before it is possible to return to the parent window.
	 * To open multiple dialogs, each dialog element should be separate in the markup. This will ensure the correct modal behavior. Avoid nesting dialogs within each other.
	 * The content of the `ui5-dialog` is fully customizable.
	 *
	 * ### Structure
	 * A `ui5-dialog` consists of a header, content, and a footer for action buttons.
	 * The `ui5-dialog` is usually displayed at the center of the screen.
	 * Its position can be changed by the user. To enable this, you need to set the property `draggable` accordingly.

	 *
	 * ### Responsive Behavior
	 * The `stretch` property can be used to stretch the `ui5-dialog` to full screen. For better usability, it's recommended to stretch the dialog to full screen on phone devices.
	 *
	 * **Note:** When a `ui5-bar` is used in the header or in the footer, you should remove the default dialog's paddings.
	 *
	 * For more information see the sample "Bar in Header/Footer".

	 * ### Keyboard Handling
	 *
	 * #### Basic Navigation
	 * When the `ui5-dialog` has the `draggable` property set to `true` and the header is focused, the user can move the dialog
	 * with the following keyboard shortcuts:
	 *
	 * - [Up] or [Down] arrow keys - Move the dialog up/down.
	 * - [Left] or [Right] arrow keys - Move the dialog left/right.
	 *
	 * #### Resizing
	 * When the `ui5-dialog` has the `resizable` property set to `true` and the header is focused, the user can change the size of the dialog
	 * with the following keyboard shortcuts:
	 *
	 * - [Shift] + [Up] or [Down] - Decrease/Increase the height of the dialog.
	 * - [Shift] + [Left] or [Right] - Decrease/Increase the width of the dialog.
	 *
	 * ### ES6 Module Import
	 *
	 * `import "@ui5/webcomponents/dist/Dialog";`
	 *
	 * @constructor
	 * @extends Popup
	 * @public
	 * @csspart header - Used to style the header of the component
	 * @csspart content - Used to style the content of the component
	 * @csspart footer - Used to style the footer of the component
	 */
	let Dialog = Dialog_1 = class Dialog extends Popup$1 {
	    constructor() {
	        super();
	        /**
	         * Determines if the dialog will be stretched to full screen on mobile. On desktop,
	         * the dialog will be stretched to approximately 90% of the viewport.
	         *
	         * **Note:** For better usability of the component it is recommended to set this property to "true" when the dialog is opened on phone.
	         * @default false
	         * @public
	         */
	        this.stretch = false;
	        /**
	         * Determines whether the component is draggable.
	         * If this property is set to true, the Dialog will be draggable by its header.
	         *
	         * **Note:** The component can be draggable only in desktop mode.
	         *
	         * **Note:** This property overrides the default HTML "draggable" attribute native behavior.
	         * When "draggable" is set to true, the native browser "draggable"
	         * behavior is prevented and only the Dialog custom logic ("draggable by its header") works.
	         * @default false
	         * @since 1.0.0-rc.9
	         * @public
	         */
	        this.draggable = false;
	        /**
	         * Configures the component to be resizable.
	         * If this property is set to true, the Dialog will have a resize handle in its bottom right corner in LTR languages.
	         * In RTL languages, the resize handle will be placed in the bottom left corner.
	         *
	         * **Note:** The component can be resizable only in desktop mode.
	         *
	         * **Note:** Upon resizing, externally defined height and width styling will be ignored.
	         * @default false
	         * @since 1.0.0-rc.10
	         * @public
	         */
	        this.resizable = false;
	        /**
	         * Defines the state of the `Dialog`.
	         *
	         * **Note:** If `"Negative"` and `"Critical"` states is set, it will change the
	         * accessibility role to "alertdialog", if the accessibleRole property is set to `"Dialog"`.
	         * @default "None"
	         * @public
	         * @since 1.0.0-rc.15
	         */
	        this.state = "None";
	        this._draggedOrResized = false;
	        this._revertSize = () => {
	            Object.assign(this.style, {
	                top: "",
	                left: "",
	                width: "",
	                height: "",
	            });
	        };
	        this._screenResizeHandler = this._screenResize.bind(this);
	        this._dragMouseMoveHandler = this._onDragMouseMove.bind(this);
	        this._dragMouseUpHandler = this._onDragMouseUp.bind(this);
	        this._resizeMouseMoveHandler = this._onResizeMouseMove.bind(this);
	        this._resizeMouseUpHandler = this._onResizeMouseUp.bind(this);
	        this._dragStartHandler = this._handleDragStart.bind(this);
	    }
	    static _isHeader(element) {
	        return element.classList.contains("ui5-popup-header-root") || element.getAttribute("slot") === "header";
	    }
	    get isModal() {
	        return true;
	    }
	    get _ariaLabelledBy() {
	        let ariaLabelledById;
	        if (this.headerText && !this._ariaLabel) {
	            ariaLabelledById = "ui5-popup-header-text";
	        }
	        return ariaLabelledById;
	    }
	    get ariaRoleDescriptionHeaderText() {
	        return (this.resizable || this.draggable) ? Dialog_1.i18nBundle.getText(i18nDefaults.DIALOG_HEADER_ARIA_ROLE_DESCRIPTION) : undefined;
	    }
	    get effectiveAriaDescribedBy() {
	        return (this.resizable || this.draggable) ? `${this._id}-descr` : undefined;
	    }
	    get ariaDescribedByHeaderTextResizable() {
	        return Dialog_1.i18nBundle.getText(i18nDefaults.DIALOG_HEADER_ARIA_DESCRIBEDBY_RESIZABLE);
	    }
	    get ariaDescribedByHeaderTextDraggable() {
	        return Dialog_1.i18nBundle.getText(i18nDefaults.DIALOG_HEADER_ARIA_DESCRIBEDBY_DRAGGABLE);
	    }
	    get ariaDescribedByHeaderTextDraggableAndResizable() {
	        return Dialog_1.i18nBundle.getText(i18nDefaults.DIALOG_HEADER_ARIA_DESCRIBEDBY_DRAGGABLE_RESIZABLE);
	    }
	    /**
	     * Determines if the header should be shown.
	     */
	    get _displayHeader() {
	        return this.header.length || this.headerText || this.draggable || this.resizable;
	    }
	    get _movable() {
	        return !this.stretch && this.onDesktop && (this.draggable || this.resizable);
	    }
	    get _headerTabIndex() {
	        return this._movable ? 0 : undefined;
	    }
	    get _showResizeHandle() {
	        return this.resizable && this.onDesktop;
	    }
	    get _minHeight() {
	        let minHeight = Number.parseInt(window.getComputedStyle(this.contentDOM).minHeight);
	        const header = this._root.querySelector(".ui5-popup-header-root");
	        if (header) {
	            minHeight += header.offsetHeight;
	        }
	        const footer = this._root.querySelector(".ui5-popup-footer-root");
	        if (footer) {
	            minHeight += footer.offsetHeight;
	        }
	        return minHeight;
	    }
	    get hasValueState() {
	        return this.state !== information.o.None;
	    }
	    get _dialogStateIcon() {
	        return ICON_PER_STATE[this.state];
	    }
	    get _role() {
	        if (this.accessibleRole === PopupAccessibleRole$1.None) {
	            return undefined;
	        }
	        if (this.state === information.o.Negative || this.state === information.o.Critical) {
	            return toLowercaseEnumValue.n(PopupAccessibleRole$1.AlertDialog);
	        }
	        return toLowercaseEnumValue.n(this.accessibleRole);
	    }
	    _show() {
	        super._show();
	        this._center();
	    }
	    onBeforeRendering() {
	        super.onBeforeRendering();
	        this._isRTL = this.effectiveDir === "rtl";
	    }
	    onEnterDOM() {
	        super.onEnterDOM();
	        this._attachScreenResizeHandler();
	        this.addEventListener("dragstart", this._dragStartHandler);
	        this.setAttribute("data-sap-ui-fastnavgroup-container", "true");
	    }
	    onExitDOM() {
	        super.onExitDOM();
	        this._detachScreenResizeHandler();
	        this.removeEventListener("dragstart", this._dragStartHandler);
	    }
	    /**
	     * @override
	     */
	    _resize() {
	        super._resize();
	        if (!this._draggedOrResized) {
	            this._center();
	        }
	    }
	    _screenResize() {
	        this._center();
	    }
	    _attachScreenResizeHandler() {
	        if (!this._screenResizeHandlerAttached) {
	            window.addEventListener("resize", this._screenResizeHandler);
	            this._screenResizeHandlerAttached = true;
	        }
	    }
	    _detachScreenResizeHandler() {
	        if (this._screenResizeHandlerAttached) {
	            window.removeEventListener("resize", this._screenResizeHandler);
	            this._screenResizeHandlerAttached = false; // prevent dialog from repositioning during resizing
	        }
	    }
	    _center() {
	        const height = window.innerHeight - this.offsetHeight, width = window.innerWidth - this.offsetWidth;
	        Object.assign(this.style, {
	            top: `${Math.round(height / 2)}px`,
	            left: `${Math.round(width / 2)}px`,
	        });
	    }
	    /**
	     * Event handlers
	     */
	    _onDragMouseDown(e) {
	        // allow dragging only on the header
	        if (!this._movable || !this.draggable || !Dialog_1._isHeader(e.target)) {
	            return;
	        }
	        const { top, left, } = this.getBoundingClientRect();
	        const { width, height, } = window.getComputedStyle(this);
	        Object.assign(this.style, {
	            top: `${top}px`,
	            left: `${left}px`,
	            width: `${Math.round(Number.parseFloat(width) * 100) / 100}px`,
	            height: `${Math.round(Number.parseFloat(height) * 100) / 100}px`,
	        });
	        this._x = e.clientX;
	        this._y = e.clientY;
	        this._draggedOrResized = true;
	        this._attachMouseDragHandlers();
	    }
	    _onDragMouseMove(e) {
	        e.preventDefault();
	        const { clientX, clientY } = e;
	        const calcX = this._x - clientX;
	        const calcY = this._y - clientY;
	        const { left, top, } = this.getBoundingClientRect();
	        Object.assign(this.style, {
	            left: `${Math.floor(left - calcX)}px`,
	            top: `${Math.floor(top - calcY)}px`,
	        });
	        this._x = clientX;
	        this._y = clientY;
	    }
	    _onDragMouseUp() {
	        delete this._x;
	        delete this._y;
	        this._detachMouseDragHandlers();
	    }
	    _onDragOrResizeKeyDown(e) {
	        if (!this._movable || !Dialog_1._isHeader(e.target)) {
	            return;
	        }
	        if (this.draggable && [webcomponentsBase.D, webcomponentsBase.P, webcomponentsBase.K, webcomponentsBase.c].some(key => key(e))) {
	            this._dragWithEvent(e);
	            return;
	        }
	        if (this.resizable && [webcomponentsBase.O, webcomponentsBase.u$1, webcomponentsBase.w, webcomponentsBase.T].some(key => key(e))) {
	            this._resizeWithEvent(e);
	        }
	    }
	    _dragWithEvent(e) {
	        const { top, left, width, height, } = this.getBoundingClientRect();
	        let newPos = 0;
	        let posDirection = "top";
	        switch (true) {
	            case webcomponentsBase.D(e):
	                newPos = top - STEP_SIZE;
	                posDirection = "top";
	                break;
	            case webcomponentsBase.P(e):
	                newPos = top + STEP_SIZE;
	                posDirection = "top";
	                break;
	            case webcomponentsBase.K(e):
	                newPos = left - STEP_SIZE;
	                posDirection = "left";
	                break;
	            case webcomponentsBase.c(e):
	                newPos = left + STEP_SIZE;
	                posDirection = "left";
	                break;
	        }
	        newPos = m$1(newPos, 0, posDirection === "left" ? window.innerWidth - width : window.innerHeight - height);
	        this.style[posDirection] = `${newPos}px`;
	    }
	    _resizeWithEvent(e) {
	        this._draggedOrResized = true;
	        this.addEventListener("ui5-before-close", this._revertSize, { once: true });
	        const { top, left } = this.getBoundingClientRect(), style = window.getComputedStyle(this), minWidth = Number.parseFloat(style.minWidth), maxWidth = window.innerWidth - left, maxHeight = window.innerHeight - top;
	        let width = Number.parseFloat(style.width), height = Number.parseFloat(style.height);
	        switch (true) {
	            case webcomponentsBase.O(e):
	                height -= STEP_SIZE;
	                break;
	            case webcomponentsBase.u$1(e):
	                height += STEP_SIZE;
	                break;
	            case webcomponentsBase.w(e):
	                width -= STEP_SIZE;
	                break;
	            case webcomponentsBase.T(e):
	                width += STEP_SIZE;
	                break;
	        }
	        width = m$1(width, minWidth, maxWidth);
	        height = m$1(height, this._minHeight, maxHeight);
	        Object.assign(this.style, {
	            width: `${width}px`,
	            height: `${height}px`,
	        });
	    }
	    _attachMouseDragHandlers() {
	        window.addEventListener("mousemove", this._dragMouseMoveHandler);
	        window.addEventListener("mouseup", this._dragMouseUpHandler);
	    }
	    _detachMouseDragHandlers() {
	        window.removeEventListener("mousemove", this._dragMouseMoveHandler);
	        window.removeEventListener("mouseup", this._dragMouseUpHandler);
	    }
	    _onResizeMouseDown(e) {
	        if (!this._movable || !this.resizable) {
	            return;
	        }
	        e.preventDefault();
	        const { top, left, } = this.getBoundingClientRect();
	        const { width, height, minWidth, } = window.getComputedStyle(this);
	        this._initialX = e.clientX;
	        this._initialY = e.clientY;
	        this._initialWidth = Number.parseFloat(width);
	        this._initialHeight = Number.parseFloat(height);
	        this._initialTop = top;
	        this._initialLeft = left;
	        this._minWidth = Number.parseFloat(minWidth);
	        this._cachedMinHeight = this._minHeight;
	        Object.assign(this.style, {
	            top: `${top}px`,
	            left: `${left}px`,
	        });
	        this._draggedOrResized = true;
	        this._attachMouseResizeHandlers();
	    }
	    _onResizeMouseMove(e) {
	        const { clientX, clientY } = e;
	        let newWidth, newLeft;
	        if (this._isRTL) {
	            newWidth = m$1(this._initialWidth - (clientX - this._initialX), this._minWidth, this._initialLeft + this._initialWidth);
	            newLeft = m$1(this._initialLeft + (clientX - this._initialX), 0, this._initialX + this._initialWidth - this._minWidth);
	        }
	        else {
	            newWidth = m$1(this._initialWidth + (clientX - this._initialX), this._minWidth, window.innerWidth - this._initialLeft);
	        }
	        const newHeight = m$1(this._initialHeight + (clientY - this._initialY), this._cachedMinHeight, window.innerHeight - this._initialTop);
	        Object.assign(this.style, {
	            height: `${newHeight}px`,
	            width: `${newWidth}px`,
	            left: newLeft ? `${newLeft}px` : undefined,
	        });
	    }
	    _onResizeMouseUp() {
	        delete this._initialX;
	        delete this._initialY;
	        delete this._initialWidth;
	        delete this._initialHeight;
	        delete this._initialTop;
	        delete this._initialLeft;
	        delete this._minWidth;
	        delete this._cachedMinHeight;
	        this._detachMouseResizeHandlers();
	    }
	    _handleDragStart(e) {
	        if (this.draggable) {
	            e.preventDefault();
	        }
	    }
	    _attachMouseResizeHandlers() {
	        window.addEventListener("mousemove", this._resizeMouseMoveHandler);
	        window.addEventListener("mouseup", this._resizeMouseUpHandler);
	        this.addEventListener("ui5-before-close", this._revertSize, { once: true });
	    }
	    _detachMouseResizeHandlers() {
	        window.removeEventListener("mousemove", this._resizeMouseMoveHandler);
	        window.removeEventListener("mouseup", this._resizeMouseUpHandler);
	    }
	};
	__decorate$4([
	    webcomponentsBase.s()
	], Dialog.prototype, "headerText", void 0);
	__decorate$4([
	    webcomponentsBase.s({ type: Boolean })
	], Dialog.prototype, "stretch", void 0);
	__decorate$4([
	    webcomponentsBase.s({ type: Boolean })
	], Dialog.prototype, "draggable", void 0);
	__decorate$4([
	    webcomponentsBase.s({ type: Boolean })
	], Dialog.prototype, "resizable", void 0);
	__decorate$4([
	    webcomponentsBase.s()
	], Dialog.prototype, "state", void 0);
	__decorate$4([
	    webcomponentsBase.d()
	], Dialog.prototype, "header", void 0);
	__decorate$4([
	    webcomponentsBase.d()
	], Dialog.prototype, "footer", void 0);
	__decorate$4([
	    i18nDefaults.i("@ui5/webcomponents")
	], Dialog, "i18nBundle", void 0);
	Dialog = Dialog_1 = __decorate$4([
	    webcomponentsBase.m({
	        tag: "ui5-dialog",
	        template: DialogTemplate,
	        styles: [
	            Popup$1.styles,
	            PopupsCommonCss,
	            dialogCSS,
	            List.a(),
	        ],
	    })
	], Dialog);
	Dialog.define();
	var Dialog$1 = Dialog;

	function ResponsivePopoverTemplate() {
	    if (!this._isPhone) {
	        return PopoverTemplate.call(this);
	    }
	    return (i18nDefaults.jsxs(Dialog$1, { "root-element": true, accessibleName: this.accessibleName, accessibleNameRef: this.accessibleNameRef, accessibleRole: this.accessibleRole, stretch: true, preventInitialFocus: this.preventInitialFocus, preventFocusRestore: this.preventFocusRestore, initialFocus: this.initialFocus, onBeforeOpen: this._beforeDialogOpen, onOpen: this._afterDialogOpen, onBeforeClose: this._beforeDialogClose, onClose: this._afterDialogClose, exportparts: "content, header, footer", open: this.open, children: [!this._hideHeader && i18nDefaults.jsx(i18nDefaults.Fragment, { children: this.header.length ?
	                    i18nDefaults.jsx("slot", { slot: "header", name: "header" })
	                    :
	                        i18nDefaults.jsxs("div", { class: this.classes.header, slot: "header", children: [this.headerText &&
	                                    i18nDefaults.jsx(Title$1, { level: "H1", wrappingType: "None", class: "ui5-popup-header-text ui5-responsive-popover-header-text", children: this.headerText }), !this._hideCloseButton &&
	                                    i18nDefaults.jsx(Button.Button, { icon: information.decline, design: "Transparent", accessibleName: this._closeDialogAriaLabel, onClick: this._dialogCloseButtonClick })] }) }), i18nDefaults.jsx("slot", {}), i18nDefaults.jsx("slot", { slot: "footer", name: "footer" })] }));
	}

	/**
	 * Popover placements.
	 * @public
	 */
	var PopoverPlacement;
	(function (PopoverPlacement) {
	    /**
	     * Popover will be placed at the start of the reference element.
	     * @public
	     */
	    PopoverPlacement["Start"] = "Start";
	    /**
	     * Popover will be placed at the end of the reference element.
	     * @public
	     */
	    PopoverPlacement["End"] = "End";
	    /**
	     * Popover will be placed at the top of the reference element.
	     * @public
	     */
	    PopoverPlacement["Top"] = "Top";
	    /**
	     * Popover will be placed at the bottom of the reference element.
	     * @public
	     */
	    PopoverPlacement["Bottom"] = "Bottom";
	})(PopoverPlacement || (PopoverPlacement = {}));
	var PopoverPlacement$1 = PopoverPlacement;

	/**
	 * Popover vertical align types.
	 * @public
	 */
	var PopoverVerticalAlign;
	(function (PopoverVerticalAlign) {
	    /**
	     * @public
	     */
	    PopoverVerticalAlign["Center"] = "Center";
	    /**
	     * Popover will be placed at the top of the reference control.
	     * @public
	     */
	    PopoverVerticalAlign["Top"] = "Top";
	    /**
	     * Popover will be placed at the bottom of the reference control.
	     * @public
	     */
	    PopoverVerticalAlign["Bottom"] = "Bottom";
	    /**
	     * Popover will be streched
	     * @public
	     */
	    PopoverVerticalAlign["Stretch"] = "Stretch";
	})(PopoverVerticalAlign || (PopoverVerticalAlign = {}));
	var PopoverVerticalAlign$1 = PopoverVerticalAlign;

	/**
	 * Popover horizontal align types.
	 * @public
	 */
	var PopoverHorizontalAlign;
	(function (PopoverHorizontalAlign) {
	    /**
	     * Popover is centered.
	     * @public
	     */
	    PopoverHorizontalAlign["Center"] = "Center";
	    /**
	     * Popover is aligned with the start of the target.
	     * @public
	     */
	    PopoverHorizontalAlign["Start"] = "Start";
	    /**
	     * Popover is aligned with the end of the target.
	     * @public
	     */
	    PopoverHorizontalAlign["End"] = "End";
	    /**
	     * Popover is stretched.
	     * @public
	     */
	    PopoverHorizontalAlign["Stretch"] = "Stretch";
	})(PopoverHorizontalAlign || (PopoverHorizontalAlign = {}));
	var PopoverHorizontalAlign$1 = PopoverHorizontalAlign;

	let updateInterval;
	const intervalTimeout = 300;
	const openedRegistry = [];
	const repositionPopovers = () => {
	    openedRegistry.forEach(popover => {
	        popover.instance.reposition();
	    });
	};
	const closePopoversIfLostFocus = () => {
	    if (webcomponentsBase.t().tagName === "IFRAME") {
	        getRegistry().reverse().forEach(popup => popup.instance.closePopup(false, false, true));
	    }
	};
	const runUpdateInterval = () => {
	    updateInterval = setInterval(() => {
	        repositionPopovers();
	        closePopoversIfLostFocus();
	    }, intervalTimeout);
	};
	const stopUpdateInterval = () => {
	    clearInterval(updateInterval);
	};
	const attachGlobalScrollHandler = () => {
	    document.addEventListener("scroll", repositionPopovers, { capture: true });
	};
	const detachGlobalScrollHandler = () => {
	    document.removeEventListener("scroll", repositionPopovers, { capture: true });
	};
	const attachScrollHandler = (popover) => {
	    popover && popover.shadowRoot.addEventListener("scroll", repositionPopovers, { capture: true });
	};
	const detachScrollHandler = (popover) => {
	    popover && popover.shadowRoot.removeEventListener("scroll", repositionPopovers, { capture: true });
	};
	const attachGlobalClickHandler = () => {
	    document.addEventListener("mousedown", clickHandler, { capture: true });
	};
	const detachGlobalClickHandler = () => {
	    document.removeEventListener("mousedown", clickHandler, { capture: true });
	};
	const clickHandler = (event) => {
	    const openedPopups = getOpenedPopups();
	    if (openedPopups.length === 0) {
	        return;
	    }
	    const isTopPopupPopover = instanceOfPopover(openedPopups[openedPopups.length - 1].instance);
	    if (!isTopPopupPopover) {
	        return;
	    }
	    // loop all open popovers
	    for (let i = (openedPopups.length - 1); i !== -1; i--) {
	        const popup = openedPopups[i].instance;
	        // if popup is modal, opener is clicked, popup is dialog skip closing
	        if (popup.isModal || popup.isOpenerClicked(event)) {
	            return;
	        }
	        if (f(event, popup.getBoundingClientRect())) {
	            break;
	        }
	        popup.closePopup();
	    }
	};
	const addOpenedPopover = (instance) => {
	    const parentPopovers = getParentPopoversIfNested(instance);
	    addOpenedPopup(instance, parentPopovers);
	    openedRegistry.push({
	        instance,
	        parentPopovers,
	    });
	    attachScrollHandler(instance);
	    if (openedRegistry.length === 1) {
	        attachGlobalScrollHandler();
	        attachGlobalClickHandler();
	        runUpdateInterval();
	    }
	};
	const removeOpenedPopover = (instance) => {
	    const popoversToClose = [instance];
	    for (let i = 0; i < openedRegistry.length; i++) {
	        const indexOfCurrentInstance = openedRegistry[i].parentPopovers.indexOf(instance);
	        if (openedRegistry[i].parentPopovers.length > 0 && indexOfCurrentInstance > -1) {
	            popoversToClose.push(openedRegistry[i].instance);
	        }
	    }
	    for (let i = popoversToClose.length - 1; i >= 0; i--) {
	        for (let j = 0; j < openedRegistry.length; j++) {
	            let indexOfItemToRemove = -1;
	            if (popoversToClose[i] === openedRegistry[j].instance) {
	                indexOfItemToRemove = j;
	            }
	            if (indexOfItemToRemove >= 0) {
	                removeOpenedPopup(openedRegistry[indexOfItemToRemove].instance);
	                detachScrollHandler(openedRegistry[indexOfItemToRemove].instance);
	                const itemToClose = openedRegistry.splice(indexOfItemToRemove, 1);
	                itemToClose[0].instance.closePopup(false, true);
	            }
	        }
	    }
	    if (!openedRegistry.length) {
	        detachGlobalScrollHandler();
	        detachGlobalClickHandler();
	        stopUpdateInterval();
	    }
	};
	const getRegistry = () => {
	    return openedRegistry;
	};
	const getParentPopoversIfNested = (instance) => {
	    let currentElement = instance.parentNode;
	    const parentPopovers = [];
	    while (currentElement && currentElement.parentNode) {
	        for (let i = 0; i < openedRegistry.length; i++) {
	            if (currentElement === openedRegistry[i].instance) {
	                parentPopovers.push(currentElement);
	            }
	        }
	        currentElement = currentElement.parentNode;
	    }
	    return parentPopovers;
	};

	Icons.p("@ui5/webcomponents-theming", "sap_horizon", async () => i18nDefaults.defaultThemeBase);
	Icons.p("@ui5/webcomponents", "sap_horizon", async () => i18nDefaults.defaultTheme);
	var PopoverCss = `:host{box-shadow:var(--_ui5-v2-10-0-rc-2_popover_box_shadow);background-color:var(--_ui5-v2-10-0-rc-2_popover_background);max-width:calc(100vw - (100vw - 100%) - 2 * var(--_ui5-v2-10-0-rc-2_popup_viewport_margin))}:host([hide-arrow]){box-shadow:var(--_ui5-v2-10-0-rc-2_popover_no_arrow_box_shadow)}:host([actual-placement="Bottom"]) .ui5-popover-arrow{left:calc(50% - .5625rem);top:-.5rem;height:.5rem}:host([actual-placement="Bottom"]) .ui5-popover-arrow:after{margin:var(--_ui5-v2-10-0-rc-2_popover_upward_arrow_margin)}:host([actual-placement="Start"]) .ui5-popover-arrow{top:calc(50% - .5625rem);right:-.5625rem;width:.5625rem}:host([actual-placement="Start"]) .ui5-popover-arrow:after{margin:var(--_ui5-v2-10-0-rc-2_popover_right_arrow_margin)}:host([actual-placement="Top"]) .ui5-popover-arrow{left:calc(50% - .5625rem);height:.5625rem;top:100%}:host([actual-placement="Top"]) .ui5-popover-arrow:after{margin:var(--_ui5-v2-10-0-rc-2_popover_downward_arrow_margin)}:host(:not([actual-placement])) .ui5-popover-arrow,:host([actual-placement="End"]) .ui5-popover-arrow{left:-.5625rem;top:calc(50% - .5625rem);width:.5625rem;height:1rem}:host(:not([actual-placement])) .ui5-popover-arrow:after,:host([actual-placement="End"]) .ui5-popover-arrow:after{margin:var(--_ui5-v2-10-0-rc-2_popover_left_arrow_margin)}:host([hide-arrow]) .ui5-popover-arrow{display:none}.ui5-popover-root{min-width:6.25rem}.ui5-popover-arrow{pointer-events:none;display:block;width:1rem;height:1rem;position:absolute;overflow:hidden}.ui5-popover-arrow:after{content:"";display:block;width:.7rem;height:.7rem;background-color:var(--_ui5-v2-10-0-rc-2_popover_background);box-shadow:var(--_ui5-v2-10-0-rc-2_popover_box_shadow);transform:rotate(-45deg)}:host([modal])::backdrop{background-color:var(--_ui5-v2-10-0-rc-2_popup_block_layer_background);opacity:var(--_ui5-v2-10-0-rc-2_popup_block_layer_opacity)}:host([modal]) .ui5-block-layer{display:block}
`;

	var __decorate$3 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var Popover_1;
	const ARROW_SIZE = 8;
	/**
	 * @class
	 *
	 * ### Overview
	 *
	 * The `ui5-popover` component displays additional information for an object
	 * in a compact way and without leaving the page.
	 * The Popover can contain various UI elements, such as fields, tables, images, and charts.
	 * It can also include actions in the footer.
	 *
	 * ### Structure
	 *
	 * The popover has three main areas:
	 *
	 * - Header (optional)
	 * - Content
	 * - Footer (optional)
	 *
	 * **Note:** The `ui5-popover` is closed when the user clicks
	 * or taps outside the popover
	 * or selects an action within the popover. You can prevent this with the
	 * `modal` property.
	 *
	 * ### ES6 Module Import
	 *
	 * `import "@ui5/webcomponents/dist/Popover.js";`
	 *
	 * @constructor
	 * @extends Popup
	 * @since 1.0.0-rc.6
	 * @public
	 * @csspart header - Used to style the header of the component
	 * @csspart content - Used to style the content of the component
	 * @csspart footer - Used to style the footer of the component
	 */
	let Popover = Popover_1 = class Popover extends Popup$1 {
	    static get VIEWPORT_MARGIN() {
	        return 10; // px
	    }
	    constructor() {
	        super();
	        /**
	         * Determines on which side the component is placed at.
	         * @default "End"
	         * @public
	         */
	        this.placement = "End";
	        /**
	         * Determines the horizontal alignment of the component.
	         * @default "Center"
	         * @public
	         */
	        this.horizontalAlign = "Center";
	        /**
	         * Determines the vertical alignment of the component.
	         * @default "Center"
	         * @public
	         */
	        this.verticalAlign = "Center";
	        /**
	         * Defines whether the component should close when
	         * clicking/tapping outside of the popover.
	         * If enabled, it blocks any interaction with the background.
	         * @default false
	         * @public
	         */
	        this.modal = false;
	        /**
	         * Determines whether the component arrow is hidden.
	         * @default false
	         * @public
	         * @since 1.0.0-rc.15
	         */
	        this.hideArrow = false;
	        /**
	         * Determines if there is no enough space, the component can be placed
	         * over the target.
	         * @default false
	         * @public
	         */
	        this.allowTargetOverlap = false;
	        /**
	         * Sets the X translation of the arrow
	         * @private
	         */
	        this.arrowTranslateX = 0;
	        /**
	         * Sets the Y translation of the arrow
	         * @private
	         */
	        this.arrowTranslateY = 0;
	        /**
	         * Returns the calculated placement depending on the free space
	         * @private
	         */
	        this.actualPlacement = "End";
	    }
	    /**
	     * Defines the ID or DOM Reference of the element at which the popover is shown.
	     * When using this attribute in a declarative way, you must only use the `id` (as a string) of the element at which you want to show the popover.
	     * You can only set the `opener` attribute to a DOM Reference when using JavaScript.
	     * @public
	     * @default undefined
	     * @since 1.2.0
	     */
	    set opener(value) {
	        if (this._opener === value) {
	            return;
	        }
	        this._opener = value;
	        if (value && this.open) {
	            this.openPopup();
	        }
	    }
	    get opener() {
	        return this._opener;
	    }
	    async openPopup() {
	        if (this._opened) {
	            return;
	        }
	        const opener = this.getOpenerHTMLElement(this.opener);
	        if (!opener) {
	            return;
	        }
	        if (this.isOpenerOutsideViewport(opener.getBoundingClientRect())) {
	            await Icons.f$3();
	            this.open = false;
	            this.fireDecoratorEvent("close");
	            return;
	        }
	        this._openerRect = opener.getBoundingClientRect();
	        await super.openPopup();
	    }
	    isOpenerClicked(e) {
	        const target = e.target;
	        const opener = this.getOpenerHTMLElement(this.opener);
	        if (!opener) {
	            return false;
	        }
	        if (target === opener) {
	            return true;
	        }
	        if (this._isUI5AbstractElement(target) && target.getFocusDomRef() === opener) {
	            return true;
	        }
	        return e.composedPath().indexOf(opener) > -1;
	    }
	    /**
	     * Override for the _addOpenedPopup hook, which would otherwise just call addOpenedPopup(this)
	     * @private
	     */
	    _addOpenedPopup() {
	        addOpenedPopover(this);
	    }
	    /**
	     * Override for the _removeOpenedPopup hook, which would otherwise just call removeOpenedPopup(this)
	     * @private
	     */
	    _removeOpenedPopup() {
	        removeOpenedPopover(this);
	    }
	    getOpenerHTMLElement(opener) {
	        if (opener === undefined) {
	            return opener;
	        }
	        if (opener instanceof HTMLElement) {
	            return this._isUI5AbstractElement(opener) ? opener.getFocusDomRef() : opener;
	        }
	        let rootNode = this.getRootNode();
	        if (rootNode === this) {
	            rootNode = document;
	        }
	        let openerHTMLElement = rootNode.getElementById(opener);
	        if (rootNode instanceof ShadowRoot && !openerHTMLElement) {
	            openerHTMLElement = document.getElementById(opener);
	        }
	        if (openerHTMLElement) {
	            return this._isUI5AbstractElement(openerHTMLElement) ? openerHTMLElement.getFocusDomRef() : openerHTMLElement;
	        }
	        return openerHTMLElement;
	    }
	    shouldCloseDueToOverflow(placement, openerRect) {
	        const threshold = 32;
	        const limits = {
	            "Start": openerRect.right,
	            "End": openerRect.left,
	            "Top": openerRect.top,
	            "Bottom": openerRect.bottom,
	        };
	        const opener = this.getOpenerHTMLElement(this.opener);
	        const closedPopupParent = i(opener);
	        let overflowsBottom = false;
	        let overflowsTop = false;
	        if (closedPopupParent instanceof Popover_1) {
	            const contentRect = closedPopupParent.getBoundingClientRect();
	            overflowsBottom = openerRect.top > (contentRect.top + contentRect.height);
	            overflowsTop = (openerRect.top + openerRect.height) < contentRect.top;
	        }
	        return (limits[placement] < 0 || (limits[placement] + threshold > closedPopupParent.innerHeight)) || overflowsBottom || overflowsTop;
	    }
	    shouldCloseDueToNoOpener(openerRect) {
	        return openerRect.top === 0
	            && openerRect.bottom === 0
	            && openerRect.left === 0
	            && openerRect.right === 0;
	    }
	    isOpenerOutsideViewport(openerRect) {
	        return openerRect.bottom < 0
	            || openerRect.top > window.innerHeight
	            || openerRect.right < 0
	            || openerRect.left > window.innerWidth;
	    }
	    /**
	     * @override
	     */
	    _resize() {
	        super._resize();
	        if (this.open) {
	            this.reposition();
	        }
	    }
	    reposition() {
	        this._show();
	    }
	    async _show() {
	        super._show();
	        const opener = this.getOpenerHTMLElement(this.opener);
	        if (opener && webcomponentsBase.v(opener) && !opener.getDomRef()) {
	            return;
	        }
	        if (!this._opened) {
	            this._showOutsideViewport();
	        }
	        const popoverSize = this.getPopoverSize();
	        let placement;
	        if (popoverSize.width === 0 || popoverSize.height === 0) {
	            // size can not be determined properly at this point, popover will be shown with the next reposition
	            return;
	        }
	        if (this.open) {
	            // update opener rect if it was changed during the popover being opened
	            this._openerRect = opener.getBoundingClientRect();
	        }
	        if (this._oldPlacement && this.shouldCloseDueToNoOpener(this._openerRect) && this.isFocusWithin()) {
	            // reuse the old placement as the opener is not available,
	            // but keep the popover open as the focus is within
	            placement = this._oldPlacement;
	        }
	        else {
	            placement = this.calcPlacement(this._openerRect, popoverSize);
	        }
	        if (this._preventRepositionAndClose || this.isOpenerOutsideViewport(this._openerRect)) {
	            await this._waitForDomRef();
	            return this.closePopup();
	        }
	        this._oldPlacement = placement;
	        this.actualPlacement = placement.placement;
	        let left = m$1(this._left, Popover_1.VIEWPORT_MARGIN, document.documentElement.clientWidth - popoverSize.width - Popover_1.VIEWPORT_MARGIN);
	        if (this.actualPlacement === PopoverPlacement$1.End) {
	            left = Math.max(left, this._left);
	        }
	        let top = m$1(this._top, Popover_1.VIEWPORT_MARGIN, document.documentElement.clientHeight - popoverSize.height - Popover_1.VIEWPORT_MARGIN);
	        if (this.actualPlacement === PopoverPlacement$1.Bottom) {
	            top = Math.max(top, this._top);
	        }
	        this.arrowTranslateX = placement.arrow.x;
	        this.arrowTranslateY = placement.arrow.y;
	        top = this._adjustForIOSKeyboard(top);
	        Object.assign(this.style, {
	            top: `${top}px`,
	            left: `${left}px`,
	        });
	        if (this.horizontalAlign === PopoverHorizontalAlign$1.Stretch && this._width) {
	            this.style.width = this._width;
	        }
	        if (this.verticalAlign === PopoverVerticalAlign$1.Stretch && this._height) {
	            this.style.height = this._height;
	        }
	    }
	    /**
	     * Adjust the desired top position to compensate for shift of the screen
	     * caused by opened keyboard on iOS which affects all elements with position:fixed.
	     * @private
	     * @param top The target top in px.
	     * @returns The adjusted top in px.
	     */
	    _adjustForIOSKeyboard(top) {
	        if (!Icons.w$1()) {
	            return top;
	        }
	        const actualTop = Math.ceil(this.getBoundingClientRect().top);
	        return top + (Number.parseInt(this.style.top || "0") - actualTop);
	    }
	    getPopoverSize() {
	        const rect = this.getBoundingClientRect(), width = rect.width, height = rect.height;
	        return { width, height };
	    }
	    _showOutsideViewport() {
	        Object.assign(this.style, {
	            top: "-10000px",
	            left: "-10000px",
	        });
	    }
	    _isUI5AbstractElement(el) {
	        return webcomponentsBase.v(el) && el.isUI5AbstractElement;
	    }
	    get arrowDOM() {
	        return this.shadowRoot.querySelector(".ui5-popover-arrow");
	    }
	    /**
	     * @protected
	     */
	    focusOpener() {
	        this.getOpenerHTMLElement(this.opener)?.focus();
	    }
	    /**
	     * @private
	     */
	    calcPlacement(targetRect, popoverSize) {
	        let left = Popover_1.VIEWPORT_MARGIN;
	        let top = 0;
	        const allowTargetOverlap = this.allowTargetOverlap;
	        const clientWidth = document.documentElement.clientWidth;
	        const clientHeight = document.documentElement.clientHeight;
	        let maxHeight = clientHeight;
	        let maxWidth = clientWidth;
	        const placement = this.getActualPlacement(targetRect, popoverSize);
	        this._preventRepositionAndClose = this.shouldCloseDueToNoOpener(targetRect) || this.shouldCloseDueToOverflow(placement, targetRect);
	        const isVertical = placement === PopoverPlacement$1.Top
	            || placement === PopoverPlacement$1.Bottom;
	        if (this.horizontalAlign === PopoverHorizontalAlign$1.Stretch && isVertical) {
	            popoverSize.width = targetRect.width;
	            this._width = `${targetRect.width}px`;
	        }
	        else if (this.verticalAlign === PopoverVerticalAlign$1.Stretch && !isVertical) {
	            popoverSize.height = targetRect.height;
	            this._height = `${targetRect.height}px`;
	        }
	        const arrowOffset = this.hideArrow ? 0 : ARROW_SIZE;
	        // calc popover positions
	        switch (placement) {
	            case PopoverPlacement$1.Top:
	                left = this.getVerticalLeft(targetRect, popoverSize);
	                top = Math.max(targetRect.top - popoverSize.height - arrowOffset, 0);
	                if (!allowTargetOverlap) {
	                    maxHeight = targetRect.top - arrowOffset;
	                }
	                break;
	            case PopoverPlacement$1.Bottom:
	                left = this.getVerticalLeft(targetRect, popoverSize);
	                top = targetRect.bottom + arrowOffset;
	                if (allowTargetOverlap) {
	                    top = Math.max(Math.min(top, clientHeight - popoverSize.height), 0);
	                }
	                else {
	                    maxHeight = clientHeight - targetRect.bottom - arrowOffset;
	                }
	                break;
	            case PopoverPlacement$1.Start:
	                left = Math.max(targetRect.left - popoverSize.width - arrowOffset, 0);
	                top = this.getHorizontalTop(targetRect, popoverSize);
	                if (!allowTargetOverlap) {
	                    maxWidth = targetRect.left - arrowOffset;
	                }
	                break;
	            case PopoverPlacement$1.End:
	                left = targetRect.left + targetRect.width + arrowOffset;
	                top = this.getHorizontalTop(targetRect, popoverSize);
	                if (allowTargetOverlap) {
	                    left = Math.max(Math.min(left, clientWidth - popoverSize.width), 0);
	                }
	                else {
	                    maxWidth = clientWidth - targetRect.right - arrowOffset;
	                }
	                break;
	        }
	        // correct popover positions
	        if (isVertical) {
	            if (popoverSize.width > clientWidth || left < Popover_1.VIEWPORT_MARGIN) {
	                left = Popover_1.VIEWPORT_MARGIN;
	            }
	            else if (left + popoverSize.width > clientWidth - Popover_1.VIEWPORT_MARGIN) {
	                left = clientWidth - Popover_1.VIEWPORT_MARGIN - popoverSize.width;
	            }
	        }
	        else {
	            if (popoverSize.height > clientHeight || top < Popover_1.VIEWPORT_MARGIN) { // eslint-disable-line
	                top = Popover_1.VIEWPORT_MARGIN;
	            }
	            else if (top + popoverSize.height > clientHeight - Popover_1.VIEWPORT_MARGIN) {
	                top = clientHeight - Popover_1.VIEWPORT_MARGIN - popoverSize.height;
	            }
	        }
	        this._maxHeight = Math.round(maxHeight - Popover_1.VIEWPORT_MARGIN);
	        this._maxWidth = Math.round(maxWidth - Popover_1.VIEWPORT_MARGIN);
	        if (this._left === undefined || Math.abs(this._left - left) > 1.5) {
	            this._left = Math.round(left);
	        }
	        if (this._top === undefined || Math.abs(this._top - top) > 1.5) {
	            this._top = Math.round(top);
	        }
	        const borderRadius = Number.parseInt(window.getComputedStyle(this).getPropertyValue("border-radius"));
	        const arrowPos = this.getArrowPosition(targetRect, popoverSize, left, top, isVertical, borderRadius);
	        this._left += this.getRTLCorrectionLeft();
	        return {
	            arrow: arrowPos,
	            top: this._top,
	            left: this._left,
	            placement,
	        };
	    }
	    getRTLCorrectionLeft() {
	        return parseFloat(window.getComputedStyle(this).left) - this.getBoundingClientRect().left;
	    }
	    /**
	     * Calculates the position for the arrow.
	     * @private
	     * @param targetRect BoundingClientRect of the target element
	     * @param popoverSize Width and height of the popover
	     * @param left Left offset of the popover
	     * @param top Top offset of the popover
	     * @param isVertical If the popover is positioned vertically to the target element
	     * @param borderRadius Value of the border-radius property
	     * @returns  Arrow's coordinates
	     */
	    getArrowPosition(targetRect, popoverSize, left, top, isVertical, borderRadius) {
	        const horizontalAlign = this._actualHorizontalAlign;
	        let arrowXCentered = horizontalAlign === PopoverHorizontalAlign$1.Center || horizontalAlign === PopoverHorizontalAlign$1.Stretch;
	        if (horizontalAlign === PopoverHorizontalAlign$1.End && left <= targetRect.left) {
	            arrowXCentered = true;
	        }
	        if (horizontalAlign === PopoverHorizontalAlign$1.Start && left + popoverSize.width >= targetRect.left + targetRect.width) {
	            arrowXCentered = true;
	        }
	        let arrowTranslateX = 0;
	        if (isVertical && arrowXCentered) {
	            arrowTranslateX = targetRect.left + targetRect.width / 2 - left - popoverSize.width / 2;
	        }
	        let arrowTranslateY = 0;
	        if (!isVertical) {
	            arrowTranslateY = targetRect.top + targetRect.height / 2 - top - popoverSize.height / 2;
	        }
	        // Restricts the arrow's translate value along each dimension,
	        // so that the arrow does not clip over the popover's rounded borders.
	        const safeRangeForArrowY = popoverSize.height / 2 - borderRadius - ARROW_SIZE / 2 - 2;
	        arrowTranslateY = m$1(arrowTranslateY, -safeRangeForArrowY, safeRangeForArrowY);
	        const safeRangeForArrowX = popoverSize.width / 2 - borderRadius - ARROW_SIZE / 2 - 2;
	        arrowTranslateX = m$1(arrowTranslateX, -safeRangeForArrowX, safeRangeForArrowX);
	        return {
	            x: Math.round(arrowTranslateX),
	            y: Math.round(arrowTranslateY),
	        };
	    }
	    /**
	     * Fallbacks to new placement, prioritizing `Left` and `Right` placements.
	     * @private
	     */
	    fallbackPlacement(clientWidth, clientHeight, targetRect, popoverSize) {
	        if (targetRect.left > popoverSize.width) {
	            return PopoverPlacement$1.Start;
	        }
	        if (clientWidth - targetRect.right > targetRect.left) {
	            return PopoverPlacement$1.End;
	        }
	        if (clientHeight - targetRect.bottom > popoverSize.height) {
	            return PopoverPlacement$1.Bottom;
	        }
	        if (clientHeight - targetRect.bottom < targetRect.top) {
	            return PopoverPlacement$1.Top;
	        }
	    }
	    getActualPlacement(targetRect, popoverSize) {
	        const placement = this.placement;
	        let actualPlacement = placement;
	        const clientWidth = document.documentElement.clientWidth;
	        const clientHeight = document.documentElement.clientHeight;
	        switch (placement) {
	            case PopoverPlacement$1.Top:
	                if (targetRect.top < popoverSize.height
	                    && targetRect.top < clientHeight - targetRect.bottom) {
	                    actualPlacement = PopoverPlacement$1.Bottom;
	                }
	                break;
	            case PopoverPlacement$1.Bottom:
	                if (clientHeight - targetRect.bottom < popoverSize.height
	                    && clientHeight - targetRect.bottom < targetRect.top) {
	                    actualPlacement = PopoverPlacement$1.Top;
	                }
	                break;
	            case PopoverPlacement$1.Start:
	                if (targetRect.left < popoverSize.width) {
	                    actualPlacement = this.fallbackPlacement(clientWidth, clientHeight, targetRect, popoverSize) || placement;
	                }
	                break;
	            case PopoverPlacement$1.End:
	                if (clientWidth - targetRect.right < popoverSize.width) {
	                    actualPlacement = this.fallbackPlacement(clientWidth, clientHeight, targetRect, popoverSize) || placement;
	                }
	                break;
	        }
	        return actualPlacement;
	    }
	    getVerticalLeft(targetRect, popoverSize) {
	        const horizontalAlign = this._actualHorizontalAlign;
	        let left = Popover_1.VIEWPORT_MARGIN;
	        switch (horizontalAlign) {
	            case PopoverHorizontalAlign$1.Center:
	            case PopoverHorizontalAlign$1.Stretch:
	                left = targetRect.left - (popoverSize.width - targetRect.width) / 2;
	                break;
	            case PopoverHorizontalAlign$1.Start:
	                left = targetRect.left;
	                break;
	            case PopoverHorizontalAlign$1.End:
	                left = targetRect.right - popoverSize.width;
	                break;
	        }
	        return left;
	    }
	    getHorizontalTop(targetRect, popoverSize) {
	        let top = 0;
	        switch (this.verticalAlign) {
	            case PopoverVerticalAlign$1.Center:
	            case PopoverVerticalAlign$1.Stretch:
	                top = targetRect.top - (popoverSize.height - targetRect.height) / 2;
	                break;
	            case PopoverVerticalAlign$1.Top:
	                top = targetRect.top;
	                break;
	            case PopoverVerticalAlign$1.Bottom:
	                top = targetRect.bottom - popoverSize.height;
	                break;
	        }
	        return top;
	    }
	    get isModal() {
	        return this.modal;
	    }
	    get _ariaLabelledBy() {
	        if (!this._ariaLabel && this._displayHeader) {
	            return "ui5-popup-header";
	        }
	        return undefined;
	    }
	    get styles() {
	        return {
	            ...super.styles,
	            root: {
	                "max-height": this._maxHeight ? `${this._maxHeight}px` : "",
	                "max-width": this._maxWidth ? `${this._maxWidth}px` : "",
	            },
	            arrow: {
	                transform: `translate(${this.arrowTranslateX}px, ${this.arrowTranslateY}px)`,
	            },
	        };
	    }
	    get classes() {
	        const allClasses = super.classes;
	        allClasses.root["ui5-popover-root"] = true;
	        return allClasses;
	    }
	    /**
	     * Hook for descendants to hide header.
	     */
	    get _displayHeader() {
	        return !!(this.header.length || this.headerText);
	    }
	    /**
	     * Hook for descendants to hide footer.
	     */
	    get _displayFooter() {
	        return true;
	    }
	    get _actualHorizontalAlign() {
	        if (this.effectiveDir === "rtl") {
	            if (this.horizontalAlign === PopoverHorizontalAlign$1.Start) {
	                return PopoverHorizontalAlign$1.End;
	            }
	            if (this.horizontalAlign === PopoverHorizontalAlign$1.End) {
	                return PopoverHorizontalAlign$1.Start;
	            }
	        }
	        return this.horizontalAlign;
	    }
	};
	__decorate$3([
	    webcomponentsBase.s()
	], Popover.prototype, "headerText", void 0);
	__decorate$3([
	    webcomponentsBase.s()
	], Popover.prototype, "placement", void 0);
	__decorate$3([
	    webcomponentsBase.s()
	], Popover.prototype, "horizontalAlign", void 0);
	__decorate$3([
	    webcomponentsBase.s()
	], Popover.prototype, "verticalAlign", void 0);
	__decorate$3([
	    webcomponentsBase.s({ type: Boolean })
	], Popover.prototype, "modal", void 0);
	__decorate$3([
	    webcomponentsBase.s({ type: Boolean })
	], Popover.prototype, "hideArrow", void 0);
	__decorate$3([
	    webcomponentsBase.s({ type: Boolean })
	], Popover.prototype, "allowTargetOverlap", void 0);
	__decorate$3([
	    webcomponentsBase.s({ type: Number, noAttribute: true })
	], Popover.prototype, "arrowTranslateX", void 0);
	__decorate$3([
	    webcomponentsBase.s({ type: Number, noAttribute: true })
	], Popover.prototype, "arrowTranslateY", void 0);
	__decorate$3([
	    webcomponentsBase.s()
	], Popover.prototype, "actualPlacement", void 0);
	__decorate$3([
	    webcomponentsBase.s({ type: Number, noAttribute: true })
	], Popover.prototype, "_maxHeight", void 0);
	__decorate$3([
	    webcomponentsBase.s({ type: Number, noAttribute: true })
	], Popover.prototype, "_maxWidth", void 0);
	__decorate$3([
	    webcomponentsBase.d({ type: HTMLElement })
	], Popover.prototype, "header", void 0);
	__decorate$3([
	    webcomponentsBase.d({ type: HTMLElement })
	], Popover.prototype, "footer", void 0);
	__decorate$3([
	    webcomponentsBase.s({ converter: e })
	], Popover.prototype, "opener", null);
	Popover = Popover_1 = __decorate$3([
	    webcomponentsBase.m({
	        tag: "ui5-popover",
	        styles: [
	            Popup$1.styles,
	            PopupsCommonCss,
	            PopoverCss,
	            List.a(),
	        ],
	        template: PopoverTemplate,
	    })
	], Popover);
	const instanceOfPopover = (object) => {
	    return "opener" in object;
	};
	Popover.define();
	var Popover$1 = Popover;

	Icons.p("@ui5/webcomponents-theming", "sap_horizon", async () => i18nDefaults.defaultThemeBase);
	Icons.p("@ui5/webcomponents", "sap_horizon", async () => i18nDefaults.defaultTheme);
	var ResponsivePopoverCss = `:host{--_ui5-v2-10-0-rc-2_input_width: 100%;min-width:6.25rem;min-height:2rem}:host([on-phone]){display:contents}.ui5-responsive-popover-header{height:var(--_ui5-v2-10-0-rc-2-responsive_popover_header_height);display:flex;justify-content:var(--_ui5-v2-10-0-rc-2_popup_header_prop_header_text_alignment);align-items:center;width:100%}.ui5-responsive-popover-header-text{width:calc(100% - var(--_ui5-v2-10-0-rc-2_button_base_min_width))}.ui5-responsive-popover-header-no-title{justify-content:flex-end}
`;

	var __decorate$2 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var ResponsivePopover_1;
	/**
	 * @class
	 *
	 * ### Overview
	 * The `ui5-responsive-popover` acts as a Popover on desktop and tablet, while on phone it acts as a Dialog.
	 * The component improves tremendously the user experience on mobile.
	 *
	 * ### Usage
	 * Use it when you want to make sure that all the content is visible on any device.
	 *
	 * ### ES6 Module Import
	 *
	 * `import "@ui5/webcomponents/dist/ResponsivePopover.js";`
	 * @constructor
	 * @extends Popover
	 * @since 1.0.0-rc.6
	 * @public
	 * @csspart header - Used to style the header of the component
	 * @csspart content - Used to style the content of the component
	 * @csspart footer - Used to style the footer of the component
	 */
	let ResponsivePopover = ResponsivePopover_1 = class ResponsivePopover extends Popover$1 {
	    constructor() {
	        super();
	        /**
	         * Defines if only the content would be displayed (without header and footer) in the popover on Desktop.
	         * By default both the header and footer would be displayed.
	         * @private
	         */
	        this.contentOnlyOnDesktop = false;
	        /**
	         * Used internaly for controls which must not have header.
	         * @private
	         */
	        this._hideHeader = false;
	        /**
	         * Defines whether a close button will be rendered in the header of the component
	         * **Note:** If you are using the `header` slot, this property will have no effect
	         * @private
	         * @default false
	         * @since 1.0.0-rc.16
	         */
	        this._hideCloseButton = false;
	    }
	    async openPopup() {
	        if (!Icons.d$1()) {
	            await super.openPopup();
	        }
	        else if (this._dialog) {
	            this._dialog.open = true;
	        }
	    }
	    async _show() {
	        if (!Icons.d$1()) {
	            return super._show();
	        }
	    }
	    _dialogCloseButtonClick() {
	        this.closePopup();
	    }
	    /**
	     * Closes the popover/dialog.
	     * @override
	     */
	    closePopup(escPressed = false, preventRegistryUpdate = false, preventFocusRestore = false) {
	        if (!Icons.d$1()) {
	            super.closePopup(escPressed, preventRegistryUpdate, preventFocusRestore);
	        }
	        else {
	            this._dialog?.closePopup(escPressed, preventRegistryUpdate, preventFocusRestore);
	        }
	    }
	    toggle(opener) {
	        if (this.open) {
	            this.closePopup();
	            return;
	        }
	        this.opener = opener;
	        this.open = true;
	    }
	    get classes() {
	        const allClasses = super.classes;
	        allClasses.header = {
	            "ui5-responsive-popover-header": true,
	            "ui5-responsive-popover-header-no-title": !this.headerText,
	        };
	        return allClasses;
	    }
	    get _dialog() {
	        return this.shadowRoot.querySelector("[ui5-dialog]");
	    }
	    get contentDOM() {
	        return Icons.d$1() ? this._dialog.contentDOM : super.contentDOM;
	    }
	    get _isPhone() {
	        return Icons.d$1();
	    }
	    get _displayHeader() {
	        return (Icons.d$1() || !this.contentOnlyOnDesktop) && super._displayHeader;
	    }
	    get _displayFooter() {
	        return Icons.d$1() || !this.contentOnlyOnDesktop;
	    }
	    get _closeDialogAriaLabel() {
	        return ResponsivePopover_1.i18nBundle.getText(i18nDefaults.RESPONSIVE_POPOVER_CLOSE_DIALOG_BUTTON);
	    }
	    _beforeDialogOpen() {
	        this._opened = true;
	        this.open = true;
	        this.fireDecoratorEvent("before-open");
	    }
	    _afterDialogOpen() {
	        this.fireDecoratorEvent("open");
	    }
	    _beforeDialogClose(e) {
	        this.fireDecoratorEvent("before-close", e.detail);
	    }
	    _afterDialogClose() {
	        this._opened = false;
	        this.open = false;
	        this.fireDecoratorEvent("close");
	    }
	    get isModal() {
	        if (!Icons.d$1()) {
	            return super.isModal;
	        }
	        return this._dialog.isModal;
	    }
	};
	__decorate$2([
	    webcomponentsBase.s({ type: Boolean })
	], ResponsivePopover.prototype, "contentOnlyOnDesktop", void 0);
	__decorate$2([
	    webcomponentsBase.s({ type: Boolean })
	], ResponsivePopover.prototype, "_hideHeader", void 0);
	__decorate$2([
	    webcomponentsBase.s({ type: Boolean })
	], ResponsivePopover.prototype, "_hideCloseButton", void 0);
	__decorate$2([
	    i18nDefaults.i("@ui5/webcomponents")
	], ResponsivePopover, "i18nBundle", void 0);
	ResponsivePopover = ResponsivePopover_1 = __decorate$2([
	    webcomponentsBase.m({
	        tag: "ui5-responsive-popover",
	        styles: [Popover$1.styles, ResponsivePopoverCss],
	        template: ResponsivePopoverTemplate,
	    })
	], ResponsivePopover);
	ResponsivePopover.define();
	var ResponsivePopover$1 = ResponsivePopover;

	class RadioButtonGroup {
	    static hasGroup(groupName) {
	        return this.groups.has(groupName);
	    }
	    static getGroup(groupName) {
	        return this.groups.get(groupName);
	    }
	    static getCheckedRadioFromGroup(groupName) {
	        return this.checkedRadios.get(groupName);
	    }
	    static removeGroup(groupName) {
	        this.checkedRadios.delete(groupName);
	        return this.groups.delete(groupName);
	    }
	    static addToGroup(radioBtn, groupName) {
	        if (this.hasGroup(groupName)) {
	            this.enforceSingleSelection(radioBtn, groupName);
	            if (this.getGroup(groupName)) {
	                this.getGroup(groupName).push(radioBtn);
	            }
	        }
	        else {
	            this.createGroup(radioBtn, groupName);
	        }
	        this.updateTabOrder(groupName);
	    }
	    static removeFromGroup(radioBtn, groupName) {
	        const group = this.getGroup(groupName);
	        if (!group) {
	            return;
	        }
	        const checkedRadio = this.getCheckedRadioFromGroup(groupName);
	        // Remove the radio button from the given group
	        group.forEach((_radioBtn, idx, arr) => {
	            if (radioBtn._id === _radioBtn._id) {
	                return arr.splice(idx, 1);
	            }
	        });
	        if (checkedRadio === radioBtn) {
	            this.checkedRadios.set(groupName, null);
	        }
	        // Remove the group if it is empty
	        if (!group.length) {
	            this.removeGroup(groupName);
	        }
	        this.updateTabOrder(groupName);
	    }
	    static createGroup(radioBtn, groupName) {
	        if (radioBtn.checked) {
	            this.checkedRadios.set(groupName, radioBtn);
	        }
	        this.groups.set(groupName, [radioBtn]);
	    }
	    static selectNextItem(item, groupName) {
	        const group = this.getGroup(groupName);
	        if (!group) {
	            return;
	        }
	        const groupLength = group.length, currentItemPosition = group.indexOf(item);
	        if (groupLength <= 1) {
	            return;
	        }
	        const nextItemToFocus = this._nextFocusable(currentItemPosition, group);
	        if (!nextItemToFocus) {
	            return;
	        }
	        this.updateSelectionInGroup(nextItemToFocus, groupName);
	    }
	    static updateFormValidity(groupName) {
	        const group = this.getGroup(groupName);
	        if (!group) {
	            return;
	        }
	        const hasRequired = group.some(r => r.required);
	        const hasChecked = group.some(r => r.checked);
	        group.forEach(r => {
	            r._groupChecked = hasChecked;
	            r._groupRequired = hasRequired;
	        });
	    }
	    static updateTabOrder(groupName) {
	        const group = this.getGroup(groupName);
	        if (!group) {
	            return;
	        }
	        const hasCheckedRadio = group.some(radioBtn => radioBtn.checked);
	        group.filter(radioBtn => !radioBtn.disabled).forEach((radioBtn, idx) => {
	            let activeElement = webcomponentsBase.t();
	            if (activeElement?.classList.contains("ui5-radio-root")) {
	                activeElement = activeElement.getRootNode();
	                if (activeElement instanceof ShadowRoot) {
	                    activeElement = activeElement.host;
	                }
	            }
	            if (hasCheckedRadio) {
	                if (activeElement?.hasAttribute("ui5-radio-button") && activeElement.readonly) {
	                    radioBtn._tabIndex = activeElement === radioBtn && radioBtn.readonly ? 0 : -1;
	                }
	                else {
	                    radioBtn._tabIndex = radioBtn.checked ? 0 : -1;
	                }
	            }
	            else {
	                radioBtn._tabIndex = idx === 0 ? 0 : -1;
	            }
	        });
	    }
	    static selectPreviousItem(item, groupName) {
	        const group = this.getGroup(groupName);
	        if (!group) {
	            return;
	        }
	        const groupLength = group.length, currentItemPosition = group.indexOf(item);
	        if (groupLength <= 1) {
	            return;
	        }
	        const previousItemToFocus = this._previousFocusable(currentItemPosition, group);
	        if (!previousItemToFocus) {
	            return;
	        }
	        this.updateSelectionInGroup(previousItemToFocus, groupName);
	    }
	    static selectItem(item, groupName) {
	        this.updateSelectionInGroup(item, groupName);
	        this.updateTabOrder(groupName);
	        this.updateFormValidity(groupName);
	    }
	    static updateSelectionInGroup(radioBtnToSelect, groupName) {
	        const checkedRadio = this.getCheckedRadioFromGroup(groupName);
	        if (checkedRadio && !radioBtnToSelect.readonly) {
	            this._deselectRadio(checkedRadio);
	            this.checkedRadios.set(groupName, radioBtnToSelect);
	        }
	        // the focusable radio buttons are the enabled and the read-only ones, but only the enabled are selectable
	        if (radioBtnToSelect) {
	            radioBtnToSelect.focus();
	            if (!radioBtnToSelect.readonly) {
	                this._selectRadio(radioBtnToSelect);
	            }
	            else {
	                // Ensure updateTabOrder is called after focus
	                setTimeout(() => {
	                    this.updateTabOrder(groupName);
	                }, 0);
	            }
	        }
	    }
	    static _deselectRadio(radioBtn) {
	        if (radioBtn) {
	            radioBtn.checked = false;
	        }
	    }
	    static _selectRadio(radioBtn) {
	        radioBtn.checked = true;
	        radioBtn._checked = true;
	        radioBtn.fireDecoratorEvent("change");
	    }
	    static _nextFocusable(pos, group) {
	        if (!group) {
	            return null;
	        }
	        const groupLength = group.length;
	        let nextRadioToFocus = null;
	        if (pos === groupLength - 1) {
	            if (group[0].disabled) {
	                return this._nextFocusable(1, group);
	            }
	            nextRadioToFocus = group[0];
	        }
	        else if (group[pos + 1].disabled) {
	            return this._nextFocusable(pos + 1, group);
	        }
	        else {
	            nextRadioToFocus = group[pos + 1];
	        }
	        return nextRadioToFocus;
	    }
	    static _previousFocusable(pos, group) {
	        const groupLength = group.length;
	        let previousRadioToFocus = null;
	        if (pos === 0) {
	            if (group[groupLength - 1].disabled) {
	                return this._previousFocusable(groupLength - 1, group);
	            }
	            previousRadioToFocus = group[groupLength - 1];
	        }
	        else if (group[pos - 1].disabled) {
	            return this._previousFocusable(pos - 1, group);
	        }
	        else {
	            previousRadioToFocus = group[pos - 1];
	        }
	        return previousRadioToFocus;
	    }
	    static enforceSingleSelection(radioBtn, groupName) {
	        const checkedRadio = this.getCheckedRadioFromGroup(groupName);
	        if (radioBtn.checked) {
	            if (!checkedRadio) {
	                this.checkedRadios.set(groupName, radioBtn);
	            }
	            else if (radioBtn !== checkedRadio) {
	                this._deselectRadio(checkedRadio);
	                this.checkedRadios.set(groupName, radioBtn);
	            }
	        }
	        else if (radioBtn === checkedRadio) {
	            this.checkedRadios.set(groupName, null);
	        }
	        this.updateTabOrder(groupName);
	        this.updateFormValidity(groupName);
	    }
	    static get groups() {
	        if (!this._groups) {
	            this._groups = new Map();
	        }
	        return this._groups;
	    }
	    static get checkedRadios() {
	        if (!this._checkedRadios) {
	            this._checkedRadios = new Map();
	        }
	        return this._checkedRadios;
	    }
	}

	function RadioButtonTemplate() {
	    return (i18nDefaults.jsxs("div", { role: "radio", class: "ui5-radio-root", "aria-checked": this.checked, "aria-disabled": this.effectiveAriaDisabled, "aria-describedby": this.effectiveAriaDescribedBy, "aria-label": this.ariaLabelText, tabindex: this.effectiveTabIndex, onClick: this._onclick, onKeyDown: this._onkeydown, onKeyUp: this._onkeyup, onMouseDown: this._onmousedown, onMouseUp: this._onmouseup, onFocusOut: this._onfocusout, children: [i18nDefaults.jsxs("div", { class: {
	                    "ui5-radio-inner": true,
	                    "ui5-radio-inner--hoverable": !this.disabled && !this.readonly && Icons.f$1(),
	                }, children: [i18nDefaults.jsxs("svg", { class: "ui5-radio-svg", focusable: "false", "aria-hidden": "true", children: [i18nDefaults.jsx("circle", { part: "outer-ring", class: "ui5-radio-svg-outer", cx: "50%", cy: "50%", r: "50%" }), i18nDefaults.jsx("circle", { part: "inner-ring", class: "ui5-radio-svg-inner", cx: "50%", cy: "50%" })] }), i18nDefaults.jsx("input", { type: "radio", required: this.required, checked: this.checked, readonly: this.readonly, disabled: this.disabled, name: this.name, "data-sap-no-tab-ref": true })] }), this.text &&
	                i18nDefaults.jsx(Label, { id: `${this._id}-label`, class: "ui5-radio-label", for: this._id, wrappingType: this.wrappingType, children: this.text }), this.hasValueState &&
	                i18nDefaults.jsx("span", { id: `${this._id}-descr`, class: "ui5-hidden-text", children: this.valueStateText })] }));
	}

	Icons.p("@ui5/webcomponents-theming", "sap_horizon", async () => i18nDefaults.defaultThemeBase);
	Icons.p("@ui5/webcomponents", "sap_horizon", async () => i18nDefaults.defaultTheme);
	var radioButtonCss = `.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}:host(:not([hidden])){display:inline-block}:host{min-width:var(--_ui5-v2-10-0-rc-2_radio_button_min_width);max-width:100%;text-overflow:ellipsis;overflow:hidden;color:var(--_ui5-v2-10-0-rc-2_radio_button_color);border-radius:var(--_ui5-v2-10-0-rc-2_radio_button_border_radius)}:host(:not([disabled])) .ui5-radio-root{cursor:pointer}:host([checked]){color:var(--_ui5-v2-10-0-rc-2_radio_button_checked_fill)}:host([checked]) .ui5-radio-svg-inner{fill:var(--_ui5-v2-10-0-rc-2_radio_button_inner_ring_color)}:host([checked]) .ui5-radio-svg-outer{stroke:var(--_ui5-v2-10-0-rc-2_radio_button_outer_ring_color)}:host([disabled]) .ui5-radio-root{color:var(--_ui5-v2-10-0-rc-2_radio_button_color);opacity:var(--sapContent_DisabledOpacity)}:host([disabled][checked]) .ui5-radio-svg-outer{stroke:var(--_ui5-v2-10-0-rc-2_radio_button_color)}:host(:not([disabled])[desktop]) .ui5-radio-root:focus:before,:host(:not([disabled])) .ui5-radio-root:focus-visible:before{content:"";display:var(--_ui5-v2-10-0-rc-2_radio_button_focus_outline);position:absolute;inset:var(--_ui5-v2-10-0-rc-2_radio_button_focus_dist);pointer-events:none;border:var(--_ui5-v2-10-0-rc-2_radio_button_border_width) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);border-radius:var(--_ui5-v2-10-0-rc-2_radio_button_border_radius)}:host(:not([value-state="Negative"]):not([value-state="Critical"]):not([value-state="Positive"]):not([value-state="Information"])) .ui5-radio-root:hover .ui5-radio-inner--hoverable .ui5-radio-svg-outer{stroke:var(--_ui5-v2-10-0-rc-2_radio_button_outer_ring_hover_color)}:host(:not([value-state="Negative"]):not([value-state="Critical"]):not([value-state="Positive"]):not([value-state="Information"])[checked]) .ui5-radio-root:hover .ui5-radio-inner--hoverable .ui5-radio-svg-outer{stroke:var(--_ui5-v2-10-0-rc-2_radio_button_outer_ring_checked_hover_color)}.ui5-radio-root:hover .ui5-radio-inner--hoverable .ui5-radio-svg-outer,:host([checked]) .ui5-radio-root:hover .ui5-radio-inner--hoverable .ui5-radio-svg-outer{fill:var(--_ui5-v2-10-0-rc-2_radio_button_hover_fill)}:host([active][checked]:not([value-state]):not([disabled]):not([readonly])) .ui5-radio-svg-outer{stroke:var(--_ui5-v2-10-0-rc-2_radio_button_outer_ring_checked_hover_color)}:host([active]:not([checked]):not([value-state]):not([disabled]):not([readonly])) .ui5-radio-svg-outer{stroke:var(--_ui5-v2-10-0-rc-2_radio_button_outer_ring_active_color)}:host([text]) .ui5-radio-root{padding-inline-end:var(--_ui5-v2-10-0-rc-2_radio_button_border_width)}:host([text][desktop]) .ui5-radio-root:focus:before,:host([text]) .ui5-radio-root:focus-visible:before{inset-inline-end:0px}:host([text]) .ui5-radio-inner{padding:var(--_ui5-v2-10-0-rc-2_radio_button_outer_ring_padding_with_label)}:host([checked][readonly]) .ui5-radio-svg-inner{fill:var(--_ui5-v2-10-0-rc-2_radio_button_read_only_inner_ring_color)}:host([readonly]) .ui5-radio-root .ui5-radio-svg-outer{fill:var(--sapField_ReadOnly_Background);stroke:var(--sapField_ReadOnly_BorderColor);stroke-dasharray:var(--_ui5-v2-10-0-rc-2_radio_button_read_only_border_type);stroke-width:var(--_ui5-v2-10-0-rc-2_radio_button_read_only_border_width)}:host([value-state="Negative"]) .ui5-radio-svg-outer,:host([value-state="Critical"]) .ui5-radio-svg-outer{stroke-width:var(--sapField_InvalidBorderWidth)}:host([value-state="Information"]) .ui5-radio-svg-outer{stroke-width:var(--_ui5-v2-10-0-rc-2_radio_button_information_border_width)}:host([value-state="Negative"][checked]) .ui5-radio-svg-inner{fill:var(--_ui5-v2-10-0-rc-2_radio_button_checked_error_fill)}:host([value-state="Negative"]) .ui5-radio-svg-outer,:host([value-state="Negative"]) .ui5-radio-root:hover .ui5-radio-inner.ui5-radio-inner--hoverable:hover .ui5-radio-svg-outer{stroke:var(--sapField_InvalidColor);fill:var(--sapField_InvalidBackground)}:host([value-state="Negative"]) .ui5-radio-root:hover .ui5-radio-inner.ui5-radio-inner--hoverable .ui5-radio-svg-outer{fill:var(--_ui5-v2-10-0-rc-2_radio_button_hover_fill_error)}:host([value-state="Critical"][checked]) .ui5-radio-svg-inner{fill:var(--_ui5-v2-10-0-rc-2_radio_button_checked_warning_fill)}:host([value-state="Critical"]) .ui5-radio-svg-outer,:host([value-state="Critical"]) .ui5-radio-root:hover .ui5-radio-inner.ui5-radio-inner--hoverable:hover .ui5-radio-svg-outer{stroke:var(--sapField_WarningColor);fill:var(--sapField_WarningBackground)}:host([value-state="Critical"]) .ui5-radio-root:hover .ui5-radio-inner.ui5-radio-inner--hoverable .ui5-radio-svg-outer{fill:var(--_ui5-v2-10-0-rc-2_radio_button_hover_fill_warning)}:host([value-state="Positive"][checked]) .ui5-radio-svg-inner{fill:var(--_ui5-v2-10-0-rc-2_radio_button_checked_success_fill)}:host([value-state="Positive"]) .ui5-radio-svg-outer,:host([value-state="Positive"]) .ui5-radio-root:hover .ui5-radio-inner.ui5-radio-inner--hoverable:hover .ui5-radio-svg-outer{stroke:var(--sapField_SuccessColor);fill:var(--sapField_SuccessBackground)}:host([value-state="Positive"]) .ui5-radio-root:hover .ui5-radio-inner.ui5-radio-inner--hoverable .ui5-radio-svg-outer{fill:var(--_ui5-v2-10-0-rc-2_radio_button_hover_fill_success)}:host([value-state="Information"][checked]) .ui5-radio-svg-inner{fill:var(--_ui5-v2-10-0-rc-2_radio_button_checked_information_fill)}:host([value-state="Information"]) .ui5-radio-svg-outer,:host([value-state="Information"]) .ui5-radio-root:hover .ui5-radio-inner.ui5-radio-inner--hoverable:hover .ui5-radio-svg-outer{stroke:var(--sapField_InformationColor);fill:var(--sapField_InformationBackground)}:host([value-state="Information"]) .ui5-radio-root:hover .ui5-radio-inner.ui5-radio-inner--hoverable .ui5-radio-svg-outer{fill:var(--_ui5-v2-10-0-rc-2_radio_button_hover_fill_information)}:host([value-state="Negative"]) .ui5-radio-root,:host([value-state="Critical"]) .ui5-radio-root,:host([value-state="Information"]) .ui5-radio-root{stroke-dasharray:var(--_ui5-v2-10-0-rc-2_radio_button_warning_error_border_dash)}.ui5-radio-root{height:auto;position:relative;display:inline-flex;flex-wrap:nowrap;outline:none;max-width:100%;box-sizing:border-box;border:var(--_ui5-v2-10-0-rc-2_radio_button_border);border-radius:var(--_ui5-v2-10-0-rc-2_radio_button_border_radius)}.ui5-radio-inner{display:flex;align-items:center;padding:var(--_ui5-v2-10-0-rc-2_radio_button_outer_ring_padding);flex-shrink:0;height:var(--_ui5-v2-10-0-rc-2_radio_button_inner_size);font-size:1rem;pointer-events:none;vertical-align:top}.ui5-radio-inner{outline:none}.ui5-radio-inner input{-webkit-appearance:none;visibility:hidden;width:0;left:0;position:absolute;font-size:inherit;margin:0}[ui5-label].ui5-radio-label{display:flex;align-items:center;padding-inline-end:var(--_ui5-v2-10-0-rc-2_radio_button_label_offset);padding-block:var(--_ui5-v2-10-0-rc-2_radio_button_label_side_padding);vertical-align:top;max-width:100%;pointer-events:none;color:var(--_ui5-v2-10-0-rc-2_radio_button_label_color);overflow-wrap:break-word}:host([wrapping-type="None"][text]) .ui5-radio-root{height:var(--_ui5-v2-10-0-rc-2_radio_button_height)}:host([wrapping-type="None"][text]) [ui5-label].ui5-radio-label{text-overflow:ellipsis;overflow:hidden}.ui5-radio-svg{height:var(--_ui5-v2-10-0-rc-2_radio_button_svg_size);width:var(--_ui5-v2-10-0-rc-2_radio_button_svg_size);overflow:visible;pointer-events:none}.ui5-radio-svg-outer{fill:var(--_ui5-v2-10-0-rc-2_radio_button_outer_ring_bg);stroke:currentColor;stroke-width:var(--_ui5-v2-10-0-rc-2_radio_button_outer_ring_width)}.ui5-radio-svg-inner{fill:none;r:var(--_ui5-v2-10-0-rc-2_radio_button_inner_ring_radius)}.ui5-radio-svg-outer,.ui5-radio-svg-inner{flex-shrink:0}:host(.ui5-li-singlesel-radiobtn) .ui5-radio-root .ui5-radio-inner .ui5-radio-svg-outer{fill:var(--sapList_Background)}
`;

	var __decorate$1 = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var RadioButton_1;
	let isGlobalHandlerAttached$1 = false;
	let activeRadio;
	/**
	 * @class
	 *
	 * ### Overview
	 *
	 * The `ui5-radio-button` component enables users to select a single option from a set of options.
	 * When a `ui5-radio-button` is selected by the user, the
	 * `change` event is fired.
	 * When a `ui5-radio-button` that is within a group is selected, the one
	 * that was previously selected gets automatically deselected. You can group radio buttons by using the `name` property.
	 *
	 * **Note:** If `ui5-radio-button` is not part of a group, it can be selected once, but can not be deselected back.
	 *
	 * ### Keyboard Handling
	 *
	 * Once the `ui5-radio-button` is on focus, it might be selected by pressing the Space and Enter keys.
	 *
	 * The Arrow Down/Arrow Up and Arrow Left/Arrow Right keys can be used to change selection between next/previous radio buttons in one group,
	 * while TAB and SHIFT + TAB can be used to enter or leave the radio button group.
	 *
	 * **Note:** On entering radio button group, the focus goes to the currently selected radio button.
	 *
	 * ### ES6 Module Import
	 *
	 * `import "@ui5/webcomponents/dist/RadioButton";`
	 * @constructor
	 * @extends UI5Element
	 * @public
	 * @csspart outer-ring - Used to style the outer ring of the `ui5-radio-button`.
	 * @csspart inner-ring - Used to style the inner ring of the `ui5-radio-button`.
	 */
	let RadioButton = RadioButton_1 = class RadioButton extends webcomponentsBase.b {
	    get formValidityMessage() {
	        return RadioButton_1.i18nBundle.getText(i18nDefaults.FORM_SELECTABLE_REQUIRED2);
	    }
	    get formValidity() {
	        return { valueMissing: this._groupRequired && !this._groupChecked };
	    }
	    async formElementAnchor() {
	        return this.getFocusDomRefAsync();
	    }
	    get formFormattedValue() {
	        return this.checked ? (this.value || "on") : null;
	    }
	    constructor() {
	        super();
	        /**
	         * Defines whether the component is disabled.
	         *
	         * **Note:** A disabled component is completely noninteractive.
	         * @default false
	         * @public
	         */
	        this.disabled = false;
	        /**
	         * Defines whether the component is read-only.
	         *
	         * **Note:** A read-only component isn't editable or selectable.
	         * However, because it's focusable, it still provides visual feedback upon user interaction.
	         * @default false
	         * @public
	         */
	        this.readonly = false;
	        /**
	         * Defines whether the component is required.
	         * @default false
	         * @public
	         * @since 1.9.0
	         */
	        this.required = false;
	        /**
	         * Defines whether the component is checked or not.
	         *
	         * **Note:** The property value can be changed with user interaction,
	         * either by clicking/tapping on the component,
	         * or by using the Space or Enter key.
	         *
	         * **Note:** Only enabled radio buttons can be checked.
	         * Read-only radio buttons are not selectable, and therefore are always unchecked.
	         * @default false
	         * @formEvents change
	         * @formProperty
	         * @public
	         * @since 1.0.0-rc.15
	         */
	        this.checked = false;
	        /**
	         * Defines the value state of the component.
	         * @default "None"
	         * @public
	         */
	        this.valueState = "None";
	        /**
	         * Defines the form value of the component.
	         * When a form with a radio button group is submitted, the group's value
	         * will be the value of the currently selected radio button.
	         * @default ""
	         * @public
	         */
	        this.value = "";
	        /**
	         * Defines whether the component text wraps when there is not enough space.
	         *
	         * **Note:** for option "Normal" the text will wrap and the words will not be broken based on hyphenation.
	         * @default "Normal"
	         * @public
	         */
	        this.wrappingType = "Normal";
	        /**
	         * Defines the active state (pressed or not) of the component.
	         * @default false
	         * @private
	         */
	        this.active = false;
	        /**
	         * Defines if the component is selected in specific group
	         * @default false
	         * @private
	         */
	        this._groupChecked = false;
	        this._groupRequired = false;
	        this._name = "";
	        this._checked = false;
	        this._deactivate = () => {
	            if (activeRadio) {
	                activeRadio.active = false;
	            }
	        };
	        if (!isGlobalHandlerAttached$1) {
	            document.addEventListener("mouseup", this._deactivate);
	            isGlobalHandlerAttached$1 = true;
	        }
	    }
	    onAfterRendering() {
	        this.syncGroup();
	    }
	    onEnterDOM() {
	        if (Icons.f$1()) {
	            this.setAttribute("desktop", "");
	        }
	    }
	    onExitDOM() {
	        this.syncGroup(true);
	    }
	    syncGroup(forceRemove) {
	        const oldGroup = this._name;
	        const currentGroup = this.name;
	        const oldChecked = this._checked;
	        const currentChecked = this.checked;
	        if (forceRemove) {
	            RadioButtonGroup.removeFromGroup(this, oldGroup);
	        }
	        if (currentGroup !== oldGroup) {
	            if (oldGroup) {
	                // remove the control from the previous group
	                RadioButtonGroup.removeFromGroup(this, oldGroup);
	            }
	            if (currentGroup) {
	                // add the control to the existing group
	                RadioButtonGroup.addToGroup(this, currentGroup);
	            }
	        }
	        else if (currentGroup && this.isConnected) {
	            RadioButtonGroup.enforceSingleSelection(this, currentGroup);
	        }
	        if (this.name && currentChecked !== oldChecked) {
	            RadioButtonGroup.updateTabOrder(this.name);
	        }
	        this._name = this.name || "";
	        this._checked = this.checked;
	    }
	    _onclick() {
	        return this.toggle();
	    }
	    _handleDown(e) {
	        const currentGroup = this.name;
	        if (!currentGroup) {
	            return;
	        }
	        e.preventDefault();
	        RadioButtonGroup.selectNextItem(this, currentGroup);
	    }
	    _handleUp(e) {
	        const currentGroup = this.name;
	        if (!currentGroup) {
	            return;
	        }
	        e.preventDefault();
	        RadioButtonGroup.selectPreviousItem(this, currentGroup);
	    }
	    _onkeydown(e) {
	        if (webcomponentsBase.i(e)) {
	            this.active = true;
	            return e.preventDefault();
	        }
	        if (webcomponentsBase.b$1(e)) {
	            this.active = true;
	            return this.toggle();
	        }
	        const isRTL = this.effectiveDir === "rtl";
	        if (webcomponentsBase.P(e) || (!isRTL && webcomponentsBase.c(e)) || (isRTL && webcomponentsBase.K(e))) {
	            this._handleDown(e);
	        }
	        if (webcomponentsBase.D(e) || (!isRTL && webcomponentsBase.K(e)) || (isRTL && webcomponentsBase.c(e))) {
	            this._handleUp(e);
	        }
	    }
	    _onkeyup(e) {
	        if (webcomponentsBase.i(e)) {
	            this.toggle();
	        }
	        this.active = false;
	    }
	    _onmousedown() {
	        this.active = true;
	        activeRadio = this; // eslint-disable-line
	    }
	    _onmouseup() {
	        this.active = false;
	    }
	    _onfocusout() {
	        this.active = false;
	    }
	    toggle() {
	        if (!this.canToggle()) {
	            return this;
	        }
	        if (!this.name) {
	            this.checked = !this.checked;
	            this.fireDecoratorEvent("change");
	            return this;
	        }
	        RadioButtonGroup.selectItem(this, this.name);
	        return this;
	    }
	    canToggle() {
	        return !(this.disabled || this.readonly || this.checked);
	    }
	    get effectiveAriaDisabled() {
	        return (this.disabled || this.readonly) ? true : undefined;
	    }
	    get ariaLabelText() {
	        return [toLowercaseEnumValue.A(this), this.text].filter(Boolean).join(" ");
	    }
	    get effectiveAriaDescribedBy() {
	        return this.hasValueState ? `${this._id}-descr` : undefined;
	    }
	    get hasValueState() {
	        return this.valueState !== information.o.None;
	    }
	    get valueStateText() {
	        switch (this.valueState) {
	            case information.o.Negative:
	                return RadioButton_1.i18nBundle.getText(i18nDefaults.VALUE_STATE_ERROR);
	            case information.o.Critical:
	                return RadioButton_1.i18nBundle.getText(i18nDefaults.VALUE_STATE_WARNING);
	            case information.o.Positive:
	                return RadioButton_1.i18nBundle.getText(i18nDefaults.VALUE_STATE_SUCCESS);
	            case information.o.Information:
	                return RadioButton_1.i18nBundle.getText(i18nDefaults.VALUE_STATE_INFORMATION);
	            default:
	                return "";
	        }
	    }
	    get effectiveTabIndex() {
	        const tabindex = this.getAttribute("tabindex");
	        if (this.disabled) {
	            return -1;
	        }
	        if (this.name) {
	            return this._tabIndex;
	        }
	        return tabindex ? parseInt(tabindex) : 0;
	    }
	};
	__decorate$1([
	    webcomponentsBase.s({ type: Boolean })
	], RadioButton.prototype, "disabled", void 0);
	__decorate$1([
	    webcomponentsBase.s({ type: Boolean })
	], RadioButton.prototype, "readonly", void 0);
	__decorate$1([
	    webcomponentsBase.s({ type: Boolean })
	], RadioButton.prototype, "required", void 0);
	__decorate$1([
	    webcomponentsBase.s({ type: Boolean })
	], RadioButton.prototype, "checked", void 0);
	__decorate$1([
	    webcomponentsBase.s()
	], RadioButton.prototype, "text", void 0);
	__decorate$1([
	    webcomponentsBase.s()
	], RadioButton.prototype, "valueState", void 0);
	__decorate$1([
	    webcomponentsBase.s()
	], RadioButton.prototype, "name", void 0);
	__decorate$1([
	    webcomponentsBase.s()
	], RadioButton.prototype, "value", void 0);
	__decorate$1([
	    webcomponentsBase.s()
	], RadioButton.prototype, "wrappingType", void 0);
	__decorate$1([
	    webcomponentsBase.s()
	], RadioButton.prototype, "accessibleName", void 0);
	__decorate$1([
	    webcomponentsBase.s()
	], RadioButton.prototype, "accessibleNameRef", void 0);
	__decorate$1([
	    webcomponentsBase.s({ type: Number })
	], RadioButton.prototype, "_tabIndex", void 0);
	__decorate$1([
	    webcomponentsBase.s({ type: Boolean })
	], RadioButton.prototype, "active", void 0);
	__decorate$1([
	    webcomponentsBase.s({ type: Boolean, noAttribute: true })
	], RadioButton.prototype, "_groupChecked", void 0);
	__decorate$1([
	    webcomponentsBase.s({ type: Boolean, noAttribute: true })
	], RadioButton.prototype, "_groupRequired", void 0);
	__decorate$1([
	    i18nDefaults.i("@ui5/webcomponents")
	], RadioButton, "i18nBundle", void 0);
	RadioButton = RadioButton_1 = __decorate$1([
	    webcomponentsBase.m({
	        tag: "ui5-radio-button",
	        languageAware: true,
	        formAssociated: true,
	        renderer: i18nDefaults.d,
	        template: RadioButtonTemplate,
	        styles: radioButtonCss,
	    })
	    /**
	     * Fired when the component checked state changes.
	     * @public
	     * @since 1.0.0-rc.15
	     */
	    ,
	    eventStrict.l("change", {
	        bubbles: true,
	    })
	], RadioButton);
	RadioButton.define();
	var RadioButton$1 = RadioButton;

	Icons.p("@ui5/webcomponents-theming", "sap_horizon", async () => i18nDefaults.defaultThemeBase);
	Icons.p("@ui5/webcomponents", "sap_horizon", async () => i18nDefaults.defaultTheme);
	var checkboxCss = `.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}:host{-webkit-tap-highlight-color:rgba(0,0,0,0)}:host(:not([hidden])){display:inline-block}:host{overflow:hidden;max-width:100%;outline:none;border-radius:var(--_ui5-v2-10-0-rc-2_checkbox_border_radius);transition:var(--_ui5-v2-10-0-rc-2_checkbox_transition);cursor:pointer;user-select:none;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none}:host([disabled]){cursor:default}:host([disabled]) .ui5-checkbox-root{opacity:var(--_ui5-v2-10-0-rc-2_checkbox_disabled_opacity)}:host([disabled]) .ui5-checkbox-inner{border-color:var(--_ui5-v2-10-0-rc-2_checkbox_inner_disabled_border_color)}:host([disabled]) .ui5-checkbox-label{color:var(--_ui5-v2-10-0-rc-2_checkbox_disabled_label_color)}:host([readonly]:not([value-state="Critical"]):not([value-state="Negative"])) .ui5-checkbox-inner{background:var(--sapField_ReadOnly_Background);border:var(--_ui5-v2-10-0-rc-2_checkbox_inner_readonly_border);color:var(--sapField_TextColor)}:host(:not([wrapping-type="None"])[text]) .ui5-checkbox-root{min-height:auto;box-sizing:border-box;align-items:flex-start;padding-top:var(--_ui5-v2-10-0-rc-2_checkbox_root_side_padding);padding-bottom:var(--_ui5-v2-10-0-rc-2_checkbox_root_side_padding)}:host(:not([wrapping-type="None"])[text]) .ui5-checkbox-root .ui5-checkbox-label{overflow-wrap:break-word;align-self:center}:host([desktop][text]:not([wrapping-type="None"])) .ui5-checkbox-root:focus:before,.ui5-checkbox-root[text]:focus-visible:before{inset-block:var(--_ui5-v2-10-0-rc-2_checkbox_wrapped_focus_inset_block)}:host([value-state="Negative"]) .ui5-checkbox-inner,:host([value-state="Negative"]) .ui5-checkbox--hoverable:hover .ui5-checkbox-inner{background:var(--sapField_InvalidBackground);border:var(--_ui5-v2-10-0-rc-2_checkbox_inner_error_border);color:var(--sapField_InvalidColor)}:host([value-state="Negative"]) .ui5-checkbox--hoverable:hover .ui5-checkbox-inner{background:var(--_ui5-v2-10-0-rc-2_checkbox_inner_error_background_hover)}:host([value-state="Critical"]) .ui5-checkbox-inner,:host([value-state="Critical"]) .ui5-checkbox--hoverable:hover .ui5-checkbox-inner{background:var(--sapField_WarningBackground);border:var(--_ui5-v2-10-0-rc-2_checkbox_inner_warning_border);color:var(--_ui5-v2-10-0-rc-2_checkbox_inner_warning_color)}:host([value-state="Critical"]) .ui5-checkbox--hoverable:hover .ui5-checkbox-inner{background:var(--_ui5-v2-10-0-rc-2_checkbox_inner_warning_background_hover)}:host([value-state="Information"]) .ui5-checkbox-inner,:host([value-state="Information"]) .ui5-checkbox--hoverable:hover .ui5-checkbox-inner{background:var(--sapField_InformationBackground);border:var(--_ui5-v2-10-0-rc-2_checkbox_inner_information_border);color:var(--_ui5-v2-10-0-rc-2_checkbox_inner_information_color)}:host([value-state="Information"]) .ui5-checkbox--hoverable:hover .ui5-checkbox-inner{background:var(--_ui5-v2-10-0-rc-2_checkbox_inner_information_background_hover)}:host([value-state="Positive"]) .ui5-checkbox-inner,:host([value-state="Positive"]) .ui5-checkbox--hoverable:hover .ui5-checkbox-inner{background:var(--sapField_SuccessBackground);border:var(--_ui5-v2-10-0-rc-2_checkbox_inner_success_border);color:var(--sapField_SuccessColor)}:host([value-state="Positive"]) .ui5-checkbox--hoverable:hover .ui5-checkbox-inner{background:var(--_ui5-v2-10-0-rc-2_checkbox_inner_success_background_hover)}:host([value-state="Critical"]) .ui5-checkbox-icon,:host([value-state="Critical"][indeterminate]) .ui5-checkbox-inner:after{color:var(--_ui5-v2-10-0-rc-2_checkbox_checkmark_warning_color)}.ui5-checkbox-root{position:relative;display:inline-flex;align-items:center;max-width:100%;min-height:var(--_ui5-v2-10-0-rc-2_checkbox_width_height);min-width:var(--_ui5-v2-10-0-rc-2_checkbox_width_height);padding:0 var(--_ui5-v2-10-0-rc-2_checkbox_wrapper_padding);outline:none;transition:var(--_ui5-v2-10-0-rc-2_checkbox_transition);border:var(--_ui5-v2-10-0-rc-2_checkbox_default_focus_border);border-radius:var(--_ui5-v2-10-0-rc-2_checkbox_border_radius);box-sizing:border-box}:host([desktop]) .ui5-checkbox-root:focus:before,.ui5-checkbox-root:focus-visible:before{display:var(--_ui5-v2-10-0-rc-2_checkbox_focus_outline_display);content:"";position:absolute;inset-inline:var(--_ui5-v2-10-0-rc-2_checkbox_focus_position);inset-block:var(--_ui5-v2-10-0-rc-2_checkbox_focus_position);border:var(--_ui5-v2-10-0-rc-2_checkbox_focus_outline);border-radius:var(--_ui5-v2-10-0-rc-2_checkbox_focus_border_radius)}:host([text]) .ui5-checkbox-root{padding-inline-end:var(--_ui5-v2-10-0-rc-2_checkbox_right_focus_distance)}:host([text]) .ui5-checkbox-root:focus:before,:host([text]) .ui5-checkbox-root:focus-visible:before{inset-inline-end:0}:host(:hover:not([disabled])){background:var(--_ui5-v2-10-0-rc-2_checkbox_outer_hover_background)}.ui5-checkbox--hoverable .ui5-checkbox-label:hover{color:var(--_ui5-v2-10-0-rc-2_checkbox_label_color)}:host(:not([active]):not([checked]):not([value-state])) .ui5-checkbox--hoverable:hover .ui5-checkbox-inner,:host(:not([active]):not([checked])[value-state="None"]) .ui5-checkbox--hoverable:hover .ui5-checkbox-inner{background:var(--_ui5-v2-10-0-rc-2_checkbox_hover_background);border-color:var(--_ui5-v2-10-0-rc-2_checkbox_inner_hover_border_color)}:host(:not([active])[checked]:not([value-state])) .ui5-checkbox--hoverable:hover .ui5-checkbox-inner,:host(:not([active])[checked][value-state="None"]) .ui5-checkbox--hoverable:hover .ui5-checkbox-inner{background:var(--_ui5-v2-10-0-rc-2_checkbox_hover_background);border-color:var(--_ui5-v2-10-0-rc-2_checkbox_inner_hover_checked_border_color)}:host([checked]:not([value-state])) .ui5-checkbox-inner,:host([checked][value-state="None"]) .ui5-checkbox-inner{border-color:var(--_ui5-v2-10-0-rc-2_checkbox_inner_selected_border_color)}:host([active]:not([checked]):not([value-state]):not([disabled])) .ui5-checkbox-inner,:host([active]:not([checked])[value-state="None"]:not([disabled])) .ui5-checkbox-inner{border-color:var(--_ui5-v2-10-0-rc-2_checkbox_inner_active_border_color);background-color:var(--_ui5-v2-10-0-rc-2_checkbox_active_background)}:host([active][checked]:not([value-state]):not([disabled])) .ui5-checkbox-inner,:host([active][checked][value-state="None"]:not([disabled])) .ui5-checkbox-inner{border-color:var(--_ui5-v2-10-0-rc-2_checkbox_inner_selected_border_color);background-color:var(--_ui5-v2-10-0-rc-2_checkbox_active_background)}.ui5-checkbox-inner{min-width:var(--_ui5-v2-10-0-rc-2_checkbox_inner_width_height);max-width:var(--_ui5-v2-10-0-rc-2_checkbox_inner_width_height);height:var(--_ui5-v2-10-0-rc-2_checkbox_inner_width_height);max-height:var(--_ui5-v2-10-0-rc-2_checkbox_inner_width_height);border:var(--_ui5-v2-10-0-rc-2_checkbox_inner_border);border-radius:var(--_ui5-v2-10-0-rc-2_checkbox_inner_border_radius);background:var(--_ui5-v2-10-0-rc-2_checkbox_inner_background);color:var(--_ui5-v2-10-0-rc-2_checkbox_checkmark_color);box-sizing:border-box;position:relative;cursor:inherit}:host([indeterminate][checked]) .ui5-checkbox-inner:after{content:"";background-color:currentColor;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:var(--_ui5-v2-10-0-rc-2_checkbox_partially_icon_size);height:var(--_ui5-v2-10-0-rc-2_checkbox_partially_icon_size)}:host input{-webkit-appearance:none;visibility:hidden;width:0;left:0;position:absolute;font-size:inherit}.ui5-checkbox-root .ui5-checkbox-label{margin-inline-start:var(--_ui5-v2-10-0-rc-2_checkbox_label_offset);cursor:inherit;text-overflow:ellipsis;overflow:hidden;pointer-events:none;color:var(--_ui5-v2-10-0-rc-2_checkbox_label_color)}.ui5-checkbox-icon{width:var(--_ui5-v2-10-0-rc-2_checkbox_icon_size);height:var(--_ui5-v2-10-0-rc-2_checkbox_icon_size);color:currentColor;cursor:inherit;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)}:host([display-only]){cursor:default}:host([display-only]) .ui5-checkbox-display-only-icon-inner [ui5-icon]{color:var(--sapTextColor)}:host([display-only]) .ui5-checkbox-display-only-icon-inner{min-width:var(--_ui5-v2-10-0-rc-2_checkbox_inner_width_height);max-width:var(--_ui5-v2-10-0-rc-2_checkbox_inner_width_height);height:var(--_ui5-v2-10-0-rc-2_checkbox_inner_width_height);max-height:var(--_ui5-v2-10-0-rc-2_checkbox_inner_width_height);display:flex;align-items:center;justify-content:center}
`;

	const name$7 = "accept";
	const pathData$7 = "M455.8 94q9 9 3 19l-222 326q-4 8-12 9t-14-5l-151-167q-5-5-4.5-11t5.5-11l25-25q12-12 23 0l96 96q5 5 13 4.5t12-8.5l175-249q4-7 11.5-8t13.5 4z";
	const ltr$7 = true;
	const collection$7 = "SAP-icons-v4";
	const packageName$7 = "@ui5/webcomponents-icons";

	Icons.f(name$7, { pathData: pathData$7, ltr: ltr$7, collection: collection$7, packageName: packageName$7 });

	const name$6 = "accept";
	const pathData$6 = "M187 416q-12 0-20-9L71 299q-7-7-7-17 0-11 7.5-18.5T90 256q12 0 19 9l77 87 217-247q8-9 19-9t18.5 7.5T448 122q0 10-6 16L206 407q-7 9-19 9z";
	const ltr$6 = true;
	const collection$6 = "SAP-icons-v5";
	const packageName$6 = "@ui5/webcomponents-icons";

	Icons.f(name$6, { pathData: pathData$6, ltr: ltr$6, collection: collection$6, packageName: packageName$6 });

	var accept = "accept";

	const name$5 = "complete";
	const pathData$5 = "M431.958 320h32v128q0 14-9.5 23t-22.5 9h-384q-14 0-23-9t-9-23V64q0-13 9-22.5t23-9.5h128v32h-128v384h384V320zm60-295q7 7 2 16l-185 272q-3 6-10 7t-12-4l-125-139q-9-9 0-18l21-21q10-10 19 0l80 80q5 5 11.5 4t9.5-8l146-207q3-6 9.5-7t11.5 4z";
	const ltr$5 = true;
	const collection$5 = "SAP-icons-v4";
	const packageName$5 = "@ui5/webcomponents-icons";

	Icons.f(name$5, { pathData: pathData$5, ltr: ltr$5, collection: collection$5, packageName: packageName$5 });

	const name$4 = "complete";
	const pathData$4 = "M438 224q11 0 18.5 7.5T464 250v140q0 38-26 64t-64 26H106q-38 0-64-26t-26-64V122q0-38 26-64t64-26h237q11 0 18 7.5t7 18.5-7 18-18 7H106q-16 0-27.5 11.5T67 122v268q0 16 11.5 27.5T106 429h268q16 0 27.5-11.5T413 390V250q0-11 7-18.5t18-7.5zm32-192q11 0 18.5 7.5T496 58q0 10-7 17L257 312q-6 8-18 8-10 0-18-8l-70-71q-7-7-7-18t7.5-18 18.5-7 18 7l51 53L452 40q8-8 18-8z";
	const ltr$4 = true;
	const collection$4 = "SAP-icons-v5";
	const packageName$4 = "@ui5/webcomponents-icons";

	Icons.f(name$4, { pathData: pathData$4, ltr: ltr$4, collection: collection$4, packageName: packageName$4 });

	var complete = "complete";

	const name$3 = "border";
	const pathData$3 = "M448 32q13 0 22.5 9t9.5 23v384q0 14-9.5 23t-22.5 9H64q-14 0-23-9t-9-23V64q0-14 9-23t23-9h384zm0 32H64v384h384V64z";
	const ltr$3 = false;
	const collection$3 = "SAP-icons-v4";
	const packageName$3 = "@ui5/webcomponents-icons";

	Icons.f(name$3, { pathData: pathData$3, ltr: ltr$3, collection: collection$3, packageName: packageName$3 });

	const name$2 = "border";
	const pathData$2 = "M390 480H122q-38 0-64-26t-26-64V122q0-38 26-64t64-26h268q38 0 64 26t26 64v268q0 38-26 64t-64 26zM122 83q-17 0-28 11t-11 28v268q0 17 11 28t28 11h268q17 0 28-11t11-28V122q0-17-11-28t-28-11H122z";
	const ltr$2 = false;
	const collection$2 = "SAP-icons-v5";
	const packageName$2 = "@ui5/webcomponents-icons";

	Icons.f(name$2, { pathData: pathData$2, ltr: ltr$2, collection: collection$2, packageName: packageName$2 });

	var border = "border";

	const name$1 = "tri-state";
	const pathData$1 = "M448 32q13 0 22.5 9.5T480 64v384q0 14-9.5 23t-22.5 9H64q-14 0-23-9t-9-23V64q0-13 9-22.5T64 32h384zm0 32H64v384h384V64zM160 345V169q0-8 8-8h176q8 0 8 8v176q0 8-8 8H168q-8 0-8-8z";
	const ltr$1 = false;
	const collection$1 = "SAP-icons-v4";
	const packageName$1 = "@ui5/webcomponents-icons";

	Icons.f(name$1, { pathData: pathData$1, ltr: ltr$1, collection: collection$1, packageName: packageName$1 });

	const name = "tri-state";
	const pathData = "M390 32q38 0 64 26t26 64v268q0 38-26 64t-64 26H122q-38 0-64-26t-26-64V122q0-38 26-64t64-26h268zm39 90q0-17-11-28t-28-11H122q-17 0-28 11t-11 28v268q0 17 11 28t28 11h268q17 0 28-11t11-28V122zm-77 38v192H160V160h192z";
	const ltr = false;
	const collection = "SAP-icons-v5";
	const packageName = "@ui5/webcomponents-icons";

	Icons.f(name, { pathData, ltr, collection, packageName });

	var triState = "tri-state";

	function CheckBoxTemplate() {
	    return (i18nDefaults.jsxs("div", { class: {
	            "ui5-checkbox-root": true,
	            "ui5-checkbox--hoverable": !this.disabled && !this.readonly && Icons.f$1(),
	        }, role: "checkbox", part: "root", "aria-checked": this.effectiveAriaChecked, "aria-readonly": this.ariaReadonly, "aria-disabled": this.effectiveAriaDisabled, "aria-label": this.ariaLabelText, "aria-labelledby": this.ariaLabelledBy, "aria-describedby": this.ariaDescribedBy, "aria-required": this.required, tabindex: this.effectiveTabIndex, onMouseDown: this._onmousedown, onMouseUp: this._onmouseup, onKeyDown: this._onkeydown, onKeyUp: this._onkeyup, onClick: this._onclick, onFocusOut: this._onfocusout, children: [this.isDisplayOnly ?
	                i18nDefaults.jsx("div", { class: "ui5-checkbox-display-only-icon-inner", children: i18nDefaults.jsx(Icon.Icon, { "aria-hidden": "true", name: displayOnlyIcon.call(this), class: "ui5-checkbox-display-only-icon", part: "icon" }) })
	                :
	                    i18nDefaults.jsx("div", { id: `${this._id}-CbBg`, class: "ui5-checkbox-inner", children: this.isCompletelyChecked &&
	                            i18nDefaults.jsx(Icon.Icon, { "aria-hidden": "true", name: accept, class: "ui5-checkbox-icon", part: "icon" }) }), i18nDefaults.jsx("input", { id: `${this._id}-CB`, type: "checkbox", checked: this.checked, readonly: this.readonly, disabled: this.disabled, tabindex: -1, "aria-hidden": "true", "data-sap-no-tab-ref": true }), this.text &&
	                i18nDefaults.jsx(Label, { id: `${this._id}-label`, part: "label", class: "ui5-checkbox-label", wrappingType: this.wrappingType, children: this.text }), this.hasValueState &&
	                i18nDefaults.jsx("span", { id: `${this._id}-descr`, class: "ui5-hidden-text", children: this.valueStateText })] }));
	}
	function displayOnlyIcon() {
	    if (this.isCompletelyChecked) {
	        return complete;
	    }
	    if (this.checked && this.indeterminate) {
	        return triState;
	    }
	    return border;
	}

	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var CheckBox_1;
	let isGlobalHandlerAttached = false;
	let activeCb;
	/**
	 * @class
	 *
	 * ### Overview
	 *
	 * Allows the user to set a binary value, such as true/false or yes/no for an item.
	 *
	 * The `ui5-checkbox` component consists of a box and a label that describes its purpose.
	 * If it's checked, an indicator is displayed inside the box.
	 * To check/uncheck the `ui5-checkbox`, the user has to click or tap the square
	 * box or its label.
	 *
	 * The `ui5-checkbox` component only has 2 states - checked and unchecked.
	 * Clicking or tapping toggles the `ui5-checkbox` between checked and unchecked state.
	 *
	 * ### Usage
	 *
	 * You can define the checkbox text with via the `text` property. If the text exceeds the available width, it is truncated by default.
	 * In case you prefer text to truncate, set the `wrappingType` property to "None".
	 * The touchable area for toggling the `ui5-checkbox` ends where the text ends.
	 *
	 * You can disable the `ui5-checkbox` by setting the `disabled` property to
	 * `true`,
	 * or use the `ui5-checkbox` in read-only mode by setting the `readonly`
	 * property to `true`.
	 *
	 * ### Keyboard Handling
	 *
	 * The user can use the following keyboard shortcuts to toggle the checked state of the `ui5-checkbox`.
	 *
	 * - [Space],[Enter] - Toggles between different states: checked, not checked.
	 *
	 * ### ES6 Module Import
	 *
	 * `import "@ui5/webcomponents/dist/CheckBox.js";`
	 * @constructor
	 * @extends UI5Element
	 * @public
	 * @csspart root - Used to style the outermost wrapper of the `ui5-checkbox`
	 * @csspart label - Used to style the label of the `ui5-checkbox`
	 * @csspart icon - Used to style the icon of the `ui5-checkbox`
	 */
	let CheckBox = CheckBox_1 = class CheckBox extends webcomponentsBase.b {
	    get formValidityMessage() {
	        return CheckBox_1.i18nBundle.getText(i18nDefaults.FORM_CHECKABLE_REQUIRED);
	    }
	    get formValidity() {
	        return { valueMissing: this.required && !this.checked };
	    }
	    async formElementAnchor() {
	        return this.getFocusDomRefAsync();
	    }
	    get formFormattedValue() {
	        return this.checked ? "on" : null;
	    }
	    constructor() {
	        super();
	        /**
	         * Defines whether the component is disabled.
	         *
	         * **Note:** A disabled component is completely noninteractive.
	         * @default false
	         * @public
	         */
	        this.disabled = false;
	        /**
	         * Defines whether the component is read-only.
	         *
	         * **Note:** A read-only component is not editable,
	         * but still provides visual feedback upon user interaction.
	         * @default false
	         * @public
	         */
	        this.readonly = false;
	        /**
	         * Determines whether the `ui5-checkbox` is in display only state.
	         *
	         * When set to `true`, the `ui5-checkbox` is not interactive, not editable, not focusable
	         * and not in the tab chain. This setting is used for forms in review mode.
	         *
	         * **Note:** When the property `disabled` is set to `true` this property has no effect.
	         * @since 1.22.0
	         * @public
	         * @default false
	         */
	        this.displayOnly = false;
	        /**
	         * Defines whether the component is required.
	         * @default false
	         * @public
	         * @since 1.3.0
	         */
	        this.required = false;
	        /**
	        * Defines whether the component is displayed as partially checked.
	        *
	        * **Note:** The indeterminate state can be set only programmatically and can’t be achieved by user
	        * interaction and the resulting visual state depends on the values of the `indeterminate`
	        * and `checked` properties:
	        *
	        * -  If the component is checked and indeterminate, it will be displayed as partially checked
	        * -  If the component is checked and it is not indeterminate, it will be displayed as checked
	        * -  If the component is not checked, it will be displayed as not checked regardless value of the indeterminate attribute
	        * @default false
	        * @public
	        * @since 1.0.0-rc.15
	        */
	        this.indeterminate = false;
	        /**
	         * Defines if the component is checked.
	         *
	         * **Note:** The property can be changed with user interaction,
	         * either by cliking/tapping on the component, or by
	         * pressing the Enter or Space key.
	         * @default false
	         * @formEvents change
	         * @formProperty
	         * @public
	         */
	        this.checked = false;
	        /**
	         * Defines the value state of the component.
	         * @default "None"
	         * @public
	         */
	        this.valueState = "None";
	        /**
	         * Defines whether the component text wraps when there is not enough space.
	         *
	         * **Note:** for option "Normal" the text will wrap and the words will not be broken based on hyphenation.
	         * **Note:** for option "None" the text will be truncated with an ellipsis.
	         * @default "Normal"
	         * @public
	         */
	        this.wrappingType = "Normal";
	        /**
	         * Defines the active state (pressed or not) of the component.
	         * @private
	         */
	        this.active = false;
	        this._deactivate = () => {
	            if (activeCb) {
	                activeCb.active = false;
	            }
	        };
	        if (!isGlobalHandlerAttached) {
	            document.addEventListener("mouseup", this._deactivate);
	            isGlobalHandlerAttached = true;
	        }
	    }
	    onEnterDOM() {
	        if (Icons.f$1()) {
	            this.setAttribute("desktop", "");
	        }
	    }
	    _onclick() {
	        this.toggle();
	    }
	    _onmousedown() {
	        if (this.readonly || this.disabled) {
	            return;
	        }
	        this.active = true;
	        activeCb = this; // eslint-disable-line
	    }
	    _onmouseup() {
	        this.active = false;
	    }
	    _onfocusout() {
	        this.active = false;
	    }
	    _onkeydown(e) {
	        if (webcomponentsBase.i(e)) {
	            e.preventDefault();
	        }
	        if (this.readonly || this.disabled) {
	            return;
	        }
	        if (webcomponentsBase.b$1(e)) {
	            this.toggle();
	        }
	        this.active = true;
	    }
	    _onkeyup(e) {
	        if (webcomponentsBase.i(e)) {
	            this.toggle();
	        }
	        this.active = false;
	    }
	    toggle() {
	        if (this.canToggle()) {
	            const lastState = {
	                checked: this.checked,
	                indeterminate: this.indeterminate,
	            };
	            if (this.indeterminate) {
	                this.indeterminate = false;
	                this.checked = true;
	            }
	            else {
	                this.checked = !this.checked;
	            }
	            const changePrevented = !this.fireDecoratorEvent("change");
	            // Angular two way data binding
	            const valueChangePrevented = !this.fireDecoratorEvent("value-changed");
	            if (changePrevented || valueChangePrevented) {
	                this.checked = lastState.checked;
	                this.indeterminate = lastState.indeterminate;
	            }
	        }
	        return this;
	    }
	    canToggle() {
	        return !(this.disabled || this.readonly || this.displayOnly);
	    }
	    valueStateTextMappings() {
	        return {
	            "Negative": CheckBox_1.i18nBundle.getText(i18nDefaults.VALUE_STATE_ERROR),
	            "Critical": CheckBox_1.i18nBundle.getText(i18nDefaults.VALUE_STATE_WARNING),
	            "Positive": CheckBox_1.i18nBundle.getText(i18nDefaults.VALUE_STATE_SUCCESS),
	        };
	    }
	    get ariaLabelText() {
	        return toLowercaseEnumValue.A(this);
	    }
	    get classes() {
	        return {
	            main: {
	                "ui5-checkbox--hoverable": !this.disabled && !this.readonly && Icons.f$1(),
	            },
	        };
	    }
	    get ariaReadonly() {
	        return this.readonly || this.displayOnly ? "true" : undefined;
	    }
	    get effectiveAriaDisabled() {
	        return this.disabled ? "true" : undefined;
	    }
	    get effectiveAriaChecked() {
	        return this.indeterminate && this.checked ? "mixed" : this.checked;
	    }
	    get ariaLabelledBy() {
	        if (!this.ariaLabelText) {
	            return this.text ? `${this._id}-label` : undefined;
	        }
	        return undefined;
	    }
	    get ariaDescribedBy() {
	        return this.hasValueState ? `${this._id}-descr` : undefined;
	    }
	    get hasValueState() {
	        return this.valueState !== information.o.None;
	    }
	    get valueStateText() {
	        if (this.valueState !== information.o.None && this.valueState !== information.o.Information) {
	            return this.valueStateTextMappings()[this.valueState];
	        }
	    }
	    get effectiveTabIndex() {
	        const tabindex = this.getAttribute("tabindex");
	        if (this.tabbable) {
	            return tabindex ? parseInt(tabindex) : 0;
	        }
	    }
	    get tabbable() {
	        return !this.disabled && !this.displayOnly;
	    }
	    get isCompletelyChecked() {
	        return this.checked && !this.indeterminate;
	    }
	    get isDisplayOnly() {
	        return this.displayOnly && !this.disabled;
	    }
	};
	__decorate([
	    webcomponentsBase.s()
	], CheckBox.prototype, "accessibleNameRef", void 0);
	__decorate([
	    webcomponentsBase.s()
	], CheckBox.prototype, "accessibleName", void 0);
	__decorate([
	    webcomponentsBase.s({ type: Boolean })
	], CheckBox.prototype, "disabled", void 0);
	__decorate([
	    webcomponentsBase.s({ type: Boolean })
	], CheckBox.prototype, "readonly", void 0);
	__decorate([
	    webcomponentsBase.s({ type: Boolean })
	], CheckBox.prototype, "displayOnly", void 0);
	__decorate([
	    webcomponentsBase.s({ type: Boolean })
	], CheckBox.prototype, "required", void 0);
	__decorate([
	    webcomponentsBase.s({ type: Boolean })
	], CheckBox.prototype, "indeterminate", void 0);
	__decorate([
	    webcomponentsBase.s({ type: Boolean })
	], CheckBox.prototype, "checked", void 0);
	__decorate([
	    webcomponentsBase.s()
	], CheckBox.prototype, "text", void 0);
	__decorate([
	    webcomponentsBase.s()
	], CheckBox.prototype, "valueState", void 0);
	__decorate([
	    webcomponentsBase.s()
	], CheckBox.prototype, "wrappingType", void 0);
	__decorate([
	    webcomponentsBase.s()
	], CheckBox.prototype, "name", void 0);
	__decorate([
	    webcomponentsBase.s({ type: Boolean })
	], CheckBox.prototype, "active", void 0);
	__decorate([
	    i18nDefaults.i("@ui5/webcomponents")
	], CheckBox, "i18nBundle", void 0);
	CheckBox = CheckBox_1 = __decorate([
	    webcomponentsBase.m({
	        tag: "ui5-checkbox",
	        languageAware: true,
	        formAssociated: true,
	        renderer: i18nDefaults.d,
	        template: CheckBoxTemplate,
	        styles: checkboxCss,
	    })
	    /**
	     * Fired when the component checked state changes.
	     * @public
	     */
	    ,
	    eventStrict.l("change", {
	        bubbles: true,
	        cancelable: true,
	    })
	    /**
	     * Fired to make Angular two way data binding work properly.
	     * @private
	     */
	    ,
	    eventStrict.l("value-changed", {
	        bubbles: true,
	        cancelable: true,
	    })
	], CheckBox);
	CheckBox.define();
	var CheckBox$1 = CheckBox;

	const predefinedHooks = {
	    listItemPreContent,
	    listItemContent,
	    imageBegin,
	    iconBegin,
	    iconEnd,
	    selectionElement,
	};
	function ListItemTemplate(hooks) {
	    const currentHooks = { ...predefinedHooks, ...hooks };
	    return i18nDefaults.jsxs("li", { part: "native-li", "data-sap-focus-ref": true, tabindex: this._effectiveTabIndex, class: this.classes.main, onFocusIn: this._onfocusin, onFocusOut: this._onfocusout, onKeyUp: this._onkeyup, onKeyDown: this._onkeydown, onMouseUp: this._onmouseup, onMouseDown: this._onmousedown, onTouchStart: this._onmousedown, onTouchEnd: this._ontouchend, onClick: this._onclick, draggable: this.movable, onDragStart: this._ondragstart, onDragEnd: this._ondragend, role: this._accInfo.role, title: this._accInfo.tooltip, "aria-expanded": this._accInfo.ariaExpanded, "aria-level": this._accInfo.ariaLevel, "aria-haspopup": this._accInfo.ariaHaspopup, "aria-posinset": this._accInfo.posinset, "aria-setsize": this._accInfo.setsize, "aria-describedby": `${this._id}-invisibleText-describedby`, "aria-labelledby": this._accessibleNameRef, "aria-disabled": this._ariaDisabled, "aria-selected": this._accInfo.ariaSelected, "aria-checked": this._accInfo.ariaChecked, "aria-owns": this._accInfo.ariaOwns, "aria-keyshortcuts": this._accInfo.ariaKeyShortcuts, children: [currentHooks.listItemPreContent.call(this), this.placeSelectionElementBefore && selectionElement.call(this), this._hasHighlightColor && i18nDefaults.jsx("div", { class: "ui5-li-highlight" }), i18nDefaults.jsxs("div", { part: "content", id: `${this._id}-content`, class: "ui5-li-content", children: [currentHooks.imageBegin.call(this), currentHooks.iconBegin.call(this), currentHooks.listItemContent.call(this)] }), currentHooks.iconEnd.call(this), this.typeDetail && (i18nDefaults.jsx("div", { class: "ui5-li-detailbtn", children: i18nDefaults.jsx(Button.Button, { part: "detail-button", design: "Transparent", onClick: this.onDetailClick, icon: edit }) })), this.typeNavigation && (i18nDefaults.jsx(Icon.Icon, { name: slimArrowRight })), this.navigated && (i18nDefaults.jsx("div", { class: "ui5-li-navigated" })), this.placeSelectionElementAfter && (currentHooks.selectionElement.call(this)), i18nDefaults.jsx("span", { id: `${this._id}-invisibleText`, class: "ui5-hidden-text", children: this.ariaLabelledByText }), i18nDefaults.jsx("span", { id: `${this._id}-invisibleText-describedby`, class: "ui5-hidden-text", children: this._accInfo.ariaSelectedText })] });
	}
	function listItemPreContent() { }
	function listItemContent() { }
	function imageBegin() { }
	function iconBegin() { }
	function iconEnd() { }
	function selectionElement() {
	    switch (true) {
	        case this.modeSingleSelect:
	            return (i18nDefaults.jsx(RadioButton$1, { part: "radio", disabled: this.isInactive, accessibleName: this._accInfo.ariaLabelRadioButton, tabindex: -1, id: `${this._id}-singleSelectionElement`, class: "ui5-li-singlesel-radiobtn", checked: this.selected, onChange: this.onSingleSelectionComponentPress }));
	        case this.modeMultiple:
	            return (i18nDefaults.jsx(CheckBox$1, { part: "checkbox", disabled: this.isInactive, indeterminate: this.indeterminate, tabindex: -1, id: `${this._id}-multiSelectionElement`, class: "ui5-li-multisel-cb", checked: this.selected, accessibleName: this._accInfo.ariaLabel, onChange: this.onMultiSelectionComponentPress }));
	        case this.modeDelete:
	            return (i18nDefaults.jsx("div", { class: "ui5-li-deletebtn", children: this.hasDeleteButtonSlot ?
	                    (i18nDefaults.jsx("slot", { name: "deleteButton" })) : (i18nDefaults.jsx(Button.Button, { part: "delete-button", tabindex: -1, "data-sap-no-tab-ref": true, id: `${this._id}-deleteSelectionElement`, design: "Transparent", icon: information.decline, onClick: this.onDelete, tooltip: this.deleteText })) }));
	    }
	}

	exports.ListItem = ListItem$1;
	exports.ListItemTemplate = ListItemTemplate;
	exports.Popover = Popover$1;
	exports.ResponsivePopover = ResponsivePopover$1;
	exports.Title = Title$1;
	exports.e = e;
	exports.edit = edit;
	exports.slimArrowRight = slimArrowRight;

}));
