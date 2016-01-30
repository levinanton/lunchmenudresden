jQuery.sap.require('js.ext.pdfjs.pdf');

js.core.Controller.extend('js.ui.pdf', {

	onInit : function() {
		PDFJS.workerSrc = 'js/ext/pdfjs/pdf.worker.js';
		this.getRouter().attachRouteMatched(this.onRouteMatched, this);
	},

	onRouteMatched : function(oEvent) {
		var oParameters = oEvent.getParameters();
		if (oParameters.name !== 'pdf') {
			return;
		}
		this.navigateDetail(this.getView(), oParameters.arguments);
	}

});