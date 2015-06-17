var express = require('express');
var router = express.Router();

/* get home page. */
router.get("/", function (req, res) {
  // Show form, default value = current nickname
  res.render("index", { "nickname": req.session.nickname, "error": null });
});

router.post('/', function(req, res, next) {
  var options = { "nickname": req.body.nickname, "error": null };
  if (!req.body.nickname) {
    options.error = "User name is required";
    res.render("index", options);
  } else if (req.body.nickname == req.session.nickname) {
    // User has not changed nickname, accept it as-is
    res.render('NSA');
  } else if (!req.body.nickname.match(/^[a-zA-Z0-9\-_]{3,}$/)) {
    options.error = "User name must have at least 3 alphanumeric characters";
    res.render("index", options);
  } else {
    // Validate if nickname is free
  req.sessionStore.all(function(err, sessions) {
    if (!err) {
      var found = false;
      for (var i=0; i<sessions.length; i++) {
        var session = JSON.parse(sessions[i]); // Si les sessions sont stockées en JSON

        if (session.nickname == req.body.nickname) {
          err = "User name already used by someone else";
          found = true;
          break;
        }
      }
    }
    if (err) {
      options.error = ""+err;
      res.render("index", options);
    } else {
      req.session.nickname = req.body.nickname;
      res.render("NSA");
      }
  });
  }
});

module.exports = router;

