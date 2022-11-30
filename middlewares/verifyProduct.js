
export const verifyProduct = async (req, res, next) => {
    
    const { title, description, code, price, stock, image } = req.body

    if (!title || typeof title !== "string") {
        res.send({message: "You must send a correct title value"})
        return
    }
    if (!description || typeof description !== "string") {
        res.send({message: "You must send a correct description value"})
        return
    }
    if (!code || typeof code !== "string") {
        res.send({message: "You must send a correct code value"})
        return
    }
    if (!price || typeof price !== "number") {
        res.send({message: "You must send a correct price value"})
        return
    }
    if (!stock || typeof stock !== "number") {
        res.send({message: "You must send a correct stock value"})
        return
    }
    if (!image || typeof image !== "string") {
        res.send({message: "You must send a correct image value"})
        return
    }
    
    next()
}
