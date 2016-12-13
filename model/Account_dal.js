var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

/*
 create or replace view Account_view as
 select s.*, a.street, a.zipcode from Account s
 join address a on a.address_id = s.address_id;
 */

exports.getAll = function(callback) {
    var query = 'SELECT * FROM Account;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(Account_id, callback) {
    var query = 'SELECT * FROM Account WHERE Account_id = ?';
    var queryData = [Account_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO Account (AccountEmail, AccountName, FName, LName) VALUES (?,?,?,?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.AccountEmail, params.AccountName, params.FName, params.LName];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(Account_id, callback) {
    var query = 'DELETE FROM Account WHERE Account_id = ?';
    var queryData = [Account_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};