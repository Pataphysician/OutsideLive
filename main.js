
if (Meteor.isClient) {

  Meteor.Router.add({
    '': function() {
      Session.set('demo', false);
    },

    '/single': function() {
      Session.set("demo", true);
    },
  });
  
  Meteor.startup(function() {  
  
  		window.scrollTo(0, 1);
		
		var n = 1;
		var stages = $('#stages').find('.stage');
		
		$('#stages').removeClass('hidden');
	
		setTimeout(function() {
			
			var c = 0;
			var interval = setInterval(function() { 
		          $('#stages').find('.stage:nth-child(' + c + ')').removeClass('hidden');
		          c++; 
		          if(c > stages.length) clearInterval(interval);
			}, 150);
		
		}, 200);  
	    
	    setTimeout(function() {
		
			$('body').addClass('loaded');
			
	    }, 600);
	    
	    
      var stage_names = ["Lands End", "Sutro", "Twin Peaks", 
    "Panhandle", "The Dome", "The Barbary"];
      for(var i = 0; i < 6; i++) {
        OutsideLive.updateStage(stage_names[i]);
      }

      OutsideLive.getPerformanceImages();

      Meteor.setInterval(function() {
        //update the attributes for the stages every 30 seconds
        for(var i = 0; i < 6; i++) {
          OutsideLive.updateStage(stage_names[i]);
        }
      }, 10000);

      //demo click has three songs, others have one current one
      //make time of shit between 12pm and 5pm
      //manual setting of performances
      //performances have songs
    //   setTimeout(function() {
    //   var counts = Performances.find({}).count();
    //   console.log("number of performances: ", counts);
    //     if (counts === 0) {
    //       Performances.insert({
    //         day: 1,
    //         artist: "Daft-Punk",
    //         stage: Stages.findOne({name: "Lands End"}),
    //         startTime: 1200,
    //         endTime: 1700
    //       });
    //       Performances.insert({
    //         day: 1,
    //         artist: "Vampire Weekend",
    //         stage: Stages.findOne({name: "Sutro"}),
    //         startTime: 1200,
    //         endTime: 1900
    //       });
    //       Performances.insert({
    //         day: 1,
    //         artist: "Tokyo Police Crew",
    //         stage: Stages.findOne({name: "Twin Peaks"}),
    //         startTime: 1100,
    //         endTime: 1800
    //       });
    //       Performances.insert({
    //         day: 1,
    //         artist: "Zedd",
    //         stage: Stages.findOne({name: "Panhandle"}),
    //         startTime: 1210,
    //         endTime: 1600
    //       });
    //       Performances.insert({
    //         day: 1,
    //         artist: "Pheonix",
    //         stage: Stages.findOne({name: "The Dome"}),
    //         startTime: 1000,
    //         endTime: 1600
    //       });
    //       Performances.insert({
    //         day: 1,
    //         artist: "Paul MccArtney",
    //         stage: Stages.findOne({name: "The Barbary"}),
    //         startTime: 1200,
    //         endTime: 1730
    //       });
    //   }
    // }, 10000);
      
    
    //Data subscription complete. All data is downloaded
    
  });

 
  Template.adminPanelLink.events({
    'click a.admin-panel' : function () {
      Session.set("adminPanel", true);
    }
  });

  Handlebars.registerHelper("currentStage", function() {
    return Session.get("currentStage");
  });

  Handlebars.registerHelper("currentPerformance", function() {
    return Session.get("currentPerformance");
  })

  Handlebars.registerHelper("isCurrentUser", function() {
    return Meteor.user();
  });

  Handlebars.registerHelper("adminPanel", function() {
    return Session.get("adminPanel");
  });

  Handlebars.registerHelper("mainPage", function() {
    var main = (Session.get('currentStage'))
    if (!main) {
      return false;
    }
    return true;
  })

  Meteor.methods({
    getArtistImage: function(performance) {
    var performanceID = performance._id
    var url = "http://developer.echonest.com/api/v4/artist/images"
    try {
      Meteor.http.call("GET", url, 
        {params: {
          api_key: "FJIRSCGH8XZMYGTBT",
          name: performance.artist,
        }},
        function(error, result) {
          var imageURL = result.data.response.images[0].url;
          Performances.update({_id: performanceID}, 
            {$set: {
              imageURL: imageURL,
              }
            });
          return imageURL;
        });
    } catch (err) {
      console.log("error getting artist image: ", err);
    }
  },

  getArtistBio: function(performance) {
    var url = "http://developer.echonest.com/api/v4/artist/biographies"
    try {
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
      } catch (err) {
        console.log("error getting artist bio: ", err);
      }
    },
  });
  
};

if (Meteor.isServer) {
  tweet = new Twitter();

  Meteor.methods({
    postSong: function() {
      tweet.postTweet("testing #swag");
    }
  });

  /*
  Meteor.publishCounter = function(params) {
    var collection, count, handle, id, init, pub,
      _this = this;
    count = 0;
    init = true;
    id = Random.id();
    pub = params.handle;
    collection = params.collection;
    console.log("publishCounter");
    handle = collection.find(params.filter, params.options).observeChanges({
      added: function() {
        count++;
        if (!init) {
          return pub.changed(params.name, id, {
            count: count
          });
        }
      },
      removed: function() {
        count--;
        if (!init) {
          return pub.changed(params.name, id, {
            count: count
          });
        }
      }
    });
    init = false;
    pub.added(params.name, id, {
      count: count
    });
    pub.ready();
    return pub.onStop(function() {
      return handle.stop();
    });
  };
  Meteor.publish('stages-count', function(params) {
    if (params == null) {
      params = {};
    }
    console.log('AYOOOOO');
    return Meteor.publishCounter({
      handle: this,
      name: 'stages-count',
      collection: Stages,
      filter: params
    });
  });

  */ 



};