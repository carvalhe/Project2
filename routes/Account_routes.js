var express = require('express');
var router = express.Router();
var Account_dal = require('../model/Account_dal');



// View All Accounts
router.get('/all', function(req, res) {
    Account_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('Account/AccountViewAll', { 'result':result });
        }
    });

});

// View the Account for the given id
router.get('/', function(req, res){
    if(req.query.Account_id == null) {
        res.send('Account_id is null');
    }
    else {
        Account_dal.getById(req.query.Account_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('Account/AccountViewById', {'result': result});
            }
        });
    }
});

// Return the add a new Account form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    Account_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('Account/AccountAdd', {'Account': result});
        }
    });
});

// insert a Account record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.AccountEmail == null) {
        res.send('Account Name must be provided.');
    }
    //else if(req.query.Account_id == null) {
    // res.send('A Account must be selected');
    //}
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        Account_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/Account/all');
            }
        });
    }
});

// Delete a Account for the given Account_id
router.get('/delete', function(req, res){
    if(req.query.Account_id == null) {
        res.send('Account_id is null');
    }
    else {
        Account_dal.delete(req.query.Account_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/Account/all');
            }
        });
    }
});

module.exports = router;