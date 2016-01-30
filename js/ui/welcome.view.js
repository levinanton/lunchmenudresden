sap.ui.jsview('js.ui.welcome', {

	getControllerName : function() {
		return 'js.ui.welcome';
	},

	createNewsContent : function(sTitle) {
		return new sap.suite.ui.commons.NewsContent({
			contentText : '{i18n>'.concat(sTitle, '}'),
			size : sap.suite.ui.commons.InfoTileSize.Auto
		});
	},

	createTileContent : function(sTitle, sSubTitle) {
		return new sap.suite.ui.commons.TileContent({
			content : this.createNewsContent(sTitle),
			footer : '{i18n>'.concat(sSubTitle, '}'),
			size : sap.suite.ui.commons.InfoTileSize.Auto
		});
	},

	createGenericTile : function(sIcon, sTitle, sSubTitle) {
		var oController = this.getController();
		var oGenericTile = new sap.suite.ui.commons.GenericTile({
			tileContent : this.createTileContent(sTitle, sSubTitle),
			backgroundImage : '{icon>/'.concat(sIcon, '}'),
			size : sap.suite.ui.commons.InfoTileSize.Auto,
			frameType : sap.suite.ui.commons.FrameType.TwoByOne,
			press : function(oEvent) {
				oController.onGenericTilePress(oEvent);
			}
		});
		oGenericTile.addStyleClass('customGenericTile');
		return oGenericTile;
	},

	createCarousel : function() {
		return new sap.m.Carousel({
			showPageIndicator : false,
			pages : new sap.ui.layout.VerticalLayout({
				content : [
						this.createGenericTile('WELCOME', 'TEXT_WELCOME',
								'TEXT_APPETITE'),
						this.createGenericTile('FEEDBACK', 'TEXT_EMPTY',
								'TEXT_FEEDBACK') ]
			})
		});
	},

	createContent : function(oController) {
		this.setDisplayBlock(true);
		return new sap.m.Page({
			title : '{i18n>LABEL_WELCOME}',
			enableScrolling : false,
			content : this.createCarousel()
		});
	}

});