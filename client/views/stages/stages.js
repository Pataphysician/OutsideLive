Template.stages.events({
  "click a.show-stage": function(event) {
    event.preventDefault();
    var stage_name = $(event.target).attr('data-id');
    var stage = Stages.find({name: stage_name}).fetch()[0];
    Session.set("currentStage", stage);
    var currentPerformance = OutsideLive.currentPerformance(stage)[0];
    Session.set('currentPerformance', currentPerformance);
  },
});

Template.stages.currentPerformances = function() {
  var stages = Stages.find().fetch();
  _.each(stages, function(stage) {
    current_performance = OutsideLive.currentPerformance(stage);
    stage.currentPerformance = current_performance[0];
  });

  return stages;
};