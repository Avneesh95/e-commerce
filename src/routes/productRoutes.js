const express = require("express");
const router = express.Router();

const { createProduct ,products , getProductById , updateProduct, deleteProduct} = require("../controllers/productController");


router.post("/add", createProduct);

router.get('/',products);

router.get("/:id", getProductById);

router.put("/:id", updateProduct);

router.delete('/:id', deleteProduct);

module.exports = router;