var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

/*
 create or replace view Character_view as
 select s.*, a.street, a.zipcode from Character s
 join address a on a.address_id = s.address_id;
 */

exports.getAll = function(callback) {
    var query = 'SELECT * FROM OWCharacter;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(Character_id, callback) {
    var query = 'SELECT * FROM OWCharacter WHERE Character_id = ?';
    var queryData = [Character_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO OWCharacter (Character_Name, Character_Type) VALUES (?,?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.Character_Name, params.Character_Type];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(Character_id, callback) {
    var query = 'DELETE FROM OWCharacter WHERE Character_id = ?';
    var queryData = [Character_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};