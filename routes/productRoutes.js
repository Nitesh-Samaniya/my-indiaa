const express = require('express');
const router = express.Router();
const authMiddleWare = require('../middleware/authMiddleware');
const productController = require('../controller/productController');

router.get('/search', productController.searchProducts);
router.post('/add', authMiddleWare, productController.addProduct);
router.get('/', productController.getProducts);
router.get('/:productId', productController.getProductById);

module.exports = router;