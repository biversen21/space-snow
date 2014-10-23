var express = require('express');
var router = express.Router();
var Building = require('../db/models/building.js');
var Player = require('../db/models/player.js');

var id;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});


router.get('/game', function(req, res) {
  Player.findOne({ name: 'Space Sheep' }, function(err, player) {
    res.json(player);
  });
});

router.put('/game', function(req, res) {
  // console.log(req.body);
  Player.update({ name: 'Space Sheep' }, req.body);
  res.send({'putSuccess': 'success'});
});

router.post('/game', function(req, res) {
  // console.log(req.body);
  Player.update({ name: 'Space Sheep' }, req.body);
  res.send({'postSuccess': 'success'});
});

router.get('/library', function(req, res) {
  Building.find({}, function(err, buildings) {
    res.send(buildings);
  });
});

module.exports = router;
