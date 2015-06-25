var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var nsa = require('./routes/nsa');
var vs = require('./routes/vs');
var anon = require('./routes/anon');
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
app.use('/vs', vs),
app.use('/anon', anon);

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

io.on( "connection", function(socket, nickname)
{
    
    console.log("connection detected");

-/* Nickname check 
*/

  socket.on('new_client', function(nickname, nickname_default) {
        countConnection++;
        socket.broadcast.emit("currentUsers", PLAYERS);
        nickname = ent.encode(nickname);
        socket.nickname = nickname;
        console.log("nickname : "+nickname);

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
          PLAYERS[nicknames[i]] = socket.id;
          socket.broadcast.emit("currentUsers", PLAYERS);
          i =+ 1;
        }
        else {
          nicknames[i] = nickname_default;
          nickname = nickname_default;
          console.log('nickname already in use, replacing...' + " --> " + nicknames[i]);
          PLAYERS[nicknames[i]] = socket.id;
          socket.broadcast.emit("currentUsers", PLAYERS);
         i =+ 1;
       }
  });


  socket.on("board_send", function(Game) {
    var game = Game;
    socket.broadcast.emit("board_refresh", game);
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

  }
  else {
    roomNameSending = "room"+CounterRoom;
    roomNameSendingString = roomNameSending.toString();
    socket.join(roomNameSendingString);
    console.log("client connecté sur la : "+roomNameSendingString);
    CounterRoom++;
  }

  });

  // envoyer nickname quand on est sur la zone de jeu.

      // Dès qu'on nous donne un pseudo, on le stocke en variable de session et on informe les autres personnes
      socket.on('nouveau_client', function(pseudo) {
          pseudo = ent.encode(pseudo);
          socket.pseudo = pseudo;
          socket.broadcast.emit('nouveau_client', pseudo);
      });

      // Dès qu'on reçoit un message, on récupère le pseudo de son auteur et on le transmet aux autres personnes
      socket.on('message', function (message) {
          message = ent.encode(message);
          socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message});
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
