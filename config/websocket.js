var io = require('socket.io');

module.exports = function(server, config) {
  io = io.listen(server);
  io.set("log level", config.websocket.log_level);
  // connection event
  io.sockets.on('connection', function(socket) {
    io.sockets.emit('login', socket.id);
    socket.on('post', function(data) {
        io.sockets.emit('post', {id: socket.id, post: data});
    });
    console.log("\t", socket.id, 'connected!');

    socket.on('disconnect', function() {
        console.log("\t", socket.id, 'disconnected!');
    });
  });
};