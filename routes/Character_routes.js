var express = require('express');
var router = express.Router();
var Character_dal = require('../model/Character_dal');



// View All Characters
router.get('/all', function(req, res) {
    Character_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('Character/CharacterViewAll', { 'result':result });
        }
    });

});

// View the Character for the given id
router.get('/', function(req, res){
    if(req.query.Character_id == null) {
        res.send('Character_id is null');
    }
    else {
        Character_dal.getById(req.query.Character_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('Character/CharacterViewById', {'result': result});
            }
        });
    }
});

// Return the add a new Character form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    Character_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('Character/CharacterAdd', {'Character': result});
        }
    });
});

// insert a Character record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.Character_Name == null) {
        res.send('Character Name must be provided.');
    }
    //else if(req.query.Character_id == null) {
    // res.send('A Character must be selected');
    //}
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        Character_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/Character/all');
            }
        });
    }
});

// Delete a Character for the given Character_id
router.get('/delete', function(req, res){
    if(req.query.Character_id == null) {
        res.send('Character_id is null');
    }
    else {
        Character_dal.delete(req.query.Character_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/Character/all');
            }
        });
    }
});

module.exports = router;