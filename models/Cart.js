import { Schema } from "mongoose";

const cartCollection = "carts"

const cartSchema = new Schema({
    products: [{
        type: Schema.Types.ObjectId,
        ref: "products"
    }]
},{
    timestamps: true,
    versionKey: false
})

export { cartCollection, cartSchema }


