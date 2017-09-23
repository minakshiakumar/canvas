/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2017. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/
import Action from "../command-stack/action.js";
import ObjectModel from "../object-model/object-model.js";

export default class DeleteLinkAction extends Action {
	constructor(data) {
		super(data);
		this.data = data;
		this.linkInfo = [];
	}

	// Standard methods
	do() {
		this.linkInfo = ObjectModel.getLink(this.data.id);
		ObjectModel.deleteLink(this.data);
	}

	undo() {
		if (this.linkInfo.type === "nodeLink") {
			ObjectModel.addNodeLinks([this.linkInfo]);
		} else {
			ObjectModel.addCommentLinks([this.linkInfo]);
		}
	}

	redo() {
		ObjectModel.deleteLink(this.data);
	}

}