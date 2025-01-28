const express = require("express");

const {
  handleImageUpload,
  addProduct,
  deleteSingleProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} = require("../../controllers/admin/product.controller");
const { upload } = require("../../config/cloudnary");

const adminRoute = express.Router();

adminRoute.post("/upload-image", upload.single("my_file"), handleImageUpload);
adminRoute.post("/add-product", addProduct);
adminRoute.get("/get-all-products", getAllProducts);
adminRoute.get("/get-single-product/:id", getSingleProduct);
adminRoute.delete("/delete-product/:id", deleteSingleProduct);
adminRoute.put("/update-product/:id", updateProduct);

module.exports = adminRoute;
