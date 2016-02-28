sap.ui.jsview("js.ui.pdf", {

	getControllerName: function() {
		return "js.ui.pdf";
	},

	createHTML: function() {
		var oController = this.getController();
		var oHTML = new sap.ui.core.HTML();
		var sHeight = oController.getPdfContentHeight() + "px";
		var sTimestmap = oController.getTimestampParameter();
		oHTML.bindProperty("content", "menu", function(sValue) {
			var sContent = "".concat("<div");
			if (sValue === null || sValue === undefined) {
				return sContent.concat("></div>");
			}

			sValue = "js/ext/pdfjs/viewer.html".concat("?file=",
				sValue, "?", sTimestmap);

			sContent = sContent.concat(" style='width:100%;height:100%'>");
			sContent = sContent.concat("<iframe src='",
				sValue, "'");
			sContent = sContent.concat(" width='100%' height='",
				sHeight, "'");
			sContent = sContent.concat(" style='width:100%;height:", sHeight, ";border:none'/>");
			sContent = sContent.concat("</div>");

			return sContent;
		});
		return oHTML;
	},

	createContent: function(oController) {
		this.setDisplayBlock(true);
		var oPage = new sap.m.Page({
			enableScrolling: false,
			customHeader: sap.ui.jsfragment("js.ui.fragment.header", oController),
			content: this.createHTML(),
			footer: sap.ui.jsfragment("js.ui.fragment.footer", oController)
		});
		oPage.addStyleClass("customPageWithFooter");
		return oPage;
	}

});