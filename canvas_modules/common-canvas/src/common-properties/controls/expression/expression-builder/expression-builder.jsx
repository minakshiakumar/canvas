/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

/* eslint global-require: 0 */

import React from "react";
import PropTypes from "prop-types";
import ExpressionControl from "./../expression.jsx";
import ExpressionSelectionPanel from "./expression-selection-panel.jsx";
import { MESSAGE_KEYS, MESSAGE_KEYS_DEFAULTS } from "./../../../constants/constants";
import PropertyUtils from "./../../../util/property-utils";

export default class ExpressionBuilder extends React.Component {
	constructor(props) {
		super(props);
		this.functionList = this.props.controller.getExpressionInfo();
		this.operatorList = this.functionList.Operators;
		this.editorDidMount = this.editorDidMount.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	onChange(newValue) {
		const value = (typeof newValue === "string") ? newValue : newValue.toString();
		const cursor = this.editor.getCursor();
		let selectionOffset = 1;
		if (this.editor.somethingSelected()) {
			selectionOffset = 0;
			this.editor.replaceSelection(value);
		} else {
			this.editor.replaceSelection(" " + value);
		}
		this._setSelection(value, cursor, selectionOffset);
	}

	editorDidMount(editor, next) {
		this.editor = editor;
	}


	_setSelection(value, cursor, selectionOffset) {
		this.props.controller.clearExpressionSelection(this.props.propertyId.name);
		// first set the selection to the first param holder of new value
		if (typeof value === "string") {
			const firstParam = value.indexOf("?");
			if (firstParam !== -1) {
				const selection = { anchor: { line: cursor.line, ch: cursor.ch + firstParam + selectionOffset + 1 },
					head: { line: cursor.line, ch: cursor.ch + firstParam + selectionOffset } };
				this.props.controller.updateExpressionSelection(this.props.propertyId.name, [selection]);
				return;
			}
		}
		// if the newValue doesn't have a param holder
		// set it to the first param holder found in the expression
		const lineCount = this.editor.lineCount();
		for (let index = 0; index < lineCount; index++) {
			const line = this.editor.getLine(index);
			const paramOffset = line.indexOf("?");
			if (paramOffset !== -1) {
				const selection = { anchor: { line: index, ch: paramOffset + 1 },
					head: { line: index, ch: paramOffset } };
				this.props.controller.updateExpressionSelection(this.props.propertyId.name, [selection]);
				return;
			}
		}
		// if no parameter holders found then set it to end of insert string
		const insertSelection = { anchor: { line: cursor.line, ch: cursor.ch + value.length + selectionOffset },
			head: { line: cursor.line, ch: cursor.ch + value.length + selectionOffset } };
		this.props.controller.updateExpressionSelection(this.props.propertyId.name, [insertSelection]);

		return;
	}

	render() {
		const expressionLabel = PropertyUtils.formatMessage(this.props.controller.getReactIntl(),
			MESSAGE_KEYS.EXPRESSION_BUILDER_LABEL, MESSAGE_KEYS_DEFAULTS.EXPRESSION_BUILDER_LABEL);

		return (
			<div >
				<span className="properties-expression-title">{expressionLabel}</span>
				<ExpressionControl
					control={this.props.control}
					propertyId={this.props.propertyId}
					controller={this.props.controller}
					builder={false}
					validate
					editorDidMount={this.editorDidMount}
					height={275}
				/>
				<ExpressionSelectionPanel
					controller={this.props.controller}
					onChange={this.onChange}
					functionList={this.functionList}
					operatorList={this.operatorList}
				/>
			</div>
		);
	}
}

ExpressionBuilder.propTypes = {
	control: PropTypes.object.isRequired,
	propertyId: PropTypes.object.isRequired,
	controller: PropTypes.object.isRequired
};