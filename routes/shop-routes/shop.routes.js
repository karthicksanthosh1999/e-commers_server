const {
  getFilteredProduct,
} = require("../../controllers/shop/product.controller");
const express = require("express");

const shopRouter = express.Router();
shopRouter.get("/filtered-products", getFilteredProduct);

module.exports = shopRouter;
