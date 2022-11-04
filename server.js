const express = require("express")
const app = express()
const routerProducts = require("./routes/products.route")
const routerCart = require("./routes/cart.route")

app.use(express.json())
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}));

app.use("/api/products", routerProducts)
app.use("/api/cart", routerCart)

const port  = 8080

app.listen(port, () => {
    console.log("server started in port "+port)
})