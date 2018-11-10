js.core.Controller.extend('js.ui.settings', {
	
	onInit : function() {
		var oJSONModel = new sap.ui.model.json.JSONModel();
		oJSONModel.setData([
			{
				key : "auto",
				text : "AUTO"
			},{
				key : "DRE03",
				text : "DRE03"
			},{
				key : "DRE04",
				text : "DRE04"
			},{
				key : "DRE06",
				text : "DRE06"
			}
		]);	
		this.getView().oPopover.setModel(oJSONModel, 'location');
	},
	
	handleSelect : function(oEvent) {
		this.getSettings().setLocation(oEvent.getSource().getSelectedKey());
		this.getCurrentPosition();
	},

	getSettings : function() {
		return this.getView().oPopover.getModel('settings');
	},

	onLocationPress : function() {
		this.getView().oNavContainer.to(this.getView().oEndpointPage);
	},

	onNavButtonPress : function(oEvent) {
		this.getView().oNavContainer.back();
	},

	onUrlLiveChange : function(oEvent) {
		var sNewValue = oEvent.getParameter('newValue');
		this.getSettings().setUrl(sNewValue);
	},

	onDemoModeChange : function(oEvent) {
		var bState = oEvent.getParameter('state');
		this.getSettings().setDemo(bState);
	},

	onDebugModeChange : function(oEvent) {
		var bState = oEvent.getParameter('state');
		this.getSettings().setDebug(bState);
	}

});