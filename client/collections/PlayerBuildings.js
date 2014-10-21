var PlayerBuildings = Buildings.extend({
	
  url: '/player',
  
  initialize: function() {

    // on initialize, hits server for current player building collection
    this.fetch({
      success: function() {
        console.log('player buildings fetched');
      }
    });
  }
	
});