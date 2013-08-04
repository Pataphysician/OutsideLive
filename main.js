

if (Meteor.isClient) {
  
  Meteor.startup(function() {
    // client: subscribe to the count for the current room
      //Meteor.subscribe("number-of-stages");
      OutsideLive.createStages();

      //demo click has three songs, others have one current one
      //make time of shit between 12pm and 5pm
      //manual setting of performances
      //performances have songs
      setTimeout(function() {
      var counts = Performances.find({}).count();
      console.log("number of performances: ", counts);
        if (counts === 0) {
          Performances.insert({
            day: 1,
            artist: "Daft-Punk",
            stage: Stages.findOne({name: "Lands End"}),
            startTime: 1200,
            endTime: 1700
          });
          Performances.insert({
            day: 1,
            artist: "Vampire Weekend",
            stage: Stages.findOne({name: "Sutro"}),
            startTime: 1200,
            endTime: 1900
          });
          Performances.insert({
            day: 1,
            artist: "Tokyo Police Crew",
            stage: Stages.findOne({name: "Twin Peaks"}),
            startTime: 1100,
            endTime: 1800
          });
          Performances.insert({
            day: 1,
            artist: "Zedd",
            stage: Stages.findOne({name: "Panhandle"}),
            startTime: 1210,
            endTime: 1600
          });
          Performances.insert({
            day: 1,
            artist: "Pheonix",
            stage: Stages.findOne({name: "The Dome"}),
            startTime: 1000,
            endTime: 1600
          });
          Performances.insert({
            day: 1,
            artist: "Paul MccArtney",
            stage: Stages.findOne({name: "The Barbary"}),
            startTime: 1200,
            endTime: 1730
          });
      }
    }, 10000);
      
    
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

  Handlebars.registerHelper("isCurrentUser", function() {
    return Meteor.user();
  });

  Handlebars.registerHelper("adminPanel", function() {
    return Session.get("adminPanel");
  });

};

if (Meteor.isServer) {
  
  Meteor.startup(function() {
    
    
    // server: publish the current size of a collection
    
  });

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

};