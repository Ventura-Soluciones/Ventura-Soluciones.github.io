/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */

// Provides control sap.ui.vk.ecad.ElementsPanel
sap.ui.define([
	"sap/m/Button",
	"sap/m/SearchField",
	"sap/m/OverflowToolbar",
	"sap/m/ToolbarLayoutData",
	"sap/m/ToolbarSpacer",
	"sap/m/Text",
	"sap/m/Table",
	"sap/m/Column",
	"sap/m/Sticky",
	"sap/m/ScrollContainer",
	"sap/m/ColumnListItem",
	"sap/ui/core/Core",
	"sap/ui/core/Control",
	"sap/ui/core/Element",
	"sap/ui/core/Icon",
	"sap/ui/core/library",
	"sap/ui/core/ResizeHandler",
	"sap/ui/model/json/JSONModel",
	"../Core",
	"../library",
	"../ViewStateManager",
	"./ElementsPanelRenderer",
	"./VisibilityType",
	"../getResourceBundle"
], function(
	Button,
	SearchField,
	OverflowToolbar,
	ToolbarLayoutData,
	ToolbarSpacer,
	Text,
	Table,
	Column,
	Sticky,
	ScrollContainer,
	ColumnListItem,
	Core,
	Control,
	Element,
	Icon,
	Library,
	ResizeHandler,
	JSONModel,
	vkCore,
	vkLibrary,
	ViewStateManager,
	ElementsPanelRenderer,
	VisibilityType,
	getResourceBundle
) {
	"use strict";

	/**
	 * Constructor for a new ElementsPanel.
	 *
	 * @param {string} [sId] id for the new control, generated automatically if no id is given
	 * @param {object} [mSettings] initial settings for the new control
	 *
	 * @class Provides a flat list view of all the ECAD layers in a given scene in table format.
	 * @extends sap.ui.core.Control
	 *
	 * @author SAP SE
	 * @version 1.136.0
	 *
	 * @constructor
	 * @private
	 * @alias sap.ui.vk.ecad.ElementsPanel
	 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
	 * @since 1.136.0
	 */
	var ElementsPanel = Control.extend("sap.ui.vk.ecad.ElementsPanel", /** @lends sap.ui.vk.ecad.ElementsPanel.prototype */ {
		metadata: {
			library: "sap.ui.vk",
			aggregations: {
				content: {
					type: "sap.m.ScrollContainer",
					multiple: false
				}
			},
			associations: {
				/**
				 * An association to the <code>ContentConnector</code> instance that manages content resources.
				 */
				contentConnector: {
					type: "sap.ui.vk.ContentConnector",
					multiple: false
				},

				/**
				 * An association to the <code>ViewStateManager</code> instance.
				 */
				viewStateManager: {
					type: "sap.ui.vk.ViewStateManagerBase",
					multiple: false
				}
			},
			events: {
				/**
				 * This event will be fired when content is replaced.
				 */
				contentChanged: {
					enableEventBubbling: true
				}
			}
		},

		renderer: ElementsPanelRenderer,

		constructor: function(sId, mSettings) {
			Control.apply(this, arguments);
			vkCore.observeAssociations(this);
		}
	});

	var iconHidden = "sap-icon://hide";
	var iconPartial = "sap-icon://hide";
	var iconVisible = "sap-icon://show";

	ElementsPanel.prototype.onSetViewStateManager = function(manager) {
		this._manager = manager;
		manager.attachVisibilityChanged(this._onVisibilityChanged, this);
		this.refresh();
	};

	ElementsPanel.prototype.onUnsetViewStateManager = function(manager) {
		this._manager = null;
		manager.detachVisibilityChanged(this._onVisibilityChanged, this);
		this.refresh();
	};

	ElementsPanel.prototype.onSetContentConnector = function(connector) {
		connector.attachContentReplaced(this._onContentReplaced, this);
		connector.attachContentChangesFinished(this._onContentChangesFinished, this);
		this._setContent(connector.getContent());
	};

	ElementsPanel.prototype.onUnsetContentConnector = function(connector) {
		this._setContent(null);
		connector.detachContentReplaced(this._onContentReplaced, this);
		connector.detachContentChangesFinished(this._onContentChangesFinished, this);
	};

	ElementsPanel.prototype.init = function() {
		if (Control.prototype.init) {
			Control.prototype.init.apply(this);
		}
		var that = this;

		this._showButton = new Button({
			enabled: false,
			iconFirst: true,
			icon: iconVisible,
			text: getResourceBundle().getText("ELEMENTS_PANEL_SHOW_BUTTON"),
			tooltip: getResourceBundle().getText("ELEMENTS_PANEL_SHOW_BUTTON_TOOLTIP"),
			press: this._onShowElements.bind(this)
		});

		this._hideButton = new Button({
			enabled: false,
			iconFirst: true,
			icon: iconHidden,
			text: getResourceBundle().getText("ELEMENTS_PANEL_HIDE_BUTTON"),
			tooltip: getResourceBundle().getText("ELEMENTS_PANEL_HIDE_BUTTON_TOOLTIP"),
			press: this._onHideElements.bind(this)
		});

		this._settingsButton = new Button({
			icon: "sap-icon://settings",
			tooltip: getResourceBundle().getText("ELEMENTS_PANEL_SETTINGS_BUTTON_TOOLTIP"),
			press: this._onSettings.bind(this)
		});

		this._table = new Table({
			mode: "MultiSelect",
			sticky: [Sticky.HeaderToolbar, Sticky.ColumnHeaders],
			selectionChange: this._onSelectionChanged.bind(this),
			headerToolbar: new OverflowToolbar({
				content: [
					this._showButton,
					this._hideButton,
					new ToolbarSpacer(),
					this._settingsButton
				]
			}),
			columns: [
				new Column({
					hAlign: Library.TextAlign.Begin,
					header: new Text({ text: getResourceBundle().getText("ELEMENTS_PANEL_NAME_COLUMN") })

				}),
				new Column({
					hAlign: Library.TextAlign.Begin,
					header: new Text({ text: getResourceBundle().getText("ELEMENTS_PANEL_TYPE_COLUMN") })
				}),
				new Column({
					hAlign: Library.TextAlign.Begin,
					header: new Text({
						text: getResourceBundle().getText("ELEMENTS_PANEL_DEVICE_REFERENCE_COLUMN")
					})
				}),
				new Column({
					hAlign: Library.TextAlign.Center,
					header: new Text({ text: getResourceBundle().getText("ELEMENTS_PANEL_VISIBLE_COLUMN") })
				})
			],
			items: {
				path: "/",
				template: new ColumnListItem({
					vAlign: "Middle",
					cells: [
						new Text({
							text: "{refdes}"
						}),
						new Text({
							text: {
								path: "",
								formatter: function(element) {
									if (element.type === "2") {
										return getResourceBundle().getText("ELEMENTS_PANEL_TYPE_COMPONENT");
									} else if (element.type === "4") {
										return getResourceBundle().getText("ELEMENTS_PANEL_TYPE_NET");
									} else {
										return getResourceBundle().getText("ELEMENTS_PANEL_TYPE_UNKNOWN");
									}
								}
							}
						}),
						new Text({
							text: "{deviceref}"
						}),
						new Icon({
							src: {
								path: "",
								formatter: function(element) {
									var type = that._getVisibility(element);
									if (type === VisibilityType.Hidden) {
										return iconHidden;
									} else if (type === VisibilityType.Partial) {
										return iconPartial;
									}
									return iconVisible;
								}
							},
							tooltip: {
								path: "",
								formatter: function(element) {
									var type = that._getVisibility(element);
									if (type === VisibilityType.Hidden) {
										return getResourceBundle().getText("ELEMENTS_PANEL_VISIBLE_COLUMN_HIDDEN_TOOLTIP");
									} else if (type === VisibilityType.Partial) {
										return getResourceBundle().getText("ELEMENTS_PANEL_VISIBLE_COLUMN_PARTIAL_TOOLTIP");
									}
									return getResourceBundle().getText("ELEMENTS_PANEL_VISIBLE_COLUMN_VISIBLE_TOOLTIP");
								}
							}
						})
					]
				})
			}
		});

		this._scrollContainer = new ScrollContainer({
			vertical: true,
			horizontal: false,
			height: "100%",
			content: this._table
		});

		this.setAggregation("content", this._scrollContainer);

		this._scene = null;
		this._model = new JSONModel();
		this._model.setSizeLimit(100000);
		this._table.setModel(this._model);
	};

	ElementsPanel.prototype.refresh = function() {
		if (!this._scene || !this._manager || !this._manager.getNodeHierarchy()) {
			this._model.setData([]);
			return;
		}
		// scan the tree and collect elements info
		var elements = new Map();
		this._scanTree(elements, this._manager.getNodeHierarchy().getSceneRef());

		this._model.setData(elements.values().toArray());
		this._table.setModel(this._model);
		this.fireContentChanged();
	};

	ElementsPanel.prototype.onBeforeRendering = function() {
		this._table.setVisible(true);
		if (!this._resizeListenerId) {
			this._resizeListenerId = ResizeHandler.register(this, this._handleResize.bind(this));
		}
	};

	ElementsPanel.prototype._setScene = function(scene) {
		this._scene = scene;
		this.refresh();
	};

	ElementsPanel.prototype._getVisibility = function(element) {
		return VisibilityType.Visible;
	};

	ElementsPanel.prototype._extractMetadata = function(metadata) {
		if (metadata.length != undefined) {
			var map = new Map();
			metadata.forEach(function(entry) {
				if (entry.category === "ecad") {
					map.set(entry.tag, entry.value);
				}
			});
			return map;
		}
		return null;
	};

	ElementsPanel.prototype._addElement = function(elements, metadata, nodeRef, nodeVisibility) {
		var type = metadata.get("type");
		var refdes = metadata.get("refdes");
		var deviceref = metadata.get("deviceref");

		var element = elements.get(refdes);
		if (!element) {
			element = {
				refdes: refdes,
				type: type,
				deviceref: deviceref,
				elements: new Map(),
				hiddenElements: 0
			};
			elements.set(refdes, element);
		}

		if (nodeVisibility == false) {
			// layer.hiddenElements++;
		}
		element.elements.set(nodeRef.uid, nodeRef);
	};

	ElementsPanel.prototype._scanTree = function(elements, nodeRef) {
		var hierarchy = this._manager.getNodeHierarchy();
		var node = hierarchy.createNodeProxy(nodeRef);
		var metadata = this._extractMetadata(node.getNodeMetadata());
		hierarchy.destroyNodeProxy(node);

		if (metadata) {
			var name = metadata.get("refdes");
			if (name) {
				this._addElement(elements, metadata, nodeRef, this._manager.getVisibilityState(nodeRef));
				return; // don't go further down the hierarchy
			}
		}

		hierarchy.getChildren(nodeRef).forEach(function(ref) {
			this._scanTree(elements, ref);
		}, this);
	};

	ElementsPanel.prototype._onSelectionChanged = function(event) {
		this._updateButtons();
	};

	ElementsPanel.prototype._onVisibilityChanged = function(event) {
		//
	};

	ElementsPanel.prototype._handleResize = function(event) {
		// this._updateSelection();
	};

	ElementsPanel.prototype._setContent = function(content) {
		// If there is no explicitly assigned view state manager then use the content connector's default one.
		if (content && !this.getViewStateManager()) {
			var connector = Element.getElementById(this.getContentConnector());
			if (connector) {
				var defaultManager = connector.getDefaultViewStateManager();
				if (defaultManager) {
					this.setViewStateManager(defaultManager);
				}
			}
		}
		this._setScene(content);
		return this;
	};

	ElementsPanel.prototype._onContentReplaced = function(event) {
		this._setContent(event.getParameter("newContent"));
	};

	ElementsPanel.prototype._onContentChangesFinished = function(event) {
		this.refresh();
	};

	ElementsPanel.prototype._updateButtons = function() {
		var canShow = false, canHide = false;
		var selected = this._table.getSelectedItems();

		selected.forEach(function(item) {
			var element = item.getBindingContext().getObject();
			var visibility = this._getVisibility(element);

			if (visibility === VisibilityType.Visible) {
				canHide = true;
			} else if (visibility === VisibilityType.Hidden) {
				canShow = true;
			} else {
				canHide = canShow = true;
			}

		}, this);

		this._showButton.setEnabled(canShow);
		this._hideButton.setEnabled(canHide);
	};

	ElementsPanel.prototype._onShowElements = function() {
		var toShow = [];
		var selected = this._table.getSelectedItems();

		selected.forEach(function(item) {
			var layer = item.getBindingContext().getObject();
			if (layer.hiddenElements !== 0) {
				layer.hiddenElements = 0;
				layer.elements.forEach(function(nodeRef) {
					toShow.push(nodeRef);
				});
			}
		});
		this._manager.setVisibilityState(toShow, true, true, true);
		this._model.updateBindings(true);
		this._updateButtons();
	};

	ElementsPanel.prototype._onHideElements = function() {
		var toHide = [];
		var selected = this._table.getSelectedItems();

		selected.forEach(function(item) {
			var layer = item.getBindingContext().getObject();
			if (layer.hiddenElements !== layer.elements.size) {
				layer.hiddenElements = layer.elements.size;
				layer.elements.forEach(function(nodeRef) {
					toHide.push(nodeRef);
				});
			}
		});
		this._manager.setVisibilityState(toHide, false, true, true);
		this._model.updateBindings(true);
		this._updateButtons();
	};

	ElementsPanel.prototype._onSettings = function() {
		//
	};

	return ElementsPanel;
});
