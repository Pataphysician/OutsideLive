Template.searchResults.events({

});

Template.searchResults.results = function() {
  return Session.get("searchResults");
};