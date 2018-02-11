var express = require('express');
var router = express.Router();
var multer = require('multer');
var mongoose = require('mongoose');

//path and originalname are the fields stored in mongoDB
var imageSchema = mongoose.Schema({
 path: {
 type: String,
 required: true,
 trim: true
 },
 originalname: {
 type: String,
 required: true
 },
 aadhaar: {
 type: String,
 required: true
  },
  date: {
  type: String,
  required: true
  },
  labname: {
  type: String,
  required: true
  }
});


var Image = mongoose.model('files', imageSchema);

module.exports = Image;
