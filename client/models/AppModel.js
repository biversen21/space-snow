var AppModel = Backbone.Model.extend({
  initialize: function(params) {
    this.set('playerBuildings', new PlayerBuildings());
    // this.set('playerScore', new PlayerScore());
		
    params.buildingLibrary.on('addToBoard', function(building) {
      var buildingCollection = this.get('playerBuildings');
      if(buildingCollection.length < 6) {
        buildingCollection.add(building.toJSON());
      } else {
        alert('Too many buildings asshole!');
      }
    }, this);
  }
});