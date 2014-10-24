var connection = require('../db/connection.js');
var Player = require('../db/models/player.js');

var processPlayer = function(player) {
  var buildings = player.buildings;
  console.log('Player has %s water', player.resources.water);

  for (var i = 0; i < buildings.length; i++) {
    var building = buildings[i];
    // console.log(building);
    switch (building.name) {
    case "hydro":
      player.resources.water += building.waterProduced;
      break;
    case "mine":
      if (player.resources.water > building.waterConsumed) {
        player.resources.minerals += building.mineralsProduced;
        player.resources.water -= building.waterConsumed; 
      }
      break;
    case "refinery":
      break;
    case "science":
      break;
    default: 
      console.log('not built yet');
    }
  };

  console.log('Player has %s water', player.resources.water);
  player.save();
}

var interval = 5000;
var queue = 0;
var running = false;

var cycle = function() {
  Player.find({}, function(err, players) {
    for (var i = 0; i < players.length; i++) {
      processPlayer(players[i]);
    };
  })
  if (queue > 0) {
    queue--;
    if (queue === 0) {
      running = false;
    }
  }
  if (running) {
    setTimeout(cycle, interval);
  }
}

var start = function() {
  running = true;
  cycle();
}

var runFor = function(runs) {
  running = true;
  queue = runs;
  cycle();
}

var stop =  function() {
  running = false;
}

var setInterval = function(set) {
  interval = set;
}

module.exports = {
  start: start,
  runFor: runFor,
  stop: stop,
  setInterval: setInterval
}
