var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  request = require('request'),
  multer = require('multer'),
  bodyParser = require('body-parser'),
  games = mongoose.model('Game'),
  players = mongoose.model('Player');


module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  games.find().limit(5).sort({date: -1}).exec(function (err, games) {
    if (err) return next(err);
    players.find().limit(5).sort({wins: -1}).exec(function (err2, players) {
      if (err2) return next(err2);
      res.render('index', {
        title: 'lets pong',
        recentgames: games,
        recentplays: players
      });
    });
  });
});

router.get('/games', function(req, res, next) {
  players.find(function (err, players) {
    console.log(players);
    res.render('games', {
      players: players
    });
  });
});

router.get('/players', function(req, res, next) {
  res.render('players', {
    title: "new player"
  });
});

router.post('/players/new', function(req, res, next) {
  //console.log('new called');
  //console.log(req);
  //console.log(req.body);
  //console.log(req.files);
  var newPlayer = new players ({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    wins: 0,
    losses: 0,
    img: {
      path: req.files.img.path,
      contentType: req.files.img.mimetype
    }
  });
  //console.log(newPlayer);
  newPlayer.save(function (err, player) {
    if (err) return console.err(err)
      //console.log(player);
      res.sendStatus(200);
  });
});

router.post('/game/new', function(req, res, next) {
  var newGame = new games ({
    date: new Date(),
    winner: req.body.winner.firstName + " " + req.body.winner.lastName,
    loser: req.body.loser.firstName + " " + req.body.loser.lastName,
    winScore: req.body.winner.score,
    loseScore: req.body.loser.score
  });

  newGame.save(function(err, game) {
    if (err) return console.log(err);
  });

  players.findOneAndUpdate(
      {
        'firstName': req.body.winner.firstName,
        'lastName': req.body.winner.lastName
      },
      { $inc: { 'wins': 1 } },
      function(err, p) {
        if (err) return console.log(err);
      });

  players.findOneAndUpdate(
    {
      'firstName': req.body.loser.firstName,
      'lastName': req.body.loser.lastName
    },
    { $inc: { 'losses': 1 } },
    function(err, p) {
      if (err) return console.log(err);
    });

  res.sendStatus(200);

});

router.get('/stats', function(req, res, next) {
  players.find().sort({wins: -1}).exec(function(err, players) {
    res.render('stats', {
      players: players
    });
  });
});

router.get('/test', function(req, res, next) {
  res.render('test');
});
router.post('/test', function(req, res, next) {
  console.log(req.is());
  console.log(req.files);
});