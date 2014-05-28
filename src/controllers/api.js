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
         var usersCount = data[0]['COUNT(id)'];
         log.debug('Users count:', usersCount);
         if (err || !data) {
            return sendError(res, err);
         }
         return res.send({
            success: true,
            json: usersCount
         });
      });
   });
};
