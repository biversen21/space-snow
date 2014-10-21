var PlayerScore = Backbone.Model.extend({

  url: '/game',
  
  initialize: function() {
    // get request to server for player statistics on initialize
    this.fetch({
      success: function(player) {
        var playerScoreView = new PlayerScoreView({model: player});
        console.log('player score fetched');
        
        ////////// Uncomment to start re-fetching score ///////////
        
        // setInterval(function(){
        //   playerScore.fetch();
        //   console.log('refetch');
        // }, 1000);
      }
    });
  },
  
  
  // helper function to check resouces when adding new buildings
  checkResource: function(building){
    var buildingCost = building.attributes.cost;
    var currentResources = this.attributes.resources;
    
    if (buildingCost <= currentResources.moonitonium) {
      currentResources.moonitonium -= buildingCost;
      var that = this;
      
      that.save(null, {
        success: function() {
          console.log('resource success');
          var playerScoreView = new PlayerScoreView({model: that});
        }
      });
      
      return true;
    } else {
      return false;
    }
  }

});