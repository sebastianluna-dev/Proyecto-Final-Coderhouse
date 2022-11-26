import express from "express"
import cookieParser from "cookie-parser"
import routerProducts from "./routes/products.route.js"
import routerCart from "./routes/cart.route.js"
import { connectDB } from "./database/db.js"

const app = express()
connectDB()

app.use(express.json())
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

app.use("/api/products", routerProducts)
app.use("/api/cart", routerCart)

const port  = 8080

app.listen(port, () => {
    console.log("server started in port "+port)
})