var express = require('express');
var router = express.Router();
var AccountCharacter_dal = require('../model/AccountCharacter_dal');



// View All AccountCharacters
router.get('/all', function(req, res) {
    AccountCharacter_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('AccountCharacter/AccountCharacterViewAll', { 'result':result });
        }
    });

});

// View the AccountCharacter for the given id
router.get('/', function(req, res){
    if(req.query.Account_id == null) {
        res.send('Account_id is null');
    }
    else {
        AccountCharacter_dal.getById(req.query.Account_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('AccountCharacter/AccountCharacterViewById', {'result': result});
            }
        });
    }
});

// Return the add a new AccountCharacter form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    AccountCharacter_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('AccountCharacter/AccountCharacterAdd', {'AccountCharacter': result});
        }
    });
});

// insert a AccountCharacter record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.AccountEmail == null) {
        res.send('Account Email must be provided.');
    }
    //else if(req.query.AccountCharacter_id == null) {
    // res.send('A AccountCharacter must be selected');
    //}
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        AccountCharacter_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/AccountCharacter/all');
            }
        });
    }
});

// Delete a AccountCharacter for the given AccountCharacter_id
router.get('/delete', function(req, res){
    if(req.query.Account_id == null) {
        res.send('Account_id is null');
    }
    else {
        AccountCharacter_dal.delete(req.query.Account_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/AccountCharacter/all');
            }
        });
    }
});

module.exports = router;