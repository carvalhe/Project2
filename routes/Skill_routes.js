var express = require('express');
var router = express.Router();
var Skill_dal = require('../model/Skill_dal');



// View All Skills
router.get('/all', function(req, res) {
    Skill_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('Skill/SkillViewAll', { 'result':result });
        }
    });

});

// View the Skill for the given id
router.get('/', function(req, res){
    if(req.query.Skill_id == null) {
        res.send('Skill_id is null');
    }
    else {
        Skill_dal.getById(req.query.Skill_id, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('Skill/SkillViewById', {'result': result});
            }
        });
    }
});

// Return the add a new Skill form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    Skill_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('Skill/SkillAdd', {'Skill': result});
        }
    });
});

// insert a Skill record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.AccountEmail == null) {
        res.send('Account Email must be provided.');
    }
    //else if(req.query.Skill_id == null) {
    // res.send('A Skill must be selected');
    //}
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        Skill_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/Skill/all');
            }
        });
    }
});

// Delete a Skill for the given Skill_id
router.get('/delete', function(req, res){
    if(req.query.Skill_id == null) {
        res.send('Skill_id is null');
    }
    else {
        Skill_dal.delete(req.query.Skill_id, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/Skill/all');
            }
        });
    }
});

module.exports = router;