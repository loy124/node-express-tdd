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
    const allProducts = await productModel.find({});
    return res.status(200).json(allProducts);
  } catch (error) {
      next(error);
  }
}

const getProductById = async (req, res, next) => {
  try {
      const product = await productModel.findById(req.params.productId);
      if (product) {
          return res.status(200).json(product);
      } else {
          return res.status(404).send();
      }
  } catch (error) {
      next(error)
  }
}

const updateProduct = async (req, res, next) => {
  try {
      let updatedProduct = await productModel.findByIdAndUpdate(
          req.params.productId,
          req.body,
          { new: true }
      )
      if (updatedProduct) {
          return res.status(200).json(updatedProduct);
      } else {
          return res.status(404).send();
      }
  } catch (error) {
      next(error)
  }

};

const deleteProduct = async (req, res, next) => {
  try {
      let deletedProduct = await productModel.findByIdAndDelete(req.params.productId)
      if (deletedProduct) {
          return res.status(200).json(deletedProduct);
      } else {
          return res.status(404).send();
      }
  } catch (error) {
      next(error)
  }
};


module.exports = { createProduct, getProduct, getProductById, updateProduct, deleteProduct };
