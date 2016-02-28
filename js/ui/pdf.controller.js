jQuery.sap.require("js.ext.pdfjs.pdf");

js.core.Controller.extend("js.ui.pdf", {

	onInit: function() {
		PDFJS.workerSrc = "js/ext/pdfjs/pdf.worker.js";
		this.getRoute("pdf").attachPatternMatched(this.onPatternMatched, this);
	},

	onPatternMatched: function(oEvent) {
		var oParameters = oEvent.getParameters();
		this.navigateDetail(this.getView(), oParameters.arguments);
	},
	
	getPdfContentHeight: function() {
		return $(window).height() - this.getContentHeightOffset();
	}

});