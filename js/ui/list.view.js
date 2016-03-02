sap.ui.jsview("js.ui.list", {

	getControllerName: function() {
		return "js.ui.list";
	},

	onAfterRendering: function(oEvent) {
		this.getController().onAfterRendering(oEvent);
	},

	getList: function() {
		return this.getContent()[0].getContent()[0];
	},

	createStandardListItem: function() {
		var oController = this.getController();
		var oStandardListItem = new sap.m.StandardListItem({
			type: sap.m.ListType.Active,
			title: "{title}",
			icon: {
				path: "type",
				formatter: function(sValue) {
					return oController.formatIcon(sValue);
				}
			},
			iconDensityAware: false,
			info: {
				path: "distance",
				formatter: function(value) {
					return oController.formatDistance(value);
				}
			},
			infoState: {
				path: "distance",
				formatter: function(value) {
					return oController.formatDistanceState(value);
				}
			},
			visible: "{enabled}",
			press: function(oEvent) {
				if (sap.ui.Device.system.phone) {
					oController.onStandardListItemPress(oEvent);
				}
			}
		});
		oStandardListItem.bindProperty("description", "period",
			function(sValue) {
				return oController.formatDescription(sValue);
			});
		return oStandardListItem;
	},

	createList: function() {
		var oController = this.getController();
		var oList = new sap.m.List({
			mode: sap.ui.Device.system.phone ? sap.m.ListMode.None : sap.m.ListMode.SingleSelectMaster,
			itemPress: function(oEvent) {
				oController.onListItemPress(oEvent);
			}
		});
		oList.bindItems("/poi", this.createStandardListItem());
		return oList;
	},

	createHeader: function() {
		var oController = this.getController();
		var oTitle = new sap.m.Title({
			text: {
				path: "/poi",
				formatter: function(poi) {
					return oController.formatHeaderTitle(poi);
				}
			}
		});
		var oLocateMeButton = new sap.m.Button({
			icon: "{icon>/LOCATEME}",
			visible: navigator.geolocation != null ? true : false,
			press: function(oEvent) {
				oController.onLocateMeButtonPress(oEvent);
			}
		});
		return new sap.m.Bar({
			design: sap.m.BarDesign.Header,
			contentMiddle: oTitle,
			contentRight: oLocateMeButton
		});
	},

	createFooter: function() {
		var oController = this.getController();
		var oSettingsButton = new sap.m.Button({
			icon: "{icon>/SETTINGS}",
			type: sap.m.ButtonType.Emphasized,
			press: function(oEvent) {
				oController.onSettingsButtonPress(oEvent);
			}
		});
		var oFeedbackButton = new sap.m.Button({
			text: "{i18n>LABEL_FEEDBACK}",
			type: sap.m.ButtonType.Emphasized,
			press: function(oEvent) {
				oController.onFeedbackButtonPress(oEvent);
			}
		});
		var oToolbarSpacer = new sap.m.ToolbarSpacer();
		return new sap.m.Toolbar({
			design: sap.m.ToolbarDesign.Info,
			content: [oSettingsButton, oToolbarSpacer, oFeedbackButton]
		});
	},

	createContent: function(oController) {
		this.setDisplayBlock(true);
		var oPage = new sap.m.Page({
			customHeader: this.createHeader(),
			backgroundDesign: sap.m.PageBackgroundDesign.List,
			footer: this.createFooter(),
			content: this.createList()
		});
		oPage.addStyleClass("customPageWithFooter");
		return oPage;
	}

});