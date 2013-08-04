OutsideLive = {

  currentDay: function() {
    var date = new Date();
    var day = date.getDay(); //returns 0-7

    // adjust to return the day number of the festival
    switch (day)
    {
      case 5:
        return 1;
        break;
      case 6:
        return 2;
        break;
      case 7:
        return 3;
        break;
    }
  },

  currentTime: function() {
    var date = new Date();
    var hours = date.getHours().toString();
    var minutes = date.getMinutes().toString();
    return parseInt(hours + minutes);
  },

  dataTimeToHumanTime: function(dataTime) {
    
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
    var stages = Stages.find({}).fetch();
    var counts = Stages.find({}).count();
    console.log("number of stages: ", counts);
    if(counts !== undefined) {
      console.log("checking zero");
      if (counts === 0) {
        _.each(stage_names, function(stage_name) {
          Stages.insert({
            name: stage_name
          });
        });
      }
      return stages;
    }
    
  },

  iOSStageToWeb: function(stageString) {
    var stageNumber = stageString.split(/#/);
    console.log(stageNumber);
    
    var stage_names = ["Land's End", "Sutro", "Twin Peaks", 
    "Panhandle", "The Dome", "The Barbary"];
    return stage_names[parseInt(stageNumber[1]) - 1];
  }

};