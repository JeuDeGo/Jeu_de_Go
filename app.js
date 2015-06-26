var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var nsa = require('./routes/nsa');
var nsaSolo = require('./routes/nsaSolo');
var vs = require('./routes/vs');
var vsSolo = require('./routes/vsSolo');
var anon = require('./routes/anon');
var anonSolo = require('./routes/anonSolo');
var rules = require('./routes/rules');
var mail = require('./routes/mail');
var ent = require('ent');
var fs = require('fs');
var app = express();
var socket_io = require("socket.io");
  session = require('express-session'),
  cookie = require('cookie'),
  sessionStore = new session.MemoryStore();

var PLAYERS = {
};
var sourceId = "";
var sourceNick = "";
var countConnection = 0;
var roomNameSending = "room0";
var CounterRoom = 0;


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
app.use('/nsaSolo', nsaSolo);
app.use('/vs', vs),
app.use('/vsSolo', vsSolo),
app.use('/anon', anon);
app.use('/anonSolo', anonSolo);
app.use('/rules', rules);
app.use('/mail', mail);

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

io.on( "connection", function(socket)
{
    
    console.log("connection detected");

-/* Nickname check 
*/

  socket.on('new_client', function() {
        countConnection++;
        console.log(countConnection);
  });


  socket.on("board_send", function(Game, room) {
    var game = Game;
     socket.broadcast.to(room).emit("board_refresh", game);
    console.log(game.ko);
  });

  socket.on("askForFaction", function(){
    console.log(countConnection%2);
    if (countConnection%2 == 0) {
      socket.emit("black");
      console.log("sending black");
    }
    else {
      socket.emit("white");
      console.log("sending white");
    }
  });
  socket.on("askForJoinRoom", function(){
    if (countConnection%2 == 0) {
      roomNameSending = "room"+CounterRoom;
      roomNameSendingString = roomNameSending.toString();
      socket.join(roomNameSendingString);
      console.log("client connecté sur la : "+roomNameSendingString);
      io.sockets.in(roomNameSendingString).emit("roomName", roomNameSendingString);

  }
  else {
    roomNameSending = "room"+CounterRoom;
    roomNameSendingString = roomNameSending.toString();
    socket.join(roomNameSendingString);
    console.log("client connecté sur la : "+roomNameSendingString);
    io.sockets.in(roomNameSendingString).emit("roomName", roomNameSendingString);

    CounterRoom++;
  }

  });

//chat
      socket.on('nouveau_client', function(pseudo, room) {
          pseudo = ent.encode(pseudo);
          socket.pseudo = pseudo;
          socket.broadcast.to(room).emit('nouveau_client', pseudo);
      });

      socket.on('message', function (message, room) {
          message = ent.encode(message);
          socket.broadcast.to(room).emit('message', {pseudo: socket.pseudo, message: message});
      }); 

});


module.exports = app;
