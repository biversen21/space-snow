var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

/* GET login page. */
router.get('/login', function(req, res) {
  res.render('auth', { title: 'Login', option: 'sign up' });
});

/* GET signup page. */
router.get('/signup', function(req, res) {
  res.render('auth', { title: 'Sign up', option: 'login' });
});

module.exports = router;
