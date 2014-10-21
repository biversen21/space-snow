var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/game', function(req, res) {
  res.json({
    id: 0,
    name: 'Space Sheep',
    resources: {
      moonitonium: 2000,
      moonitoniumPerTurn: 5,
      maxMoonitonium: 1000,
      energyCap: 80
    }
  })
});

router.put('/game', function(req, res) {
  console.log('put success');
  res.send({'status': 'success'});
});

router.get('/player', function(req, res) {
  res.send([
    {
      name: 'hydro',
      imgUrl: 'hydro.png',
      position: 0,
      size: 1,
      cost: 300,
      underConstruction: false
    }
  ]);
});


router.post('/player', function(req, res) {
  console.log('post success');
  res.send({'status': 'success'});
});

router.get('/library', function(req, res) {
  res.send([
    {
      // id: 0,
      name: 'hydro',
      imgUrl: 'hydro.png',
      position: 0,
      size: 1,
      cost: 300,
      underConstruction: false
    },
    {
      // id: 1,
      name: 'mine',
      imgUrl: 'mine.png',
      position: 2,
      size: 2,
      cost: 300,
      underConstruction: false
    },
    {
      // id: 2,
      name: 'refinery',
      imgUrl: 'refinery.png',
      position: 4,
      size: 3,
      cost: 500,
      underConstruction: false
    },
    {
      // id: 3,
      name: 'science',
      imgUrl: 'science.png',
      position: 7,
      size: 3,
      cost: 600,
      underConstruction: true
    }
  ]);
});

module.exports = router;
