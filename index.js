var express = require('express'),
    server = express(),
    PORT = process.env.PORT || 8000,
    MONGOURI = process.env.MONGOLAB_URI || "mongodb://localhost:27017",
    db = 'taz',
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    ejs = require('ejs'),
    expressLayouts = require('express-ejs-layouts'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    session = require('express-session'),
    bcrypt = require('bcryptjs'),
    Record = require('./models/recordModel.js')

server.set('views', './views');
server.set('view engine', 'ejs');

server.use(express.static('./public'));

server.use(methodOverride('_method'));

server.use(bodyParser.json());

// server.use(bodyParser.urlencoded( {
//   extended: true
// }));

server.use(morgan('dev'));

server.use(expressLayouts);
//
// server.get('/user/doctor/login', function (req, res) {
//   res.render('user/doctor/login');
// });
//
// server.get('/user/patient/login', function (req, res) {
//   res.render('user/patient/login');
// });
//
// server.get('/record/new', function (req, res) {
//   res.render('record/new');
// });
//
// server.post('/record/new', function (req, res) {
//   Record.create(req.body, function(req, res) {
//     res.redirect(302, '/record/index');
//   });
// });
//
// server.get('/record/index', function (req, res) {
//   res.render('record/index');
// });
//
server.get('*', function (req, res) {
  res.render('index');
});

mongoose.connect(MONGOURI + "/" + db);
mongoose.set('debug', true)
server.listen(PORT, function () {
  console.log("ayyyyyyy we on port " + PORT);
});
