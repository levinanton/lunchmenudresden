sap.ui.jsview("js.ui.welcome", {

	getControllerName: function() {
		return "js.ui.welcome";
	},

	createFeedbackTile: function() {
		var oController = this.getController();
		var oNewsContent = new sap.m.NewsContent({
			size: sap.m.Size.Auto
		});
		var oTileContent = new sap.m.TileContent({
			content: oNewsContent,
			footer: "{i18n>TEXT_FEEDBACK}",
			size: sap.m.Size.Auto
		});
		var oGenericTile = new sap.m.GenericTile({
			tileContent: oTileContent,
			backgroundImage: "{icon>/FEEDBACK}",
			size: sap.m.Size.Auto,
			frameType: sap.m.FrameType.TwoByOne,
			press: function(oEvent) {
				oController.onFeedbackTilePress(oEvent);
			}
		});
		oGenericTile.addStyleClass("sapUiSmallMargin");
		return oGenericTile;
	},

	createWelcomeTile: function() {
		var oController = this.getController();
		var oNewsContent = new sap.m.NewsContent({
			contentText: "{i18n>TEXT_WELCOME}",
			size: sap.m.Size.Auto
		});
		var oTileContent = new sap.m.TileContent({
			content: oNewsContent,
			footer: "{i18n>TEXT_APPETITE}",
			size: sap.m.Size.Auto
		});
		var oGenericTile = new sap.m.GenericTile({
			tileContent: oTileContent,
			backgroundImage: "{icon>/WELCOME}",
			size: sap.m.Size.Auto,
			frameType: sap.m.FrameType.TwoByOne,
			press: function(oEvent) {
				oController.onWelcomeTilePress(oEvent);
			}
		});
		oGenericTile.addStyleClass("sapUiSmallMargin");
		return oGenericTile;
	},

	createSourceTile: function() {
		var oController = this.getController();
		var oNewsContent = new sap.m.NewsContent({
			size: sap.m.Size.Auto
		});
		var oTileContent = new sap.m.TileContent({
			content: oNewsContent,
			footer: "{i18n>TEXT_SOURCE}",
			size: sap.m.Size.Auto
		});
		var oGenericTile = new sap.m.GenericTile({
			tileContent: oTileContent,
			backgroundImage: "{icon>/SOURCE}",
			size: sap.m.Size.Auto,
			frameType: sap.m.FrameType.TwoByOne,
			press: function(oEvent) {
				oController.onSourceTilePress(oEvent);
			}
		});
		oGenericTile.addStyleClass("sapUiSmallMargin");
		return oGenericTile;
	},

	createUI5Tile: function() {
		var oController = this.getController();
		var oNumericContent = new sap.m.NumericContent({
			size: sap.m.Size.Auto,
			value: sap.ui.version,
			truncateValueTo: 8
		});
		var oTileContent = new sap.m.TileContent({
			frameType: sap.m.FrameType.OneByOne,
			size: sap.m.Size.Auto,
			unit: "{i18n>LABEL_VERSION}",
			content: oNumericContent
		});
		var oGenericTile = new sap.m.GenericTile({
			tileContent: oTileContent,
			headerImage: "{icon>/SAPUI5}",
			header: "{i18n>TEXT_BASED_ON_UI5}",
			size: sap.m.Size.Auto,
			frameType: sap.m.FrameType.OneByOne,
			press: function(oEvent) {
				oController.onUI5TilePress(oEvent);
			}
		});
		oGenericTile.addStyleClass("sapUiSmallMargin");
		return oGenericTile;
	},

	createContent: function(oController) {
		this.setDisplayBlock(true);
		var oWelcomeTile = this.createWelcomeTile();
		var oFeedbackTile = this.createFeedbackTile();
		var oUI5Tile = this.createUI5Tile();
		var oSourceTile = this.createSourceTile();
		return new sap.m.Page({
			title: "{i18n>LABEL_WELCOME}",
			enableScrolling: false,
			content: [oWelcomeTile,
				oFeedbackTile, oUI5Tile, oSourceTile
			]
		});
	}

});