var express = require('express');
var router = express.Router();

/* get home page. */
router.get("/", function (req, res) {
  // Show form, default value = current nickname
  res.render("index", { /*"nickname": req.session.nickname, "error": null*/ });
});

module.exports = router;

