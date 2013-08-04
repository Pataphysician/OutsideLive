Template.performance.performance = function () {
	return Performances.find({}).fetch();
};

Template.performance.events({
	'click input' : function () {
		Songs.insert({
			name: "song test",
			artist: "artist test"
		});
	}
});
