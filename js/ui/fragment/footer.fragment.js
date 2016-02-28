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
					return oController.formatLocationLinkHref(oLocation);
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