const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.get('/check', userController.checkRoute)
router.get('/:id', userController.getProfile);
router.patch('/update', userController.updateProfile);

module.exports = router;