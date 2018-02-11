var express = require('express');
var router = express.Router();
var Lab = require('../models/lab');
var multer = require('multer');
var mongoose = require('mongoose');
var routes = require('./imagefile');

/* GET lab login page. */
router.get('/login', function(req, res, next) {
    res.render('labs');
});

// GET lab signup page
router.get('/signuplab', function(req, res, next) {
    res.render('signuplab');
});

//POST route for registering a new lab
router.post('/signuplab', function (req, res, next) {

    if (req.body.name &&
        req.body.license &&
        req.body.password &&
        req.body.email &&
        req.body.mobile) {

        var labData = {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
            license: req.body.license,
            mobile: req.body.mobile,
        }

        Lab.create(labData, function (error, lab) {
            if (error) {
                return next(error);
            } else {
                req.session.labId = lab._id;
                return res.redirect('/labs/afterlablogin');
            }
        });

    } else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
});

//POST route for logging in of a lab
router.post('/login', function (req, res, next) {
    //checks if the entered lab data is available in the lab DataBase
    if (req.body.loglabname && req.body.logpassword) {
        Lab.authenticate(req.body.loglabname, req.body.logpassword, function (error, lab) {
            if (error || !lab) {
                var err = new Error('Wrong userid or password.');
                err.status = 401;
                return next(err);
            } else {
                req.session.labId = lab._id;
                return res.redirect('/labs/afterlablogin');
            }
        });
    } else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
});

// GET route after registering
router.get('/afterlablogin', function (req, res, next) {
    Lab.findById(req.session.labId)
        .exec(function (error, lab) {
            if (error) {
                return next(error);
            } else {
                if (lab === null) {
                    var err = new Error('Not authorized! Go back!');
                    err.status = 400;
                    return next(err);
                } else {
                    res.render('afterlablogin');
                }
            }
        });
});

// GET for logout
router.get('/logout', function (req, res, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function() {

                res.redirect('/labs/login');

        });
    }
});

//------------------------------------------------------------------------------------


// initialising the multer storage for local host
var storage = multer.diskStorage({
 destination: function(req, file, cb) {
 cb(null, 'uploads/')
 },
 filename: function(req, file, cb) {
 cb(null, file.originalname);
 }
});

// Defining the path where the files are available
var upload = multer({
 storage: storage
});

router.post('/afterlablogin', upload.any(), function(req, res, next) {
//req.files has the information regarding the file we are uploading...
//from the total information, i am just using the path,imageName and the labname,date,aadhaar
// from the form available to the lab to store in the mongo collection(table) files

 var path = req.files[0].path;
 var imageName = req.files[0].originalname;
 var labname = req.body.labname;
 var date = req.body.date;
 var uploaded_aadhaar_file = req.body.uploaded_aadhaar_file;
 var newName = req.body.reportName;
 var imagepath = {};
 imagepath['path'] = path;
 imagepath['originalname'] = newName;
 imagepath['aadhaar'] = uploaded_aadhaar_file;
 imagepath['labname'] = labname;
 imagepath['date'] = date;
 //imagepath contains 5 objects, path,imageName,aadhaar,labname and the date

 //we are passing two objects in the addImage method - path and name
 routes.addImage(imagepath, function(err) {

 })
 res.render('afterlablogin');
});
module.exports = router;
