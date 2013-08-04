Template.admin.events({
  "click input[type='submit']": function (event) {
    event.preventDefault();
    var day = $("input[name='day']").val();
    var artist = $("input[name='artist']").val();
    var start_time_str = $("input[name='start_time']").val();
    var end_time_str = $("input[name='end_time']").val();
    var stage_name = $('select').val();
    var stage = Stages.find({name: stage_name}).fetch()[0];

    var start_time = Template.admin.parseTime(start_time_str);
    var end_time = Template.admin.parseTime(end_time_str);

    Performances.insert({
      day: day,
      artist: artist,
      stage: stage,
      startTime: start_time,
      endTime: end_time,
    })

    Session.set("adminPanel", false);
  },

  "click a.back-to-performances": function(event) {
    event.preventDefault();
    Session.set("adminPanel", false);
  },
});

Template.admin.parseTime = function(time) {
  var hours = time.substr(0, 2);
  var minutes = time.substr(3, 2);

  return parseInt(hours + minutes);
};