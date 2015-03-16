var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/*', function(req, res, next) {
  if(req.session.loggedIn == undefined) {
      res.render("login.ejs");
  } else {
      next();
  }
});

router.get('/profile', function(req,res){
   res.render('profile.ejs');
});

module.exports = router;
