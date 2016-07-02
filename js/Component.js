jQuery.sap.require("js.core.Settings");

sap.ui.core.UIComponent.extend("lunchmenudresden.Component", {

	metadata: {
		routing: {
			config: {
				routerClass: "sap.m.routing.Router",
				viewType: "JS",
				viewPath: "js.ui",
				controlId: "lunchmenudresdenapp",
				bypassed: {
					target: ["list", "404"]
				},
				async: true
			},
			routes: [{
				pattern: "",
				name: "list",
				target: ["welcome", "list"]
			}, {
				pattern: "pdf/{id}",
				name: "pdf",
				target: ["list", "pdf"]
			}, {
				pattern: "rss/{id}",
				name: "rss",
				target: ["list", "rss"]
			}, {
				pattern: "htm/{id}",
				name: "htm",
				target: ["list", "htm"]
			}, {
				pattern: "img/{id}",
				name: "img",
				target: ["list", "img"]
			}],
			targets: {
				list: {
					viewName: "list",
					viewId: "list",
					viewLevel: 1,
					controlAggregation: "masterPages"
				},
				welcome: {
					viewName: "welcome",
					viewId: "welcome",
					viewLevel: 2,
					controlAggregation: "detailPages"
				},
				pdf: {
					viewName: "pdf",
					viewId: "pdf",
					viewLevel: 2,
					controlAggregation: "detailPages"
				},
				rss: {
					viewName: "rss",
					viewId: "rss",
					viewLevel: 2,
					controlAggregation: "detailPages"
				},
				htm: {
					viewName: "htm",
					viewId: "htm",
					viewLevel: 2,
					controlAggregation: "detailPages"
				},
				img: {
					viewName: "img",
					viewId: "img",
					viewLevel: 2,
					controlAggregation: "detailPages"
				},
				404: {
					viewName: "404",
					viewId: "404",
					viewLevel: 2,
					controlAggregation: "detailPages"
				}
			}
		}
	},

	init: function() {
		sap.ui.core.UIComponent.prototype.init.apply(this, arguments);
		this.initResourceModel();
		this.initIconModel();
		this.initSettingsModel();
		this.initDataModel();
		this.getRouter().initialize();
	},

	initDataModel: function() {
		var sUrl = "model/data.json";
		var oParameters = null;
		var bAsync = false;
		var oJSONModel = new sap.ui.model.json.JSONModel();
		oJSONModel.loadData(sUrl, oParameters, bAsync);
		this.setModel(oJSONModel);
	},

	initResourceModel: function() {
		var sUrl = "locale/i18n.properties";
		var oResourceModel = new sap.ui.model.resource.ResourceModel({
			bundleUrl: sUrl
		});
		this.setModel(oResourceModel, "i18n");
	},

	initIconModel: function() {
		var sUrl = "model/icon.json";
		var oParameters = null;
		var bAsync = false;
		var oJSONModel = new sap.ui.model.json.JSONModel();
		oJSONModel.loadData(sUrl, oParameters, bAsync);
		this.setModel(oJSONModel, "icon");
	},

	initSettingsModel: function() {
		var oJSONModel = new js.core.Settings();
		this.setModel(oJSONModel, "settings");
	},

	createContent: function() {
		return sap.ui.view({
			viewName: "js.ui.split",
			type: "JS",
			viewData: {
				component: this
			}
		});
	}

});