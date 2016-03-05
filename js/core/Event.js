(function(root) {

	var Event = function() {
		throw new Error('Event is an enumeration!')
	};

	Event.prototype = {};

	Event.NAVIGATE_MASTER = 'lunchmenudresdenappnavigatemaster';
	Event.SHOW_MASTER = 'lunchmenudresdenappshowmaster';
	Event.NAVIGATE_DETAIL = 'lunchmenudresdenappnavigatedetail';
	Event.LOCATE = 'lunchmenudresdenapplocate';
	Event.SHOW_FEEDBACK = 'lunchmenudresdenappshowfeedback';

	root.Event = Event;

})(this);