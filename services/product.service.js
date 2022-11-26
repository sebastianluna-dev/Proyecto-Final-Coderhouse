import mongoose from "mongoose";
import { productCollection, productSchema } from "../models/Product.js"

export class ProductService {
    constructor(name, schema) {
        this.model = mongoose.model(name, schema)
    }
    async getAll() {
        const response = await this.model.find()
        return response
    }
    async save(element) {
        const response = await this.model.create(element)
        return response
    }
    async getById(id) {
        const response = await this.model.findById(id)
        return response
    }
    async updateById(id, newData) {
        const response = await this.model.findByIdAndUpdate(id, newData, { new: true })
        return response
    }
    async deleteById(id) {
        const response = await this.model.findByIdAndDelete(id)
        return response
    }
}

const productDAO = new ProductService(productCollection, productSchema)
export { productDAO }

