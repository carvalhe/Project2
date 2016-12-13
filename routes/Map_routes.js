var express = require('express');
var router = express.Router();
var Map_dal = require('../model/Map_dal');



// View All Maps
router.get('/all', function(req, res) {
    Map_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('Maps/MapsViewAll', { 'result':result });
        }
    });

});

// View the Map for the given id
router.get('/', function(req, res){
    if(req.query.Map_id == null) {
        res.send('Map_id is null');
    }
    else {
        Map_dal.getById(req.query.Map_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('Maps/MapsViewById', {'result': result});
            }
        });
    }
});

// Return the add a new Map form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    Map_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('Maps/MapsAdd', {'Map': result});
        }
    });
});

// insert a Map record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.Map_Name == null) {
        res.send('Map Name must be provided.');
    }
    //else if(req.query.Map_id == null) {
    // res.send('A Map must be selected');
    //}
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        Map_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/Maps/all');
            }
        });
    }
});

// Delete a Map for the given Map_id
router.get('/delete', function(req, res){
    if(req.query.Map_id == null) {
        res.send('Map_id is null');
    }
    else {
        Map_dal.delete(req.query.Map_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/Maps/all');
            }
        });
    }
});

module.exports = router;