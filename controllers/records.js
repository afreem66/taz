var express = require('express'),
    router = express.Router(),
    session = require('express-session'),
    mongoose = require('mongoose'),
    Record = require('../models/recordModel.js'),
    User = require('../models/userModel.js');


  router.post('/new', function (req, res) {
    var newRecord = new Record({
      author: req.session.currentUser.name,
      complaint: req.body.complaint,
      bodySystem : req.body.bodySystem,
      description : req.body.description,
      treatment: req.body.treatment
    })
    console.log(newRecord);

    newRecord.save(function (err) {
      if (err) {
        res.json({error: "There was an error: " + err});
      } else {
        res.json({record: req.body.description})
      }
    })
  });

  router.get('/all', function (req, res) {
    Record.find({}, function (err, records) {
      console.log(records);
      res.json(records)
    });
  });

module.exports = router;
