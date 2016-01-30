js.core.Controller.extend('js.ui.feedback', {

	onSendButtonPress : function(oEvent) {
		var that = this;
		var sText = this.getView().oTextArea.getValue();
		var oData = {
			'texts' : {
				't1' : sText
			}
		};
		jQuery.ajax({
			type : 'POST',
			contentType : 'application/json',
			data : JSON.stringify(oData),
			url : 'lunchmenudresdenfeedback',
			timeout : 5000,
			error : function(jqXHR, settings) {
				that.getView().close();
				var sText = that.getText('TEXT_FEEDBACK_ERROR');
				sap.m.MessageToast.show(sText);
			},
			success : function(data, textStatus, jqXHR) {
				that.clear();
				that.getView().close();
				var sText = that.getText('TEXT_FEEDBACK_SUCCESS');
				sap.m.MessageToast.show(sText);
			}
		});
	},

	onCancelButtonPress : function(oEvent) {
		this.clear();
	},

	onTextAreaLiveChange : function(oEvent) {
		var sValue = oEvent.getParameter('value');
		if (sValue.trim().length == 0) {
			this.getView().oSendButton.setEnabled(false);
		} else {
			this.getView().oSendButton.setEnabled(true);
		}
	},

	clear : function() {
		this.getView().oTextArea.setValue('');
		this.getView().oSendButton.setEnabled(false);
		this.getView().close();
	}

});