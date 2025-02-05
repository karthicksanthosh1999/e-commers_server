const PRODUCT = require("../../models/Product");
const CustomeError = require("../../utils/customeErrorHandler");

const getFilteredProduct = async (req, res, next) => {
  const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;
  try {
    const filters = {}

    if (category.length) {
      filters.category = { $in: category.split(",") }
    }
    if (category.brand) {
      filters.brand = { $in: brand.split(",") }
    }

    let sort = {}
    switch (sortBy) {
      case 'price-lowtohigh':
        sort.price = 1
        break;
      case 'price-hightolow':
        sort.price = -1
        break;
      case 'title-atoz':
        sort.title = 1
        break;
      case 'title-ztoa':
        sort.title = -1
        break;
      default:
        sort.price = 1
        break;
    }

    const products = await PRODUCT.find(filters).sort(sort);
    res.status(200).json({
      message: "Product fetch successfully",
      success: true,
      statusCode: 200,
      data: products,
    });
  } catch (next) {
    next(error);
  }
};

const getProductDetails = async (req, res, error) => {
  const { id } = req.params;
  try {
    const product = await PRODUCT.findById(id);
    if (!product) {
      return next(new CustomeError("Product not exist!", 404))
    }
    res.status(200).json({
      message: "Product get successfully",
      success: true,
      statusCode: 200,
      data: product
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { getFilteredProduct, getProductDetails };
