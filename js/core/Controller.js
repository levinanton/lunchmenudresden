jQuery.sap.require("sap.m.MessageToast");

sap.ui.core.mvc.Controller.extend("js.core.Controller", {

	onInit: function() {
		var that = this;
		$(document).ready(function() {
			document.title = that.getText("LABEL_TITLE");
		});
	},

	getEventBus: function() {
		return this.getOwnerComponent().getEventBus();
	},

	getRouter: function() {
		return sap.ui.core.UIComponent.getRouterFor(this);
	},

	getRoute: function(sName) {
		return this.getRouter().getRoute(sName);
	},

	getText: function(sKey, oValues) {
		var oModel = this.getOwnerComponent().getModel("i18n");
		var oResourceBundle = oModel.getResourceBundle();
		return oResourceBundle.getText(sKey, oValues);
	},

	getSettings: function() {
		return this.getOwnerComponent().getModel("settings");
	},

	getBindingPathById: function(sId) {
		var oModel = this.getOwnerComponent().getModel();
		var oData = oModel.getData();
		var length = oData.poi.length;
		for (var i = 0; i < length; i++) {
			var sPath = "/poi/".concat(i);
			var sIdPath = sPath.concat("/id");
			var sNextId = oModel.getProperty(sIdPath);
			if (sNextId === sId) {
				return sPath;
			}
		}
		return null;
	},

	onMenuButtonPress: function(oEvent) {
		this.getEventBus().publish(Channel.APP, Event.NAVIGATE_MASTER, {
			event: oEvent
		});
	},

	onBookmarkButtonPress: function(oEvent) {
		var oSource = oEvent.getSource();
		var oSettings = this.getSettings();
		var oBindingContext = oSource.getBindingContext();
		var sId = oBindingContext.getProperty("id");
		var sType = oBindingContext.getProperty("type");
		var isBookmarked = oSettings.setBookmark(sId, sType);
		if (isBookmarked) {
			this.addButtonBookmarkStyle(oSource);
		} else {
			this.removeButtonBookmarkStyle(oSource);
		}
	},

	navigateDetail: function(oView, arguments) {
		var sId = arguments.id;
		var sPath = this.getBindingPathById(sId);
		if (sPath === null) {
			this.display404();
			return;
		}
		oView.bindElement(sPath);
		this.getEventBus().publish(Channel.APP, Event.NAVIGATE_DETAIL, {
			id: sId
		});
	},

	navigateWelcome: function() {
		var bNoHistoryEntry = true;
		this.getRouter().navTo("welcome");
		this.getEventBus().publish(Channel.APP, Event.NAVIGATE_WELCOME, {});
	},

	display404: function() {
		this.getRouter().getTargets().display("404");
		this.getEventBus().publish(Channel.APP, Event.DISPLAY_404, {});
	},

	formatBookmarkButtonIcon: function(sId, sType, oSource) {
		var oSettings = this.getSettings();
		if (oSettings.isBookmarked(sId, sType)) {
			this.addButtonBookmarkStyle(oSource);
		} else {
			this.removeButtonBookmarkStyle(oSource);
		}
		return "sap-icon://bookmark";
	},

	formatLocationLinkHref: function(oLocation) {
		if (oLocation === null) {
			return "";
		}
		var lat = oLocation.latitude;
		var lon = oLocation.longitude;
		var url = this.getText("URL_MAP", [lat, lon]);
		return url;
	},

	addButtonBookmarkStyle: function(oControl) {
		oControl.removeStyleClass("customIconGrey");
		oControl.removeStyleClass("customIconRed");
		oControl.addStyleClass("customIconRed");
	},

	removeButtonBookmarkStyle: function(oControl) {
		oControl.removeStyleClass("customIconGrey");
		oControl.removeStyleClass("customIconRed");
		oControl.addStyleClass("customIconGrey");
	},

	getTimestampParameter: function() {
		var oDate = new Date();
		var year = oDate.getFullYear();
		var month = oDate.getMonth();
		var date = oDate.getDate();
		var hour = oDate.getHours();
		var minute = oDate.getMinutes();
		return "_timestamp=".concat(year, month, date, hour, minute);
	},

	getContentHeightOffset: function() {
		var headerHeight = 48;
		var footerHeight = 32;
		return headerHeight + footerHeight;
	},

	getCurrentPosition: function() {
		var oSettings = this.getSettings();
		var sLocation = oSettings.getLocation();
		if ("DRE03" === sLocation) {
			this.getEventBus().publish(Channel.GEO, Event.LOCATE, {
				latitude: 51.0331147,
				longitude: 13.7107176

			});
		} else if ("DRE04" === sLocation) {
			this.getEventBus().publish(Channel.GEO, Event.LOCATE, {
				latitude: 51.0511711,
				longitude: 13.7339831

			});
		} else if ("DRE06" === sLocation) {
			this.getEventBus().publish(Channel.GEO, Event.LOCATE, {
				latitude: 51.045914,
				longitude: 13.757310

			});
		} else {
			var that = this;
			var oLocation = navigator.geolocation;
			if (oLocation) {
				oLocation.getCurrentPosition(function(oPosition) {
					that.getEventBus().publish(Channel.GEO, Event.LOCATE, {
						latitude: oPosition.coords.latitude,
						longitude: oPosition.coords.longitude
					});
				}, function(oError) {
					var sText = "";
					switch (oError.code) {
						case oError.PERMISSION_DENIED:
							sText = "User denied the request for Geolocation";
							break;
						case oError.POSITION_UNAVAILABLE:
							sText = "Location information is unavailable";
							break;
						case oError.TIMEOUT:
							sText = "The request to get user location timed out";
							break;
						case oError.UNKNOWN_ERROR:
						default:
							sText = "An unknown error occurred";
							break;
					}
					sap.m.MessageToast.show(sText);
				});
			} else {
				var sText = this.getText("TEXT_GEOLOCATION_NOT_SUPPORTED_ERROR");
				sap.m.MessageToast.show(sText);
			}
		}

	}

});