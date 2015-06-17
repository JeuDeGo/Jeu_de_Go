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

io.use(function(socket, next) {
    try {
        var data = socket.handshake || socket.request;
        if (! data.headers.cookie) {
            return next(new Error('Missing cookie headers'));
        }
        console.log('cookie header ( %s )', JSON.stringify(data.headers.cookie));
        var cookies = cookie.parse(data.headers.cookie);
        console.log('cookies parsed ( %s )', JSON.stringify(cookies));
        if (! cookies[COOKIE_NAME]) {
            return next(new Error('Missing cookie ' + COOKIE_NAME));
        }
        var sid = cookieParser.signedCookie(cookies[COOKIE_NAME], COOKIE_SECRET);
        if (! sid) {
            return next(new Error('Cookie signature is not valid'));
        }
        console.log('session ID ( %s )', sid);
        data.sid = sid;
        sessionStore.get(sid, function(err, session) {
            if (err) return next(err);
            if (! session) return next(new Error('session not found'));
            data.session = session;
            next();
        });
    } catch (err) {
        console.error(err.stack);
        next(new Error('Internal server error'));
    }
});

// socket.io events

io.on( "connection", function(socket, nickname, nickname_default)
{
    console.log("connection detected");
    socket.on('new_client', function(nickname, nickname_default) {
        nickname = ent.encode(nickname);
        socket.nickname = nickname;
        console.log("nickname : "+nickname);
/* Nickname check */
        var i = 0; //
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
          nickname = nicknames[i];
          i =+ 1;
        }
        else {
          nicknames[i] = nickname_default;
          console.log('nickname already in use, replacing...' + " --> " + nicknames[i]);
          nickname = nicknames[i];
          i =+ 1;
        }
    socket.emit("nickname_checked", nickname);

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
