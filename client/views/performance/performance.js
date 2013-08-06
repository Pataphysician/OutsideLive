/*
Template.performance.events({
  'click input' : function () {
    function getRandomInt (min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}
    var choice = getRandomInt(0, 7);

    console.log(choice);
    if(choice === 0) {
    	Songs.insert({
            name: "Step",
            artist: "Vampire Weekend",
            stage: Stages.findOne({name: "Sutro"}),
            perfomance: Performances.findOne({artist: "Vampire Weekend"}),
            lastSong: "Horchata",
            startedAt: OutsideLive.currentTime(),
            endAt: -1,
            timestamp: new Date().getTime()
          });
    } else if(choice === 1) {
    	Songs.insert({
            name: "Horchata",
            artist: "Vampire Weekend",
            stage: Stages.findOne({name: "Sutro"}),
            perfomance: Performances.findOne({artist: "Vampire Weekend"}),
            lastSong: "Step",
            startedAt: OutsideLive.currentTime(),
            endAt: -1,
            timestamp: new Date().getTime()
          });
    } else if(choice === 2) {
    	Songs.insert({
            name: "Get Lucky",
            artist: "Daft-Punk",
            stage: Stages.findOne({name: "Lands End"}),
            perfomance: Performances.findOne({artist: "Daft-Punk"}),
            
            lastSong: "Get Lucky",
            startedAt: OutsideLive.currentTime(),
            endAt: -1,
            timestamp: new Date().getTime()
          });
    } else if(choice === 3) {
    	Songs.insert({
            name: "The Real Thing",
            artist: "Pheonix",
            stage: Stages.findOne({name: "The Dome"}),
            perfomance: Performances.findOne({artist: "Pheonix"}),
            
            lastSong: "Entertainment",
            startedAt: OutsideLive.currentTime(),
            endAt: -1,
            timestamp: new Date().getTime()
          });
    } else if(choice === 4) {
    	Songs.insert({
            name: "Entertainment",
            artist: "Pheonix",
            stage: Stages.findOne({name: "The Dome"}),
            perfomance: Performances.findOne({artist: "Pheonix"}),
            
            lastSong: "The Real Thing",
            startedAt: OutsideLive.currentTime(),
            endAt: -1,
            timestamp: new Date().getTime()
          });
    } else if(choice === 5) {
    	Songs.insert({
            name: "Clarity",
            artist: "Zedd",
            stage: Stages.findOne({name: "Panhandle"}),
            perfomance: Performances.findOne({artist: "Zedd"}),
            
            lastSong: "The Real Thing",
            startedAt: OutsideLive.currentTime(),
            endAt: -1,
            timestamp: new Date().getTime()
          });
    } else if(choice === 6) {
    	Songs.insert({
            name: "Live And Let Die",
            artist: "Paul MccArtney",
            stage: Stages.findOne({name: "The Barbary"}),
            perfomance: Performances.findOne({artist: "Paul MccArtney"}),
            
            lastSong: "The Real Thing",
            startedAt: OutsideLive.currentTime(),
            endAt: -1,
            timestamp: new Date().getTime()
          });
    } else if(choice === 7) {
    	Songs.insert({
            name: "No Song Playing!",
            artist: "Tokyo Police Crew",
            stage: Stages.findOne({name: "Twin Peaks"}),
            perfomance: Performances.findOne({artist: "Tokyo Police Crew"}),
            
            lastSong: "The Real Thing",
            startedAt: OutsideLive.currentTime(),
            endAt: -1,
            timestamp: new Date().getTime()
          });

    	//Meteor.render();
    }
    $(".stuff").html(Meteor.render(Template.stages));

  }
});
*/

