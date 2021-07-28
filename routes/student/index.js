const express = require('express');
const studentController = require('../../controllers/studentController')
const path = require('path');
const router = express.Router();
const studentRoutes = express.Router();
var fs = require('fs');
var mime = require('mime');

studentRoutes.get('/',studentController.index);
studentRoutes.post('/create',studentController.store);


module.exports = studentRoutes;