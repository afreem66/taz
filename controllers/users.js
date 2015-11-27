var express = require('express'),
    router = express.Router(),
    session = require('express-session'),
    mongoose = require('mongoose'),
    Record = require('../models/recordModel.js'),
    User = require('../models/userModel.js');


    router.use(session({
      secret: "FUNKE",
      resave : true,
      saveUninitialized: true
    }));
    
    router.post('/new', function (req, res) {
      var newUser = new User({
        email: req.body.email,
        passwordDigest : req.body.passwordDigest,
        name : req.body.name,
        age: req.body.age,
        doctor: true,
        specialty: req.body.specialty
      })
      console.log(newUser);

      newUser.save(function (err) {
        if (err) {
          res.json({error: "There was an error: " + err});
        } else {
          res.json({user: req.body.name})
        }
      })
    });

    router.get('/all', function (req, res) {
      User.find({}, function (err, users) {
        console.log(users);
        res.json(users)
      });
    });

module.exports = router;
