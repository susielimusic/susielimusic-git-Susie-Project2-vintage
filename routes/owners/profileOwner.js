var express = require('express');
var router = express.Router();

//GET Route for  => www.abstmo.com/about
router.get('/', (req, res) => {
    if(req.session.user){
        res.render('profileOwner.hbs', {user: req.session.user});
    }
    else{
        res.send('You must login or signup as an owner')
    }
});

module.exports = router;