var PlayerScore = Backbone.Model.extend({

  url: '/game',
  
  initialize: function(params) {
    this.attributes = params;
    var playerScoreView = new PlayerScoreView({model: this});
  },
  
  
  // helper function to check resouces when adding new buildings
  checkResource: function(building){
    var buildingCost = building.attributes.cost;
    var currentResources = this.attributes;
    
    if (buildingCost <= currentResources.minerals) {
      currentResources.minerals -= buildingCost;
      var that = this;
      var playerScoreView = new PlayerScoreView({model: that});     
      return true;
    } else {
      return false;
    }
  }

});