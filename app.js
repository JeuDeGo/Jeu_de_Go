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
  session = require('express-session'),
  cookie = require('cookie'),
  sessionStore = new session.MemoryStore();


var COOKIE_SECRET = 'secret';
var COOKIE_NAME = 'sid';

// Socket.io
var io = socket_io();
app.io = io;
var nicknames = new Array(); // array of all the online users

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser(COOKIE_SECRET));
app.use(session({
    name: COOKIE_NAME,
    store: sessionStore,
    secret: COOKIE_SECRET,
    saveUninitialized: true,
    resave: true,
    cookie: {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: null
    }
}));

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

io.on( "connection", function(socket, nickname, nickname_default)
{
    console.log("connection detected");
    console.log(sessionStore);

  
  socket.on("board_send", function(Game) {
    var game = Game;
    socket.broadcast.emit("board_refresh", game);
    console.log(game.ko);
  });
});


module.exports = app;

/*
TO ADD :
Faction managing by using an object, and the 2 factions in it :
  var nicknameTest = new Object(),
      KeyAuth
        nickname
        faction
*/
