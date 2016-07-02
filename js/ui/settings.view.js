sap.ui.jsview('js.ui.settings', {

	getControllerName : function() {
		return 'js.ui.settings';
	},
	
	createSegmentedButton : function() {
		var oController = this.getController();

		var oSegmentedButtonItem = new sap.m.SegmentedButtonItem({
			text : "{location>text}",
			key : "{location>key}"
		});
		var oSegmentedButton = new sap.m.SegmentedButton({
			selectedKey : "{settings>/location}",
			width : "300px",
			select : function(oEvent) {
				oController.handleSelect(oEvent);
			}
		});
	
		
		oSegmentedButton.bindAggregation("items", {
			path : "location>/",
			template : oSegmentedButtonItem
			
		});

		
		
		return oSegmentedButton; 
	},

	createEndpointPage : function() {
		var oController = this.getController();
		
				var oHBox =  new sap.m.HBox({
			alignItems : "Center",
			justifyContent : "Center",
			width : "100%",
			items : this.createSegmentedButton()
		});
		
		this.oEndpointPage = new sap.m.Page({
			title : '{i18n>LABEL_LOCATION}',
			backgroundDesign : sap.m.PageBackgroundDesign.List,
			showNavButton : true,
			navButtonPress : function(oEvent) {
				oController.onNavButtonPress(oEvent);
			},
			content : oHBox
		});
		return this.oEndpointPage;
	},

	createSettingsPage : function() {
		var oController = this.getController();
		

		
		
		return new sap.m.Page({
			title : '{i18n>LABEL_SETTINGS}',
			backgroundDesign : sap.m.PageBackgroundDesign.List,
			content : new sap.m.List({
				items : [ /*new sap.m.InputListItem({
					label : '{i18n>LABEL_DEBUG_MODE}',
					content : new sap.m.Switch({
						state : '{settings>/debug}',
						change : function(oEvent) {
							oController.onDebugModeChange(oEvent);
						}
					})
				}), new sap.m.InputListItem({
					label : '{i18n>LABEL_DEMO_MODE}',
					content : new sap.m.Switch({
						state : '{settings>/demo}',
						change : function(oEvent) {
							oController.onDemoModeChange(oEvent);
						}
					})
				}),*/ new sap.m.StandardListItem({
					type : sap.m.ListType.Navigation,
					title : '{i18n>LABEL_LOCATION}',
					press : function(oEvent) {
						oController.onLocationPress(oEvent);
					}
				}) ]
			})
		});
	},

	createNavContainer : function() {
		this.oNavContainer = new sap.m.NavContainer({
			pages : [ this.createSettingsPage(), this.createEndpointPage() ]
		});
		return this.oNavContainer;
	},

	createContent : function(oController) {
		this.oPopover = new sap.m.ResponsivePopover({
			showHeader : false,
			contentWidth : '320px',
			contentHeight : '240px',
			placement : sap.m.PlacementType.Top,
			content : this.createNavContainer()
		});
		return null;
	},

	openBy : function(oControl) {
		if (!this.oPopover.isOpen()) {
			this.oPopover.openBy(oControl);
		}
	},

	close : function() {
		this.oPopover.close();
	}

});