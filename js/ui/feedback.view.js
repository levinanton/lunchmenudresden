sap.ui.jsview('js.ui.feedback', {

	getControllerName : function() {
		return 'js.ui.feedback';
	},

	createTextArea : function() {
		var oController = this.getController();
		this.oTextArea = new sap.m.TextArea({
			placeholder : '{i18n>LABEL_FREE_TEXT}',
			width : '100%',
			height : '100%',
			rows : 10,
			liveChange : function(oEvent) {
				oController.onTextAreaLiveChange(oEvent);
			}
		});
		return this.oTextArea;
	},

	createContent : function(oController) {
		this.oCancelButton = new sap.m.Button({
			text : '{i18n>LABEL_CANCEL}',
			type : sap.m.ButtonType.Reject,
			press : function(oEvent) {
				oController.onCancelButtonPress(oEvent);
			}
		});
		this.oSendButton = new sap.m.Button({
			text : '{i18n>LABEL_SEND}',
			enabled : false,
			type : sap.m.ButtonType.Accept,
			press : function(oEvent) {
				oController.onSendButtonPress(oEvent);
			}
		});
		this.oPopover = new sap.m.ResponsivePopover({
			title : '{i18n>LABEL_FEEDBACK}',
			contentWidth : '320px',
			contentHeight : '240px',
			placement : sap.m.PlacementType.Top,
			content : this.createTextArea(),
			beginButton : this.oCancelButton,
			endButton : this.oSendButton
		});
		return null;
	},

	openBy : function(oControl) {
		if (!this.oPopover.isOpen()) {
			this.oPopover.openBy(oControl);
		}
	},

	close : function() {
		this.oPopover.close();
	}

});