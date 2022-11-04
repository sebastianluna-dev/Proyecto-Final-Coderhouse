const express = require("express")
const cart = require("../services/cart.service")
const Products = require("../services/products.service")
const router = express.Router()
const file = new cart("carts.txt")
const products = new Products("products.txt")

const checkProduct = async (req, res, next) => {
    const { id_prod } = req.params
    const product = await products.getById(parseInt(id_prod))
    console.log(product)
    if ( product?.message ) {
        res.send(false)
    } else {
        next()
        console.log(product)
    }
}

router.post("/", async (req, res) => {
    const id = toString(await file.createCart())
    res.send(id)
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params
    const cart  = await file.deleteCart(parseInt(id))
    res.send(cart)
})

router.get("/:id/products", async (req, res) => {
    const { id } = req.params
    const products  = await file.getCartProducts(parseInt(id))
    res.send(products)
})

router.post("/:id/products/:id_prod", checkProduct, async (req, res) => {
    const { id } = req.params
    const { id_prod } = req.params
    const product = await products.getById(parseInt(id_prod))
    const addProduct = await file.addCartProduct(parseInt(id), product)
    res.send(addProduct)
})

router.delete("/:id/products/:id_prod", checkProduct, async (req, res) => {
    const { id, id_prod } = req.params
    const product = await file.deleteCartProduct(parseInt(id), parseInt(id_prod))
    res.send(product)
})

module.exports = router