import { Router } from "express"
import { productDAO } from "../services/product.service.js"
import { verifyProduct } from "../middlewares/verifyProduct.js"

const router = Router()

router.get("/", async (req, res) => {
    const products = await productDAO.getAll()
    res.send(products)
})

router.post("/", verifyProduct , async (req, res) => {
    const products = await productDAO.save(req.body)
    res.send(products)
})

router.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id)
    const product = await productDAO.getById(id)
    res.send(product)
})

router.delete("/", async (req, res)=> {
    const id = req.body.id
    const product = await productDAO.deleteById(id)
    res.send(product)
})

export default router