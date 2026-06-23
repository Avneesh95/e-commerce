const productModel = require("../model/productModel");

const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category, stock } = req.body;
    const product = await productModel.create({
      name,
      description,
      price,
      image,
      category,
      stock
    });
    res.status(201).json({
      success: true,
      product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });

  }
}



module.exports = {
  createProduct
};