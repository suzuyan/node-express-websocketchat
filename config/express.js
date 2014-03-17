var express = require('express');

module.exports = function(app, config) {
  app.configure(function () {
    app.use(express.compress());
    app.use(express.static(config.root + '/public'));
    app.set('port', config.port);
    app.set('views', config.root + '/app/views/pages');
    // use ect template engine
    var ect = require('ect');
    app.engine('ect', ect({watch: true, root: config.root + '/app/views', ext: '.ect'}).render);
    app.set('view engine', 'ect');
    //app.set('view engine', 'jade');
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(function(req, res) {
      res.status(404).render('../errors/404', { title: '404' });
    });
  });
};
