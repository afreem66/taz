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
        user.records.push(saveRecord._id);
        console.log(user);
        // console.log(saveRecord._id);
        // console.log(newRecord._id);

        User.findOneAndUpdate( {
          _id: user._id
        }, {
          records: user.records
        }, function(err, updatedUser){
          if (err) {
            console.log("ya done fucked up: ", err);
            res.json({error: err})
          } else {
            console.log("we did it!");
            res.end(updatedUser);
          }
        });
        res.json({record: saveRecord})
      }
    })
  });


module.exports = router;
