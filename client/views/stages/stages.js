Template.stages.events({
  "click a.show-stage" : function(event) {
  
  	var artist = $('#stages').find('.artist');
  	var notThis = artist.not($(event.target).closest('a')).parent();
	artist.parent().addClass('transition');
	notThis.addClass('out');

    event.preventDefault();
    
    //var color = $(event.target).closest('.stage').css('backgroundColor');
	//$('body').css('background', color);
    
	var stageID = $(event.target).closest("a").attr('data-id');
	var stage = Stages.findOne({_id: stageID});
	var currentPerformance = Template.stages.stageCurrentPerformance(stage);

  var curSongID = _.last(currentPerformance.setList);
  var curSong = Songs.findOne({_id: curSongID});
	
	setTimeout(function() {
		artist.parent().addClass('fade');
    }, 200);
        
    setTimeout(function() {
		
		Meteor.call("getArtistBio", currentPerformance);
		Meteor.call("getArtistImage", currentPerformance);
		Session.set("currentStage", stage);
		Session.set('currentPerformance', currentPerformance);
    Session.set('currentSong', curSong);
    Session.set('playedSongIDs', currentPerformance.setList.slice(0, -1).reverse())
		//get current perf it will have an array percentMarkers, a percent is pushed everytime a new song is pushed
		//interate through the percent markers. single stage view work can directly access. multi stage view needs multi dem array
    
    }, 200);
  }
});

Template.stages.helpers({
  percentUpToCurrentSong: function(stage) {
    return _.last(stage.percentMarkers);
  },

  inHumanTime: function(time) {
    return OutsideLive.inHumanTime(time);
  },
});

Template.stages.stages = function() {
  //  console.log('stages session: ', Session.get('stages'));
  // return Session.get('stages');
  return Stages.find().fetch();
};

//currentPerformance
//currentSong

//update fires when a performance expires, or is made current and in time

//every time a song is added we run isCurrent to ensure performance

// Template.stages.updateStages = function() {
//   var stages = Template.stages.allStages();
  
//   stages.forEach(function(stage) {
//     var stageID = stage._id
//     current_performance = Template.stages.stageCurrentPerformance(stage);
//     if(current_performance) {
      
//     //grabs the current song, which is at the performances end of set list
//       var current_song_id = _.last(current_performance.setList);
//       var current_song = Songs.findOne({_id: current_song_id});
//     //grabs the percentage complete 
//       var percentage_complete = OutsideLive.percentageComplete(current_performance);
//       var minutes_left = OutsideLive.setMinutesRemaining(current_performance);
//       Stages.update({_id: stageID},
//         {$set: {
//           currentPerformance: current_performance,
//           currentSong: current_song,
//           percentageComplete: percentage_complete,
//           minutesLeft: minutes_left
//         }
//       })
//     }
//   });

//   Session.set('stages', stages);
//   return Session.get('stages');
// };

Template.stages.stageCurrentPerformance = function(stage) {
  var stageID = stage._id
  var currentTime = OutsideLive.currentTime();
  var currentPerformance = Performances.findOne({
    stageID: stageID, 
    startTime: {$lte: currentTime},
    endTime: {$gte: currentTime}
  });

  return currentPerformance;
},

Template.stages.allStages = function() {
  return Stages.find().fetch();
};

// Template.stages.performance = function() {
// 	var currentPerformance = Performances.findOne({
// 	    stageID: stageID, 
// 	    startTime: {$lte: currentTime},
// 	    endTime: {$gte: currentTime}
// 	  });

// 	if(Stages.find({}))

// 	return true;
// 	return false;
// };

/*
$(function() {

	setTimeout(function() {
		$('body').removeClass('loading');
    }, 400);

	function convertHex(hex,opacity){
	    hex = hex.replace('#','');
	    r = parseInt(hex.substring(0,2), 16);
	    g = parseInt(hex.substring(2,4), 16);
	    b = parseInt(hex.substring(4,6), 16);
	
	    result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
	    return result;
	}
		
	var artist = $('#stages').find('.artist');
	
	artist.each(function(){
	
		var thisArtist = $(this);
	
		var startTime = thisArtist.data('start');
		var currentTime = thisArtist.data('current');
		var endTime = thisArtist.data('end');
		
		var bar = thisArtist.find('.bar');
		var percent = ((currentTime - startTime) / (endTime - startTime)) * 100;
		
		bar.css('width', percent + '%');
		bar.children().html( (endTime - currentTime) + ' MIN LEFT');
	});
	
	artist.click(function(){
		var notThis = artist.not(this).parent();
		notThis.addClass('out');
		$(this).parent().addClass('noBackground');
		
		var color = $(this).data('color');

		$('body').css('background', convertHex(color,20));
		
		
		setTimeout(function() {
			notThis.addClass('up');
        }, 200);
        
		return false;
	});
	
	$('.song-list li').last().click(function(){
		$('.song-list').toggleClass('open');
		$('.song-list li').not(this).slideToggle(200);
	});
});
*/

Template.stages.rendered = function () { 
	
	var stages = $('#stages').find('.stage');
	var windowHeightTop = ($(window).height() -44);
	var sixth = (windowHeightTop / 6) + 'px';	
	stages.css({'height':sixth,'line-height':sixth});
		              
}
