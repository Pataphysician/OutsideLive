Meteor.startup(function () {

    // All values listed below are default
    collectionApi = new CollectionAPI({
      authToken: undefined,              // Require this string to be passed in on each request
      apiPath: 'collectionapi',          // API path prefix
      standAlone: false,                 // Run as a stand-alone HTTP(S) server
      sslEnabled: false,                 // Disable/Enable SSL (stand-alone only)
      listenPort: 3005,                  // Port to listen to (stand-alone only)
      listenHost: undefined,             // Host to bind to (stand-alone only)
      privateKeyFile: 'privatekey.pem',  // SSL private key file (only used if SSL is enabled)
      certificateFile: 'certificate.pem' // SSL certificate key file (only used if SSL is enabled)
    });

    // Add the collection Players to the API "/players" path
    collectionApi.addCollection(Songs, 'songs', {
      // All values listed below are default
      authToken: undefined,                   // Require this string to be passed in on each request
      methods: ['POST','GET','PUT','DELETE'],  // Allow creating, reading, updating, and deleting
      before: {  // This methods, if defined, will be called before the POST/GET/PUT/DELETE actions are performed on the collection. If the function returns false the action will be canceled, if you return true the action will take place.
        POST: function(obj) {
          console.log(obj);
          if(Songs.find({artist: obj.artist}).count() !== 0) {
            var lastSong = Songs.findOne({artist: obj.artist, startedAt: {$lte: OutsideLive.currentTime()}}, {sort: {startedAt: -1}});
            console.log("BLURB", lastSong._id);
            Songs.update({_id: lastSong._id},{$set: {endAt: OutsideLive.currentTime() - 1}});
          }
          Songs.insert({
            name: obj.name,
            artist: obj.artist,
            stage: Stages.findOne({name: OutsideLive.iOSStageToWeb(obj.stage)}),
            perfomance: Performances.findOne({artist: obj.artist}),
            genre: obj.genre,
            mood: obj.mood,
            lastSong: obj.lastSong,
            startedAt: OutsideLive.currentTime(),
            endAt: -1,
            timestamp: new Date().getTime()
          });
          //var lastSong = Songs.findOne({artist: obj.artist, startAt: {$lte: OutsideLive.currentTime()}}, {sort: {startedAt: -1}});
          //console.log("BLURB", lastSong);
          
          return false;
        },
        GET: undefined,  // function(collectionID, objs) {return true/false;},
        PUT: undefined,  //function(collectionID, obj, newValues) {return true/false;},
        DELETE: undefined,  //function(collectionID, obj) {return true/false;}
      }
    });

    // Starts the API server
    collectionApi.start();
  });