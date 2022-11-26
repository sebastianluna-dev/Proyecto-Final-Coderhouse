import { Router } from "express"
import { cartDAO } from "../services/cart.service.js"
const router = Router()

router.post("/is_cart", async (req, res) => {

    const { cartId } = req.cookies
    const cart = await cartDAO.getCartById(cartId)

    if (!cartId || !cart) {
        console.log("no hay cookie de carrito")
        const newCart = await cartDAO.createCart()
        console.log(newCart)
        res.cookie("cartId", newCart._id).send({isCart: true})
        return
    }
    console.log("si hay cookie de carrtio y si la encontro")
    res.send({isCart: true})
    
    
}) 

router.post("/", async (req, res) => {
    const { cartId } = req.cookies
    const cart = await cartDAO.getCartById(cartId)
    res.send(cart)
})

router.delete("/", async (req, res) => {
    const { cartId } = req.cookies
    if (cartId) {
        const cart = await await cartDAO.deleteCartById(cartId)
        res.send(cart)
    } else {
        res.send({message: "there no a cart"})
    }
})

router.post("/products/:id_prod", async (req, res) => {
    const { cartId } = req.cookies
    const { id_prod } = req.params 
    const cart = await cartDAO.addProduct(cartId, id_prod)
    res.send(cart)
})

router.get("/products", async (req, res) => {
    const { cartId } = req.cookies
    if (cartId) {
        const products = await cartDAO.getProducts(cartId)
        res.send(products)
    } else {
        res.send({message: "there no a cart"})
    }
})

router.delete("/products/:id_prod", async (req, res) => {
    const { cartId } = req.cookies
    const product = await cartDAO.deleteProduct(cartId)
    res.send(product)
})

export default router 