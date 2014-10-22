var mongoose = require('mongoose');
var mongoUri = require('./config.js').uri;

var library = require('./models/library.js');
var Building = require('./models/building.js');

var playerStub = require('./models/playerStub.js');
var Player = require('./models/player.js');

module.exports = function() {

  mongoose.connect(mongoUri);
  var connection = mongoose.connection;

  connection.on('error', console.error.bind(console, 'Mongo connection error:'));

  connection.once('open', function callback () {

    // Populate building database if it is empty
    Building.find({}, function(err, buildings) {
      if (!err && buildings.length === 0) {
        for (var i = 0; i < library.length; i++) {
          new Building(library[i]).save();
        };
      }
    })

    // Stub in a player if none exists
    Player.find({}, function(err, players) {
      if (!err && players.length === 0) {
        new Player(playerStub).save();
      }
    })
    
  });

  return connection;
}

