Template.stage.events({
  "click a.go-back": function() {
    Session.set("currentStage", null);
    Session.set("currentPerformance", null);
  },
});

Template.stage.stage = function() {
  return Session.get('currentStage');
};


Template.stage.currentPerformance = function() {
  var performance = Session.get('currentPerformance');
  return Session.get('currentPerformance');
};

Template.stage.setList = function() {
  try {
    var songIDs = Template.stage.currentPerformance().setList;
    var songs = [];
    _.each(songIDs, function(songID) {
      var song = Songs.findOne({_id: songID});
      songs.push(song);
    });

    return songs;
  } catch (err) {
    console.log(err);
  }
};

Template.stage.upcomingSongs = function() {
  var upcomingIDs = Template.stage.currentPerformance().setList.slice(1);
  var upcomingSongs = [];
  _.each(upcomingIDs, function(upcomingID) {
    var upcomingSong = Songs.findOne({_id: upcomingID});
    upcomingSongs.push(upcomingSong);
  })
  return upcomingSongs;

};

Template.stage.currentSong = function() {
  try {
    var songID = _.last(Template.stage.currentPerformance().setList);
    var song = Songs.findOne({_id: songID});
    return song;
  } catch (err) {
    console.log(err);
  }
};

//grab current time
//compare current time to preformance times at this stage

//list in order upcoming performances
Template.stage.upcomingPerformances = function() {
  var stage = Session.get('currentStage');
  var currentPerformance = Template.stage.currentPerformance();
  if (currentPerformance) {
    var current_performance_end = currentPerformance.endTime;
    var upcoming_performances = Performances.find({
      stageID: stage._id,
      startTime: {$gte: current_performance_end}
    }, {
      sort: {startTime: 1},
    }).fetch();

    return upcoming_performances;
  }
};

Template.stage.pastPerformances = function() {
  var stage = Session.get('currentStage');
  var currentTime = OutsideLive.currentTime();
  var pastPerformances = Performances.find({
    stageID: stage._id,
    endTime: {$lte: currentTime}
  }).fetch();

  return pastPerformances;
};

Template.stage.currentArtistImageURL = function(performance) {
  var artist = performance.artist;
  performance.imageURL = OutsideLive.getArtistImage(artist);
  return artist.imageURL;
};