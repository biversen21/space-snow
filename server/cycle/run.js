var Player = require('../db/models/player.js');

var processPlayer = function(player) {
  var buildings = player.buildings;
  var currentWater = 0;
  var currentMineral = 0;
  var scienceMultiplier = 1;

  for (var i = 0; i < buildings.length; i++) {
    var building = buildings[i];
    switch (building.name) {
    case 'hydro':
      currentWater += building.waterProduced;
      break;
    case 'mine':
      if (player.resources.water > building.waterConsumed && player.resources.minerals < 500) {
        player.resources.water -= building.waterConsumed;
        currentMineral += building.mineralsProduced;
      }
      break;
    case 'refinery':
      break;
    case 'science':
      scienceMultiplier++;
      break;
    default: 
      console.log('not built yet');
    }
  }
  
  player.resources.water += (currentWater * scienceMultiplier);    
  player.resources.minerals += (currentMineral * scienceMultiplier);    

  if (player.resources.water > 100) {
    player.resources.water = 100;
  }
  if (player.resources.minerals > 400) {
    player.resources.minerals = 400;
  }

  player.save();
};

var interval = 5000;
var queue = 0;
var running = false;

var cycle = function() {

  Player.find({}, function(err, players) {
    for (var i = 0; i < players.length; i++) {
      processPlayer(players[i]);
    }
  });

  if (queue > 0) {
    queue--;
    if (queue === 0) {
      running = false;
    }
  }

  if (running) {
    setTimeout(cycle, interval);
  }
};

var start = function() {
  running = true;
  cycle();
};

var runFor = function(runs) {
  running = true;
  queue = runs;
  cycle();
};

var stop =  function() {
  running = false;
};

var setInterval = function(set) {
  interval = set;
};

module.exports = {
  start: start,
  runFor: runFor,
  stop: stop,
  setInterval: setInterval
};
