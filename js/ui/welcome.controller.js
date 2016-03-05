js.core.Controller.extend("js.ui.welcome", {

	onUI5TilePress: function(oEvent) {
		window.open("/sapui5/", "_blank");
	},

	onSourceTilePress: function(oEvent) {
		window.open("/lunchmenudresdensource/", "_blank");
	},

	onFeedbackTilePress: function(oEvent) {
		var oEventBus = this.getEventBus();
		oEventBus.publish(Channel.APP, Event.SHOW_FEEDBACK, {
			event: oEvent
		});
	},

	onWelcomeTilePress: function(oEvent) {
		var oEventBus = this.getEventBus();
		oEventBus.publish(Channel.APP, Event.SHOW_MASTER, {
			event: oEvent
		});
	}

});