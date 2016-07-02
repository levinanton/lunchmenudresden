sap.ui.jsview("js.ui.404", {

	getControllerName: function() {
		return "js.ui.404";
	},

	createContent: function(oController) {
		this.setDisplayBlock(true);
		return new sap.m.MessagePage({
			title: "{i18n>LABEL_404}",
			showNavButton: sap.ui.Device.system.phone,
			navButtonPress: function(oEvent) {
				oController.onNavButtonPress(oEvent);
			}
		});
	}

});