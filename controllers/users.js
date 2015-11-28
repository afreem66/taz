var express = require('express'),
    router = express.Router(),
    session = require('express-session'),
    mongoose = require('mongoose'),
    Record = require('../models/recordModel.js'),
    User = require('../models/userModel.js');


    router.use(session({
      secret: "phantomphildius",
      resave : true,
      saveUninitialized: true
    }));

//create user

    router.post('/new', function (req, res) {
      User.findOne({ email : req.body.email},
      function (err, user) {
        if (err) {
          console.log(err);
          res.json({error: "there was a login error: " + err})
        } else if (user) {
          console.log("this user already exists: " + user);
          res.json({error: "there was an user error: " + user})
        } else {
          bcrypt.genSalt(10, function (saltErr, salt) {
            bcrypt.hash(req.body.password,
            salt, function(hashErr, hash) {
          var newUser = new User({
            email: req.body.email,
            passwordDigest : req.body.passwordDigest,
            name : req.body.name,
            age: req.body.age,
            doctor: true,
            specialty: req.body.specialty
          })
      console.log("new user" + newUser);

      newUser.save(function (saveErr, saveUser) {
        if (saveErr) {
          res.json({error: "There was an error: " + saveErr});
        } else {
          console.log("saved user" + saveUser);
          req.session.currentUser = saveUser
          console.log("current user" + req.session.currentUser);
          res.json({user: saveUser})
        }
      })
    });

// login

router.get('/login', function(req, res) {
  User.findOne({email : req.body.email}, function(loginErr, user) {
    if (err) {
          console.log(loginErr);
      } else if (user) {
        bcrypt.compare(req.body.password, user.passwordDigest, function (compareErr, match) {
          if (match) {
            req.session.currentUser = user;
            res.json({user: user})
          } else {
            console.log("Username and password combo is not a match");
            res.json({error: "there was a login error: " + loginErr});
          }
        });
      } else {
        console.log("something bad happened");
        res.redirect(302, '/');
      }
  });
});

    router.get('/all', function (req, res) {
      User.find({}, function (err, users) {
        console.log(users);
        res.json(users)
      });
    });

module.exports = router;
