'use strict';

var self = this;
var cfg = null;

module.exports = function (_cfg) {
  cfg = _cfg;
  return self;
};

exports.appHtml = function (req, res, next) {
  return res.sendfile(cfg.app_html);
};
