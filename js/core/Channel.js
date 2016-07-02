(function(root) {

	var Channel = function() {
		throw new Error("Channel is an enumeration!");
	};

	Channel.prototype = {};

	Channel.APP = "lunchmenudresdenapp";
	Channel.GEO = "lunchmenudresdengeo";

	root.Channel = Channel;

})(this);