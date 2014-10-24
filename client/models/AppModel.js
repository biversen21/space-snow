var AppModel = Backbone.Model.extend({
  
  initialize: function(params, cb) {
    
    var that = this;
    var buildingCollection;
    that.playerScore = {};
    
    // sets playerModel and gets player data from server
    var playerModel = new PlayerModel();
    playerModel.fetch({
    
      // on success initializes new instances of playerBuildings and playerScore using playerModel attributes
      success: function() {
        var playerBoard = playerModel.attributes.buildings;
        var playerResources = playerModel.attributes.resources;
        that.set('playerBuildings', new PlayerBuildings(playerBoard));
        that.playerScore = new PlayerScore(playerResources);
        that.playerScoreView = new PlayerScoreView({model: that.playerScore});
        setupScore();
        // callback triggers, creating appView which is dependent upon above attributes
        cb();
        buildingCollection = that.get('playerBuildings');
      }
    });
    
    var setupScore = function() {
      that.playerScore.on('refineMinerals', function(){
        var currentResources = playerModel.attributes.resources;
        if (currentResources.minerals > 50) {
          currentResources.minerals -= 50;
          currentResources.moonitonium += 1;
        }
        playerModel.save(null, {
          success: function(){
            that.playerScoreView.render();
          }
        });
      });
    };
    
    var updatePlayerData = function(){
      playerModel.fetch({
      
        // on success initializes new instances of playerBuildings and playerScore using playerModel attributes
        success: function() {
          var playerResources = playerModel.attributes.resources;
          that.playerScore.set({minerals: playerResources.minerals});
          that.playerScore.set({water: playerResources.water});
          that.playerScore.set({moonitonium: playerResources.moonitonium});
          that.playerScoreView.render();
          buildingCollection = that.get('playerBuildings');
        }
      });
    }; 
    
    setInterval(function() { updatePlayerData(); }, 3000);
    
    // logic to handle whether building can be added to board based on size and resource cost
    params.buildingLibrary.on('addToBoard', function(building) {
      var affordBuilding = that.playerScore.checkResource(building);
      
      if ((buildingCollection.length < 10) && (affordBuilding)) {
        buildingCollection.add(building.toJSON());
        playerModel.attributes.buildings.push(building);
        that.playerScoreView.render();
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