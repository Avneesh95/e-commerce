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
      stock,
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};


const products = async (req, res) => {
  try {
    const product = await productModel.find();

    res.status(200).json({
      success: true,
      count: product.length,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};


const getProductById = async (req, res) => {
  try {
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
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProduct = await productModel.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};


//delete Product

const deleteProduct = async(req , res)=>{

  const {id} = req.params
  const delProduct = await productModel.findById(id);

  if(!delProduct)
  {
    return res.status(400).json({
      message : "product not exist"
    })
  }

 try {

   const deleteProducts = await productModel.findByIdAndDelete(id);
  
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  
 } catch (error) {
  res.status(400).json({
    success : false,
    error
  })
 }

}



module.exports = {
  createProduct,
  products,
  getProductById,
  updateProduct,
  deleteProduct
};
