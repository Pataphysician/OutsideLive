Template.admin.events({
  "click input[type='submit']": function (event) {
    event.preventDefault();
    var artist = $("input[name='artist']").val();
    var start_time_str = $("input[name='start_time']").val();
    var end_time_str = $("input[name='end_time']").val();
    var stage = $('select').val();

    var start_time = Template.admin.parseTime(start_time_str);
    var end_time = Template.admin.parseTime(end_time_str);

    Performances.insert({
      artist: artist,
      stage: stage,
      startTime: start_time,
      endTime: end_time,
    })
  },
});

Template.admin.parseTime = function(time) {
  var hours = time.substr(0, 2);
  var minutes = time.substr(3, 2);

  return parseInt(hours + minutes);
};