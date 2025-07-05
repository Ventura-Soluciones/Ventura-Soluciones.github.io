sap.ui.define(['exports', 'sap/ushell/thirdparty/i18n-defaults', 'sap/ushell/thirdparty/webcomponents-base', 'sap/ushell/thirdparty/Icons', 'sap/ushell/thirdparty/Text', 'sap/ushell/thirdparty/Link', 'sap/ushell/thirdparty/Button2', 'sap/ushell/thirdparty/ListItemTemplate', 'sap/ushell/thirdparty/event-strict', 'sap/ushell/thirdparty/toLowercaseEnumValue', 'sap/ushell/thirdparty/Icon', 'sap/ushell/thirdparty/webcomponents', 'sap/ushell/thirdparty/BusyIndicator', 'sap/ushell/thirdparty/Label', 'sap/ushell/thirdparty/information', 'sap/ushell/thirdparty/List'], (function (exports, i18nDefaults, webcomponentsBase, Icons, Text, Link, Button, ListItemTemplate, eventStrict, toLowercaseEnumValue, Icon, webcomponents, BusyIndicator, Label, information, List) { 'use strict';

    /**
     * Overflow Mode.
     * @public
     */
    var ExpandableTextOverflowMode;
    (function (ExpandableTextOverflowMode) {
        /**
         * Overflowing text is appended in-place.
         * @public
         */
        ExpandableTextOverflowMode["InPlace"] = "InPlace";
        /**
         * Full text is displayed in a popover.
         * @public
         */
        ExpandableTextOverflowMode["Popover"] = "Popover";
    })(ExpandableTextOverflowMode || (ExpandableTextOverflowMode = {}));
    var ExpandableTextOverflowMode$1 = ExpandableTextOverflowMode;

    function ExpandableTextTemplate() {
        return (i18nDefaults.jsxs("div", { children: [i18nDefaults.jsx(Text.Text, { class: "ui5-exp-text-text", emptyIndicatorMode: this.emptyIndicatorMode, children: this._displayedText }), this._maxCharactersExceeded && i18nDefaults.jsxs(i18nDefaults.Fragment, { children: [i18nDefaults.jsx("span", { class: "ui5-exp-text-ellipsis", children: this._ellipsisText }), i18nDefaults.jsx(Link.Link, { id: "toggle", class: "ui5-exp-text-toggle", accessibleRole: "Button", accessibleName: this._accessibleNameForToggle, accessibilityAttributes: this._accessibilityAttributesForToggle, onClick: this._handleToggleClick, children: this._textForToggle }), this._usePopover &&
                            i18nDefaults.jsxs(ListItemTemplate.ResponsivePopover, { open: this._expanded, opener: "toggle", accessibleNameRef: "popover-text", contentOnlyOnDesktop: true, _hideHeader: true, class: "ui5-exp-text-popover", onClose: this._handlePopoverClose, children: [i18nDefaults.jsx(Text.Text, { id: "popover-text", children: this.text }), i18nDefaults.jsx("div", { slot: "footer", class: "ui5-exp-text-footer", children: i18nDefaults.jsx(Button.Button, { design: "Transparent", onClick: this._handleCloseButtonClick, children: this._closeButtonText }) })] })] })] }));
    }

    Icons.p("@ui5/webcomponents-theming", "sap_horizon", async () => i18nDefaults.defaultThemeBase);
    Icons.p("@ui5/webcomponents", "sap_horizon", async () => i18nDefaults.defaultTheme);
    var ExpandableTextCss = `:host{display:inline-block;font-family:var(--sapFontFamily);font-size:var(--sapFontSize);color:var(--sapTextColor)}:host([hidden]){display:none}.ui5-exp-text-text{display:inline}.ui5-exp-text-text,.ui5-exp-text-toggle{font-family:inherit;font-size:inherit}.ui5-exp-text-text,.ui5-exp-text-ellipsis{color:inherit}.ui5-exp-text-popover::part(content){padding-inline:1rem}.ui5-exp-text-footer{width:100%;display:flex;align-items:center;justify-content:flex-end}
`;

    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var ExpandableText_1;
    /**
     * @class
     *
     * ### Overview
     *
     * The `ui5-expandable-text` component allows displaying a large body of text in a small space. It provides an "expand/collapse" functionality, which shows/hides potentially truncated text.
     *
     * ### Usage
     *
     * #### When to use:
     * - To accommodate long texts in limited space, for example in list items, table cell texts, or forms
     *
     * #### When not to use:
     * - The content is critical for the user. In this case use short descriptions that can fit in
     * - Strive to provide short and meaningful texts to avoid excessive number of "Show More" links on the page
     *
     * ### Responsive Behavior
     *
     * On phones, if the component is configured to display the full text in a popover, the popover will appear in full screen.
     *
     * ### ES6 Module Import
     *
     * `import "@ui5/webcomponents/dist/ExpandableText";`
     *
     * @constructor
     * @extends UI5Element
     * @public
     * @since 2.6.0
     */
    let ExpandableText = ExpandableText_1 = class ExpandableText extends webcomponentsBase.b {
        constructor() {
            super(...arguments);
            /**
             * Maximum number of characters to be displayed initially. If the text length exceeds this limit, the text will be truncated with an ellipsis, and the "More" link will be displayed.
             * @default 100
             * @public
             */
            this.maxCharacters = 100;
            /**
             * Determines how the full text will be displayed.
             * @default "InPlace"
             * @public
             */
            this.overflowMode = "InPlace";
            /**
             * Specifies if an empty indicator should be displayed when there is no text.
             * @default "Off"
             * @public
             */
            this.emptyIndicatorMode = "Off";
            this._expanded = false;
        }
        getFocusDomRef() {
            if (this._usePopover) {
                return this.shadowRoot?.querySelector("[ui5-responsive-popover]");
            }
            return this.shadowRoot?.querySelector("[ui5-link]");
        }
        get _displayedText() {
            if (this._expanded && !this._usePopover) {
                return this.text;
            }
            return this.text?.substring(0, this.maxCharacters);
        }
        get _maxCharactersExceeded() {
            return (this.text?.length || 0) > this.maxCharacters;
        }
        get _usePopover() {
            return this.overflowMode === ExpandableTextOverflowMode$1.Popover;
        }
        get _ellipsisText() {
            if (this._expanded && !this._usePopover) {
                return " ";
            }
            return "... ";
        }
        get _textForToggle() {
            return this._expanded ? ExpandableText_1.i18nBundle.getText(i18nDefaults.EXPANDABLE_TEXT_SHOW_LESS) : ExpandableText_1.i18nBundle.getText(i18nDefaults.EXPANDABLE_TEXT_SHOW_MORE);
        }
        get _closeButtonText() {
            return ExpandableText_1.i18nBundle.getText(i18nDefaults.EXPANDABLE_TEXT_CLOSE);
        }
        get _accessibilityAttributesForToggle() {
            if (this._usePopover) {
                return {
                    expanded: this._expanded,
                    hasPopup: "dialog",
                };
            }
            return {
                expanded: this._expanded,
            };
        }
        get _accessibleNameForToggle() {
            if (this._usePopover) {
                return this._expanded ? ExpandableText_1.i18nBundle.getText(i18nDefaults.EXPANDABLE_TEXT_SHOW_LESS_POPOVER_ARIA_LABEL) : ExpandableText_1.i18nBundle.getText(i18nDefaults.EXPANDABLE_TEXT_SHOW_MORE_POPOVER_ARIA_LABEL);
            }
            return undefined;
        }
        _handlePopoverClose() {
            if (!Icons.d$1()) {
                this._expanded = false;
            }
        }
        _handleToggleClick() {
            this._expanded = !this._expanded;
        }
        _handleCloseButtonClick(e) {
            this._expanded = false;
            e.stopPropagation();
        }
    };
    __decorate([
        webcomponentsBase.s()
    ], ExpandableText.prototype, "text", void 0);
    __decorate([
        webcomponentsBase.s({ type: Number })
    ], ExpandableText.prototype, "maxCharacters", void 0);
    __decorate([
        webcomponentsBase.s()
    ], ExpandableText.prototype, "overflowMode", void 0);
    __decorate([
        webcomponentsBase.s()
    ], ExpandableText.prototype, "emptyIndicatorMode", void 0);
    __decorate([
        webcomponentsBase.s({ type: Boolean })
    ], ExpandableText.prototype, "_expanded", void 0);
    __decorate([
        i18nDefaults.i("@ui5/webcomponents")
    ], ExpandableText, "i18nBundle", void 0);
    ExpandableText = ExpandableText_1 = __decorate([
        webcomponentsBase.m({
            tag: "ui5-expandable-text",
            renderer: i18nDefaults.d,
            styles: ExpandableTextCss,
            template: ExpandableTextTemplate,
        })
    ], ExpandableText);
    ExpandableText.define();

    /**
     * Provides a template for rendering text with the ExpandableText component
     * when wrappingType is set to "Normal".
     *
     * @param {object} injectedProps - The configuration options for the expandable text
     * @returns {JSX.Element} The rendered ExpandableText component
     */
    function ListItemStandardExpandableTextTemplate(injectedProps) {
        const { className, text, maxCharacters, part } = injectedProps;
        return (i18nDefaults.jsx(ExpandableText, { part: part, class: className, text: text, maxCharacters: maxCharacters }));
    }

    exports.default = ListItemStandardExpandableTextTemplate;

}));
