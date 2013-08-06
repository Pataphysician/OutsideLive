Template.header.events({
  "click a.go-back": function(e) {
    e.preventDefault();
    Session.set('currentStage', null);
    Session.set('currentPerformance', null);
  },
});