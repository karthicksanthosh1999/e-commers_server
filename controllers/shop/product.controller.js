const PRODUCT = require("../../models/Product");

const getFilteredProduct = async (req, res, error) => {
  try {
    const products = await PRODUCT.find({});
    res.status(200).json({
      message: "Product fetch successfully",
      success: true,
      statusCode: 200,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getFilteredProduct };
