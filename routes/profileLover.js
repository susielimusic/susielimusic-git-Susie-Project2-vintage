var express = require('express');
var router = express.Router();

//GET Route for  => www.abstmo.com/about
router.get('/', (req, res) => {

if(req.session.user){
    res.render('profileLover.hbs', {lover: req.session.user});
}
else{
    res.send('You must login or signup')
}
  
  //res.send('Welcome to the Profile Page!');
});


module.exports = router;