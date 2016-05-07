'use strict';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('portal', { title: 'Portal NS', room: 'portal' });
});

router.get('/full', function(req, res, next) {
    res.render('full');
});

router.get('/r/:room', function(req, res) {
    var room = req.param('room');
    res.render('portal', {title: 'Room --> ' +room, room: room});
});

module.exports = router;
