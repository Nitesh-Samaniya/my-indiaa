const express = require('express');
const router = express.Router();
const cartController = require('../controller/cartController');
const authMiddleWare = require('../middleware/authMiddleware');

router.post('/add/:productId', authMiddleWare, cartController.addProductToCart);
router.get('/', authMiddleWare, cartController.getUserCartItems);
router.delete('/:productId', authMiddleWare, cartController.removeProductFromCart);
router.patch('/', authMiddleWare, cartController.changeProductQuantity);
router.post('/checkout', authMiddleWare, cartController.checkout);

module.exports = router;