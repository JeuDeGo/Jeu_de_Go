var express = require('express');
var router = express.Router();

/* POST NSA game (requite authentification) */
router.post('/', function (req, res, next) {
  res.render('NSA', { title: 'NSA' });
});

module.exports = router;