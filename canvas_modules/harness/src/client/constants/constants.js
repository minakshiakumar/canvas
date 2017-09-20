/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2017. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
"use strict";

// Private Methods ------------------------------------------------------------>

function _defineConstant(name, value) {
	Object.defineProperty(module.exports, name, {
		value: value,
		enumerable: true,
		writable: false
	});
}

// Public Methods ------------------------------------------------------------->
_defineConstant("CONSOLE", {
	MINIMIZED: "0px",
	MAXIMIXED: "200px"
});

_defineConstant("SIDE_PANEL", {
	MINIMIZED: "0px",
	MAXIMIXED: "240px"
});
_defineConstant("SIDE_PANEL_CANVAS", "sidepanel-canvas");
_defineConstant("SIDE_PANEL_MODAL", "sidepanel-modal");

_defineConstant("NONE", "none");
_defineConstant("HORIZONTAL", "horizontal");
_defineConstant("VERTICAL", "vertical");

_defineConstant("LEGACY_ENGINE", "Legacy");
_defineConstant("D3_ENGINE", "D3");

_defineConstant("HALO_CONNECTION", "Halo");
_defineConstant("PORTS_CONNECTION", "Ports");

_defineConstant("CURVE_LINKS", "Curve");
_defineConstant("ELBOW_LINKS", "Elbow");
_defineConstant("STRAIGHT_LINKS", "Straight");

_defineConstant("FLYOUT", "Flyout");
_defineConstant("MODAL", "Modal");

_defineConstant("CHOOSE_FROM_LOCATION", "Choose from location...");

_defineConstant("PALETTE_TOOLTIP", "Click to show node palette");
