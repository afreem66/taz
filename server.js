var express = require('express'),
    server = express(),
    PORT = process.env.PORT || 8000,
    MONGOURI = process.env.MONGOLAB_URI || "mongodb://localhost:27017",
    db = 'taz',
    mongoose = require('mongoose'),
    // deepPopulate = require('mongoose-deep-populate')(mongoose),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    session = require('express-session'),
    bcrypt = require('bcryptjs'),
    Record = require('./models/recordModel.js'),
    User = require('./models/userModel.js');

server.use(session({
  secret: "phantomphildius",
  resave : true,
  saveUninitialized: true
}));

// server.set('views', './views');
// server.set('view engine', 'html');

server.use(express.static('./public'));

server.use(methodOverride('_method'));

server.use(bodyParser.json());

server.use(morgan('dev'));

server.use(function (req, res, next) {
  res.locals.user = req.session.currentUser;
  next();
});

server.get('/', function (req, res) {
  res.render('index.html')
})

var recordController = require('./controllers/records.js');
server.use('/records', recordController);

var userController = require('./controllers/users.js');
server.use('/users', userController);

mongoose.connect(MONGOURI + "/" + db);
mongoose.set('debug', true)
server.listen(PORT, function () {
  console.log("ayyyyyyy we on port " + PORT);
});
