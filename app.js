var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var nsa = require('./routes/nsa');
var ent = require('ent');
var fs = require('fs');
var app = express();
var socket_io = require("socket.io");


// Socket.io
var io = socket_io();
app.io = io;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/nsa', nsa);

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

// socket.io events
var nicknames = new Array();
var i = 0;
io.on( "connection", function(socket, nickname, nickname_default)
{
    console.log("connection detected");
    socket.on('new_client', function(nickname, nickname_default) {
        nickname = ent.encode(nickname);
        socket.nickname = nickname;
        
        console.log("nickname : "+nickname);


/* Nickname check */
        var error = 0;
        for (var j = 0; j < nicknames.length; j++) {
          if (nickname == nicknames[j]) {
              error =+ 1;
          }
          else {
            error =+ 0;
          }
        }
        if (error == 0){
          nicknames[i] = nickname;
          console.log('nickname ok' + " --> " + nicknames[i]);
          i =+ 1;

        }
        else {
          nicknames[i] = nickname_default;
          console.log('nickname already in use, replacing...' + " --> " + nicknames[i]);
          i =+ 1;
        }
        socket.emit('nickname', nicknames[i]);


    });
});


module.exports = app;

/*
TO ADD :
Faction managing by using an object, and the 2 factions in it :
  var nicknameTest = new Object(),
      NSA = new Array(),
      ANON = new Array();