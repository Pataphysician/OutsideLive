Template.searchResults.events({
  "click a.close-search": function(e) {
    e.preventDefault();
    Session.set("searchResults", null);
  },
});

Template.searchResults.results = function() {
  return Session.get("searchResults");
};

Template.searchResults.nowPlaying = function(performance) {
  var currentTime = OutsideLive.currentTime();
  var start = performance.startTime;
  var end = performance.endTime;
  var nowPlaying = (currentTime > start) && (currentTime < end);
  if (nowPlaying) {
    return true;
  } else {
    return false;
  }
};