js.core.Controller.extend("js.ui.img", {

	onInit: function() {
		this.getRoute("img").attachPatternMatched(this.onPatternMatched, this);
	},

	onPatternMatched: function(oEvent) {
		var oParameters = oEvent.getParameters();
		this.navigateDetail(this.getView(), oParameters.arguments);
	}

});