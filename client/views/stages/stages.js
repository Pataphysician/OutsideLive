Template.stages.events({
  "click a.show-stage" : function(event) {
    event.preventDefault();
    var stageID = $(event.target).closest("a").attr('data-id');
    var stage = Stages.findOne({_id: stageID});
    var currentPerformance = Performances.findOne({
      stageID: stageID, 
      startTime: {$lte: OutsideLive.currentTime()},
      endTime: {$gte: OutsideLive.currentTime()}
    });
    Session.set("currentStage", stage);
    Session.set('currentPerformance', currentPerformance);
  }
});

Template.stages.stages = function() {
  stages = Template.stages.allStages();
  _.each(stages, function(stage) {
    currentPerformance = Performances.findOne({
      stageID: stage._id, 
      startTime: {$lte: OutsideLive.currentTime()},
      endTime: {$gte: OutsideLive.currentTime()}
    });
    stage.currentPerformance = currentPerformance;
    if(currentPerformance) {
      stage.currentSong = _.last(currentPerformance.setList);
      stage.percentageComplete = OutsideLive.percentageComplete(currentPerformance);
      stage.minutesLeft = OutsideLive.setMinutesRemaining(currentPerformance);
    }
  });

  return stages;
};


Template.stages.allStages = function() {
  return Stages.find().fetch();
};

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
