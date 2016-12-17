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
    var query = 'SELECT * FROM Skill;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(Skill_id, callback) {
    var query = 'SELECT * FROM Skill WHERE Skill_id = ?';
    var queryData = [Skill_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO Skill (AccountEmail, Cur_Skill_Rating, Past_Skill_Rating) VALUES (?,?,?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.AccountEmail, params.Cur_Skill_Rating, params.Past_Skill_Rating];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

}

exports.delete = function(Skill_id, callback) {
    var query = 'DELETE FROM Skill WHERE Skill_id = ?';
    var queryData = [Skill_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};