var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
req.session.destroy( err =>{
    err ? console.error(err): res.redirect('/');
  })
});

  module.exports = router;