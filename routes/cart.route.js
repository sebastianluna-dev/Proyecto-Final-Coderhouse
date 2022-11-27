import { Router } from "express"
import { cartDAO } from "../services/cart.service.js"
import { isCartId } from "../middlewares/isCartId.js"

const router = Router()

router.post("/", isCartId, async (req, res) => {
    console.log("getCardById")
    const cartId = req.cookies.cartId
    const cart = await cartDAO.getCartById(cartId)
    res.send(cart)
})

router.delete("/", isCartId, async (req, res) => {
    console.log("deleteCardById")
    const cartId = req.cookies.cardId
    const cart = await await cartDAO.deleteCartById(cartId)
    res.send(cart)
})

router.post("/is_cart", isCartId, async (req, res) => {
    console.log("createCart")
    const cartId = req.cookies.cartId
    const cart = await cartDAO.getCartById(cartId)
    if (!cart) {
        const newCart = await cartDAO.createCart()
        res.cookie("cartId", newCart._id, { httpOnly: true })
        req.send({isCart: true})
        return
    }
    res.send({isCart: true})
}) 

router.get("/products", isCartId, async (req, res) => {
    console.log("getProducts")
    const cartId = req.cookies.cartId
    const products = await cartDAO.getCartProducts(cartId)
    console.log(products)
    res.send(products)
})

router.post("/products", isCartId, async (req, res) => {
    console.log("addProducttoCArt")
    const cartId = req.cookies.cartId
    const id_prod = req.body.id
    const cart = await cartDAO.addCartProduct(cartId, id_prod)
    res.send(cart)
})

router.delete("/products", async (req, res) => {
    console.log("deleteCartProduct")
    const cartId = req.cookies.cartId
    const id = req.body.id
    const product = await cartDAO.deleteCartProduct(cartId, id)
    res.send(product)
})

export default router 