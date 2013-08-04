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
          
          return "yay!"},
        GET: undefined,  // function(collectionID, objs) {return true/false;},
        PUT: undefined,  //function(collectionID, obj, newValues) {return true/false;},
        DELETE: undefined,  //function(collectionID, obj) {return true/false;}
      }
    });

    // Starts the API server
    collectionApi.start();
  });


// //express = Meteor.require('express');
//   // Meteor.startup(function () {
//   //   if (People.find().fetch().length == 0) {
//   //     People.insert({fbId: "idhere", name: 'Julia Grace', votes: 0, blurb: "Let the guitar sing!", picture: "http://graph.facebook.com/2726698/picture?width=1000&height=1000", votesFrom: []});
//   //     People.insert({fbId: "idhere", name: 'Rahul Vohra', votes: 0, blurb: "Am I famous yet?", picture: "http://graph.facebook.com/36912515/picture?width=1000&height=1000", votesFrom: []});
//   //     People.insert({fbId: "idhere", name: 'Shadi Barhoumi', votes: 0, blurb: "I'm a big boat?", picture: "http://graph.facebook.com/720358372/picture?width=1000&height=1000", votesFrom: []});
//   //     People.insert({fbId: "idhere", name: 'Chen Liang', votes: 0, blurb: "Join the ambiguous shade side.", picture: "https://lh3.googleusercontent.com/-pFiEmZTn7V0/AAAAAAAAAAI/AAAAAAAAAAA/_l2TEFyYhsY/s48-c-k/photo.jpg", votesFrom: []});
//   //     People.insert({fbId: "idhere", name: 'Ash Bhat', votes: 0, blurb: "@ashbhat", picture: "http://graph.facebook.com/1508072003/picture?width=1000&height=1000", votesFrom: []});
//   //   }
//   //   });

// Meteor.RESTstop.configure({use_auth: false});

// // Meteor.RESTstop.add('people', function() {
// //     // if(!this.params.num) {
// //     //   return [403, {success: false, message: 'You need a num as a parameter!'}];
// //     // }
// //     return [People.find({}).fetch()];
// //   });
//   // Meteor.RESTstop.add('upvote/:idSet', function() {
//   //   console.log(this.params.idSet);
//   //   var posts = this.params.idSet.split(/,/);
//   //   Upvotes.insert({
//   //     fbId: posts[0],
//   //     clickedId: posts[1]
//   //   });
//   //   //var posts = [];
//   //   if (!People.findOne({votesFrom: posts[0], _id: posts[1]})) {
//   //     People.update(posts[1], {$inc: {votes: 1}, $addToSet: {votesFrom: posts[0]}});
//   //   }
//   //   return true;
//   // });
//   Meteor.RESTstop.add('test', function(){
//     console.log("testing!");
//     return "testing!";
//   });

//   Meteor.RESTstop.add('/add/:song', function() {
//     console.log("shit: ", this.params.song);

//     //var posts = this.params.create.split(/,/);
//       // Upvotes.insert({
//       //   data: posts
//       // });
//       Songs.insert({
//         name: "api",
//         stuff: this.params
//       });
//     // } else {
//     //   console.log('error in post create');
//     //   console.log(posts);
//     // }

//     return "yay the test worked";
//   });
