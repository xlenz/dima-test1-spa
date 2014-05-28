'use strict';

var self = this;
var html, api;

module.exports = function (cfg, dbMysql) {
  api = require('./controllers/api')(dbMysql);
  html = require('./controllers/html')(cfg);
  return self;
};

exports.routes = function (app) {
  app.get("/", html.appHtml);
  app.post("/insertSelect", api.insertSelect);
};
