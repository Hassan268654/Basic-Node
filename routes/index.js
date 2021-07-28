const express = require('express');
const router = express.Router();

const studentRoutes = require('../routes/student/index');
router.use('/students', studentRoutes);


module.exports = router;