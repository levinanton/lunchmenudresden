js.core.Controller.extend("js.ui.list", {

	onInit: function() {
		this.createFeedback();
		this.createSettings();
		this.subscribe();
		this.getRouter().attachBypassed(this.onBypassed, this);
	},

	subscribe: function() {
		var oEventBus = this.getEventBus();
		oEventBus.subscribe(Channel.APP, Event.NAVIGATE_DETAIL,
			this.onNavigateDetail, this);
		oEventBus.subscribe(Channel.GEO, Event.LOCATE, this.onGeoLocate, this);
		oEventBus.subscribe(Channel.APP, Event.SHOW_FEEDBACK, this.onShowFeedback, this);
		oEventBus.subscribe(Channel.APP, Event.NAVIGATE_WELCOME, this.onNavigateWelcome, this);
		oEventBus.subscribe(Channel.APP, Event.DISPLAY_404, this.onDisplay404, this);
	},

	createFeedback: function() {
		this.oFeedbackView = sap.ui.jsview("js.ui.feedback");
		this.getView().addDependent(this.oFeedbackView.oPopover);
	},

	createSettings: function() {
		this.oSettingsView = sap.ui.jsview("js.ui.settings");
		this.getView().addDependent(this.oSettingsView.oPopover);
	},

	onBypassed: function() {
		this.removeListSelection();
	},

	onLocateMeButtonPress: function(oEvent) {
		this.getCurrentPosition();
	},

	onFeedbackButtonPress: function(oEvent) {
		var oSource = oEvent.getSource();
		this.oFeedbackView.openBy(oSource);
	},

	onShowFeedback: function(sChannelId, sEventId, oData) {
		var oFeedbackButton = this.getView().getFeedbackButton();
		this.oFeedbackView.openBy(oFeedbackButton);
	},

	onSettingsButtonPress: function(oEvent) {
		var oSource = oEvent.getSource();
		this.oSettingsView.openBy(oSource);
	},

	removeListSelection: function() {
		var oList = this.getView().getList();
		oList.removeSelections(true);
	},

	formatDistance: function(value) {
		if (value === null || value === undefined || value === "") {
			return "";
		}
		if (value < 1) {
			return this.getText("LABEL_METER", [value.toFixed(3) * 1000]);
		}
		return this.getText("LABEL_KILOMETER", [value.toFixed(2)]);
	},

	formatDistanceState: function(value) {
		if (value === null || value === undefined || value === "") {
			return sap.ui.core.ValueState.None;
		}
		if (value < 1) {
			return sap.ui.core.ValueState.Success;
		}
		if (value < 4) {
			return sap.ui.core.ValueState.Warning;
		}
		return sap.ui.core.ValueState.Error;
	},

	formatHeaderTitle: function(poi) {
		var enabledPoi = poi.filter(function(next) {
			return next.enabled;
		});
		return this.getText("LABEL_AROUND", [enabledPoi.length]);
	},

	onGeoLocate: function(sChannelId, sEventId, oData) {
		var oModel = this.getView().getModel();
		var data = oModel.getData();
		var length = data.poi.length;
		for (var i = 0; i < length; i++) {
			var sPath = "/poi/".concat(i);
			var oNext = oModel.getProperty(sPath);
			var distance = this.distanceInKilometers(oData, oNext.location);
			oNext.distance = distance;
		}
		oModel.updateBindings(false);
		var isDescending = false;
		this.getView().getList().getBinding("items").sort(
			new sap.ui.model.Sorter("distance", isDescending));
	},

	onNavigateWelcome: function(sChannelId, sEventId, oData) {
		this.removeListSelection();
	},

	onDisplay404: function(sChannelId, sEventId, oData) {
		this.removeListSelection();
	},

	onNavigateDetail: function(sChannelId, sEventId, oData) {
		var sId = oData.id;
		var oList = this.getView().getList();
		var oItem = this.getListItemById(sId);
		if (oItem == null) {
			return;
		}
		oList.setSelectedItem(oItem);
		var oBindingContext = oItem.getBindingContext();
		var sType = oBindingContext.getProperty("type");
		this.getRouter().getView("js.ui.".concat(sType), "JS").setBindingContext(oBindingContext, sId);
	},

	formatDescription: function(sValue) {
		switch (sValue) {
			case "day":
				return this.getText("LABEL_CURRENT_DAY");
			case "week":
				return this.getText("LABEL_CURRENT_WEEK");
			default:
				return "";
		}
	},

	formatIcon: function(sValue) {
		var oModel = this.getView().getModel("icon");
		return oModel.getProperty("/".concat(sValue.toUpperCase()));
	},
	
	formatTitle:function(sTitle, bSodexo) {
		if (bSodexo) {
			return sTitle.concat(" ", "\u2B50");
		}
		return sTitle;
	},

	onListItemPress: function(oEvent) {
		var oSelectedItem = oEvent.getSource().getSelectedItem();
		var oBindingContext = oSelectedItem.getBindingContext();
		var sId = oBindingContext.getProperty("id");
		var sType = oBindingContext.getProperty("type");
		var bNoHistoryEntry = true;
		this.getRouter().navTo(sType, {
			id: sId
		}, bNoHistoryEntry);
	},

	onStandardListItemPress: function(oEvent) {
		var oBindingContext = oEvent.getSource().getBindingContext();
		var sId = oBindingContext.getProperty("id");
		var sType = oBindingContext.getProperty("type");
		var bNoHistoryEntry = true;
		this.getRouter().navTo(sType, {
			id: sId
		}, bNoHistoryEntry);
	},

	getListItemById: function(sId) {
		var oList = this.getView().getList();
		var aItems = oList.getItems();
		for (var i in aItems) {
			var oItem = aItems[i];
			var oBindingContext = oItem.getBindingContext();
			var sItemId = oBindingContext.getProperty("id");
			if (sItemId === sId) {
				return oItem;
			}
		}
		return null;
	},

	onAfterRendering: function(oEvent) {
		var that = this;
		setTimeout(function() {
			var oSettings = that.getSettings();
			var oBookmark = oSettings.getBookmark();
			if (oBookmark == null) {
				return;
			}
			var sId = oBookmark.id;
			var sType = oBookmark.type;
			var bNoHistoryEntry = true;
			that.getRouter().navTo(sType, {
				id: sId
			}, bNoHistoryEntry);
		}, 500);
		this.getCurrentPosition();
	},

	distanceInKilometers: function(oLocation1, oLocation2) {
		var dLatitude1 = oLocation1.latitude;
		var dLongitude1 = oLocation1.longitude;

		dLatitude1 = this.toRadians(dLatitude1);
		dLongitude1 = this.toRadians(dLongitude1);

		var dLatitude2 = oLocation2.latitude;
		var dLongitude2 = oLocation2.longitude;

		dLatitude2 = this.toRadians(dLatitude2);
		dLongitude2 = this.toRadians(dLongitude2);

		var dArg = Math.sin(dLatitude1) * Math.sin(dLatitude2) + Math.cos(dLatitude1) * Math.cos(dLatitude2) * Math.cos(dLongitude1 -
			dLongitude2);

		if (Math.abs(dArg) > 1) {
			return 0.00;
		}

		return Math.acos(dArg) * 6371;
	},

	toRadians: function(value) {
		return value / 180.0 * Math.PI;
	}

});