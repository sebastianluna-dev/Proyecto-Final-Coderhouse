export const isCartId = async (req, res, next) => {
    const cartId = req.cookies.cartId
    if (!cartId) {
        res.send({
            message: "there isnt a cardId in your cookies",
            cartStatus: false
        })
        return 
    } 
    next()
}
