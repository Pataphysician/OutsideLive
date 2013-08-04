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
    if (parseInt(minutes) < 10) {
      minutes = '0' + minutes;
    };
    return parseInt(hours + minutes);
  },

  humanTime: function() {
    var hours = getHour(OutsideLive.currentTime());
    var minutes = getMins(OutsideLive.currentTime());
    var hourStr = hours.toString();
    var minStr = minutes.toString();

    return (hourStr + ":" + minStr);
  },

  getHour: function(time) {
    var timeInt = OutsideLive.currentTime();
    if (timeInt < 100) {
      var hour = "00";
    } else if (timeInt < 1000) {
      var timeString = timeInt.toString();
      var hour = timeString.substr(0,1);
    } else {
      var timeString = timeInt.toString();
      var hour = timeString.substr(0,2);
    }
    return parseInt(hour);
  },

  getMins: function(time) {
    var timeInt = OutsideLive.currentTime();
    var timeString = timeInt.toString();
    var minutes = timeString.slice(-2);
    return parseInt(minutes);
  },

  setMinutesRemaining: function(stage) {
    var currentTime = OutsideLive.currentTime();
    var currentHour = OutsideLive.getHour(currentTime);
    var currentMins = OutsideLive.getMins(currentTime);

    var currentPerformance = OutsideLive.currentPerformance(stage);
    var endTime = currentPerformance.endTime;
    var endHour = OutsideLive.getHour(endTime);
    var endMins = OutsideLive.getMins(endTime);

    var current = new Date();
    current.setHours(currentHour);
    current.setMinutes(currentMins);

    var end = new Date();
    end.setHours(endHour);
    end.setMinutes(endMins);

    var remaining = end - current
    var remainingMins = (remaining / 1000) / 60

    return remainingMins;
  },

  setLength: function(stage) {
    var currentPerformance = OutsideLive.currentPerformance(stage);
    var startTime = currentPerformance.startTime;
    var startHour = OutsideLive.getHour(startTime);
    var startMins = OutsideLive.getHour(startTime);

    var endTime = currentPerformance.endTime;
    var endHour = OutsideLive.getHour(endTime);
    var endMins = OutsideLive.getMins(endTime);

    var start = new Date();
    start.setHours(currentHour);
    start.setMinutes(currentMins);

    var end = new Date();
    end.setHours(endHour);
    end.setMinutes(endMins);

    var milliseconds = end - current
    var minutes = (remaining / 1000) / 60

    return minutes;
  },

  setPercentageRemainings: function(stage) {
    var remainingMins = OutsideLive.setMinutesRemaining(stage);
    var setLength = OutsideLive.setLength(stage);
    var percentageRemaining = (remainingMins / setLength) * 100;

    return percentageRemaining;
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
    var slug_names = ["lands-end", "sutro", "twin-peaks", 
    "panhandle", "the-dome", "the-barbary"]
    var stage_names = ["Lands End", "Sutro", "Twin Peaks", 
    "Panhandle", "The Dome", "The Barbary"]
    var stages = Stages.find({}).fetch();
    var counts = Stages.find({}).count();
    console.log("number of stages: ", counts);
    if(counts !== undefined) {
      console.log("checking zero");
      if (counts === 0) {
        _.each(stage_names, function(stage_name, index) {
          Stages.insert({
          	slug: slug_names[index],
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
  },

  getArtistImage: function(performance) {
    url = "http://developer.echonest.com/api/v4/artist/images"

    Meteor.http.call("GET", url, 
      {params: {
        api_key: "FJIRSCGH8XZMYGTBT",
        name: performance.artist,
      }},
      function(error, result) {
        var imageURL = result.data.response.images[0].url;
        performance.imageURL = imageURL;
        return imageURL;
      })
  },

  getArtistBio: function(performance) {
    url = "http://developer.echonest.com/api/v4/artist/biographies"

    Meteor.http.call("GET", url,
      {params: {
        api_key: "FJIRSCGH8XZMYGTBT",
        name: performance.artist,
      }},
      function(error, result) {
        var bio = result.data.response.biographies[0].text;
        performance.bio = bio;
        return bio;
      })
  }

};