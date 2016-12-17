var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

/*
 create or replace view Skill_view as
 select s.*, a.street, a.zipcode from Skill s
 join address a on a.address_id = s.address_id;
 */

exports.getAll = function(callback) {
    var query = 'SELECT * FROM Account_Character;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(Acount_id, callback) {
    var query = 'SELECT * FROM Account_Character WHERE Account_id = ?';
    var queryData = [Account_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO Account_Character (AccountEmail, Most_Played_Character, Most_Played_Type) VALUES (?,?,?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.AccountEmail, params.Most_Played_Character, params.Most_Played_Type];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(Account_id, callback) {
    var query = 'DELETE FROM Account_Character WHERE Account_id = ?';
    var queryData = [Account_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};