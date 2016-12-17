var express = require('express');
var router = express.Router();
var AccountMap_dal = require('../model/AccountMap_dal');



// View All AccountMaps
router.get('/all', function(req, res) {
    AccountMap_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('AccountMap/AccountMapViewAll', { 'result':result });
        }
    });

});

// View the AccountMap for the given id
router.get('/', function(req, res){
    if(req.query.Account_id == null) {
        res.send('Account_id is null');
    }
    else {
        AccountMap_dal.getById(req.query.Account_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('AccountMap/AccountMapViewById', {'result': result});
            }
        });
    }
});

// Return the add a new AccountMap form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    AccountMap_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('AccountMap/AccountMapAdd', {'AccountMap': result});
        }
    });
});

// insert a AccountMap record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.AccountEmail == null) {
        res.send('Account Email must be provided.');
    }
    //else if(req.query.AccountMap_id == null) {
    // res.send('A AccountMap must be selected');
    //}
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        AccountMap_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/AccountMap/all');
            }
        });
    }
});

// Delete a AccountMap for the given AccountMap_id
router.get('/delete', function(req, res){
    if(req.query.Account_id == null) {
        res.send('Account_id is null');
    }
    else {
        AccountMap_dal.delete(req.query.Account_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/AccountMap/all');
            }
        });
    }
});

module.exports = router;