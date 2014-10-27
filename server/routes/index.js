var express = require('express');
var router = express.Router();
var Building = require('../db/models/building.js');
var Player = require('../db/models/player.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Moon Base' });
});

router.get('/game', function(req, res) {
  Player.findOne({ name: 'Space Sheep' }, function(err, player) {
    res.json(player);
  });
});

router.put('/game', function(req, res) {
  console.log(req.body);
  Player.findOne({ name: 'Space Sheep' }, function(err, player) {
    player.update(req.body, { overwrite: true }, function(err) {
      if (!err) {
        res.send({'putSuccess': 'success'});
      }
    });
  });
});

router.get('/library', function(req, res) {
  Building.find({}, function(err, buildings) {
    res.send(buildings);
  });
});

module.exports = router;
