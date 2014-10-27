
var PlayerScore = Backbone.Model.extend({

  url: '/game',
  
  initialize: function(params) {
    this.attributes = params.attributes;
  },
  
  refine: function(){
    this.trigger('refineMinerals', this);
  },
  
  checkRefinery: function(){
    if (this.attributes.resources.minerals >= 50) {
      for (var key in this.attributes.buildings) {
        if (this.attributes.buildings[key].name === 'refinery') {
          return true;
        }
      }      
    }
  },
  
  // helper function to check resouces when adding new buildings
  checkResource: function(building){
    var buildingCost = building.attributes.cost;
    var currentResources = this.attributes.resources;
    
    if (buildingCost <= currentResources.minerals) {
      currentResources.minerals -= buildingCost;
      return true;
    } else {
      return false;
    }
  }

});