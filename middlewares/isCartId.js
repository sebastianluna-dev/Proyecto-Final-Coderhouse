export const isCartId = async (req, res, next) => {
    const { cartId } = req.cookies
    if (!cartId) {
        res.send({message: "there isnt a cardId in your cookies"})
        return 
    } else {
        console.log("holaaa")
        next()
    }
}
