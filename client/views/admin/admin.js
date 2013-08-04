
Template.admin.events({
  "click input": function (event) {
    event.preventDefault();
    var artist = $("input[name='artist']").val();
    var set_length = $("input[name='set_length']").val();
    var stage = $('select').val();
    Performances.insert({
      artist: artist,
      setLength: set_length,
      stage: stage
    })
  },
});

