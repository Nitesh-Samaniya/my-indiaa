const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authMiddleWare = require('../middleware/authMiddleware');

router.get('/', authMiddleWare, userController.getProfile);
router.patch('/update', userController.updateProfile);

module.exports = router;