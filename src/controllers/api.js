'use strict';

var helpers = require('./../helpers');
var sendError = helpers.sendError;

var self = this;
var dbMysql;
module.exports = function (_dbMysql) {
  dbMysql = _dbMysql;
  return self;
};


exports.insertSelect = function (req, res, next) {
  dbMysql.usrCreate(req.body.name, function (err, data) {
    log.debug('Create user');
    if (err) {
      return sendError(res, err);
    }
    dbMysql.count('id', function (err, data) {
      log.debug('Users count', data[0]);
      if (err || !data) {
        return sendError(res, err);
      }
      return res.send({
        success: true,
        json: data
      });
    });
  });
};
