var AppModel = Backbone.Model.extend({
  initialize: function(params) {
    this.set('playerBuildings', new PlayerBuildings());
    this.set('playerScore', new PlayerScore());
    
    var playerScore = this.get('playerScore');
    playerScore.fetch({
      success: function(player) {
        var playerScoreView = new PlayerScoreView({model: player});
        // setInterval(function(){
        //   playerScore.fetch();
        //   console.log('refetch');
        // }, 1000);
      }
    });
		
    params.buildingLibrary.on('addToBoard', function(building) {
      var currentScore = this.get('playerScore');
      var buildingCollection = this.get('playerBuildings');
      
      var affordBuilding = currentScore.checkResource(building);
      
      if ((buildingCollection.length < 6) && (affordBuilding)) {
        buildingCollection.add(building.toJSON());
      } else if (!affordBuilding){
        alert('You can\'t afford that!')
      } else {
        alert('Too many buildings asshole!');        
      }
    }, this);
  }
});