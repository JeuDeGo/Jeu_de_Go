var express = require('express');
var router = express.Router();

/* POST Anon game (requite authentification) */
router.post('/', function (req, res, next) {
  res.render('anonSolo', { title: 'anonSolo' });
});

module.exports = router;