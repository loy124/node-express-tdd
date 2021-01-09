const express = require('express');
const router = express.Router();
const {createProduct, getProduct} = require("../controller/products")

router.get('/', getProduct);
router.post('/', createProduct);

module.exports = router;