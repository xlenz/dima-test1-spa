'use strict';

var mysql = require('mysql');
var fs = require('fs');

var config = JSON.parse(fs.readFileSync('config/config.json'));
var dbConfig = config.mysql;
dbConfig.multipleStatements = true;
var database = dbConfig.database;
delete dbConfig.database;
var connection;

exports.start = function (done) {
  connection = mysql.createConnection(dbConfig);
  createDbAndTables(done);
};

function createDbAndTables(done) {
  var dbQuery = fs.readFileSync('config/sql/createDb.sql').toString();
  dbQuery = dbQuery.format({
    db: database
  });
  console.log('creating database...');
  connection.query(dbQuery, function (err, rows) {
    if (err) {
      throw new Error(err);
    }
    console.log('db created.');
    createTables(done);
  });
}

function createTables(done) {
  var tablesQuery = fs.readFileSync('config/sql/createTables.sql').toString();
  dbConfig.database = database;
  connection.destroy();
  connection = mysql.createConnection(dbConfig);
  console.log('creating tables...');
  connection.query(tablesQuery, function (err, rows) {
    if (err) {
      throw new Error(err);
    }
    console.log('tables created.');
    done();
  });
}

if (!String.prototype.format) {
  String.prototype.format = function () {
    var str = this.toString();
    if (!arguments.length)
      return str;
    var argType = typeof arguments[0];
    var args = arguments;
    if ("string" != argType && "number" != argType) {
      args = arguments[0];
    }
    for (var arg in args)
      str = str.replace(new RegExp("\\{" + arg + "\\}", "gi"), args[arg]);
    return str;
  };
}
