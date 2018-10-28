'use strict';

const express = require('express');
const controller = require('./todo.controller');
const router = express.Router();
const VerifyToken = require('../auths/verifyToken');
const multer  = require('multer')
const path  = require('path')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname) 	
  }
})

var upload = multer({ storage: storage });


router.get('/', VerifyToken, controller.index);
router.get('/:id/download',controller.download);
router.get('/:id', VerifyToken, controller.retrieve);
router.post('/', VerifyToken,upload.single('file'), controller.create);
router.put('/:id', VerifyToken,upload.single('file'), controller.update);
router.delete('/:id', VerifyToken, controller.delete);


module.exports = router;