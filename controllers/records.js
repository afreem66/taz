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

  router.post('/new', function (req, res) {
    var newRecord = new Record({
      author: req.session.currentUser.name,
      _author: req.session.currentUser._id,
      complaint: req.body.complaint,
      bodySystem : req.body.bodySystem,
      description : req.body.description,
      treatment: req.body.treatment,
      date: req.body.date
    })
    console.log(newRecord);

    newRecord.save(function (err, saveRecord) {
      if (err) {
        res.json({error: "There was an error: " + err});
      } else {
        var user = res.locals.user;
        console.log(user);
        user.records.push(saveRecord);
        console.log(user);
        // user.update(function(saveErr, updateUser) {
        //   if (saveErr) {
        //     console.log("there was an error saving the user with new array" + saveErr)
        //   } else {
        //     console.log(updateUser);
        //   }
        // })
        res.json({record: saveRecord})
      }
    })
  });

  router.patch('/new', function(req, res) {
    User.findByIdAndUpdate({
      res.locals.user.id
    })
  })

  router.get('/all', function (req, res) {
    Record.find({}, function (err, records) {
      console.log(records);
      res.json(records)
    });
  });

module.exports = router;
