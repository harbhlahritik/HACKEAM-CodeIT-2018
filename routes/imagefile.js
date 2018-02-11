var express = require('express');
var router = express.Router();
var multer = require('multer');
var mongoose = require('mongoose');
var Image = require('../models/files');

router.getImages = function(callback, limit) {
 Image.find(callback).limit(limit);
}


router.getImageById = function(id, callback) {

 Image.findById(id, callback);

}

router.addImage = function(image, callback) {
 Image.create(image, callback);
}

module.exports = router;
