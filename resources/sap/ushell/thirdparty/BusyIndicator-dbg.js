sap.ui.define(['exports', 'sap/ushell/thirdparty/webcomponents-base', 'sap/ushell/thirdparty/Icons', 'sap/ushell/thirdparty/i18n-defaults', 'sap/ushell/thirdparty/event-strict', 'sap/ushell/thirdparty/Label'], (function (exports, webcomponentsBase, Icons, i18nDefaults, eventStrict, Label) { 'use strict';

    const t=e=>e.nodeName==="SLOT"?false:e.offsetWidth<=0&&e.offsetHeight<=0||e.style&&e.style.visibility==="hidden";

    const n=/^(?:a|area)$/i,a$1=/^(?:input|select|textarea|button)$/i,r$1=e=>{if(e.disabled)return  false;const t=e.getAttribute("tabindex");return t!=null?parseInt(t)>=0:a$1.test(e.nodeName)||n.test(e.nodeName)&&!!e.href};

    const E=e=>e.hasAttribute("data-ui5-focus-trap"),d=e=>{const l=getComputedStyle(e);return e.scrollHeight>e.clientHeight&&["scroll","auto"].indexOf(l.overflowY)>=0||e.scrollWidth>e.clientWidth&&["scroll","auto"].indexOf(l.overflowX)>=0},b$1=async(e,l)=>!e||t(e)?null:m(e,true),H=async(e,l)=>!e||t(e)?null:m(e,false),T=e=>e.hasAttribute("data-ui5-focus-redirect")||!t(e),L=e=>{if(webcomponentsBase.v(e)){const l=e.getAttribute("tabindex");if(l!==null&&parseInt(l)<0)return  true}return  false},m=async(e,l,r)=>{let t$1,s,n=-1;e.shadowRoot?t$1=l?e.shadowRoot.firstChild:e.shadowRoot.lastChild:e instanceof HTMLSlotElement&&e.assignedNodes()?(s=e.assignedNodes(),n=l?0:s.length-1,t$1=s[n]):t$1=l?e.firstElementChild:e.lastElementChild;let i;for(;t$1;){const u=t$1;if(!t(u)&&!L(u)){if(webcomponentsBase.v(t$1)&&(await t$1._waitForDomRef(),t$1=t$1.getDomRef()),!t$1||t(t$1))return null;if(t$1.nodeType===1&&T(t$1)&&!E(t$1)){if(r$1(t$1)||(i=await m(t$1,l),!Icons.h()&&!i&&d(t$1)))return t$1&&typeof t$1.focus=="function"?t$1:null;if(i)return i&&typeof i.focus=="function"?i:null}}t$1=l?u.nextSibling:u.previousSibling,s&&!s[n].contains(t$1)&&(n=l?n+1:n-1,t$1=s[n]);}return null};

    const r=e=>{if(!e||e.hasAttribute("data-sap-no-tab-ref")||t(e))return  false;const t$1=e.getAttribute("tabindex");if(t$1!=null)return parseInt(t$1)>=0;const n=e.nodeName.toLowerCase();return n==="a"||/^(input|select|textarea|button|object)$/.test(n)?!e.disabled:false};

    const b=t=>a([...t.children]),a=(t,n)=>{const l=n||[];return t&&t.forEach(r$1=>{if(r$1.nodeType===Node.TEXT_NODE||r$1.nodeType===Node.COMMENT_NODE)return;const e=r$1;if(!e.hasAttribute("data-sap-no-tab-ref"))if(r(e)&&l.push(e),e.tagName==="SLOT")a(e.assignedNodes(),l);else {const s=e.shadowRoot?e.shadowRoot.children:e.children;a([...s],l);}}),l};

    Icons.p("@ui5/webcomponents-theming", "sap_horizon", async () => i18nDefaults.defaultThemeBase);
    Icons.p("@ui5/webcomponents", "sap_horizon", async () => i18nDefaults.defaultTheme);
    var styles = `:host{box-sizing:border-box;height:var(--_ui5-v2-10-0-rc-2_list_item_base_height);background-color:var(--ui5-v2-10-0-rc-2-listitem-background-color);border-bottom:.0625rem solid transparent}:host(:not([hidden])){display:block}:host([disabled]){opacity:var(--_ui5-v2-10-0-rc-2-listitembase_disabled_opacity);pointer-events:none}:host([actionable]:not([disabled]):not([ui5-li-group-header])){cursor:pointer}:host([has-border]){border-bottom:var(--ui5-v2-10-0-rc-2-listitem-border-bottom)}:host([selected]){background-color:var(--sapList_SelectionBackgroundColor);border-bottom:var(--ui5-v2-10-0-rc-2-listitem-selected-border-bottom)}:host([selected]) .ui5-li-additional-text{text-shadow:var(--sapContent_TextShadow)}:host([actionable]:not([active]):not([selected]):not([ui5-li-group-header]):hover){background-color:var(--sapList_Hover_Background)}:host([actionable]:not([active]):not([selected]):not([ui5-li-group-header]):hover) .ui5-li-additional-text{text-shadow:var(--sapContent_TextShadow)}:host([actionable][selected]:not([active],[data-moving]):hover){background-color:var(--sapList_Hover_SelectionBackground)}:host([active][actionable]:not([data-moving])),:host([active][actionable][selected]:not([data-moving])){background-color:var(--sapList_Active_Background)}:host([desktop]:not([data-moving])) .ui5-li-root.ui5-li--focusable:focus:after,:host([desktop][focused]:not([data-moving])) .ui5-li-root.ui5-li--focusable:after,:host(:not([data-moving])) .ui5-li-root.ui5-li--focusable:focus-visible:after,:host([desktop]:not([data-moving])) .ui5-li-root .ui5-li-content:focus:after,:host([desktop][focused]:not([data-moving])) .ui5-li-root .ui5-li-content:after,:host(:not([data-moving])) .ui5-li-root .ui5-li-content:focus-visible:after{content:"";border:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);position:absolute;inset:.125rem;pointer-events:none}.ui5-li-root{position:relative;display:flex;align-items:center;width:100%;height:100%;padding:var(--_ui5-v2-10-0-rc-2_list_item_base_padding);box-sizing:border-box;background-color:inherit}.ui5-li-root.ui5-li--focusable{outline:none}.ui5-li-content{display:flex;align-items:center;flex:auto;overflow:hidden;max-width:100%;font-family:"72override",var(--sapFontFamily);color:var(--sapList_TextColor)}.ui5-li-content .ui5-li-title{color:var(--sapList_TextColor);font-size:var(--_ui5-v2-10-0-rc-2_list_item_title_size)}.ui5-li-text-wrapper{display:flex;flex-direction:row;justify-content:space-between;flex:auto;min-width:1px;line-height:normal}
`;

    Icons.p("@ui5/webcomponents-theming", "sap_horizon", async () => i18nDefaults.defaultThemeBase);
    Icons.p("@ui5/webcomponents", "sap_horizon", async () => i18nDefaults.defaultTheme);
    var draggableElementStyles = `[draggable=true]{cursor:grab!important}[draggable=true][data-moving]{cursor:grabbing!important;opacity:var(--sapContent_DisabledOpacity)}
`;

    var __decorate$1 = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    /**
     * @class
     * A class to serve as a foundation
     * for the `ListItem` and `ListItemGroupHeader` classes.
     * @constructor
     * @abstract
     * @extends UI5Element
     * @public
     */
    let ListItemBase = class ListItemBase extends webcomponentsBase.b {
        constructor() {
            super(...arguments);
            /**
             * Defines the selected state of the component.
             * @default false
             * @private
             */
            this.selected = false;
            /**
             * Defines whether the item is movable.
             * @default false
             * @private
             * @since 2.0.0
             */
            this.movable = false;
            /**
            * Defines if the list item should display its bottom border.
            * @private
            */
            this.hasBorder = false;
            /**
            * Defines whether `ui5-li` is in disabled state.
            *
            * **Note:** A disabled `ui5-li` is noninteractive.
            * @default false
            * @protected
            * @since 1.0.0-rc.12
            */
            this.disabled = false;
            /**
             * Indicates if the element is on focus
             * @private
             */
            this.focused = false;
            /**
             * Indicates if the list item is actionable, e.g has hover and pressed effects.
             * @private
             */
            this.actionable = false;
        }
        onEnterDOM() {
            if (Icons.f$1()) {
                this.setAttribute("desktop", "");
            }
        }
        onBeforeRendering() {
            this.actionable = true;
        }
        _onfocusin(e) {
            this.fireDecoratorEvent("request-tabindex-change", e);
            if (e.target !== this.getFocusDomRef()) {
                return;
            }
            this.fireDecoratorEvent("_focused", e);
        }
        _onkeydown(e) {
            if (webcomponentsBase.B(e)) {
                return this._handleTabNext(e);
            }
            if (webcomponentsBase.m$1(e)) {
                return this._handleTabPrevious(e);
            }
            if (this.getFocusDomRef().matches(":has(:focus-within)")) {
                return;
            }
            if (webcomponentsBase.i(e)) {
                e.preventDefault();
            }
            if (webcomponentsBase.b$1(e)) {
                this.fireItemPress(e);
            }
        }
        _onkeyup(e) {
            if (this.getFocusDomRef().matches(":has(:focus-within)")) {
                return;
            }
            if (webcomponentsBase.i(e)) {
                this.fireItemPress(e);
            }
        }
        _onclick(e) {
            if (this.getFocusDomRef().matches(":has(:focus-within)")) {
                return;
            }
            this.fireItemPress(e);
        }
        fireItemPress(e) {
            if (this.disabled || !this._pressable) {
                return;
            }
            if (webcomponentsBase.b$1(e)) {
                e.preventDefault();
            }
            this.fireDecoratorEvent("_press", { item: this, selected: this.selected, key: e.key });
        }
        _handleTabNext(e) {
            if (this.shouldForwardTabAfter()) {
                if (!this.fireDecoratorEvent("forward-after")) {
                    e.preventDefault();
                }
            }
        }
        _handleTabPrevious(e) {
            const target = e.target;
            if (this.shouldForwardTabBefore(target)) {
                this.fireDecoratorEvent("forward-before");
            }
        }
        /**
         * Determines if th current list item either has no tabbable content or
         * [Tab] is performed onto the last tabbale content item.
         */
        shouldForwardTabAfter() {
            const aContent = b(this.getFocusDomRef());
            return aContent.length === 0 || (aContent[aContent.length - 1] === webcomponentsBase.t());
        }
        /**
         * Determines if the current list item is target of [SHIFT+TAB].
         */
        shouldForwardTabBefore(target) {
            return this.getFocusDomRef() === target;
        }
        get classes() {
            return {
                main: {
                    "ui5-li-root": true,
                    "ui5-li--focusable": this._focusable,
                },
            };
        }
        get _ariaDisabled() {
            return this.disabled ? true : undefined;
        }
        get _focusable() {
            return !this.disabled;
        }
        get _pressable() {
            return true;
        }
        get hasConfigurableMode() {
            return false;
        }
        get _effectiveTabIndex() {
            if (!this._focusable) {
                return -1;
            }
            if (this.selected) {
                return 0;
            }
            return this.forcedTabIndex ? parseInt(this.forcedTabIndex) : undefined;
        }
    };
    __decorate$1([
        webcomponentsBase.s({ type: Boolean })
    ], ListItemBase.prototype, "selected", void 0);
    __decorate$1([
        webcomponentsBase.s({ type: Boolean })
    ], ListItemBase.prototype, "movable", void 0);
    __decorate$1([
        webcomponentsBase.s({ type: Boolean })
    ], ListItemBase.prototype, "hasBorder", void 0);
    __decorate$1([
        webcomponentsBase.s()
    ], ListItemBase.prototype, "forcedTabIndex", void 0);
    __decorate$1([
        webcomponentsBase.s({ type: Boolean })
    ], ListItemBase.prototype, "disabled", void 0);
    __decorate$1([
        webcomponentsBase.s({ type: Boolean })
    ], ListItemBase.prototype, "focused", void 0);
    __decorate$1([
        webcomponentsBase.s({ type: Boolean })
    ], ListItemBase.prototype, "actionable", void 0);
    ListItemBase = __decorate$1([
        webcomponentsBase.m({
            renderer: i18nDefaults.d,
            styles: [styles, draggableElementStyles],
        }),
        eventStrict.l("request-tabindex-change", {
            bubbles: true,
        }),
        eventStrict.l("_press", {
            bubbles: true,
        }),
        eventStrict.l("_focused", {
            bubbles: true,
        }),
        eventStrict.l("forward-after", {
            bubbles: true,
            cancelable: true,
        }),
        eventStrict.l("forward-before", {
            bubbles: true,
        })
    ], ListItemBase);
    var ListItemBase$1 = ListItemBase;

    /**
     * Different BusyIndicator text placements.
     *
     * @public
     */
    var BusyIndicatorTextPlacement;
    (function (BusyIndicatorTextPlacement) {
        /**
         * The text will be displayed on top of the busy indicator.
         * @public
         */
        BusyIndicatorTextPlacement["Top"] = "Top";
        /**
         * The text will be displayed at the bottom of the busy indicator.
         * @public
         */
        BusyIndicatorTextPlacement["Bottom"] = "Bottom";
    })(BusyIndicatorTextPlacement || (BusyIndicatorTextPlacement = {}));
    var BusyIndicatorTextPlacement$1 = BusyIndicatorTextPlacement;

    function BusyIndicatorTemplate() {
        return (i18nDefaults.jsxs("div", { class: "ui5-busy-indicator-root", children: [this._isBusy && (i18nDefaults.jsxs("div", { class: "ui5-busy-indicator-busy-area", title: this.ariaTitle, tabindex: 0, role: "progressbar", "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuetext": "Busy", "aria-labelledby": this.labelId, "data-sap-focus-ref": true, children: [this.textPosition.top && BusyIndicatorBusyText.call(this), i18nDefaults.jsxs("div", { class: "ui5-busy-indicator-circles-wrapper", children: [i18nDefaults.jsx("div", { class: "ui5-busy-indicator-circle circle-animation-0" }), i18nDefaults.jsx("div", { class: "ui5-busy-indicator-circle circle-animation-1" }), i18nDefaults.jsx("div", { class: "ui5-busy-indicator-circle circle-animation-2" })] }), this.textPosition.bottom && BusyIndicatorBusyText.call(this)] })), i18nDefaults.jsx("slot", {}), this._isBusy && (i18nDefaults.jsx("span", { "data-ui5-focus-redirect": true, tabindex: 0, role: "none", onFocusIn: this._redirectFocus }))] }));
    }
    function BusyIndicatorBusyText() {
        return (i18nDefaults.jsx(i18nDefaults.Fragment, { children: this.text && (i18nDefaults.jsx(Label, { id: `${this._id}-label`, class: "ui5-busy-indicator-text", children: this.text })) }));
    }

    Icons.p("@ui5/webcomponents-theming", "sap_horizon", async () => i18nDefaults.defaultThemeBase);
    Icons.p("@ui5/webcomponents", "sap_horizon", async () => i18nDefaults.defaultTheme);
    var busyIndicatorCss = `:host(:not([hidden])){display:inline-block}:host([_is-busy]){color:var(--_ui5-v2-10-0-rc-2_busy_indicator_color)}:host([size="S"]) .ui5-busy-indicator-root{min-width:1.625rem;min-height:.5rem}:host([size="S"][text]:not([text=""])) .ui5-busy-indicator-root{min-height:1.75rem}:host([size="S"]) .ui5-busy-indicator-circle{width:.5rem;height:.5rem}:host([size="S"]) .ui5-busy-indicator-circle:first-child,:host([size="S"]) .ui5-busy-indicator-circle:nth-child(2){margin-inline-end:.0625rem}:host(:not([size])) .ui5-busy-indicator-root,:host([size="M"]) .ui5-busy-indicator-root{min-width:3.375rem;min-height:1rem}:host([size="M"]) .ui5-busy-indicator-circle:first-child,:host([size="M"]) .ui5-busy-indicator-circle:nth-child(2){margin-inline-end:.1875rem}:host(:not([size])[text]:not([text=""])) .ui5-busy-indicator-root,:host([size="M"][text]:not([text=""])) .ui5-busy-indicator-root{min-height:2.25rem}:host(:not([size])) .ui5-busy-indicator-circle,:host([size="M"]) .ui5-busy-indicator-circle{width:1rem;height:1rem}:host([size="L"]) .ui5-busy-indicator-root{min-width:6.5rem;min-height:2rem}:host([size="L"]) .ui5-busy-indicator-circle:first-child,:host([size="L"]) .ui5-busy-indicator-circle:nth-child(2){margin-inline-end:.25rem}:host([size="L"][text]:not([text=""])) .ui5-busy-indicator-root{min-height:3.25rem}:host([size="L"]) .ui5-busy-indicator-circle{width:2rem;height:2rem}.ui5-busy-indicator-root{display:flex;justify-content:center;align-items:center;position:relative;background-color:inherit;height:inherit;border-radius:inherit}.ui5-busy-indicator-busy-area{position:absolute;z-index:99;inset:0;display:flex;justify-content:center;align-items:center;background-color:inherit;flex-direction:column;border-radius:inherit}:host([active]) ::slotted(*){opacity:var(--sapContent_DisabledOpacity)}:host([desktop]) .ui5-busy-indicator-busy-area:focus,.ui5-busy-indicator-busy-area:focus-visible{outline:var(--_ui5-v2-10-0-rc-2_busy_indicator_focus_outline);outline-offset:-2px}.ui5-busy-indicator-circles-wrapper{line-height:0}.ui5-busy-indicator-circle{display:inline-block;background-color:currentColor;border-radius:50%}.ui5-busy-indicator-circle:before{content:"";width:100%;height:100%;border-radius:100%}.circle-animation-0{animation:grow 1.6s infinite cubic-bezier(.32,.06,.85,1.11)}.circle-animation-1{animation:grow 1.6s infinite cubic-bezier(.32,.06,.85,1.11);animation-delay:.2s}.circle-animation-2{animation:grow 1.6s infinite cubic-bezier(.32,.06,.85,1.11);animation-delay:.4s}.ui5-busy-indicator-text{width:100%;text-align:center}:host([text-placement="Top"]) .ui5-busy-indicator-text{margin-bottom:.5rem}:host(:not([text-placement])) .ui5-busy-indicator-text,:host([text-placement="Bottom"]) .ui5-busy-indicator-text{margin-top:.5rem}@keyframes grow{0%,50%,to{-webkit-transform:scale(.5);-moz-transform:scale(.5);transform:scale(.5)}25%{-webkit-transform:scale(1);-moz-transform:scale(1);transform:scale(1)}}
`;

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var BusyIndicator_1;
    /**
     * @class
     *
     * ### Overview
     *
     * The `ui5-busy-indicator` signals that some operation is going on and that the
     * user must wait. It does not block the current UI screen so other operations could be triggered in parallel.
     * It displays 3 dots and each dot expands and shrinks at a different rate, resulting in a cascading flow of animation.
     *
     * ### Usage
     * For the `ui5-busy-indicator` you can define the size, the text and whether it is shown or hidden.
     * In order to hide it, use the "active" property.
     *
     * In order to show busy state over an HTML element, simply nest the HTML element in a `ui5-busy-indicator` instance.
     *
     * **Note:** Since `ui5-busy-indicator` has `display: inline-block;` by default and no width of its own,
     * whenever you need to wrap a block-level element, you should set `display: block` to the busy indicator as well.
     *
     * #### When to use:
     *
     * - The user needs to be able to cancel the operation.
     * - Only part of the application or a particular component is affected.
     *
     * #### When not to use:
     *
     * - The operation takes less than one second.
     * - You need to block the screen and prevent the user from starting another activity.
     * - Do not show multiple busy indicators at once.
     *
     * ### ES6 Module Import
     *
     * `import "@ui5/webcomponents/dist/BusyIndicator.js";`
     * @constructor
     * @extends UI5Element
     * @public
     * @slot {Array<Node>} default - Determines the content over which the component will appear.
     * @since 0.12.0
     */
    let BusyIndicator = BusyIndicator_1 = class BusyIndicator extends webcomponentsBase.b {
        constructor() {
            super();
            /**
             * Defines the size of the component.
             * @default "M"
             * @public
             */
            this.size = "M";
            /**
             * Defines if the busy indicator is visible on the screen. By default it is not.
             * @default false
             * @public
             */
            this.active = false;
            /**
             * Defines the delay in milliseconds, after which the busy indicator will be visible on the screen.
             * @default 1000
             * @public
             */
            this.delay = 1000;
            /**
             * Defines the placement of the text.
             *
             * @default "Bottom"
             * @public
             */
            this.textPlacement = "Bottom";
            /**
             * Defines if the component is currently in busy state.
             * @private
             */
            this._isBusy = false;
            this._keydownHandler = this._handleKeydown.bind(this);
            this._preventEventHandler = this._preventEvent.bind(this);
        }
        onEnterDOM() {
            this.addEventListener("keydown", this._keydownHandler, {
                capture: true,
            });
            this.addEventListener("keyup", this._preventEventHandler, {
                capture: true,
            });
            if (Icons.f$1()) {
                this.setAttribute("desktop", "");
            }
        }
        onExitDOM() {
            if (this._busyTimeoutId) {
                clearTimeout(this._busyTimeoutId);
                delete this._busyTimeoutId;
            }
            this.removeEventListener("keydown", this._keydownHandler, true);
            this.removeEventListener("keyup", this._preventEventHandler, true);
        }
        get ariaTitle() {
            return BusyIndicator_1.i18nBundle.getText(i18nDefaults.BUSY_INDICATOR_TITLE);
        }
        get labelId() {
            return this.text ? `${this._id}-label` : undefined;
        }
        get textPosition() {
            return {
                top: this.text && this.textPlacement === BusyIndicatorTextPlacement$1.Top,
                bottom: this.text && this.textPlacement === BusyIndicatorTextPlacement$1.Bottom,
            };
        }
        onBeforeRendering() {
            if (this.active) {
                if (!this._isBusy && !this._busyTimeoutId) {
                    this._busyTimeoutId = setTimeout(() => {
                        delete this._busyTimeoutId;
                        this._isBusy = true;
                    }, Math.max(0, this.delay));
                }
            }
            else {
                if (this._busyTimeoutId) {
                    clearTimeout(this._busyTimeoutId);
                    delete this._busyTimeoutId;
                }
                this._isBusy = false;
            }
        }
        _handleKeydown(e) {
            if (!this._isBusy) {
                return;
            }
            e.stopImmediatePropagation();
            // move the focus to the last element in this DOM and let TAB continue to the next focusable element
            if (webcomponentsBase.B(e)) {
                this.focusForward = true;
                this.shadowRoot.querySelector("[data-ui5-focus-redirect]").focus();
                this.focusForward = false;
            }
        }
        _preventEvent(e) {
            if (this._isBusy) {
                e.stopImmediatePropagation();
            }
        }
        /**
         * Moves the focus to busy area when coming with SHIFT + TAB
         */
        _redirectFocus(e) {
            if (this.focusForward) {
                return;
            }
            e.preventDefault();
            this.shadowRoot.querySelector(".ui5-busy-indicator-busy-area").focus();
        }
    };
    __decorate([
        webcomponentsBase.s()
    ], BusyIndicator.prototype, "text", void 0);
    __decorate([
        webcomponentsBase.s()
    ], BusyIndicator.prototype, "size", void 0);
    __decorate([
        webcomponentsBase.s({ type: Boolean })
    ], BusyIndicator.prototype, "active", void 0);
    __decorate([
        webcomponentsBase.s({ type: Number })
    ], BusyIndicator.prototype, "delay", void 0);
    __decorate([
        webcomponentsBase.s()
    ], BusyIndicator.prototype, "textPlacement", void 0);
    __decorate([
        webcomponentsBase.s({ type: Boolean })
    ], BusyIndicator.prototype, "_isBusy", void 0);
    __decorate([
        i18nDefaults.i("@ui5/webcomponents")
    ], BusyIndicator, "i18nBundle", void 0);
    BusyIndicator = BusyIndicator_1 = __decorate([
        webcomponentsBase.m({
            tag: "ui5-busy-indicator",
            languageAware: true,
            styles: busyIndicatorCss,
            renderer: i18nDefaults.d,
            template: BusyIndicatorTemplate,
        })
    ], BusyIndicator);
    BusyIndicator.define();
    var BusyIndicator$1 = BusyIndicator;

    exports.BusyIndicator = BusyIndicator$1;
    exports.H = H;
    exports.ListItemBase = ListItemBase$1;
    exports.b = b$1;
    exports.b$1 = b;

}));
