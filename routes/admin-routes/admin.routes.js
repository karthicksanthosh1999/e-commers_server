const express = require("express");

const {
  handleImageUpload,
} = require("../../controllers/admin/product.controller");
const { upload } = require("../../config/cloudnary");

const adminRoute = express.Router();

adminRoute.post("/upload-image", upload.single("my_file"), handleImageUpload);

module.exports = adminRoute;
