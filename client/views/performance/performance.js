Template.performance.song = function () {
	return Songs.find({}).fetch();	
};

Template.performance.events({
	'click input' : function () {
		Songs.insert({
			name: "song test",
			artist: "artist test"
		});
	}
});

