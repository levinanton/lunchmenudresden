sap.ui.jsview("js.ui.img", {

	getControllerName: function() {
		return "js.ui.img";
	},

	createScrollContainer: function() {
		var oImage = new sap.m.Image({
			src: "{menu}",
			width: "100%",
			height: "100%"
		});
		var oScrollContainer = new sap.m.ScrollContainer({
			content: oImage,
			vertical: true,
			horizontal: true
		});
		oScrollContainer.addStyleClass("customImgScrollContainer");
		return oScrollContainer;
	},

	createContent: function(oController) {
		this.setDisplayBlock(true);
		var oPage = new sap.m.Page({
			customHeader: sap.ui.jsfragment("js.ui.fragment.header", oController),
			content: this.createScrollContainer(),
			footer: sap.ui.jsfragment("js.ui.fragment.footer", oController)
		});
		oPage.addStyleClass("customPageWithFooter");
		return oPage;
	}

});