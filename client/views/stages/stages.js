Template.stages.events({
  "click a.show-stage" : function(event) {
    event.preventDefault();
    var stageID = $(event.target).closest("a").attr('data-id');
    var stage = Stages.findOne({_id: stageID});
    var currentPerformance = Template.stages.stageCurrentPerformance(stage);
    Meteor.call("getArtistBio", currentPerformance);
    Meteor.call("getArtistImage", currentPerformance);
    Session.set("currentStage", stage);
    Session.set('currentPerformance', currentPerformance);
  }
});

Template.stages.stages = function() {
  stages = Template.stages.allStages();
  stages.forEach(function(stage) {
      currentPerformance = Template.stages.stageCurrentPerformance(stage);
      stage.currentPerformance = currentPerformance;
      if(currentPerformance) {
        stage.currentSong = _.last(currentPerformance.setList);
        stage.percentageComplete = OutsideLive.percentageComplete(currentPerformance);
        stage.minutesLeft = OutsideLive.setMinutesRemaining(currentPerformance);
      }
    });
  //when this function runs, the session is reset with the new information
  Session.set('stages', stages);
  //the template will by default "listen" to changes in the session, so the view will
  //re-render when anything in the session changes
  //in this case, the "minutes left" changes everytime we call this function, which
  //is updated accordingly in the view
  return Session.get('stages');
};

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

Meteor.startup(function () {

	var stages = $('#stages').find('.stage');
	var n = 1;
	
	$(document).bind('openingEffect', addEffectStepping);

	var sixth = ($(window).height() - 44) / 6 + 'px';
	stages.css({'height':sixth,'line-height':sixth})

	setTimeout(function() {
		$('body').removeClass('loading');
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

});

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
