/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */

// Provides control sap.ui.vk.ecad.LayerPanel
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
	"./LayersPanelRenderer",
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
	LayersPanelRenderer,
	VisibilityType,
	getResourceBundle
) {
	"use strict";

	/**
	 * Constructor for a new LayersPanel.
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
	 * @public
	 * @alias sap.ui.vk.ecad.LayersPanel
	 * @ui5-metamodel This control/element also will be described in the UI5 (legacy) designtime metamodel
	 * @since 1.136.0
	 */
	var LayersPanel = Control.extend("sap.ui.vk.ecad.LayersPanel", /** @lends sap.ui.vk.ecad.LayersPanel.prototype */ {
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

		renderer: LayersPanelRenderer,

		constructor: function(sId, mSettings) {
			Control.apply(this, arguments);
			vkCore.observeAssociations(this);
		}
	});

	var iconHidden = "sap-icon://status-inactive";
	var iconPartial = "sap-icon://rhombus-milestone";
	var iconVisible = "sap-icon://rhombus-milestone-2";

	LayersPanel.prototype.onSetViewStateManager = function(manager) {
		this._manager = manager;
		manager.attachVisibilityChanged(this._onVisibilityChanged, this);
		this.refresh();
	};

	LayersPanel.prototype.onUnsetViewStateManager = function(manager) {
		this._manager = null;
		manager.detachVisibilityChanged(this._onVisibilityChanged, this);
		this.refresh();
	};

	LayersPanel.prototype.onSetContentConnector = function(connector) {
		connector.attachContentReplaced(this._onContentReplaced, this);
		connector.attachContentChangesFinished(this._onContentChangesFinished, this);
		this._setContent(connector.getContent());
	};

	LayersPanel.prototype.onUnsetContentConnector = function(connector) {
		this._setContent(null);
		connector.detachContentReplaced(this._onContentReplaced, this);
		connector.detachContentChangesFinished(this._onContentChangesFinished, this);
	};

	LayersPanel.prototype.init = function() {
		if (Control.prototype.init) {
			Control.prototype.init.apply(this);
		}
		var that = this;

		this._showButton = new Button({
			enabled: false,
			iconFirst: true,
			icon: iconVisible,
			text: getResourceBundle().getText("LAYERS_PANEL_SHOW_BUTTON"),
			tooltip: getResourceBundle().getText("LAYERS_PANEL_SHOW_BUTTON_TOOLTIP"),
			press: this._onShowLayers.bind(this)
		});

		this._hideButton = new Button({
			enabled: false,
			iconFirst: true,
			icon: iconHidden,
			text: getResourceBundle().getText("LAYERS_PANEL_HIDE_BUTTON"),
			tooltip: getResourceBundle().getText("LAYERS_PANEL_HIDE_BUTTON_TOOLTIP"),
			press: this._onHideLayers.bind(this)
		});

		this._table = new Table({
			mode: "MultiSelect",
			sticky: [Sticky.HeaderToolbar, Sticky.ColumnHeaders],
			selectionChange: this._onSelectionChanged.bind(this),
			headerToolbar: new OverflowToolbar({
				content: [
					new SearchField({
						layoutData: new ToolbarLayoutData({
							shrinkable: true,
							maxWidth: "400px"
						}),
						search: function(event) {
							this._onSearch(event.getParameter("query")).bind(this);
						}
					}),
					new ToolbarSpacer(),
					this._showButton,
					this._hideButton
				]
			}),
			columns: [
				new Column({
					minScreenWidth: "10rem",
					hAlign: Library.TextAlign.Begin,
					header: new Text({ text: getResourceBundle().getText("LAYERS_PANEL__NAME_COLUMN") })

				}),
				new Column({
					minScreenWidth: "6rem",
					hAlign: Library.TextAlign.Center,
					header: new Text({ text: getResourceBundle().getText("LAYERS_PANEL_VISIBLE_COLUMN") })
				})
			],
			items: {
				path: "/",
				template: new ColumnListItem({
					vAlign: "Middle",
					cells: [
						new Text({
							text: "{name}"
						}),
						new Icon({
							src: {
								path: "",
								formatter: function(layer) {
									var type = that._getVisibility(layer);
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
								formatter: function(layer) {
									var type = that._getVisibility(layer);
									if (type === VisibilityType.Hidden) {
										return getResourceBundle().getText("LAYERS_PANEL_VISIBLE_COLUMN_HIDDEN_TOOLTIP");
									} else if (type === VisibilityType.Partial) {
										return getResourceBundle().getText("LAYERS_PANEL_VISIBLE_COLUMN_PARTIAL_TOOLTIP");
									}
									return getResourceBundle().getText("LAYERS_PANEL_VISIBLE_COLUMN_VISIBLE_TOOLTIP");
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
		this._table.setModel(this._model);
	};

	LayersPanel.prototype.refresh = function() {
		if (!this._scene || !this._manager || !this._manager.getNodeHierarchy()) {
			this._model.setData([]);
			return;
		}
		// scan the tree and collect layers info
		var layers = new Map();
		this._scanTree(layers, this._manager.getNodeHierarchy().getSceneRef());

		this._model.setData(layers.values().toArray());
		this._table.setModel(this._model);
		this.fireContentChanged();
	};

	LayersPanel.prototype.onBeforeRendering = function() {
		this._table.setVisible(true);
		if (!this._resizeListenerId) {
			this._resizeListenerId = ResizeHandler.register(this, this._handleResize.bind(this));
		}
	};

	LayersPanel.prototype._setScene = function(scene) {
		this._scene = scene;
		this.refresh();
	};

	LayersPanel.prototype._getVisibility = function(layer) {
		if (layer.hiddenElements === 0) {
			return VisibilityType.Visible;
		} else if (layer.hiddenElements < layer.elements.size) {
			return VisibilityType.Partial;
		}
		return VisibilityType.Hidden;
	};

	LayersPanel.prototype._extractMetadata = function(metadata) {
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

	LayersPanel.prototype._addElement = function(layers, layerName, nodeRef, nodeVisibility) {
		var layer = layers.get(layerName);
		if (!layer) {
			layer = {
				name: layerName,
				order: 0, // wait until CAD Translators support
				elements: new Map(),
				hiddenElements: 0
			};
			layers.set(layerName, layer);
		}
		if (nodeVisibility == false) {
			layer.hiddenElements++;
		}
		layer.elements.set(nodeRef.uid, nodeRef);
	};

	LayersPanel.prototype._scanTree = function(layers, nodeRef) {
		var hierarchy = this._manager.getNodeHierarchy();
		var node = hierarchy.createNodeProxy(nodeRef);
		var metadata = this._extractMetadata(node.getNodeMetadata());
		hierarchy.destroyNodeProxy(node);

		if (metadata) {
			var layer = metadata.get("layer");
			if (layer) {
				this._addElement(layers, layer, nodeRef, this._manager.getVisibilityState(nodeRef));
				return; // don't go further down the hierarchy
			}
		}

		hierarchy.getChildren(nodeRef).forEach(function(ref) {
			this._scanTree(layers, ref);
		}, this);
	};

	LayersPanel.prototype._onSelectionChanged = function(event) {
		this._updateButtons();
	};

	LayersPanel.prototype._onVisibilityChanged = function(event) {
		//
	};

	LayersPanel.prototype._handleResize = function(event) {
		// this._updateSelection();
	};

	LayersPanel.prototype._setContent = function(content) {
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

	LayersPanel.prototype._onContentReplaced = function(event) {
		this._setContent(event.getParameter("newContent"));
	};

	LayersPanel.prototype._onContentChangesFinished = function(event) {
		this.refresh();
	};

	LayersPanel.prototype._updateButtons = function() {
		var canShow = false, canHide = false;
		var selected = this._table.getSelectedItems();

		selected.forEach(function(item) {
			var layer = item.getBindingContext().getObject();
			var visibility = this._getVisibility(layer);

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

	LayersPanel.prototype._onShowLayers = function() {
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

	LayersPanel.prototype._onHideLayers = function() {
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

	return LayersPanel;
});
