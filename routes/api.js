var express = require('express');
var router = express.Router();
var db = require('../modules/db');

/* GET users listing. */
router.all('/add_rose', function(req, res) {
    db.incrRose();
    res.send({ret:0});
});

router.all('/get_score/:id', function(req, res){
    db.getAllScore(req.param('id'), function(score){
        res.send({ret:0, data:score});
    });
});

router.all('/set_score', function(req, res){
    //only id:me supported right now
    if (req.param('id') !== 'me') {
        res.send({ret:-1002, msg:'invalid request'});
    }
    var score = {morality:0, intelligence:0, shape:0, look:0, career:0};
    for (var key in score) {
        if (score.hasOwnProperty(key)) {
            score[key] = parseInt(req.param(key));
            if (!(score[key] >= 0 && score[key] <= 5)) {
                res.send({ret:-1002, msg:'invalid request'});
            }
        }
    }

    db.setAllScore(req.param('id'), score);
    res.send({ret:0});
});


router.all('/*', function(req, res) {
    res.send({ret:-1001, msg:'undefined api:' + req.path});
});

module.exports = router;
