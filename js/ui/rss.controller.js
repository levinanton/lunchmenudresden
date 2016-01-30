js.core.Controller.extend('js.ui.rss', {

	onInit : function() {
		var oXMLModel = new sap.ui.model.xml.XMLModel();
		this.getView().setModel(oXMLModel, 'rss');
		this.getRouter().attachRouteMatched(this.onRouteMatched, this);
	},

	onBindingContextChange : function(oBindingContext) {
		var sMenu = oBindingContext.getProperty('menu');
		var oXMLModel = this.getView().getModel('rss');
		oXMLModel.loadData(sMenu);
	},

	onRouteMatched : function(oEvent) {
		var oParameters = oEvent.getParameters();
		if (oParameters.name !== 'rss') {
			return;
		}
		this.navigateDetail(this.getView(), oParameters.arguments);
	}

});