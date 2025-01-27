const { imageUploadUtils } = require("../../config/cloudnary");
const Product = require("../../models/Product");
const CustomeError = require("../../utils/customeErrorHandler");

const handleImageUpload = async (req, res, next) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtils(url);
    if (!result) {
      throw new CustomeError("Image not uploaded", 400);
    }
    res.status(200).json({
      message: "Image upload successfully",
      success: true,
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const addProduct = async (req, res, next) => {
  const {
    image,
    title,
    description,
    category,
    brand,
    price,
    salePrice,
    totalStack,
  } = req.body;
  try {
    const newCreatedProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStack,
    });
    await newCreatedProduct.save();
    res.status(201).json({
      message: "Product created successfully",
      success: true,
      statusCode: 201,
      data: newCreatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const allProducts = await Product.find();
    res.status(200).json({
      message: "Product get successfully",
      success: true,
      data: allProducts,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById({
      id,
    });
    if (!product) throw CustomeError("Product not exist", 400);
    res.status(200).json({
      message: "Product get successfully",
      statusCode: 200,
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSingleProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) throw CustomeError("Product not exist", 400);
    await Product.findByIdAndDelete(id);
    res.status(200).json({
      message: "Product deleted successfully",
      statusCode: 200,
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) throw CustomeError("Product not available", 400);
    await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
      message: "Product updated successfully",
      success: true,
      statusCode: 200,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  getAllProducts,
  getSingleProduct,
  deleteSingleProduct,
  updateProduct,
};
