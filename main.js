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
      minutes = "0" + minutes;
    }
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
    if (Stages.find().fetch().length == 0) {
      _.each(stage_names, function(stage_name) {
        Stages.insert({
          name: stage_name,
        });
      });
    }
    return stages;
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
  },

};

if (Meteor.isClient) {

  Template.adminPanelLink.events({
    'click a.admin-panel' : function () {
      Session.set("adminPanel", true);
    }
  });

  Handlebars.registerHelper("currentStage", function() {
    return Session.get("currentStage");
  });

  Handlebars.registerHelper("isCurrentUser", function() {
    return Meteor.user();
  });

  Handlebars.registerHelper("adminPanel", function() {
    return Session.get("adminPanel");
  });

  Handlebars.registerHelper("searchResults", function() {
    return Session.get("searchResults");
  })



};

if (Meteor.isServer) {
};