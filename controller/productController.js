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
