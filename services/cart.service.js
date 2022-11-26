import mongoose from "mongoose";
import { cartCollection, cartSchema } from "../models/Cart.js"
import { productDAO } from "./product.service.js";

export class CartService {
    constructor(name, schema) {
        this.model = mongoose.model(name, schema)
    }
    async createCart() {
        const response = await this.model.create({products:[]})
        console.log("createCart response: ",response)
        return response
    }
    async getCartById(id) {
        const response = await this.model.findById(id)
        return response 
    }
    async deleteCartById(id) {
        const response = await this.model.findByIdAndDelete(id)
        return response
    }
    async getProducts(id) {
        try {
            const cart = await this.model.findById(id)
            const cartIds = cart.products.map(product => product._id.toString())
            const products = []
            for ( id of cartIds ) {
                const product = await productDAO.getById(id)
                products.push(product)
            }
            return(products)
        } catch (error) {
            return(error)
        }
    }
    async addProduct(id, id_prod) {  
        const cart = await this.model.findById(id)
        const isProduct = cart.products.find(product => product._id.toString() === id_prod)
        if (!isProduct) {
            const product = await productDAO.getById(id_prod)
            cart.products.push(product)
            await cart.save()
            return { message: "saved" }
        }
        return { message: "dont saved"}
    }
    async deleteProduct(id) {
    }
}

const cartDAO = new CartService(cartCollection, cartSchema)
export { cartDAO }
