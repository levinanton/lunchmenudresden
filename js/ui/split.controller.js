jQuery.sap.require("js.core.Channel");
jQuery.sap.require("js.core.Event");
jQuery.sap.require("js.core.Controller");

js.core.Controller.extend("js.ui.split", {

	onInit: function() {
		var oEventBus = this.getEventBus();
		oEventBus.subscribe(Channel.APP, Event.SHOW_MASTER, this.onShowMaster,
			this);
		oEventBus.subscribe(Channel.APP, Event.NAVIGATE_MASTER,
			this.onNavigateMaster, this);
	},

	onShowMaster: function(sChannelId, sEventId, oData) {
		if (!sap.ui.Device.system.tablet) {
			return;
		}
		this.getRouter().showList();
	},

	onNavigateMaster: function(sChannelId, sEventId, oData) {
		this.getRouter().navTo("list");
	}

});