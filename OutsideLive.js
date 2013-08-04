OutsideLive = {

  currentTime: function() {
    var date = new Date();
    var hours = date.getHours().toString();
    var minutes = date.getMinutes().toString();
    return parseInt(hours + minutes);
  },

  currentPerformance: function(stage) {
    var currentTime = OutsideLive.currentTime();

    current_performance = Performances.find(
      {stage: stage,
       startTime: {$lte: currentTime},
       endTime: {$gte: currentTime},
      }).fetch();

    return current_performance;
  },

  createStages: function() {
    console.log("should create stages");
    var stage_names = ["Land's End", "Sutro", "Twin Peaks", 
    "Panhandle", "The Dome", "The Barbary"]
    var stages = Stages.find().fetch();
    if (!stages.length) {
      _.each(stage_names, function(stage_name) {
        Stages.insert({
          name: stage_name,
        });
      });
    }
    return stages;
  },

};

if (Meteor.isClient) {
  Meteor.startup(OutsideLive.createStages);

  Template.hello.greeting = function () {
    return "Welcome to OutsideLive.";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });

  Handlebars.registerHelper("currentStage", function() {
    return Session.get("currentStage");
  });

};

if (Meteor.isServer) {
};