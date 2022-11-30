import { Router } from "express"
import { cartDAO } from "../services/cart.service.js"
import { isCartId } from "../middlewares/isCartId.js"
import { isCartOnDB } from "../middlewares/isCartOnDB.js"
import { createACart } from "../middlewares/createACart.js"

const router = Router()

router.post("/", createACart, async (req, res) => {
    if (req.cartId) {
        res.send({ isCart: true, cartId: req.cartId })
        return
    }
    if (req.cookies.cartId) {
        res.send({ isCart: true, cartId: req.cookies.cartId })
        return
    }
}) 

router.delete("/", isCartId, isCartOnDB, async (req, res) => {
    const cartId = req.cookies.cartId
    const cart = await cartDAO.deleteCartById(cartId)
    res.send(cart)
})

router.get("/products", isCartId, isCartOnDB, async (req, res) => {
    const cartId = req.cookies.cartId
    const products = await cartDAO.getCartProducts(cartId)
    res.send(products)
})

router.post("/products", createACart, async (req, res) => {
    const cartId = req.cookies.cartId
    const id_prod = req.body.id
    const cart = await cartDAO.addCartProduct(cartId, id_prod)
    res.send(cart)
})

router.delete("/products", isCartId, async (req, res) => {
    const cartId = req.cookies.cartId
    const id = req.body.id
    const product = await cartDAO.deleteCartProduct(cartId, id)
    res.send(product)
})

export default router 