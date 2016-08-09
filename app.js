//****Start of App.js****\\
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//mongodb connection
var db = mongoose.connect('mongodb://localhost/ncsV1');

//Routes
var home = require('./routes/index');
var callListRoutes = require('./routes/callListRoutes'); 				
var deviceListRoutes = require('./routes/deviceListRoutes');        
var callHistoryRoutes = require('./routes/callHistoryRoutes');     

//Api Routes
var devicesApi = require('./API/devicesApi');
var callsApi = require('./API/callsApi');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//URI of different routes
app.use('/', home);
app.use('/calls', callListRoutes); 			
app.use('/devices', deviceListRoutes);    
app.use('/callhistory', callHistoryRoutes);

//URI of diffrent API routes
app.use('/apiv1/devices', devicesApi);
app.use('/apiv1/calls', callsApi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
