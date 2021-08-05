const express = require('express');
const studentController = require('../../controllers/studentController')
const studentValidators = require('../../validations/studentCreate')
const path = require('path');
const router = express.Router();
const studentRoutes = express.Router();


studentRoutes.get('/',studentController.index);
studentRoutes.post('/create',[studentValidators.studentCreate(), studentValidators.validate],studentController.store);
studentRoutes.get('/:id',studentController.show);
studentRoutes.put('/update',studentController.update);
studentRoutes.delete('/delete/:id',studentController.destroy);

module.exports = studentRoutes;