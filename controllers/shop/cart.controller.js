const Cart = require('../../models/Cart')
const Product = require('../../models/Product');
const CustomeError = require('../../utils/customeErrorHandler');

const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        if (!userId || !productId || !quantity) {
            return CustomeError("invalid data provided!", 400)
        }
        const product = await Product.findById(productId)
        if (!product) return CustomeError("Product not found!", 404)

        let cart = await Cart.findOne({ userId })
        if (!cart) {
            cart = new Cart({ userId, items: [] })
        }
        const findCurrentProductIndex = cart.items.findIndex(item => item.productId.toString() == productId)
        if (findCurrentProductIndex === -1) {
            cart.items.push({ productId, quantity })
        } else {
            cart.items[findCurrentProductIndex].quantity += quantity
        }
        await cart.save()
        res.status(200).json({
            message: "Produt added successfully", success: true, data: cart
        })
    } catch (error) {
        next(error)
    }
}

const fetchCartItems = async (req, res) => {
    const { userId } = req.params;
    try {
        if (!userId) return CustomeError("User id is required!", 400);
        const cart = await Cart.findOne({ userId }).populate({
            path: "item.productId", select: "Image title price salePrice"
        })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    addToCart,
}