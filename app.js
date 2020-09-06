var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var unsplashRouter = require('./routes/unsplash')
var freesoundRouter = require('./routes/freesound')
const fs = require('fs');
const process = require('process');

var util = require('util');
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
var log_stdout = process.stdout;

console.log = function(d) { //
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};

global.fetch = require("node-fetch");

process.on('uncaughtException', (err, origin) => {
  const fs = require('fs');
  fs.writeSync(
    process.stderr.fd,
    `Caught exception: ${err}\n` +
    `Exception origin: ${origin}`
  );
});

function errorHandler (err, req, res, next) {
  res.status(500)
  res.render('error', { error: err })

  var nodemailer = require('nodemailer');

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'fellowrover@gmail.com',
      pass: 'J032868l'
    }
  });
  
  var mailOptions = {
    from: 'fellowrover@gmail.com',
    to: 'j.trachtenberg@gmail.com',
    subject: 'unsplash error',
    text: err.message
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });


}

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/unsplash', unsplashRouter);
app.use('/unsplash/search', unsplashRouter);
app.use('/unsplash/endpointtrigger',unsplashRouter);
app.use('/freesound', freesoundRouter);
app.use('/freesound/search', freesoundRouter);
app.use('/freesound/play', freesoundRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
process.on('uncaughtException', function (exception) {
  console.log(exception); // to see your exception details in the console
  // if you are on production, maybe you can send the exception details to your
  // email as well ?
});
// error handler
app.use(errorHandler);

module.exports = app;
