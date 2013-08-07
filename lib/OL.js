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
    if(parseInt(minutes) < 10) {
      minutes = '0' + minutes;
    }
    //BAH BREAKS AT MIDNIGHT 00+15 = 15, not 0015
    // if(parseInt(hours) == 0 ) {
    //   hours = '25';
    // }
    return parseInt(hours + minutes);
  },

  inHumanTime: function(time) {
    var hours = OutsideLive.getHour(time);
    var minutes = OutsideLive.getMins(time);
    var hourStr = hours.toString();
    if (minutes == 0) {
      var minStr = "00";
    } else if (minutes < 10) {
      var minStr = "0" + minutes;
    } else {
      var minStr = minutes.toString();
    }
    return (hourStr + ":" + minStr);
  },

  getHour: function(time) {
    var timeInt = time
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
    var timeInt = time;
    var timeString = timeInt.toString();
    var minutes = timeString.slice(-2);
    var inInt = parseInt(minutes);
    return parseInt(minutes);
  },

  setMinutesRemaining: function(performance) {
    var currentTime = OutsideLive.currentTime();
    var currentHour = OutsideLive.getHour(currentTime);
    var currentMins = OutsideLive.getMins(currentTime);

    var endTime = performance.endTime;
    var endHour = OutsideLive.getHour(endTime);
    var endMins = OutsideLive.getMins(endTime);

    var current = new Date();
    current.setHours(currentHour, currentMins);

    var end = new Date();
    end.setHours(endHour, endMins);

    var remaining = end.getTime() - current.getTime();
    var remainingMins = (remaining / 1000) / 60
    return remainingMins;
  },

  setLength: function(performance) {
    var startTime = performance.startTime;
    var startHour = OutsideLive.getHour(startTime);
    var startMins = OutsideLive.getMins(startTime);

    var endTime = performance.endTime;
    var endHour = OutsideLive.getHour(endTime);
    var endMins = OutsideLive.getMins(endTime);
    var start = new Date();
    start.setHours(startHour, startMins);

    var end = new Date();
    end.setHours(endHour, endMins);

    var milliseconds = end - start
    var minutes = (milliseconds / 1000) / 60

    return minutes;
  },

  percentageComplete: function(performance) {
    var remainingMins = OutsideLive.setMinutesRemaining(performance);
    var setLength = OutsideLive.setLength(performance);
    var percentageRemaining = (remainingMins / setLength) * 100;
    return (100 - percentageRemaining);
  },

  isCurrent: function(performance) {
    var currentTime = OutsideLive.currentTime();
    return (startTime <= currentTime && endTime >= currentTime);
  },

  currentPerformance: function(stageName) {
    var currentTime = OutsideLive.currentTime();

    var stage = Stages.findOne({name: stageName});
    console.log("stage is " + stage.name);
    var stageID = stage._id;
    console.log("stageID is " + stageID);

    current_performance = Performances.findOne(
      {stageID: stageID,
       startTime: {$lte: currentTime},
       endTime: {$gte: currentTime},
      });

    return current_performance;
  },
  iOSStageToWeb: function(stageString) {
    var stageNumber = stageString.split(/#/);
    console.log(stageNumber);
    
    var stage_names = ["Lands End", "Sutro", "Twin Peaks", 
    "Panhandle", "The Dome", "The Barbary"];
    return stage_names[parseInt(stageNumber[1]) - 1];
  },

  getArtistImage: function(performance) {
    url = "http://developer.echonest.com/api/v4/artist/images"

    var imageURL = Meteor.http.call("GET", url, 
      {params: {
        api_key: "FJIRSCGH8XZMYGTBT",
        name: performance.artist,
      }}).data.response.images[0].url;
    console.log(imageURL);
    return imageURL;
  },

  getArtistBio: function(performance) {
    url = "http://developer.echonest.com/api/v4/artist/biographies"

    var bio = Meteor.http.call("GET", url,
      {params: {
        api_key: "FJIRSCGH8XZMYGTBT",
        name: performance.artist,
      }}).data.response.biographies[0].text;
    console.log(bio);
    return bio;
  },
  setEndTime: function(newSong) {
    

    if(newSong.lastSong === "init") {
       Songs.update({_id: newSong._id}, {$set: {endAt: 0}});
       console.log("end at unknown");
    } else {
      var lastSong = Songs.findOne({artist: newSong.artist, name: newSong.lastSong});
      //may need to change end time to milliseconds for percision
      Songs.update({_id: lastSong._id}, {$set: {endAt: newSong.startedAt - 1}});
    }
  },
  updateStage: function(stageName) {
    //
    try {
      var current_performance = OutsideLive.currentPerformance(stageName);
      console.log(current_performance);
      
      //grabs the current song, which is at the performances end of set list
      var current_song_id = _.last(current_performance.setList);
      var current_song = Songs.findOne({_id: current_song_id}); 
      //if current perf, but no curret song than change song to empty string.
      if(current_song == undefined) {
        current_song = {name: "No song playing."};
      }
      //grabs the percentage complete
      var percentage_complete = OutsideLive.percentageComplete(current_performance);

      //need to update by stage ID to avoid "untrusted code" error
      var stage = Stages.findOne({name: stageName});
      var stageID = stage._id


      Stages.update({_id: stageID},{
        $set: {curSong: current_song.name, curPerformance: current_performance.artist, curPerfPercent: percentage_complete}
      });
    } catch(err) {
      console.log("Error updateing stage: ", stageName, "Error: ", err);
    } 
  },
  initStages: function() {
    var slug_names = ["lands-end", "sutro", "twin-peaks", 
    "panhandle", "the-dome", "the-barbary"];
    var stage_names = ["Lands End", "Sutro", "Twin Peaks", 
      "Panhandle", "The Dome", "The Barbary"];

    var stages = Stages.find({}).fetch();
    var counts = Stages.find({}).count();
    console.log("number of stages: ", counts);
    if(counts !== undefined) {
      console.log("checking zero");
      if (counts != 0) {
        
      } else {
        _.each(stage_names, function(stage_name, index) {
          Stages.insert({
            slug: slug_names[index],
            name: stage_name,
            curSong: null,
            curPerformance: null,
            curPerfPercent: null
          });
        });
      }
      console.log("The great stage count: ", Stages.find({}).count());
    }
  },
  sendAtTweet: function() {
    // //https://api.twitter.com/1.1/statuses/update.json
    // Meteor.http.call("POST", "https://api.twitter.com/1.1/statuses/update.json",
    //              {data: {some: "json", stuff: 1}},
    //              function (error, result) {
    //                if (result.statusCode === 200) {
    //                  Session.set("twizzled", true);
    //                }
    //              });
    //this.call('POST',url,params);
    Meteor.call('postSong');
  }



};