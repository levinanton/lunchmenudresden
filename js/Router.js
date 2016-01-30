jQuery.sap.require('sap.m.routing.RouteMatchedHandler');
jQuery.sap.require('sap.ui.core.routing.Router');

sap.ui.core.routing.Router.extend('lunchmenudresden.Router', {

	constructor : function() {
		sap.ui.core.routing.Router.apply(this, arguments);
		this._oRouteMatchedHandler = new sap.m.routing.RouteMatchedHandler(this);
	},
	
	destroy : function() {
		sap.ui.core.routing.Router.prototype.destroy.apply(this, arguments);
		this._oRouteMatchedHandler.destroy();
	},
	
	getApp : function() {
		return sap.ui.getCore().byId('lunchmenudresdenapp');
	},
	
	navToWelcome : function() {
		var oApp = this.getApp();
		var oView = this.getView('js.ui.welcome', 'JS');
		var bMaster = false;
		oApp.addPage(oView, bMaster);
		oApp.to(oView.getId(), 'slide');
	},
	
	navToList : function() {
		var oApp = this.getApp();
		var oView = this.getView('js.ui.list', 'JS');
		oApp.toMaster(oView.getId(), 'flip');
	},
	
	showList : function() {
		var oApp = this.getApp();
		oApp.showMaster();
	}

});