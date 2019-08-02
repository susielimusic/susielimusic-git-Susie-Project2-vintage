var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/',(req, res)=> {

  console.log("Hello Guys")
  res.render('index');
});

module.exports = router;


// var express = require('express');
// var router = express.Router();
// var mongoose=require("mongoose")
// const passport=require("passport")


// // root route
// router.get('/', function(req, res, next) {
//   res.render('index');
// });


// //route to test chat built with socket io
// router.get('/chat',(req,res)=>{
//     res.render('chatForm')
// })

// router.get('/auth/google/logout',(req,res)=>{
//   req.logOut()
//   res.redirect('/')
// })

// /*********************GOOGLE AUTH************************** */
// //  route to test for passport
// router.get('/auth/login/google',passport.authenticate("google",{
//     scope:['profile']
// })) 



// router.get('/auth/google/redirect',passport.authenticate('google'),(req,res)=>{
//     res.redirect('/user/profile')
// })


// /*********************FACEBOOK AUTH************************** */


// router.get('/auth/facebook/logout',(req,res)=>{
//   req.logOut()
//   res.redirect('/')
// })


// //  route to test for passport
// router.get('/auth/login/facebook',passport.authenticate("facebook",{
//   failureRedirect:"/",
//     scope:['profile']
// })) 



// router.get('/auth/facebook/redirect',passport.authenticate('facebook'),(req,res)=>{
//     res.redirect('/user/profile')
// })


// module.exports = router;