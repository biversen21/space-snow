var AppModel = Backbone.Model.extend({

  initialize: function(params, cb) {

    var that = this;
    var buildingCollection;

    // sets playerModel and gets player data from server
    var playerModel = new PlayerModel();
    playerModel.fetch({

      // on success initializes new instances of playerBuildings and playerScore using playerModel attributes
      success: function() {
        var playerBoard = playerModel.attributes.buildings;
        var playerResources = playerModel.attributes.resources;

        that.set('playerBuildings', new PlayerBuildings(playerBoard));
        that.playerScore = new PlayerScore(playerModel);
        that.playerScoreView = new PlayerScoreView({model: that.playerScore});

        // call binding method
        setupScore();
        
        // callback triggers, creating appView which is dependent upon above attributes
        cb();
        buildingCollection = that.get('playerBuildings');
      }
    });

    // function to bind refineMinerals to playerscore model. processes refining mechanics.
    var setupScore = function() {
      that.playerScore.on('refineMinerals', function(){
        var currentResources = playerModel.attributes.resources;
        if (currentResources.minerals >= 50) {
          currentResources.minerals -= 50;
          currentResources.moonitonium += 1;
          playerModel.save();          
        }
      });
    };

    var updatePlayerData = function(){

      // synch with server and pull updated resources
      playerModel.fetch({
        success: function() {
          var playerResources = playerModel.attributes.resources;

          // set playerscore attributes based on server response
          that.playerScore.set({minerals: playerResources.minerals, water: playerResources.water, moonitonium: playerResources.moonitonium});
          that.playerScoreView.render();
          buildingCollection = that.get('playerBuildings');
        }
      });
    };

    // sets interval to synch with server once per second
    setInterval(function() { updatePlayerData(); }, 500);

    // logic to handle whether building can be added to board based on size and resource cost
    params.buildingLibrary.on('addToBoard', function(building) {
      
      // runs playerscore method to check resource availability
      var affordBuilding = that.playerScore.checkResource(building);
      if ((buildingCollection.checkSize() < 20) && (affordBuilding)) {

        // adds building to building collection as JSON to allow multiple copies of single model
        buildingCollection.add(building.toJSON());

        // adds buidling to playermodel
        playerModel.attributes.buildings.push(building);
        playerModel.save();
      } else if (!affordBuilding){
        alert('You can\'t afford that!');
      } else {
        alert('Too many buildings asshole!');
      }
    }, this);
  }
});