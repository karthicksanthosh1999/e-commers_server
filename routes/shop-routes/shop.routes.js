const {
  getFilteredProduct,
  getProductDetails
} = require("../../controllers/shop/product.controller");
const express = require("express");

const shopRouter = express.Router();
shopRouter.get("/filtered-products", getFilteredProduct);
shopRouter.get("/get-product/:id", getProductDetails)

module.exports = shopRouter;
