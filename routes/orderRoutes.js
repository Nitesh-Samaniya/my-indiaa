const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, orderController.getOrders);
router.get('/:orderId', authMiddleware, orderController.getOrderById);

module.exports = router;