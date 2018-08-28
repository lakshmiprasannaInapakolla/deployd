var PORT = process.env.PORT || 2403;
var ENV = process.env.NODE_ENV || 'development';


// http + express + socket.io
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server, {'log level': 0});


// deployd
require('deployd').attach(server, {
    socketIo: io,
    env: ENV,
    db: {host:'ds135852.mlab.com', port:35852, name:'deployd'}
});
app.use(server.handleRequest);


// start server
server.listen(PORT, function() {
    console.log({ ENV:ENV, PORT:PORT });
});
server.on('error', function(err) {
    console.log(err.stack);
    process.nextTick(function() { // Give the server a chance to return an error
        process.exit();
    });
});
