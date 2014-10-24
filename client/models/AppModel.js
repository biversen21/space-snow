var AppModel = Backbone.Model.extend({
  
  initialize: function(params, cb) {
    
    var that = this;
    var playerScore;
    var buildingCollection;
    
    // sets playerModel and gets player data from server
    var playerModel = new PlayerModel();
    var getPlayerData = function(){
      playerModel.fetch({
      
        // on success initializes new instances of playerBuildings and playerScore using playerModel attributes
        success: function() {
          var playerBoard = playerModel.attributes.buildings;
          var playerResources = playerModel.attributes.resources;
          that.set('playerBuildings', new PlayerBuildings(playerBoard));
          that.set('playerScore', new PlayerScore(playerResources));    
          
          // callback triggers, creating appView which is dependent upon above attributes
          cb();
          playerScore = that.get('playerScore');
          buildingCollection = that.get('playerBuildings');
        }
      });
    }; 
    
    setInterval(function() {getPlayerData(); }, 3000);
    
    // logic to handle whether building can be added to board based on size and resource cost
    params.buildingLibrary.on('addToBoard', function(building) {
      var affordBuilding = playerScore.checkResource(building);
      
      if ((buildingCollection.length < 6) && (affordBuilding)) {
        buildingCollection.add(building.toJSON());
        playerModel.attributes.buildings.push(building);
        // playerModel.attributes.resources.minerals -= building.attributes.cost;
        playerModel.save(null, {
          success: function() {
            console.log('player save success');
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