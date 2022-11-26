import { Router } from "express"
import { productDAO } from "../services/product.service.js"
const router = Router()

router.get("/", async (req, res) => {
    const products = await productDAO.getAll()
    res.send(products)
})

router.post("/", async (req, res) => {
    const products = await productDAO.save(req.body)
    res.send(products)
})

router.put("/:id", async (req, res) => {
    const { id } = req.params
    const replacedProduct = await productDAO.updateById(parseInt(id), req.body)
    res.send(replacedProduct)
})

router.get("/:id", async (req, res) => {
    const { id } = req.params
    const product = await productDAO.getById(parseInt(id))
    res.send(product)
})

router.delete("/", async (req, res)=> {
    const { id } = req.body
    const product = await productDAO.deleteById(id)
    res.send(product)
})

export default router