if (Meteor.isClient) {
  
  Meteor.startup(function() {  
		var stages = $('#stages').find('.stage');
		var n = 1;
		
		var windowHeightTop = ($(window).height() -44);
		
		var sixth = (windowHeightTop / 6) + 'px';
		stages.css({'height':sixth,'line-height':sixth});
		
		$(document).bind('openingEffect', addEffectStepping);
	
		setTimeout(function() {
			$('body').addClass('loaded');
			$(document).trigger('openingEffect');
			
	    }, 600);
	    
	    function addEffectStepping(){
	        setTimeout(function() {
	           $('#stages').find('.stage:nth-child(' + n +')').addClass('show');
	            n++;
	
	            if (n == length){
	                n = 0;
	            };
	            
	            addEffectStepping();
	
	        }, 200);
	    }
      var stage_names = ["Lands End", "Sutro", "Twin Peaks", 
    "Panhandle", "The Dome", "The Barbary"];
      for(var i = 0; i < 6; i++) {
        OutsideLive.updateStage(stage_names[i]);
      }

      Meteor.setInterval(function() {
        //update the attributes for the stages every 30 seconds
        for(var i = 0; i < 6; i++) {
          OutsideLive.updateStage(stage_names[i]);
        }
      }, 30000);

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
  var slug_names = ["lands-end", "sutro", "twin-peaks", 
    "panhandle", "the-dome", "the-barbary"];
  var stage_names = ["Lands End", "Sutro", "Twin Peaks", 
    "Panhandle", "The Dome", "The Barbary"];

  var stages = Stages.find({}).fetch();
  var counts = Stages.find({}).count();
  console.log("number of stages: ", counts);
  if(counts !== undefined) {
    console.log("checking zero");
    if (counts != 0 || Session.get('stages_set')) {
      
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
      Session.set('stages_set', true)
    }
    console.log("The great stage count: ", Stages.find({}).count());
  }

 
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

};

if (Meteor.isServer) {
  
  // Meteor.publish("number-of-stages", function () {
  //     var self = this;
  //     var count = 0;
  //     var initializing = true;

  //     var handle = Stages.find({}).observeChanges({
  //       added: function (id) {
  //         count++;
  //         if (!initializing)
  //           self.changed("counts", {count: count});
  //       },
  //       removed: function (id) {
  //         count--;
  //         self.changed("counts", {count: count});
  //       }
  //       // don't care about moved or changed
  //     });

  //     // Observe only returns after the initial added callbacks have
  //     // run.  Now return an initial value and mark the subscription
  //     // as ready.
  //     initializing = false;
  //     self.added("counts", {count: count});
  //     console.log('sub ready');
  //     self.ready();

  //     // Stop observing the cursor when client unsubs.
  //     // Stopping a subscription automatically takes
  //     // care of sending the client any removed messages.
  //     self.onStop(function () {
  //       handle.stop();
  //     });
  //   });

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

  
  Meteor.methods({
    getArtistImage: function(performance) {
    url = "http://developer.echonest.com/api/v4/artist/images"
    try {
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
    } catch (err) {
      console.log("error getting artist image: ", err);
    }
  },

  getArtistBio: function(performance) {
    url = "http://developer.echonest.com/api/v4/artist/biographies"
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