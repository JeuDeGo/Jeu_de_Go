var express = require('express');
var router = express.Router();

/* get mail page. */
router.get("/", function (req, res) {
  res.render("mail", {});
});

module.exports = router;