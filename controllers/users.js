var express = require('express'),
    router = express.Router(),
    session = require('express-session'),
    mongoose = require('mongoose'),
    Record = require('../models/recordModel.js'),
    User = require('../models/userModel.js');

    router.post('/new', function (req, res) {
      var newUser = new User({
        complaint: req.body.complaint,
        bodySystem : req.body.bodySystem,
        description : req.body.description,
        treatment: req.body.treatment
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

module.exports = router;
