var express = require('express');
var router = express.Router();

var passport = require('passport');

var winston = require('winston');

// add for winston
const logger = winston.createLogger( {
   level: 'debug',
   format: winston.format.json(),
   transports: [new winston.transports.Console()]
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { user: req.user });
});

router.get('/login', function(req, res) {
  res.render('login', {user : req.user });
});

router.post('/login', passport.authenticate('local',
  {successRedirect: '/',
  failureRedirect: '/login',
  session: true},
  function(req, res) {
    logger.debug('post /login');
  }
));
// its not worked
//router.post('/login', passport.authenticate('local'),function(req, res) {
//  wlogger.debug('Debug message before');
//  res.redirect('/');
//  wlogger.debug('Debug message after');
//});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
