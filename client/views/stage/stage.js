Template.stage.events({
  "click a.go-back": function() {
    Session.set("currentStage", null);
  },
});

Template.stage.stage = function() {
  return Session.get('currentStage')[0];
};

Template.stage.currentPerformance = function() {
  var stage = Template.stage.stage();
  var currentPerformance = OutsideLive.currentPerformance(stage.name);

  return currentPerformance[0];
};



Template.stage.upcomingPerformances = function() {
  var stage = Template.stage.stage();
  var currentPerformance = Template.stage.currentPerformance();
  if (currentPerformance) {
    var current_performance_end = Template.stage.currentPerformance().endTime;

    var upcoming_performances = Performances.find({
      stage: stage.name,
      startTime: {$gte: current_performance_end}
    }, {
      sort: {startTime: 1},
    }).fetch();

    return upcoming_performances;
  }
};