var PlayerScore = Backbone.Model.extend({

  url: '/game',
  
  checkResource: function(building){
    var buildingCost = building.attributes.cost;
    var currentResources = this.attributes.resources;
    
    return buildingCost <= currentResources.moonitonium ? true : false;
  }

});