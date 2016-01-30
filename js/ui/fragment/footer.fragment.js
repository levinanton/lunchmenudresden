sap.ui.jsfragment("js.ui.fragment.footer", {

	createContent: function(oController) {
		var oSpacer = new sap.m.ToolbarSpacer();
		var oIcon = new sap.ui.core.Icon({
			src: "{icon>/MAP}"
		});
		var oLink = new sap.m.Link({
			target: "_blank",
			text: "{address}",
			href: {
				path: "location",
				formatter: function(oLocation) {
					if (oLocation === null) {
						return "";
					}
					var lat = oLocation.latitude;
					var lon = oLocation.longitude;
					var url = oController.getText("URL_MAP", [lat, lon]);
					return url;
				}
			}
		});
		oLink.addStyleClass("customLink");
		return new sap.m.Toolbar({
			design: sap.m.ToolbarDesign.Info,
			content: [oSpacer, oIcon, oLink]
		});
	}

});