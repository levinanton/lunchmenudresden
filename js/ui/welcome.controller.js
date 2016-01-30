js.core.Controller.extend('js.ui.welcome', {

	onGenericTilePress : function(oEvent) {
		this.getEventBus().publish(Channel.APP, Event.SHOW_MASTER, {
			event : oEvent
		});
	}

});