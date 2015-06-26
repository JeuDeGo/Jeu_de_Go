var express = require('express');
var router = express.Router();

/* POST NSA game (requite authentification) */
router.post('/', function (req, res, next) {
  res.render('nsa', { title: 'NSA' });
});

module.exports = router;