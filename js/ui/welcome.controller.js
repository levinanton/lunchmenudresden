js.core.Controller.extend("js.ui.welcome", {

	onUI5TilePress: function(oEvent) {
		window.open("https://openui5.hana.ondemand.com", "_blank");
	},

	onSourceTilePress: function(oEvent) {
		window.open("https://github.com/levinanton/lunchmenudresden", "_blank");
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