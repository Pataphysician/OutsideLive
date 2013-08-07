Template.header.events({
  "click a.go-back": function(e) {
    e.preventDefault();
    $('.single').addClass('hidden');

	setTimeout(function() {
	    Session.set('currentStage', null);
	    Session.set('currentPerformance', null);
    }, 400);
  },
});