'use strict';
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config');
var room = config.room;
var routes = require('./routes/index');
var app = express();
var remote = require('./remote/control.js');
var http = require('http').Server(app);
var io = require('socket.io').listen(http);
var Manager = require('./lib/Manager.js');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'images/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

//We manage all the socket stuff
Manager(io);

app.post('/off', function(req, res) {
    var message = remote.getActionMessage(req.body.token, '/off');
    if(message.status === 200) {
        io.sockets.in(room).emit('quiet');
    }
    res.json(message);
});

app.post('/on', function(req, res) {
    var message = remote.getActionMessage(req.body.token, '/on');
    if(message.status === 200) {
        io.sockets.in(room).emit('talk');
    }
    res.json(message);
});

http.listen(config.port, function() {
    console.log('Listening on ' +config.host);
});

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
