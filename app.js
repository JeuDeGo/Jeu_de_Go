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
var pseudos = new Array();
var i = 0;
io.on( "connection", function(socket, pseudo)
{
    console.log( "A user connected" );

    console.log("connection detected");
    socket.on('nouveau_client', function(pseudo) {
        i =+ 1;
        pseudo = ent.encode(pseudo);
        socket.pseudo = pseudo;
        pseudos[i] = pseudo;
        console.log("pseudo : "+pseudo);

/* Pseudo check */
        var error = 0;
        for (var j = 0; j < pseudos.length; j++) {
          if (pseudo == pseudo[j]) {
              error = 1;
              socket.emit('pseudo_error');
          }
          else {
            error = 0;
          }
        }
        if (error == 0){
        socket.emit('pseudo_ok', pseudo);
        }

    });
});
/*

var pseudos = new Array();
var i = 0;
io.sockets.on('connection', function (socket, pseudo) {
    // Dès qu'on nous donne un pseudo, on le stocke en variable de session et on informe les autres personnes
    console.log("connection detected");
    socket.on('nouveau_client', function(pseudo) {
        i =+ 1;
        pseudo = ent.encode(pseudo);
        socket.pseudo = pseudo;
        pseudos[i] = pseudo;
        console.log(pseudo);
*/

/* Pseudo check */
/*
        var error = 0;
        for (var j = 0; j < pseudos.length; j++) {
          if (pseudo == pseudo[j]) {
              error = 1;
              socket.emit('pseudo_error');
          }
          else {
            error = 0;
          }
        }
        socket.emit('pseudo_ok', pseudo);

    });

});
*/

module.exports = app;

