const { json } = require('express');
const Product = require('../models/Product');

exports.addProduct = async (req,res)=>{
    let {name, description, price, category, image, qty = 1} = req.body;

    if (req.user.role !== 'seller') {
      return res.status(403).json({ message: 'Only sellers can add products' });
    }

    qty = parseInt(qty);

    if(!name || !description || !price || !category || !image){
        return res.status(499).json({message: 'Product fields is/are missing.'});
    }

    try {
      const product = new Product({
        name, description, price, category, image, qty,
        createdBy: req?.user?.id
      });

      await product.save();
      return res.status(201).json({message: 'product added successfuly.', product});
    } catch (error) {
      return res.status(500).json({message: error.message});
    }

}

exports.getProducts = async (req,res)=>{
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const skip = (page-1) * limit;
  try {
    const products = await Product.find().skip(skip).limit(limit);
    const totalProducts = await Product.countDocuments();

    const totalPages = Math.ceil(totalProducts / limit);
    return res.status(200).json({
      message: 'products received successfully',
      currentPage: page,
      totalPages,
      totalProducts,
      products
    })
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
}

exports.getProductById = async (req,res)=>{
  const {productId} = req.params;
  if(!productId){
    return res.status(499).json({message: 'Product id is missing.'});
  }
  try {
    const product = await Product.findById(productId);
    if(!product){
      return res.status(404).json({message: 'Product not found.'});
    }
    return res.status(200).json({message: 'success', product});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
}

exports.searchProducts = async (req, res) => {
  const { name, category, page = 1, limit = 10 } = req.query;

  let query = {};

  if (name) {
    query.name = { $regex: name, $options: 'i' };
  }

  if (category) {
    query.category = { $regex: category, $options: 'i' };
  }

  const skip = (parseInt(page) - 1) * parseInt(limit);

  try {
    const products = await Product.find(query).skip(skip).limit(parseInt(limit));
    const totalProducts = await Product.countDocuments(query);

    const totalPages = Math.ceil(totalProducts / parseInt(limit));

    return res.status(200).json({
      message: "success",
      currentPage: parseInt(page),
      totalPages,
      totalProducts,
      products,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteProduct = async (req,res)=>{
  const {productId} = req.params;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    if (product.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'You are not authorized to delete this product.' });
    }

    await Product.findByIdAndDelete(productId);
    return res.status(200).json({message: 'Product deleted successfully.'});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
}

exports.updateProduct = async (req,res)=>{
  const {name, description, price, category, image} = req.body;
  const productId = req.params.productId;
  try {
    const product = await Product.findById(productId)

    if(!product){
      return res.status(400).json({message: 'Product not found'});
    }

    if (product.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'You are not authorized to delete this product.' });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.image = image || product.image;

    product.save();
    return res.status(201).json({message: 'success', product});
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
}
