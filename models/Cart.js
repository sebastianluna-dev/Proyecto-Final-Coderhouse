import { Schema } from "mongoose";

const cartCollection = "carts"

const cartSchema = new Schema({
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: "products"
        },
        quantity: Number
    }]
},{
    timestamps: true,
    versionKey: false
})

export { cartCollection, cartSchema }


