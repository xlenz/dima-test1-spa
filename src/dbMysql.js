'use strict';

var self = this;
var connection;
module.exports = function (dbConfig) {
   connection = require('./../config/modules/mysql')(dbConfig).connection;
   return self;
};

var usersTable = 'users';

exports.usrCreate = function (name, callback) {
   var queryStr =
      "INSERT INTO {usersTable} (`name`) VALUES ('{name}');"
      .format({
         usersTable: usersTable,
         name: name
      });
   insert(queryStr, null, callback);
};

exports.count = function (field, callback) {
   var queryStr = "SELECT COUNT({field}) FROM {tableName}".format({
      tableName: usersTable,
      field: field
   });
   select(queryStr, callback);
};

function select(queryStr, callback, rowNum) {
   log.debug(queryStr);
   connection.query(queryStr, function (err, rows) {
      if (err) callback(err.code);
      else if (rows && rows.length > 0)
         if (rowNum !== undefined && rowNum !== null)
            callback(null, rows[rowNum]);
         else
            callback(null, rows);
         else
            callback(null, null);
   });
}

function insert(queryStr, err, callback) {
   log.debug(queryStr);
   connection.query(queryStr, function (err, rows) {
      if (err) {
         if (err.code == 'ER_DUP_ENTRY' && err)
            callback(err);
         else
            callback(err.code);
      } else if (rows && rows.length > 0)
         callback(null, rows.insertId);
      else
         callback(null, null);
   });
}
