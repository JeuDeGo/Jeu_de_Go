var express = require('express');
var router = express.Router();

/* POST VS game (requite authentification) */
router.post('/', function (req, res, next) {
  res.render('vs', { title: 'VS' });
});

module.exports = router;