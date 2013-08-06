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

          try {
            var song_attrs = {
              name: obj.name,
              artist: obj.artist,
              stageId: Stages.findOne({name: OutsideLive.iOSStageToWeb(obj.stage)})._id,
              perfomanceId: Performances.findOne({artist: obj.artist})._id,
              genre: obj.genre,
              mood: obj.mood,
              lastSong: obj.lastSong,
              startedAt: OutsideLive.currentTime(),
              endAt: -1,
              timestamp: new Date().getTime()
            };


            Songs.insert(song_attrs);

            var newSong = Songs.findOne({
              name: obj.name,
              artist: obj.artist
            });

            Performances.update({artist: obj.artist}, {$push: {setList: newSong._id}});
            
            if(Songs.find({artist: obj.artist}).count() !== 0) {
              OutsideLive.setEndTime(newSong)
              //newSong.endAt = OutsideLive.setEndTime(newSong);
            } 
          } catch(err) {
            console.log("error: ",err);
            console.log("no performance, song not added. Trying to match to: ", obj.artist);
          }
          
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