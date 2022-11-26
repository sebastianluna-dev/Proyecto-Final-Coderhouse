import { Schema } from "mongoose";

const productCollection = "products"

const productSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        maxlength: [40, "Title must have less than 40 characters"]
    },
    description: {
        type: String,
        trim: true,
        maxlength: [200, "Title must have less than 200 characters"]
    },
    code: {
        type: String,
        trim: true,
        required: [true, "Code is required"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    stock: {
        type: Number, 
        required: [true, "Stock is required"]
    },
    image: String
},{
    timestamps: true,
    versionKey: false
})

export { productCollection, productSchema }
