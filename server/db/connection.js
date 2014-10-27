var mongoose = require('mongoose');
var mongoUri = require('./config.js').uri;

var library = require('./models/library.js');
var Building = require('./models/building.js');

var playerStub = require('./models/playerStub.js');
var Player = require('./models/player.js');

mongoose.connect(mongoUri);
var connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'Mongo connection error:'));

connection.once('open', function callback () {

  // Populate building database if it is empty
  Building.find({}, function(err, buildings) {
    if (!err && buildings.length === 0) {
      for (var i = 0; i < library.length; i++) {
        new Building(library[i]).save();
      }
    }
  });

  // Stub in a player if none exists
  Player.find({}, function(err, players) {
    console.log('players.length is %s, players.length === 0 is: %s', players.length, (players.length === 0));
    if (!err && players.length === 0) {
      console.log('Therefore I am inserting a new record');
      new Player(playerStub).save();
    }
  });
  
});

module.exports = connection;

