const express = require("express");
const router = express.Router();

const { createProduct ,products , getProductById , updateProduct} = require("../controllers/productController");


router.post("/", createProduct);

router.get('/',products);

router.get("/:id", getProductById);

router.put("/:id", updateProduct);



module.exports = router;