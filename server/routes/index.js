var express = require('express');
var router = express.Router();

var playerStub = require('../db/models/playerStub.js');
var libraryStub = require('../db/models/libraryStub.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});


router.get('/game', function(req, res) {
  res.json(playerStub)
});

router.put('/game', function(req, res) {

  playerStub = req.body;
  res.send(playerStub);
});

router.get('/library', function(req, res) {
  res.send(libraryStub);
});

module.exports = router;
