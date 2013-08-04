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

Template.performance.currentTime = function() {
  var currentTime = new Date();
  var currentHours = currentTime.getHours();
  var currentMinutes = currentTime.getMinutes();
  var fractionOfHour = (currentMinutes / 60);
  return currentTime + fractionOfHour;
};

Template.performance.currentPerformances = function() {
  var currentTime = Template.performance.currentTime;

  var onStagePerformances = []
  performances = Performances.find();
  performances.forEach(function(performance) {
    var startTime = parseInt(performance.startTime.substr(0, 2))
    var setLength = parseInt(performance.setLength);
    var endTime = startTime + setLength
    var inRange = 
      ((currentHours + fractionOfHour) > startTime) &&
      ((currentHours + fractionOfHour) > endTime);
    if (inRange) {
      onStagePerformances.push(performance);
    }
  })

  return onStagePerformances;
};