Template.performance.events();

Template.performance.minutesLeft = function(performance) {
    return OutsideLive.setMinutesRemaining(performance);
};

Template.performance.songs = function(performance) {

};

// Template.performance.performances = function() {
// 	return Performances.find({}).fetch();
// };
