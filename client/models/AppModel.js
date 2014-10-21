var AppModel = Backbone.Model.extend({
  initialize: function(params) {
    
    // initialize playerBuilding and playerScore as new instances    
    this.set('playerBuildings', new PlayerBuildings());
    this.set('playerScore', new PlayerScore());
    
    var playerScore = this.get('playerScore');
    var buildingCollection = this.get('playerBuildings');
		
    // logic to handle whether building can be added to board based on size and resource cost
    params.buildingLibrary.on('addToBoard', function(building) {
      var affordBuilding = playerScore.checkResource(building);
      
      if ((buildingCollection.length < 6) && (affordBuilding)) {
        buildingCollection.add(building.toJSON());
        building.save({
          success: function() {
            console.log('building save success');
          }
        });
      } else if (!affordBuilding){
        alert('You can\'t afford that!');
      } else {
        alert('Too many buildings asshole!');        
      }
    }, this);
  }
});