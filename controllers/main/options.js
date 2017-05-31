var express = require('express');

var router  = express.Router();
var data    = require('../../config/database.js');
var Alert   = require('../../config/alert.js');
var bcrypt  = require('bcrypt-nodejs');

var saltRounds = 8;

router.get('/options', function (req, res) {
    var user;
    if (req.user === undefined){
        user = "tester";
    }
    else {
        user = req.user
    }
    var alert = new Alert();
    alert.initiate(req);
    data.db.accounts.find(function (err, docs) {
        data.db.loginCodes.find(function (err, docs2) {
            res.render('options.ejs', {
                user: user,
                accounts: docs,
                loginCodes: docs2,
                alert: alert
            });
        });
    });
});
router.post('/options', function (req, res) {
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        var newAccount = {
            username: req.body.username,
            password: hash
        };
        data.db.accounts.find(function (err, users) {
            var alert = null;
            var user  = users.find(function (user) {
                return user.username == newAccount.username;
            });
            if (typeof user === 'undefined') {
                data.db.accounts.insert(newAccount, function (err, result) {

                    if (err) {
                        console.log(err);
                        var alertMessage = "Failed to insert to database.<br>" + err;
                        alert            = new Alert(false, alertMessage);
                        alert.passToNextPage(req);
                    } else {
                        alert = new Alert(true, "The announcement was successfully added");
                        alert.passToNextPage(req);
                    }

                });
            } else {
                alert = new Alert(false, "Chosen username is already in use");
                alert.passToNextPage(req);
            }

            res.redirect('/options');

        });
    });
});


module.exports = router;
