const express = require("express")
const products = require("../services/products.service")
const router = express.Router()
const file = new products("products.txt")


const checkProduct = (req, res, next) => {
    if (
        req.body.title &&
        req.body.description &&
        req.body.code && 
        req.body.image_url &&
        req.body.price &&
        req.body.stock
    ) {
        next()
    } else {
        res.send(false)
    }
}

router.get("/", async (req, res) => {
    const products = await file.getAll()
    res.send(products)
})

router.post("/", checkProduct, async (req, res) => {
    const product = {
        title: req.body.title,
        description: req.body.description,
        code: req.body.code,
        price: parseInt(req.body.price),
        stock: parseInt(req.body.stock),
        image_url: req.body.image_url

    }
    const products = await file.save(product)
    res.send(products)
})

router.put("/", async (req, res) => {
    const product = {
        title: req.body.title,
        price: parseInt(req.body.price),
        image: req.body.image,
        id: parseInt(req.body.id)
    }
    const replacedProduct = await file.replaceById(product)
    res.send(replacedProduct)
})

router.get("/randomProduct", async (req, res) => {
    const randomProduct = await file.getRandom()
    res.send(randomProduct)
})

router.get("/:id", async (req, res) => {
    const { id } = req.params
    const product = await file.getById(parseInt(id))
    res.send(product)
})

router.delete("/:id", async (req, res)=> {
    const { id } = req.params
    const product = await file.deleteById(parseInt(id))
    res.send(product)
})

module.exports = router