var express = require('express');
var router = express.Router();
var Lover = require('../models/lovers')
const bcrypt = require('bcrypt');

router.get('/login', function(req, res, next) {
    res.render("login");
  });

router.post('/login', function(req, res, next) {
    Lover.findOne({email: req.body.email})
    .then((lover)=> {
      if(lover) {
        bcrypt.compare(req.body.password, lover.password, function(err, match) {
          if(err) throw new Error("Encryption error");
          if(match) {
            req.session.user = lover;
            res.redirect("/profile");
          } else {
            // password incorrect
            res.send("Invalid credentials.")
          }
        });
      } else {
        // user not found
        res.send("Invalid credentials");
      }     
    })
    .catch((error)=> {
      res.send("error")
    })
});

module.exports = router;