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


const products = async (req, res) => {

 try {
  const product =await productModel.find();

  res.status(200).json({
    success:true,
    count : product.length,
    product

 });
 }
 catch(error){
  res.status(500).json({
      success: false,
      error: error.message,
    });
  }
 
}


const getProductById = async (req, res) => {
  const { id } = req.params;

  const product = await productModel.findById(id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.status(200).json({
    success: true,
    product
  });
}





module.exports = {
  createProduct,
  products,
  getProductById
};