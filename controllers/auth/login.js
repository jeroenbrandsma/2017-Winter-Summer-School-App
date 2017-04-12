var express = require('express');
var router = express.Router();
var passport = require('passport');
	
// Redirect the user if they are already logged in.
router.get('/', function(req, res) {
        if(req.isAuthenticated()) {
	   		res.redirect('/main');
   		} else {
	        res.render('file', {
	            message: req.flash('error')
	        });
        }
});

// User tries to login
router.post('/', passport.authenticate('login', {
        successRedirect: '/main',
        failureRedirect: '/',
        badRequestMessage : 'Invalid username or password',
        failureFlash: true
}));

module.exports = router;
	
 