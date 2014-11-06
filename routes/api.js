var express = require('express');
var router = express.Router();
var db = require('../modules/db');

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "proposal.xingwu.me");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

router.all('/add_rose', function(req, res) {
    db.incrRose();
    res.send({ret:0});
});

router.all('/get_rose', function(req, res) {
    db.getRose(function(num){
        res.send({ ret:0, roseNum: num?num:0});
    });
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
        return;
    }
    var score = {morality:0, intelligence:0, shape:0, look:0, career:0};
    for (var key in score) {
        if (score.hasOwnProperty(key)) {
            score[key] = parseInt(req.param(key));
            if (!(score[key] >= 0 && score[key] <= 5)) {
                res.send({ret:-1002, msg:'invalid request'});
                return;
            }
        }
    }

    db.setAllScore(req.param('id'), score);
    res.send({ret:0});
});

router.all('/get_comments/:id', function(req, res){
    if (req.param('id') !== 'me' && req.param('id') !== 'yy') {
        res.send({ret:-1002, msg:'invalid request'});
        return;
    }
    db.getComments(req.param('id'), function(comments){
        res.send({ret:0, data:comments});
    });
});

router.all('/add_comment', function(req, res){
    if (req.param('id') !== 'me' && req.param('id') !== 'yy') {
        res.send({ret:-1002, msg:'invalid request'});
        return;
    }
    if (req.param('comment').length > 10) {
        res.send({ret:-1, msg:'comment longer than 10 charactors are not supported'});
        return;
    }
    db.addComment(req.param('id'), req.param('comment').trim()); 
    res.send({ret:0});
});

router.all('/get_letter', function(req, res){
    db.getLetter(req.param('password'), function(rst){
        res.send(rst);
    });
});


router.all('/*', function(req, res) {
    res.send({ret:-1001, msg:'undefined api:' + req.path});
});

module.exports = router;
