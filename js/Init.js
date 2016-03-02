sap.ui.getCore().attachInit(function() {

	jQuery.sap.registerModulePath("js", "js");
	jQuery.sap.registerModulePath("locale", "locale");
	jQuery.sap.registerModulePath("model", "model");

	new sap.m.Shell({
		app: new sap.ui.core.ComponentContainer({
			width: "100%",
			height: "100%",
			name: "lunchmenudresden"
		})
	}).placeAt("content");

});