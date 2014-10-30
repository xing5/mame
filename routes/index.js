var express = require('express');
var router = express.Router();
var db = require('../modules/db')

/* GET home page. */
router.get('/', function(req, res) {
    db.getRose(function(num){
        res.render('index', { roseNum: num?num:0});
    });
});

router.get('/me', function(req, res) {
  res.render('me', { title: 'MaMe' });
});

router.get('/her', function(req, res) {
  res.render('her', { title: 'MaMe' });
});

router.get('/story', function(req, res) {
  res.render('story', { title: 'MaMe' });
});

router.get('/letter', function(req, res) {
  res.render('letter', { title: 'MaMe' });
});

module.exports = router;
