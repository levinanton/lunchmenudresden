sap.ui.jsview("js.ui.rss", {

	getControllerName: function() {
		return "js.ui.rss";
	},

	setBindingContext: function(oContext, sName) {
		this.getController().onBindingContextChange(oContext);
		return sap.ui.base.ManagedObject.prototype.setBindingContext.call(this,
			oContext, sName);
	},

	createList: function() {
		var oStandardListItem = new sap.m.StandardListItem({
			title: "{rss>title}"
		});
		var oList = new sap.m.List({
			busyIndicatorDelay: 200,
			enableBusyIndicator: true,
			headerText: "{rss>/channel/description}",
			footerText: "{rss>/channel/pubDate}"
		});
		oList.bindItems("rss>/channel/item", oStandardListItem);
		return oList;
	},

	createContent: function(oController) {
		this.setDisplayBlock(true);
		var oPage = new sap.m.Page({
			customHeader: sap.ui.jsfragment("js.ui.fragment.header", oController),
			content: this.createList(),
			footer: sap.ui.jsfragment("js.ui.fragment.footer", oController)
		});
		oPage.addStyleClass("customPageWithFooter");
		return oPage;
	}

});