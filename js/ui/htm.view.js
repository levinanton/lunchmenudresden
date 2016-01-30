sap.ui.jsview('js.ui.htm', {

	getControllerName : function() {
		return 'js.ui.htm';
	},

	setBindingContext : function(oContext, sName) {
		this.getController().onBindingContextChange(oContext);
		return sap.ui.base.ManagedObject.prototype.setBindingContext.call(this,
				oContext, sName);
	},

	createHTML : function() {
		return new sap.ui.core.HTML({
			content : '<div id="htmViewDiv" />'
		});
	},

	createContent : function(oController) {
		this.setDisplayBlock(true);
		var oPage =  new sap.m.Page({
			customHeader : oController.createBar(),
			content : this.createHTML(),
			footer : sap.ui.jsfragment( 'js.ui.fragment.footer', oController )
		});
		oPage.addStyleClass('customPageWithFooter');
		return oPage;
	}

});