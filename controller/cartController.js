const Cart = require('../models/Cart');
const Product = require('../models/Product');

exports.addProductToCart = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.id;

  if(req.user.role !== 'customer'){
    return res.status(403).json({message: 'You need customer account to add item to cart.'});
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    let cart = await Cart.findOne({ userId });

    if (cart) {
      const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
      if (productIndex > -1) {
        return res.status(400).json({ message: 'Product is already in the cart.' });
      } else {
        cart.products.push({ productId, quantity: 1 });
      }
    } else {
      cart = new Cart({
        userId,
        products: [{ productId, quantity: 1 }],
      });
    }

    await cart.save();
    return res.status(200).json({ message: 'Product added to cart successfully.', cart });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getUserCartItems = async (req,res) => {
    const userId = req.user.id;

    if(!userId){
        return res.status(403).json({message: 'Authentication missing by user ID'});
    }
    try {
        const cart = await Cart.findOne({userId}).populate('products.productId');

        if (!cart) {
            return res.status(404).json({ message: 'No items in your cart.' });
        }

        return res.status(200).json({message: 'success', products: cart});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

exports.removeProductFromCart = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.id;

  if (req.user.role !== "customer") {
    return res
      .status(403)
      .json({
        message: "You need a customer account to remove items from the cart.",
      });
  }

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found." });
    }

    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );
    if (productIndex === -1) {
      return res
        .status(404)
        .json({ message: "Product not found in the cart." });
    }

    cart.products.splice(productIndex, 1);

    await cart.save();
    return res
      .status(200)
      .json({ message: "Product removed from cart successfully.", cart });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.changeProductQuantity = async (req, res) => {
    const { productId, operation } = req.body;
    const userId = req.user.id;

    if(!productId || !operation){
        return res.status(499).json({message: 'Request body field missing.'})
    }
  
    try {
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).json({ message: 'User cart not found.' });
      }
  
      const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
      if (productIndex === -1) {
        return res.status(404).json({ message: 'Product not found in the cart.' });
      }

      if(operation === 'increment'){
        cart.products[productIndex].quantity += 1;
      }else{
        if (cart.products[productIndex].quantity === 1) {
            return res.status(400).json({ message: 'Cannot decrement quantity. Quantity is already 1.' });
          }
      
        cart.products[productIndex].quantity -= 1;
      }
      await cart.save();
      return res.status(200).json({ message: 'Product quantity decremented successfully.', cart });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };