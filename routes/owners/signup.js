var express = require('express');
var router = express.Router();
var Owner = require('../../models/owners');
const bcrypt = require('bcrypt');
const saltRounds = 10;


router.get('/', (req, res, next) => {
    res.render("signup_owner");
  });

router.post('/', (req, res, next) => {
  bcrypt
  debugger
  console.log(req.body)
    let username = req.body.username
    let email = req.body.email;
    let password = req.body.password

  bcrypt.hash(password, saltRounds, (err, hash) => {
    Owner.create({username: username,email : email, password : hash})
    .then((owner)=>{
      debugger
        req.session.user = owner;
        res.redirect('/owners/profile')
    })
    .catch( err => {
      console.log(err + 'err')
    })
  })

 
});

module.exports = router;