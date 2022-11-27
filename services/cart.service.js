import mongoose from "mongoose";
import { cartCollection, cartSchema } from "../models/Cart.js"
import { productDAO } from "./product.service.js";

export class CartService {
    constructor(name, schema) {
        this.model = mongoose.model(name, schema)
    }
    async createCart() {
        const response = await this.model.create({})
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
    async getCartProducts(id) {
        const cart = await this.model.findById(id)
        console.log(cart.products)
        const cartIds = cart.products.map(product => product?.toString())
        const products = []
        for (id of cartIds) {
            const product = await productDAO.getById(id)
            products.push(product)
        }
        return(products)
    }
    async addCartProduct(id, id_prod) {  
        const cart = await this.model.findById(id)
        console.log(cart.products)
        const isProduct = cart.products.find(product => product?.toString() === id_prod)
        if (!isProduct) {
            const product = await productDAO.getById(id_prod)
            cart.products.push(product)
            await cart.save()
            return { message: "product saved" }
        }
        return { message: "product hasnt saved" }
    }
    async deleteCartProduct(id, id_prod) {
        const cart = await this.model.findById(id)
        console.log(cart.products)
        const isProduct = cart.products.find(product => product?.toString() === id_prod)
        const productIndex = cart.products.findIndex(product => product?.toString() === id_prod)
        if (isProduct) {
            cart.products.splice(productIndex, 1)
            await cart.save()
            return { message: "product deleted from the cart" }
        } 
        return { message: "there wasnt any product with that id in the cart" }
    }
}

const cartDAO = new CartService(cartCollection, cartSchema)
export { cartDAO }

