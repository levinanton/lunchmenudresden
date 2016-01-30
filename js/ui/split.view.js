sap.ui.jsview('js.ui.split', {

	getControllerName : function() {
		return 'js.ui.split';
	},

	createContent : function(oController) {
		this.setDisplayBlock(true);
		return sap.m.SplitApp('lunchmenudresdenapp', {
			mode : sap.m.SplitAppMode.ShowHideMode,
			afterDetailNavigate : function(oEvent) {
				this.hideMaster();
			}
		});
	}

});