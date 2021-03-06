'use strict';

var express = require('express');
var router = express.Router();
var request = require('request');

// Data Models
var User = require('../models/User');
var Beer = require('../models/Beer');


// Get Users
router.get('/', function(req, res) {
  User.find({}, function(err, users) {
    res.status(err ? 400 : 200).send(err || users);
  });
});

// Logout
router.delete('/logout', function(req, res) {
  res.clearCookie('lilcookie').send();
});


// Auth Info
router.get('/profile', User.authMiddleware, function(req, res) {
  res.send(req.user);
});

// Login
router.post('/authenticate', function(req, res) {
  User.authenticate(req.body, function(err, user) {
    if(err) {
      res.status(400).send(err);
    } else {
      var token = user.generateToken();
      res.cookie('lilcookie', token).send(user);
    }
  });
});


// Register User
router.post('/register', function(req, res) {
  User.register(req.body, function(err, user) {
    if(err) {
      res.status(400).send(err);
    } else {
      var token = user.generateToken();
      res.cookie('lilcookie', token).send(user);
    }
  });
});

//GET RAND BEER
router.get('/beer', function(req, res) {
  request('http://api.brewerydb.com/v2/beer/random?key=1d64c804ec7f8e81e1e36b762ea7b843', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log('res', body); 
    res.send(body);
    }
    else {
      console.log(error);
    }
  })
});

router.get('/beers', User.authMiddleware, function(req, res) {
  res.send(req.user);
});


//get sampled beers
router.get('/sample', User.authMiddleware, function(req, res) {
  Beer.find({sampled: true}, function(err, beers) {
    if(err) {
      return res.status(400).send(err);
    }
    res.send(beers);
  })
})

//get user
router.get('/:id', function(req, res) {
  var id = req.params.id;
  console.log(id);
  User.findOne({_id: User.id}, function(err, user) {
    if(err) {
    return res.status(400).send(err);
    } 
    res.send(user);
  })
});


// POST Beer
router.post('/beer', User.authMiddleware, function(req, res) {
  Beer.create(req.body, function(err, beer) {
      var user = req.user;
      if(err) {
        res.status(400).send(err);
      } else {
       user.beers.push(beer._id);
       user.save(function(err, savedUser) {
       res.status(err ? 400 : 200).send(err || savedUser);
       });
      }
  });
});


// UPDATE profile
router.put('/user/:id', User.authMiddleware, function(req, res) {
  User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, function(err, user) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.send(user);
    };
  });
});


//GET RANDOM BEER

module.exports = router;
