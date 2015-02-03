var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  games = mongoose.model('Game');
  players = mongoose.model('Player');

module.exports = function (app) {
  app.use('/', router);
};

router.get('games', function (req, res, next) {
  res.render('game', {
  });
});
