'use strict';

var mysql = require('mysql');

var self = this;
var connection;
var dbConfig;

module.exports = function (_dbConfig) {
  dbConfig = _dbConfig;
  handleDisconnect();
  return self;
};

function handleDisconnect() {
  connection = mysql.createConnection(dbConfig);
  exports.connection = connection;

  connection.connect(function (err) {
    if (err) {
      log.error('error when connecting to db:' + err);
      setTimeout(handleDisconnect, 2000);
    } else log.info('connection to MySQL established.');
  });

  connection.on('error', function (err) {
    log.error('db error: ' + err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}
