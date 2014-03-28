var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    extend = require('node.extend'),
    env = process.env.NODE_ENV || 'development';

var config = {
  common: {
    root: rootPath,
    app: {
      name: 'dev-websocket'
    },
    port: process.env.PORT || 3000,
    websocket: {
      log_level: 3
    }
  },

  development: {
  },

  test: {
  },

  production: {
    port: 5000,
    websocket: {
      log_level: 1
    }
  }
};

module.exports = extend(true, config['common'], config[env]);
