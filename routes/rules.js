var express = require('express');
var router = express.Router();

/* get rules page. */
router.get("/", function (req, res) {
  // Show form, default value = current nickname
  res.render("rules", {});
});

module.exports = router;