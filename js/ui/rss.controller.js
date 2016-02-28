js.core.Controller.extend("js.ui.rss", {

	onInit: function() {
		var oXMLModel = new sap.ui.model.xml.XMLModel();
		this.getView().setModel(oXMLModel, "rss");
		this.getRoute("rss").attachPatternMatched(this.onPatternMatched, this);
	},

	onPatternMatched: function(oEvent) {
		var oParameters = oEvent.getParameters();
		this.navigateDetail(this.getView(), oParameters.arguments);
	},

	onBindingContextChange: function(oBindingContext) {
		var sMenu = oBindingContext.getProperty("menu");
		var oXMLModel = this.getView().getModel("rss");
		oXMLModel.loadData(sMenu);
	}

});