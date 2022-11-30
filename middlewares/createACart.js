import { cartDAO } from "../services/cart.service.js"

export const createACart = async (req, res, next) => {
    const cartId = req.cookies.cartId
    const cart = await cartDAO.getCartById(cartId)
    if (!cart || !cartId) {
        const newCart = await cartDAO.createCart()
        res.cookie("cartId", newCart._id)
        req.cartId = newCart._id
    }
    next()
}
