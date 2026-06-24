const Cart = require("../model/CartModel");
const Product = require("../model/ProductModel");

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide valid productId and quantity",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    
    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [
          {
            product: productId,
            quantity,
          },
        ],
      });

      return res.status(201).json({
        success: true,
        message: "Product added to cart",
        cart,
      });
    }

    
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
      });
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addToCart,
};