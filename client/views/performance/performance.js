Template.performance.events({
  'click input' : function () {
    Songs.insert({
      name: "song test",
      artist: "artist test"
    });
  }
});

Template.performance.performances = function() {
	return Performances.find({}).fetch();
};
