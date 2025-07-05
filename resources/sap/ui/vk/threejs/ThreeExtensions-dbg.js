/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */

sap.ui.define([
	"../abgrToColor",
	"../ObjectType",
	"../thirdparty/three",
	"../NodeContentType",
	"./ThreeUtils"
], function(
	abgrToColor,
	ObjectType,
	THREE,
	NodeContentType,
	ThreeUtils
) {
	"use strict";

	// TODO(VSM): REMOVE
	THREE.Object3D.prototype._vkCalculateObjectOrientedBoundingBox = function() {
		ThreeUtils.computeObjectOrientedBoundingBox(this, this.userData.boundingBox = new THREE.Box3());
	};

	THREE.Object3D.prototype._vkTraverseNodeGeometry = function(callback) {
		callback(this);
		for (var i = 0, l = this.children.length; i < l; i++) {
			var child = this.children[i];
			if (child.geometry !== undefined && child.userData.skipIt) { // consider as a node geometry
				if (child.children) {
					child._vkTraverseNodeGeometry(callback);
				} else {
					callback(child);
				}
			} else if (child.children) {
				child._vkTraverseNodeGeometry(callback);
			}
		}
	};

	THREE.Object3D.prototype._vkSetHighlightColor = function(colorABGR) {
		this._vkTraverseNodeGeometry(function(node) {
			node.userData.highlightingColor = colorABGR;
			node._vkUpdateMaterialColorAndOpacity();
		});
	};

	THREE.Object3D.prototype._vkSetTintColor = function(tintColorABGR) {
		this._vkTraverseNodeGeometry(function(node) {
			node.userData.tintColor = tintColorABGR;
			node._vkUpdateMaterialColorAndOpacity();
		});
	};

	THREE.Object3D.prototype._vkSetOpacity = function(opacity, joints) {
		this.userData.opacity = opacity;
		var nodeJointMap;
		var parentJointsMap;
		if (joints) {
			nodeJointMap = new Map();
			parentJointsMap = new Map();
			joints.forEach(function(joint) {
				if (!joint.node || !joint.parent) {
					return;
				}
				nodeJointMap.set(joint.node, joint);
				if (joint.parent) {
					var jointsArray = parentJointsMap.get(joint.parent);
					if (!jointsArray) {
						jointsArray = [];
					}
					jointsArray.push(joint);
					parentJointsMap.set(joint.parent, jointsArray);
				}
			});
		}
		this._vkTraverseNodes(function(node) {
			node._vkUpdateMaterialOpacity(nodeJointMap);
		}, nodeJointMap, parentJointsMap);
	};

	THREE.Object3D.prototype._vkUpdateMaterialColorAndOpacity = function() {
		if (!this.material || !this.material.color) {
			return;
		}

		var userData = this.userData;
		userData.blendColor = null;

		if (userData.originalMaterial) {
			this.material.color.copy(userData.originalMaterial.color); // diffuse color, may be multiplied by material.map
			this.material.emissive?.copy(userData.originalMaterial.emissive);
			this.material.specular?.copy(userData.originalMaterial.specular);
		}

		if (userData.highlightColor !== undefined || userData.tintColor !== undefined || userData.highlightingColor !== undefined) {
			if (!userData.originalMaterial) {
				// The original material might be shared with other objects, so assign it to
				// userData.originalMaterial and replace the own material with cloned one.
				userData.originalMaterial = this.material;
				this.material = this.material.clone();
			}

			const color = new THREE.Vector4(0, 0, 0, 0);

			if (userData.highlightingColor !== undefined) { // highlighting animation of the view (HighlightPlayer)
				color.fromArray(userData.highlightingColor);
			}

			if (userData.tintColor !== undefined) { // tinting (ViewStateManangert)
				const c = abgrToColor(userData.tintColor);
				color.lerp(new THREE.Vector4(c.red / 255.0, c.green / 255.0, c.blue / 255.0, 1), c.alpha);
			}

			if (userData.highlightColor !== undefined) { // selection (ViewStateManangert)
				const c = abgrToColor(userData.highlightColor);
				color.lerp(new THREE.Vector4(c.red / 255.0, c.green / 255.0, c.blue / 255.0, 1), c.alpha);
			}

			if (color.w > 0) {
				userData.blendColor = color.toArray();

				const blendColor = new THREE.Color(color.x, color.y, color.z);
				this.material.color.lerp(blendColor, color.w);
				this.material.emissive?.lerp(blendColor, color.w * 0.5);
				this.material.specular?.multiplyScalar(1 - 0.75 * color.w); // reduce specular as it may overexpose the highlighting
			}
		}

		this._vkUpdateMaterialOpacity();
	};

	THREE.Object3D.prototype._vkUpdateMaterialOpacity = function(nodeJointMap) {
		if (!this.material) {
			return;
		}

		var userData = this.userData;

		if (userData.originalMaterial) {
			this.material.opacity = userData.originalMaterial.opacity;
			this.material.transparent = userData.originalMaterial.transparent;
		}

		var opacity = 1.0;

		var hasOpacity = false;
		let renderMethod;

		var obj3D = this; // eslint-disable-line consistent-this
		do {
			renderMethod ??= obj3D.userData.renderMethod;

			var currentOpacity = null, joint = null;
			if (nodeJointMap) {
				joint = nodeJointMap.get(obj3D);
			}

			if (joint && joint.opacity != null) {
				currentOpacity = joint.opacity;
			} else if (obj3D.userData.opacity !== undefined && obj3D.userData.opacity !== 1) {
				currentOpacity = obj3D.userData.opacity;
			}

			var offsetOpacity = 1;
			if (joint && joint.opacity != null && obj3D.userData && obj3D.userData.offsetOpacity != null) {
				offsetOpacity = obj3D.userData.offsetOpacity;
			}

			if (currentOpacity != null) {
				opacity *= currentOpacity;
				opacity *= offsetOpacity;
				hasOpacity = true;
			}

			if (joint && joint.parent) {
				obj3D = joint.parent;
				continue;
			}

			obj3D = obj3D.parent;
		} while (obj3D);

		if (renderMethod === 2) { // TRANSPARENT
			opacity *= 0.5;
			hasOpacity = true;
		}

		if (hasOpacity || this.renderOrder > 0) {
			if (!userData.originalMaterial) {
				userData.originalMaterial = this.material;
				this.material = this.material.clone();
				if (this.isMesh && !this.geometry.getAttribute("normal")) {
					// Make three.js material double-sided if geometry does not have normals defined
					this.material.side = THREE.DoubleSide;
					this.material.userData.originalMaterialSide = THREE.DoubleSide;
				}
			}

			if (this.renderOrder > 0 && !this.isOutline) {
				this.material.depthTest = false;
				this.material.transparent = true; // enable z-sorting
			}

			if (this.material.opacity) {
				this.material.opacity *= opacity;
				var materialIsTransparent = userData.originalMaterial.transparent || this.material.opacity < 1;
				if (materialIsTransparent !== this.material.transparent) {
					this.material.transparent = materialIsTransparent;
					this.material.needsUpdate = true; // three.js needs to update shaders for this material
				}
			}
		}
	};

	THREE.Object3D.prototype._vkGetTotalOpacity = function(joints) {
		var nodeJointMap;
		if (joints) {
			nodeJointMap = new Map();
			joints.forEach(function(joint) {
				if (!joint.node || !joint.parent) {
					return;
				}
				nodeJointMap.set(joint.node, joint);
			});
		}

		var opacity = 1.0;

		/* eslint-disable consistent-this */
		var obj3D = this;
		do {

			var currentOpacity = null, joint = null;
			if (nodeJointMap) {
				joint = nodeJointMap.get(obj3D);
			}

			if (joint && joint.opacity != null) {
				currentOpacity = joint.opacity;
			} else if (obj3D.userData && obj3D.userData.opacity !== undefined) {
				currentOpacity = obj3D.userData.opacity;
			}

			var offsetOpacity = 1;
			if (joint && joint.opacity != null && obj3D.userData && obj3D.userData.offsetOpacity != null) {
				offsetOpacity = obj3D.userData.offsetOpacity;
			}

			if (currentOpacity != null) {
				opacity *= currentOpacity;
				opacity *= offsetOpacity;
			}

			if (joint && joint.parent) {
				obj3D = joint.parent;
				continue;
			}

			obj3D = obj3D.parent;
		} while (obj3D);
		/* eslint-enable consistent-this */

		return opacity;
	};

	THREE.Object3D.prototype._vkTraverseMeshNodes = function(callback) {
		if (this._vkUpdate !== undefined || this.isDetailView) {
			return;
		}

		callback(this);
		var children = this.children;
		for (var i = 0, l = children.length; i < l; i++) {
			children[i]._vkTraverseMeshNodes(callback);
		}
	};

	THREE.Object3D.prototype._vkTraverseNodes = function(callback, nodeJointMap, parentJointsMap) {
		callback(this);
		var childJoints;
		if (parentJointsMap) {
			childJoints = parentJointsMap.get(this);
		}

		var j;
		if (childJoints) {
			for (j = 0; j < childJoints.length; j++) {
				childJoints[j].node._vkTraverseNodes(callback, nodeJointMap, parentJointsMap);
			}
		}

		var children = this.children;
		if (children) {
			for (j = 0; j < children.length; j++) {
				var child = children[j];
				if (nodeJointMap) {
					var joint = nodeJointMap.get(child);
					if (joint) {
						continue;
					}
				}
				child._vkTraverseNodes(callback, nodeJointMap, parentJointsMap);
			}
		}
	};

	// THREE.Box3().applyMatrix4() analogue, but 10x faster and suitable for non-perspective transformation matrices. The original implementation is dumb.
	function box3ApplyMatrix4(boundingBox, matrix) {
		var min = boundingBox.min,
			max = boundingBox.max,
			m = matrix.elements,
			cx = (min.x + max.x) * 0.5,
			cy = (min.y + max.y) * 0.5,
			cz = (min.z + max.z) * 0.5,
			ex = max.x - cx,
			ey = max.y - cy,
			ez = max.z - cz;

		var tcx = m[0] * cx + m[4] * cy + m[8] * cz + m[12];
		var tcy = m[1] * cx + m[5] * cy + m[9] * cz + m[13];
		var tcz = m[2] * cx + m[6] * cy + m[10] * cz + m[14];

		var tex = Math.abs(m[0] * ex) + Math.abs(m[4] * ey) + Math.abs(m[8] * ez);
		var tey = Math.abs(m[1] * ex) + Math.abs(m[5] * ey) + Math.abs(m[9] * ez);
		var tez = Math.abs(m[2] * ex) + Math.abs(m[6] * ey) + Math.abs(m[10] * ez);

		min.set(tcx - tex, tcy - tey, tcz - tez);
		max.set(tcx + tex, tcy + tey, tcz + tez);
	}

	THREE.Object3D.prototype._expandBoundingBox = function(boundingBox, visibleOnly, ignoreDynamicObjects, ignore2DObjects) {
		var nodeBoundingBox = new THREE.Box3();

		function expandBoundingBox(node) {
			const userData = node.userData;
			var geometry = node.geometry;
			if (geometry !== undefined) {
				const rg = userData.renderGroup;
				if (rg?.boundingBox) {
					nodeBoundingBox.setFromPackedArray(rg.boundingBox);
				} else {
					if (!geometry.boundingBox) {
						geometry.computeBoundingBox();
					}

					nodeBoundingBox.copy(geometry.boundingBox);
				}

				if (!nodeBoundingBox.isEmpty()) {
					box3ApplyMatrix4(nodeBoundingBox, node.matrixWorld);
					if (isFinite(nodeBoundingBox.min.x) && isFinite(nodeBoundingBox.min.y) && isFinite(nodeBoundingBox.min.z) &&
						isFinite(nodeBoundingBox.max.x) && isFinite(nodeBoundingBox.max.y) && isFinite(nodeBoundingBox.max.z)) {
						boundingBox.union(nodeBoundingBox);
					}
				}
			} else if (userData.pcgBoundingBox?.isEmpty() === false) { // if point cloud group boundingBox exists and is not empty
				nodeBoundingBox.copy(userData.pcgBoundingBox);
				box3ApplyMatrix4(nodeBoundingBox, node.matrixWorld);
				boundingBox.union(nodeBoundingBox);
			}

			const selectionBoundingBox = userData.boundingBox;
			if (selectionBoundingBox !== undefined && selectionBoundingBox.min && selectionBoundingBox.max
				&& !selectionBoundingBox.isEmpty() && !visibleOnly) {
				nodeBoundingBox.copy(selectionBoundingBox);
				box3ApplyMatrix4(nodeBoundingBox, node.matrixWorld);
				boundingBox.union(nodeBoundingBox);
			}
		}

		function traverse(node) {
			if (node._vkUpdate !== undefined &&
				(ignoreDynamicObjects || (ignore2DObjects && node.userData.is2D))) {
				return; // ignore dynamic objects (billboards, callouts, etc)
			}

			if (!visibleOnly || node.visible) {// test visibility
				expandBoundingBox(node);
				var children = node.children;
				for (var i = 0, l = children.length; i < l; i++) {
					traverse(children[i]);
				}
			}
		}

		// this.updateMatrixWorld();
		traverse(this);

		return boundingBox;
	};

	THREE.Object3D.prototype._vkPersistentId = function() {
		/* eslint-disable consistent-this */
		var obj3D = this;
		do {
			if (obj3D.userData.treeNode && obj3D.userData.treeNode.sid) {
				return obj3D.userData.treeNode.sid;
			}
			obj3D = obj3D.parent;
		} while (obj3D);
		/* eslint-enable consistent-this */
		return null;
	};

	THREE.Object3D.prototype._vkSetNodeContentType = function(nodeContentType) {
		this.userData.nodeContentType = nodeContentType;
		if (nodeContentType === NodeContentType.Reference) {
			this.visible = false; // not render reference node
			this.userData.skipIt = true; // not display in scene tree
		} else if (nodeContentType === NodeContentType.Background) {
			this.userData.renderStage = -1; // underlay
		} else if (nodeContentType === NodeContentType.Symbol) {
			this.userData.symbolContent = true;
			this.userData.renderStage = 1; // overlay
			this.updateMatrix();
			this.updateMatrixWorld(true);
			this.userData.direction = new THREE.Vector3().setFromMatrixColumn(this.matrixWorld, 2).normalize();
		}
	};

	THREE.Object3D.prototype._vkGetNodeContentType = function() {
		return this.userData.nodeContentType;
	};

	THREE.Camera.prototype._vkZoomTo = function(boundingBox, margin) {
		margin = margin || 0;

		var size = new THREE.Vector3();
		boundingBox.getSize(size);
		if (size.lengthSq() === 0) {
			return this; // no zooming if bounding box is empty
		}

		var min = boundingBox.min, max = boundingBox.max;
		var boxVertices = [
			new THREE.Vector3(min.x, min.y, min.z),
			new THREE.Vector3(max.x, max.y, max.z),
			new THREE.Vector3(min.x, min.y, max.z),
			new THREE.Vector3(min.x, max.y, max.z),
			new THREE.Vector3(max.x, min.y, max.z),
			new THREE.Vector3(max.x, max.y, min.z),
			new THREE.Vector3(min.x, max.y, min.z),
			new THREE.Vector3(max.x, min.y, min.z)
		];

		var matViewProj = new THREE.Matrix4(),
			projectVector = new THREE.Vector3(),
			projectBox = new THREE.Box2();

		function calcBoxProjection(camera) {
			boxVertices.forEach(function(vertex) {
				projectVector = vertex.project(camera);
				projectBox.expandByPoint(new THREE.Vector2(projectVector.x, projectVector.y));
			});
		}

		var view = this.view;
		if (view && view.enabled) {
			calcBoxProjection(this);

			var cx = view.offsetX + view.width * (0.5 + 0.25 * (projectBox.min.x + projectBox.max.x));
			var cy = view.offsetY + view.height * (0.5 - 0.25 * (projectBox.min.y + projectBox.max.y));
			var zoomScale = Math.max(projectBox.max.x - projectBox.min.x, projectBox.max.y - projectBox.min.y) * 0.5 * (1 + margin);
			view.width *= zoomScale;
			view.height *= zoomScale;
			view.offsetX = cx - view.width * 0.5;
			view.offsetY = cy - view.height * 0.5;

			return this;
		}

		function insideFrustum(camera) {
			matViewProj.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
			for (var i in boxVertices) {
				projectVector.copy(boxVertices[i]).applyMatrix4(matViewProj);
				if (projectVector.x < -1.0 || projectVector.x > 1.0 || projectVector.y < -1.0 || projectVector.y > 1.0) {
					return false;
				}
			}
			return true;
		}

		var target = new THREE.Vector3();
		boundingBox.getCenter(target);

		var dir = new THREE.Vector3();
		this.getWorldDirection(dir);
		dir.multiplyScalar(size.length());

		this.position.copy(target).sub(dir);
		this.updateMatrixWorld(true);

		if (this.isPerspectiveCamera) {
			// adjust origin to make the object inside frustum
			while (!insideFrustum(this)) {
				this.position.sub(dir);
				this.updateMatrixWorld(true);
			}

			// fine tuning the origin position
			var step = 10;
			var vPos1 = this.position.clone();
			var vPos2 = target.clone();
			for (var nj = 0; nj < step; nj++) {
				this.position.copy(vPos1).add(vPos2).multiplyScalar(0.5);
				this.updateMatrixWorld(true);
				if (insideFrustum(this)) {
					vPos1.copy(this.position);
				} else {
					vPos2.copy(this.position);
				}
			}
			this.position.copy(vPos1).sub(target).multiplyScalar(margin).add(vPos1);
			this.updateMatrixWorld(true);
		} else if (this.isOrthographicCamera) {
			calcBoxProjection(this);

			this.zoom /= Math.max(projectBox.max.x - projectBox.min.x, projectBox.max.y - projectBox.min.y) * 0.5 * (1 + margin);
			this.updateProjectionMatrix();
		}

		return this;
	};

	THREE.Mesh.prototype._vkClone = function() {
		var clonedMesh = new THREE.Mesh();
		ThreeUtils.disposeMaterial(clonedMesh.material);
		clonedMesh.copy(this);
		return clonedMesh;
	};
});
