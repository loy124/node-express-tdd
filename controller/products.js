const productModel = require("../models/Product");

const createProduct = async (req, res, next) => {
  try {
    const createdProduct = await productModel.create(req.body);
    // console.log("createdProduct", createdProduct);
    return res.status(201).json(createdProduct);
  } catch (error) {
    next(error);
  }
};

const getProduct = async(req, res, next) => {
  try {
    await productModel.find({});
    return res.status(200).send();
  } catch (error) {
    
  }
}




module.exports = { createProduct, getProduct };
