Template.stage.events({
  
  /*
"click .single" : function(event) {
  	$('.single').find('.bubble').removeClass('visible');
  },
*/
  
  "click a.buy" : function(event) {
  	var thisE = $(event.target);
  	thisE.children('.bubble').addClass('visible');
  },
  
});

Template.stage.helpers({
  inHumanTime: function(time) {
    if(!time) {
      return "";
    }
    return OutsideLive.inHumanTime(time);
  },

  //NOTE: Helpers are necessary to parse performance set lists (which are arrays)
  // of song IDS and display the corresponding information for the song in the template
  correspondingSongName: function(songID) {
    var song = Songs.findOne({_id: songID});
    return song.name;
  },

  correspondingSongStart: function(songID) {
    var song = Songs.findOne({_id: songID});
    return OutsideLive.inHumanTime(song.startedAt);
  },

  correspondingSongEnd: function(songID) {
    var song = Songs.findOne({_id: songID});
    return OutsideLive.inHumanTime(song.endAt);
  },

  isDemo: function() {
    return Session.get('demo');
  },

  isNotDemo: function() {
    return !Session.get('demo');
  }

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
    return Template.stage.currentPerformance().setList;
  } catch (err) {
    console.log(err);
  }
};

Template.stage.playedSongIDs = function() {
  try {
    return Session.get('playedSongIDs');
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
    return Session.get('currentSong');
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

Template.stage.humanTime = function(time) {
  return OutsideLive.inHumanTime(time);
};

Template.stage.newSongAppend = function(song) {
  var replaceSongStar = $('.current-song-start').text();
  var replaceSongName = $('.current-song-name').text();
  var replaceSongBuyLink = $('.current-song-buy').attr('href');


};

Template.stage.rendered = function () { 
  Deps.autorun(function() {
    Meteor.subscribe("songadded", function() {
      var stage = Session.get('currentStage');
      var performance = Performances.findOne({stageID: stage._id});
      var curSongID = _.last(performance.setList);
      var curSong = Songs.findOne({_id: curSongID});
      Session.set('currentPerformance', performance);
      Session.set('currentSong', curSong);
      Session.set('playedSongIDs', performance.setList.slice(0, -1).reverse())
    })
  })
}