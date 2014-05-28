'use strict';

//logging
global.log = require('./config/modules/winston');
var express = require('express');

//reading config file
var cfg = require('./config/readConfig').config;

//mysql worker
var dbMysql = require('./src/dbMysql')(cfg.mysql);

var app = express();
//routes
var routes = require('./src/routes')(cfg, dbMysql);

//setup express usages
require('./config/modules/express')(app, cfg, routes);

//start server
var server = app.listen(cfg.port, cfg.host, function () {
  var host = cfg.host || '*';
  var port = cfg.port || 'default';
  log.info('Listening - ' + host + ':' + port);
});
