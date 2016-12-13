var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

/*
 create or replace view Map_view as
 select s.*, a.street, a.zipcode from Map s
 join address a on a.address_id = s.address_id;
 */

exports.getAll = function(callback) {
    var query = 'SELECT * FROM Maps;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(Map_id, callback) {
    var query = 'SELECT * FROM Maps WHERE Map_id = ?';
    var queryData = [Map_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO Maps (Map_Name, Map_Type) VALUES (?,?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.Map_Name, params.Map_Type];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(Map_id, callback) {
    var query = 'DELETE FROM Maps WHERE Map_id = ?';
    var queryData = [Map_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};