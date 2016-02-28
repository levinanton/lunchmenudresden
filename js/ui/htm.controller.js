js.core.Controller.extend("js.ui.htm", {

	onInit: function() {
		this.getRoute("htm").attachPatternMatched(this.onPatternMatched, this);
	},

	onPatternMatched: function(oEvent) {
		var oParameters = oEvent.getParameters();
		this.navigateDetail(this.getView(), oParameters.arguments);
	},

	onBindingContextChange: function(oBindingContext) {
		var sMenu = oBindingContext.getProperty("menu");
		this.clear();
		if (this.isArray(sMenu)) {
			for (var i in sMenu) {
				this.append(i, sMenu[i]);
			}
		} else {
			this.append(0, sMenu);
		}
	},

	clear: function() {
		$("#htmViewDiv").empty();
	},

	append: function(iIndex, sMenu) {
		$(document).ready(function() {
			$.get(sMenu, function() {
				var $newDiv = $("<span id='htmViewDiv-" + iIndex + "' />");
				$("#htmViewDiv").append($newDiv);
				$("#htmViewDiv".concat("-", iIndex)).load(sMenu);
			});
		});
	},

	isArray: function(oObject) {
		return Object.prototype.toString.call(oObject) === "[object Array]";
	}

});