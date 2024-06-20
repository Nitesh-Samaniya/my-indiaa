const Order = require('../models/Order');

exports.getOrders = async (req, res) => {
  const userId = req.user.id;

  try {
    const orders = await Order.find({ userId }).populate('products.productId');
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  const { orderId } = req.params;
  const userId = req.user.id;

  try {
    const order = await Order.findOne({ _id: orderId, userId }).populate('products.productId');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
