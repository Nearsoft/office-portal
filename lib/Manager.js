'use strict';

var current = 0;

module.exports = function(io) {

    io.on('connection', function(socket) {

        socket.on('room', function(room) {

            current = getCurrent(room);

            if (current < 2) {

                socket.join(room);

                current = getCurrent(room);

                io.sockets.in(room).emit('join', current);

                socket.on('message', function(desc) {
                  io.sockets.in(room).emit('message', desc);
              });

                socket.on('talk', function(desc) {
                  io.sockets.in(room).emit('talk', desc);
              });

                socket.on('quiet', function(desc) {
                  io.sockets.in(room).emit('quiet', desc);
              });

                socket.on('refresh', function() {
                  io.sockets.in(room).emit('refresh');
              });

            } else {
                socket.emit('redirect', current);
                return;
            }

        });

        socket.on('disconnect', function() {

            socket.leave(socket.room);

        });

    });

    function getCurrent(room) {
      var roomVar = io.nsps['/'].adapter.rooms[room];
      return (roomVar === undefined)? 0:roomVar.length;
  }

};
