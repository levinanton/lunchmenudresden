jQuery.sap.require('jquery.sap.storage');

sap.ui.model.json.JSONModel.extend('js.core.Settings', {

	_STORAGE_KEY : 'LUNCHMENUDRESDEN_SETTINGS',

	_storage : jQuery.sap.storage(jQuery.sap.storage.Type.local),

	constructor : function(oSettings) {
		sap.ui.model.json.JSONModel.apply(this, arguments);
		this.setSizeLimit(1000000);
		var oJson = this._storage.get(this._STORAGE_KEY);
		var oData = JSON.parse(oJson);
		if (!oData) {
			oData = {
				bookmark : null,
				location : "AUTO"
			};
		}
		
		if (oData.location === null || oData.location === undefined) {
			oData.location = "AUTO";
		}
		
		
		this.setData(oData);
	},
	
	getLocation : function() {
		var oData = this.getData();
		var sLocation = oData.location;
		return sLocation;
	},
	
	setLocation : function(sKey) {
		var oData = this.getData();
		oData.location = sKey;

		this.setData(oData);
		var sData = JSON.stringify(oData);
		this._storage.put(this._STORAGE_KEY, sData);
	},

	getBookmark : function() {
		var oData = this.getData();
		var oBookmark = oData.bookmark;
		return oBookmark;
	},

	isBookmarked : function(sId, sType) {
		var oBookmark = this.getBookmark();
		if (oBookmark == null) {
			return false;
		}
		if (oBookmark.id === sId && oBookmark.type === sType) {
			return true;
		}
		return false;
	},

	setBookmark : function(sId, sType) {
		var oData = this.getData();
		var isBookmarked = this.isBookmarked(sId, sType);
		if (isBookmarked) {
			oData.bookmark = null;
		} else {
			oData.bookmark = {
				id : sId,
				type : sType
			};
		}
		this.setData(oData);
		var sData = JSON.stringify(oData);
		this._storage.put(this._STORAGE_KEY, sData);
		return !isBookmarked;
	}

});