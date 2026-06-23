const express = require("express");
const router = express.Router();

const { createProduct ,products , getProductById} = require("../controllers/productController");


router.post("/", createProduct);

router.get('/',products);

router.get("/:id", getProductById);

module.exports = router;