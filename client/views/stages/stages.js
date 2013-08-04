Template.stages.events({
  "click a.show-stage" : function(event) {
    event.preventDefault();
    console.log($(event.target).closest("a"));
    var stage_name = $(event.target).closest("a").attr('data-id');
    var stage = Stages.find({name: stage_name}).fetch()[0];
    Session.set("currentStage", stage);
    var currentPerformance = OutsideLive.currentPerformance(stage)[0];
    Session.set('currentPerformance', currentPerformance);
  },
});

Template.stages.currentPerformances = function() {
  var stages = Stages.find().fetch();
  _.each(stages, function(stage) {
    current_performance = OutsideLive.currentPerformance(stage);
    stage.currentPerformance = current_performance[0];
    console.log(current_performance[0]);
    if(stage.currentPerformance !== undefined) {
      var time = new Date().getTime();
      stage.currentSong = Songs.findOne({artist: stage.currentPerformance.artist, timestamp: {$lte: time}}, {sort: {timestamp: -1}});
      console.log('cuuuurrent song:', stage.currentSong);
    }
  });

  return stages;
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
