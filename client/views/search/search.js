Template.search.events({
  "keypress": function(e) {
    var query = $("input[name='search']").val();
    if (query && e.which == 13) {
      $("input[name='search']").val("");
      Template.search.queryDB(query);
    }
  },
})

Template.search.queryDB = function(query) {
  var performances = Performances.find({
    artist: {
      $regex: query,
      $options: 'i'
    },
  },{
    sort: {
      day: 1, 
      startTime: 1
    },
  }).fetch();

  Session.set("searchResults", performances);
  return performances;
};