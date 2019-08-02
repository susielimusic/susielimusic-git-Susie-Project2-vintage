var express = require('express');
var router = express.Router();
var Owner = require('../../models/owners');
const bcrypt = require('bcrypt')

router.get('/login', function(req, res, next) {
    res.render("login_owner");
  });

router.post('/login', function(req, res, next) {
  debugger
  Owner.findOne({username: req.body.username})
    .then( owner => {
      debugger
      if(!owner) {
        res.render('login_owner', {
          errorMsg1 : "user doesn't not exist"
        }); return;
      }
      if(bcrypt.compareSync(req.body.password, owner.password)) {
        debugger
        // req.session.user = owner;
        res.redirect('/profileOwner')
      } else {
        res.render('login_owner', {errorMessage2: "sorry invalid credentials"})
      }

    })
    .catch(err => {
      console.log(err + 'err')
    });

    // .then((owner)=> {
    //   if(owner) {
    //     debugger
    //     bcrypt.compare(req.body.password, owner.password, function(err, match) {
    //       if(err) throw new Error("Encryption error");
    //       if(match) {
    //         debugger
    //         req.session.user = owner;
    //         res.redirect("/profileOwner");
    //       } else {
    //         // password incorrect
    //         res.send("Invalid credentials.")
    //       }
    //     });
    //   } else {
    //     // user not found
    //     res.send("Invalid credentials");
    //   }     
    // })
    // .catch((error)=> {
    //   res.send("error")
    // })
});

router.get("/logout", (req,res)=> {
  req.session.destroy();
  res.redirect("/");
})

//   console.log(req.body)
//     let email = req.body.email;
//     let password = req.body.password

//   Lover.create({email, password})
//   .then(()=>{
//       res.redirect('/')
//   })
// });

module.exports = router;