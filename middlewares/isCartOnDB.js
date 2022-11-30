import { cartDAO } from "../services/cart.service.js";

export const isCartOnDB = async (req, res, next) => {
    const cartId = req.cookies.cartId
    const cart = await cartDAO.getCartById(cartId)
    if (!cart) {
        res.send({
            message: "there isnt a cart in your DB whit this id",
            cartStatus: false
        })
        return 
    } 
    next()
}
