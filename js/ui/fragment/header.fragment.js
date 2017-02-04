sap.ui.jsfragment("js.ui.fragment.header", {

	createContent: function(oController) {
		var oImage = new sap.m.Image({
			src: "{icon>/SODEXO}",
			height : "47px",
			visible: "{sodexo}"
		});
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
			contentMiddle: new sap.m.HBox({
				items : [oTitle, new sap.m.ToolbarSpacer({
					width : "1em"
				}), oImage]
			}),
			contentRight: oBookmarkButton
		});
	}

});