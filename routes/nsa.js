var express = require('express');
var router = express.Router();

/** Middleware for limited access */
function requireLogin (req, res, next) {
  if (req.session.username) {
    // User is authenticated, let him in
    next();
  } else {
    // Otherwise, we redirect him to login form
    res.redirect("/");
  }
}

/* POST NSA game (requite authentification) */
router.post('/', [requireLogin], function (req, res, next) {
  res.render('NSA', { title: 'NSA' });
});

module.exports = router;