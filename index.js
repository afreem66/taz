var express = require('express'),
    server = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    ejs = require('ejs'),
    expressLayouts = require('express-ejs-layouts'),
    methodOverride = require('method-override'),
    morgan = require('morgan'),
    session = require('express-session'),
    bcrypt = require('bcryptjs');

server.set('views', './views');
server.set('view engine', 'ejs');

server.use(express.static('./public'));

server.use(methodOverride('_method'));

server.use(bodyParser.urlencoded( {
  extended: true
}));

server.use(morgan('dev'));

server.use(expressLayouts);

server.use('/', function (req, res) {
  res.render('home');
})

mongoose.connect('mongodb://localhost:27017/taz', function(err, database) {
  server.listen(5432, function () {
    console.log("ayyyyyyy");
  });
});
