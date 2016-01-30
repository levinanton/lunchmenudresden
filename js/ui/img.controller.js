js.core.Controller.extend('js.ui.img', {

	oBusyDialog : new sap.m.BusyDialog(),

	onInit : function() {
		this.getRouter().attachRouteMatched(this.onRouteMatched, this);
	},

	onRouteMatched : function(oEvent) {
		var oParameters = oEvent.getParameters();
		if (oParameters.name !== 'img') {
			return;
		}
		// this.setBusy(true);
		this.navigateDetail(this.getView(), oParameters.arguments);
	},

	setBusy : function(bBusy) {
		if (bBusy) {
			this.oBusyDialog.open();
		} else {
			this.oBusyDialog.close();
		}
	}

});