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
  return Template.stage.currentPerformance().setList;
};

Template.stage.upcomingSongs = function() {
  return Template.stage.currentPerformance().setList.slice(1);
};

Template.stage.currentSong = function() {
  return _.last(Template.stage.currentPerformance().setList);
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