jQuery.sap.require('lunchmenudresden.Router');
jQuery.sap.require('js.core.Settings');

sap.ui.core.UIComponent.extend('lunchmenudresden.Component', {

	metadata : {
		routing : {
			config : {
				routerClass : lunchmenudresden.Router,
				viewType : 'JS',
				viewPath : 'js.ui',
				targetControl : 'lunchmenudresdenapp',
			},
			routes : [ {
				pattern : '',
				name : 'list',
				view : 'list',
				targetAggregation : 'masterPages',
				subroutes : [ {
					pattern : 'pdf/{id}',
					name : 'pdf',
					view : 'pdf',
					targetAggregation : 'detailPages'
				}, {
					pattern : 'rss/{id}',
					name : 'rss',
					view : 'rss',
					targetAggregation : 'detailPages'
				}, {
					pattern : 'htm/{id}',
					name : 'htm',
					view : 'htm',
					targetAggregation : 'detailPages'
				}, {
					pattern : 'img/{id}',
					name : 'img',
					view : 'img',
					targetAggregation : 'detailPages'
				} ]
			} ]
		}
	},

	init : function() {
		sap.ui.core.UIComponent.prototype.init.apply(this, arguments);
		this.initResourceModel();
		this.initIconModel();
		this.initSettingsModel();
		this.initDataModel();
		if (!sap.ui.Device.system.phone) {
			this.getRouter().navToWelcome();
		}
		this.getRouter().initialize();
	},

	initDataModel : function() {
		var sUrl = 'model/data.json';
		var oParameters = null;
		var bAsync = false;
		var oJSONModel = new sap.ui.model.json.JSONModel();
		oJSONModel.loadData(sUrl, oParameters, bAsync);
		this.setModel(oJSONModel);
	},

	initResourceModel : function() {
		var sUrl = 'locale/i18n.properties';
		var oResourceModel = new sap.ui.model.resource.ResourceModel({
			bundleUrl : sUrl
		});
		this.setModel(oResourceModel, 'i18n');
	},

	initIconModel : function() {
		var sUrl = 'model/icon.json';
		var oParameters = null;
		var bAsync = false;
		var oJSONModel = new sap.ui.model.json.JSONModel();
		oJSONModel.loadData(sUrl, oParameters, bAsync);
		this.setModel(oJSONModel, 'icon');
	},

	initSettingsModel : function() {
		var oJSONModel = new js.core.Settings();
		this.setModel(oJSONModel, 'settings');
	},

	createContent : function() {
		return sap.ui.view({
			viewName : 'js.ui.split',
			type : 'JS',
			viewData : {
				component : this
			}
		});
	}

});