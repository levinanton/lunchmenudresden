jQuery.sap.require('sap.m.MessageToast');

sap.ui.core.mvc.Controller.extend('js.core.Controller', {

	getEventBus : function() {
		return this.getOwnerComponent().getEventBus();
	},

	getRouter : function() {
		return sap.ui.core.UIComponent.getRouterFor(this);
	},

	getText : function(sKey) {
		var oModel = this.getOwnerComponent().getModel('i18n');
		var oResourceBundle = oModel.getResourceBundle();
		return oResourceBundle.getText(sKey);
	},

	getSettings : function() {
		return this.getOwnerComponent().getModel('settings');
	},

	getBindingPathById : function(sId) {
		var oModel = this.getOwnerComponent().getModel();
		var oData = oModel.getData();
		var length = oData.poi.length;
		for (var i = 0; i < length; i++) {
			var sPath = '/poi/'.concat(i);
			var sIdPath = sPath.concat('/id');
			var sNextId = oModel.getProperty(sIdPath);
			if (sNextId === sId) {
				return sPath;
			}
		}
		return null;
	},

	onHeaderButtonPress : function(oEvent) {
		this.getEventBus().publish(Channel.APP, Event.NAVIGATE_MASTER, {
			event : oEvent
		});
	},

	onBookmarkButtonPress : function(oEvent) {
		var oSource = oEvent.getSource();
		var oSettings = this.getSettings();
		var oBindingContext = oSource.getBindingContext();
		var sId = oBindingContext.getProperty('id');
		var sType = oBindingContext.getProperty('type');
		var isBookmarked = oSettings.setBookmark(sId, sType);
		if (isBookmarked) {
			this.addButtonBookmarkStyle(oSource);
		} else {
			this.removeButtonBookmarkStyle(oSource);
		}
	},

	navigateDetail : function(oView, arguments) {
		var sId = arguments.id;
		var sPath = this.getBindingPathById(sId);
		oView.bindElement(sPath);
		this.getEventBus().publish(Channel.APP, Event.NAVIGATE_DETAIL, {
			id : sId
		});
	},

	formatBookmarkButtonIcon : function(sId, sType, oSource) {
		var oSettings = this.getSettings();
		if (oSettings.isBookmarked(sId, sType)) {
			this.addButtonBookmarkStyle(oSource);
		} else {
			this.removeButtonBookmarkStyle(oSource);
		}
		return 'sap-icon://bookmark';
	},

	addButtonBookmarkStyle : function(oControl) {
		oControl.removeStyleClass('customIconGrey');
		oControl.removeStyleClass('customIconRed');
		oControl.addStyleClass('customIconRed');
	},

	removeButtonBookmarkStyle : function(oControl) {
		oControl.removeStyleClass('customIconGrey');
		oControl.removeStyleClass('customIconRed');
		oControl.addStyleClass('customIconGrey');
	},

	createBar : function() {
		var that = this;
		var oBookmarkButton = new sap.m.Button({
			press : function(oEvent) {
				that.onBookmarkButtonPress(oEvent);
			}
		});
		oBookmarkButton.bindProperty('icon', {
			parts : [ 'id', 'type' ],
			formatter : function(sId, sType) {
				return that.formatBookmarkButtonIcon(sId, sType, this);
			}
		});
		return new sap.m.Bar({
			design : sap.m.BarDesign.Header,
			contentLeft : new sap.m.Button({
				icon : 'sap-icon://menu2',
				visible : sap.ui.Device.system.phone,
				press : function(oEvent) {
					that.onHeaderButtonPress(oEvent);
				}
			}),
			contentMiddle : new sap.m.Label({
				text : '{title}'
			}),
			contentRight : oBookmarkButton
		});
	},
	
	createFooter : function() {
		return new sap.m.Toolbar({
			design : sap.m.ToolbarDesign.Info,
			content : [ new sap.m.ToolbarSpacer(), new sap.m.Label({
				text : '{address}'
			}) ]
		});
	},

	getTimestampParameter : function() {
		var oDate = new Date();
		var year = oDate.getFullYear();
		var month = oDate.getMonth();
		var date = oDate.getDate();
		var hour = oDate.getHours();
		var minute = oDate.getMinutes();
		return '_timestamp='.concat(year, month, date, hour, minute);
	},

	getCurrentPosition : function() {
		var oSettings = this.getSettings();
		var sLocation = oSettings.getLocation();
		if ("DRE03" === sLocation) {
							this.getEventBus().publish(Channel.GEO, Event.LOCATE, {
					latitude : 51.0331147,
					longitude : 13.7107176
					
					
				});
		} else if ("DRE04" === sLocation) {
							this.getEventBus().publish(Channel.GEO, Event.LOCATE, {
					latitude : 51.0511711,
					longitude : 13.7339831
					
					
				});
		} else {
					var that = this;
		var oLocation = navigator.geolocation;
		if (oLocation) {
			oLocation.getCurrentPosition(function(oPosition) {
				that.getEventBus().publish(Channel.GEO, Event.LOCATE, {
					latitude : oPosition.coords.latitude,
					longitude : oPosition.coords.longitude
				});
			}, function(oError) {
				var sText = '';
				switch (oError.code) {
				case oError.PERMISSION_DENIED:
					sText = 'User denied the request for Geolocation.'
					break;
				case oError.POSITION_UNAVAILABLE:
					sText = 'Location information is unavailable.'
					break;
				case oError.TIMEOUT:
					sText = 'The request to get user location timed out.'
					break;
				case oError.UNKNOWN_ERROR:
				default:
					sText = 'An unknown error occurred.'
					break;
				}
				sap.m.MessageToast.show(sText);
			});
		} else {
			var sText = this.getText('TEXT_GEOLOCATION_NOT_SUPPORTED_ERROR');
			sap.m.MessageToast.show(sText);
		}
		}
		
		

	}

});