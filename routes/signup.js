var express = require('express');
var router = express.Router();
var Lover = require('../models/lovers')

const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/', (req, res, next) => {
  console.log(req.session)
    res.render("signup");
  });

router.post('/', (req, res, next) => {
  console.log(req.body)
    let email = req.body.email;
    let password = req.body.password
    bcrypt.hash(password, saltRounds, function(err, hash) {
      // Store hash in your password DB.
      Lover.create({email: email, password: hash})
      .then((lover)=>{
          req.session.user = lover;
          res.redirect('/profile')
      })
      .catch(err =>{
        console.error(err)
      })
    });
});

module.exports = router;