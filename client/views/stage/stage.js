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
  var stage = Session.get('currentStage');
  console.log('currentStage: ',Session.get('currentStage'));
  // var currentPerformance = OutsideLive.currentPerformance(stage)[0];
  // console.log("current Perf:",currentPerformance);
  return Session.get('currentPerformance');
};

Template.stage.performanceSet = function() {
  var currentPerformance = Session.get('currentPerformance');
  setResults = Songs.find({artist: Session.get('currentPerformance').artist, startAt: {$lte: OutsideLive.currentTime()}}, {sort: {startedAt: -1}}).fetch();
  setResults.shift();
  return setResults;
};

Template.stage.currentSong = function() {
  return Songs.findOne({artist: Session.get('currentPerformance').artist, startAt: {$lte: OutsideLive.currentTime()}}, {sort: {startedAt: -1}});
};
//notes:
//grab current time
//compare current time to preformance times at this stage

//list in order upcoming performances
Template.stage.upcomingPerformances = function() {
  var stage = Session.get('currentStage');
  var currentPerformance = Template.stage.currentPerformance();
  if (currentPerformance) {
    var current_performance_end = currentPerformance.endTime;
    var upcoming_performances = Performances.find({
      stage: stage.name,
      startTime: {$gte: current_performance_end}
    }, {
      sort: {startTime: 1},
    }).fetch();

    return upcoming_performances;
  }
};

Template.stage.currentArtistImageURL = function(performance) {
  var artist = performance.artist;
  performance.imageURL = OutsideLive.getArtistImage(artist);
  return artist.imageURL;
};