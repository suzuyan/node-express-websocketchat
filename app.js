var express = require('express'),
  fs = require('fs'),
  config = require('./config/config');

var modelsPath = __dirname + '/app/models';
fs.readdirSync(modelsPath).forEach(function (file) {
  if (file.indexOf('.js') >= 0) {
    require(modelsPath + '/' + file);
  }
});

var app = express();
var server = app.listen(config.port);
// express
require('./config/express')(app, config);
// routes
require('./config/routes')(app);
// socket.io
require('./config/websocket')(server, config);
