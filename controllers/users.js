var express = require('express'),
    router = express.Router(),
    session = require('express-session'),
    bcrypt = require('bcryptjs'),
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
            bcrypt.hash(req.body.passwordDigest,
            salt, function(hashErr, hash) {
              console.log(hash);
          var newUser = new User({
            email: req.body.email,
            passwordDigest : req.body.passwordDigest,
            name : req.body.name,
            age: req.body.age,
            gender: req.body.gender,
            doctor: req.body.doctor,
            specialty: req.body.specialty,
            hospital: req.body.hospital,
            currentMedications: req.body.currentMedications,
            familyHistory: req.body.familyHistory,
            height: req.body.height,
            weight: req.body.weight,
            bloodPressure: req.body.bloodPressure
          })
      console.log("new user" + newUser);

      newUser.save(function (saveErr, saveUser) {
        if (saveErr) {
          res.json({error: "There was a save error: " + saveErr});
        } else {
          console.log("saved user" + saveUser);
          req.session.currentUser = newUser
          console.log("current user" + req.session.currentUser);
          res.json({currentUser: saveUser})
        }
      });
          });
        });
      };
    });
  });

// login
//find user here and populate records
router.post('/login', function(req, res) {
  User.findOne({email : req.body.email}, function(loginErr, user) {

    if (user && user.passwordDigest === req.body.passwordDigest) {
      req.session.currentUser = user;
      User
      .findOne({name: req.session.currentUser.name})
      .populate('records')
      .exec(
        function(findErr, foundUser) {
          if (findErr) {
            console.log(findErr);
            res.json({error: "there was an error finding the user", findErr})
          } else {
            console.log("This is thhe found usero" + foundUser);
            res.end({user: "Here is the user with populated records", foundUser})
          }
      });
      res.json({user: "This is the logged in user", user})
    } else {
      console.log("There was a login error" + loginErr);
      res.end({error: "there was a login error: ",  loginErr})
    }
    // if (loginErr) {
    //       res.json({error: "there was a login error: " + loginErr})
    //       console.log(loginErr);
    //   } else if (user) {
    //     bcrypt.compare(req.body.passwordDigest, user.passwordDigest, function (compareErr, match) {
    //       if (match) {
    //         req.session.currentUser = user;
    //         res.json({user: user})
    //       } else {
    //         console.log("Username and password combo is not a match");
    //         res.json({error: "there was a compare error: " + compareErr});
    //       }
    //     });
    //   } else {
    //     console.log("something bad happened");
    //     res.json({error: "there was a catastrophic error" + loginErr});
    //   }
  });
});

router.get('/:id/view', function (req, res) {
  console.log('hello we hit the get route');
  User
  .findOne({name: res.locals.user.name})
  .populate('records')
  .exec(
    function(findErr, foundUser) {
      if (findErr) {
        console.log(findErr);
        res.json({error: "there was an error finding the user", findErr})
      } else {
        console.log(foundUser);
        res.end({user: "Here is the user with populated records", foundUser})
      }
  });

  User.find({}, function(findAllErr, findAllUsers) {
    if (findAllErr) {
      console.log(findAllErr);
      res.json({error: "there was an error getting all users", findAllErr})
    } else {
      console.log(findAllUsers);
      res.json({users: "the users", findAllUsers})
    }
  });

});

router.patch('/:id/view/:docId', function (req, res) {
  User.findOneAndUpdate({
    _id : res.locals.user._id
  }, {$push: {doctors : req.params.docId}}, function (updateErr, updatedUser) {
    if (updateErr) {
      console.log("it broke " + updateErr);
      res.json({error: "there was an error updating the users doctors array", updateErr})
    } else {
      console.log("you updated the doctor array");
      console.log(updatedUser);
      res.json({user: "Here is the user with new doctors", updatedUser})
    }
  });
});

module.exports = router;
