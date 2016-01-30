sap.ui.jsview('js.ui.img', {

	getControllerName : function() {
		return 'js.ui.img';
	},

	createImage : function() {
		var oController = this.getController();
		var oImage = new sap.m.Image({
			src : '{menu}',
			width : '100%',
			height : '100%'
		});
		// oImage.attachBrowserEvent('load', function() {
		// oController.setBusy(false);
		// }, this);
		// oImage.attachBrowserEvent('error', function() {
		// oController.setBusy(false);
		// }, this);
		return oImage;
	},

	createScrollContainer : function() {
		var oScrollContainer = new sap.m.ScrollContainer({
			content : this.createImage(),
			vertical : true,
			horizontal : true
		});
		oScrollContainer.addStyleClass('customImgScrollContainer');
		return oScrollContainer;
	},

	createContent : function(oController) {
		this.setDisplayBlock(true);
		var oPage = new sap.m.Page({
			customHeader : oController.createBar(),
			content : this.createScrollContainer(),
			footer : sap.ui.jsfragment( 'js.ui.fragment.footer', oController )
		});
		oPage.addStyleClass('customPageWithFooter');
		return oPage;
	}

});