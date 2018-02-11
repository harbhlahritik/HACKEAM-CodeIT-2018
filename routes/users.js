var express = require('express');
var router = express.Router();
var User = require('../models/user');
var routes = require('./imagefile');
var Image = require('../models/files');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

/* GET user login page. */
router.get('/login', function(req, res, next) {
    res.render('users');
});

// get user signup page
router.get('/signup', function(req, res, next) {
    res.render('signup');
});

//POST route for registering a new user
router.post('/signup', function (req, res, next) {

    if (req.body.name &&
        req.body.aadhaar &&
        req.body.password &&
        req.body.email &&
        req.body.mobile) {

        var userData = {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
            aadhaar: req.body.aadhaar,
            bloodGrp: req.body.bloodGrp,
            mobile: req.body.mobile,
        }
        // Creates a new MongoDB User Schema based JSON data
        User.create(userData, function (error, user) {
            if (error) {
                return next(error);
            } else {
                req.session.userId = user._id;
                return res.redirect('/users/afteruserlogin');
            }
        });
        // All fields should be provided for the User data to be created
    } else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
});

// post page for login
router.post('/login', function (req, res, next) {
    //checks if the username and password entered are available in the database
    if (req.body.logusername && req.body.logpassword) {
        User.authenticate(req.body.logusername, req.body.logpassword, function (error, user) {
            if (error || !user) {
                var err = new Error('Wrong email or password.');
                err.status = 401;
                return next(err);
            } else {
                req.session.userId = user._id;
                return res.redirect('/users/afteruserlogin');
            }
        });
    } else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
});

// GET route after registering
router.get('/afteruserlogin', function (req, res, next) {
    // gets the user id of the User
    User.findById(req.session.userId)
        .exec(function (error, user) {
            if (error) {
                return next(error);
            } else {
                if (user === null) {
                    var err = new Error('Not authorized! Go back!');
                    err.status = 400;
                    return next(err);
                } else {
                  // find the files for the user who is signed in
                   Image.find({ aadhaar: user.aadhaar }, function (err, image) {
                   if (err) return handleError(err);
                   console.log(image);
                    res.render('afteruserlogin',{ name: user.name ,
                                                    aadhaar: user.aadhaar ,
                                                    email: user.email ,
                                                    mobile: user.mobile,
                                                    image: image
                                                    });
                                                    // passing JSON data to front end
                 });

                }
            }
        });
});


// GET for logout
router.get('/logout', function (req, res, next) {
        // delete session object
        req.session.destroy(function() {

                res.redirect('/users/login');

        });

});

// To donload the single image/File using id from the MongoDB on clicking download button
router.get('/afteruserlogin/images/:id', function(req, res) {

//calling the function from imagefile.js class using routes object
routes.getImageById(req.params.id, function(err, genres) {
    if (err) {
    throw err;
  }
    res.download(genres.path);
  });
});

module.exports = router;
