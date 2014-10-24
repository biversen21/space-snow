
var PlayerScore = Backbone.Model.extend({

  url: '/game',
  
  initialize: function(params) {
    this.attributes = params;
  },
  
  refine: function(){
    this.trigger('refineMinerals', this);
  },
  
  // helper function to check resouces when adding new buildings
  checkResource: function(building){
    var buildingCost = building.attributes.cost;
    var currentResources = this.attributes;
    
    if (buildingCost <= currentResources.minerals) {
      currentResources.minerals -= buildingCost;
      return true;
    } else {
      return false;
    }
  }

});