var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { roseNum: 0 });
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
