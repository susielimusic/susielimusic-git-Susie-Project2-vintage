var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
var cookieParser = require('cookie-parser');
const saltRounds = 10;
const owner = require('../../models/owners');
const Product=require('../../models/products')




router.use((req,res,next)=>{
  res.locals.currentUser = req.session.userId
  next()
})

// var requiresLogin=  function (req, res, next) {
//   if (req.session.userId) {
//     return next();
//   } else {
//     var err = new Error('You must be logged in to view this page.');
//     err.status = 401;
//     return next(err);
//   }
// }



//route --> /owner/profile
router.get('/profile', (req, res) =>{
  if(!req.session.userId){
    res.redirect('/');
  } else {
    owner.findById(req.session.userId,(err, user)=>{
      if (err) res.send(err)
       else res.render('profileOwner.hbs', {user});
    });
  }
});


router.get('product/create',(req,res)=>{
  owner.find({},(err, user)=>{
      debugger;
      if (err) res.send("error")
      else res.render('Products/createProduct', {user});
  })
 
})

router.post("/product/:id/delete",(req,res)=>{
  Product.findByIdAndDelete(req.params.id, (err)=>{
      if(err) console.log(err)
       else res.redirect("/")
  })
})

router.get("/product/:id/edit",(req,res)=>{
  Product.findById(req.params.id,(err,product)=>{
      if (err) res.render("error", {err})
       else {  
              if(err) console.log(err)
              else res.render("Products/editProduct", {product})
      }
  })
})


router.post("/product/:id",(req,res)=>{
  const {name,imageUrl, description,weight,size}=req.body
  const update={
    name,
    imageUrl,
     description,
     weight,
     size
  }
  Product.findByIdAndUpdate(req.params.id, update, (err) => {
      if (err){ return next(err); }
      res.redirect('/products/product');
    });
})


//edit one owner
//route --> /owner/edit/:id
//GET to render page
router.get('/edit/:id', (req, res) => {
  owner.findById(req.params.id, (err, owner) => {
    if (err) res.status(404).send('The requested profile was not found');
    else res.render('editOwner', {user: owner});
  });
});

//POST to pass information
router.post('/edit/:id', (req, res) => {
 
  let editedOwner = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    companyName: req.body.companyName,
    address: {
      street: req.body.street,
      city: req.body.city,
      country: req.body.country
    },
    imageUrl: req.body.imageUrl,
    description: req.body.description
  };
  
  owner.findByIdAndUpdate(req.params.id, editedOwner, (err) => {
    
    if(err)console.log(err);
    // else res.status(200).send(`${editedOwner.firstName} was successfully updated`); 
    else res.status(200).redirect('/owner/profile');
  });
});

module.exports = router;