const express = require('express');
const router = express.Router();

const productsRoute = require("./products");
router.use("/api/products",productsRoute);

module.exports = router;