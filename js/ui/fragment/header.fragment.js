sap.ui.jsfragment("js.ui.fragment.header", {

	createContent: function(oController) {
		var oBookmarkButton = new sap.m.Button({
			press: function(oEvent) {
				oController.onBookmarkButtonPress(oEvent);
			}
		});
		oBookmarkButton.bindProperty("icon", {
			parts: ["id", "type"],
			formatter: function(sId, sType) {
				return oController.formatBookmarkButtonIcon(sId, sType, this);
			}
		});
		var oMenuButton = new sap.m.Button({
			icon: "{icon>/BACK}",
			visible: sap.ui.Device.system.phone,
			press: function(oEvent) {
				oController.onMenuButtonPress(oEvent);
			}
		});
		var oTitle = new sap.m.Title({
			text: "{title}"
		});
		return new sap.m.Bar({
			design: sap.m.BarDesign.Header,
			contentLeft: oMenuButton,
			contentMiddle: oTitle,
			contentRight: oBookmarkButton
		});
	}

});