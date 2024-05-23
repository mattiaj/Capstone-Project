import { Schema, model } from "mongoose";

export const cartSchema = new Schema(
    {

        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        items: [{

           itemId: {
            type: Schema.Types.ObjectId,
            ref: "Item",
            required: true
           },

           name: {
            type: String
           },

           quantity: {
            type: Number,
            required: true,
            min: 1,
            default: 1
           },

           price: {
            type: Number
           },
        }],

        bill: {
            type: Number,
            default: 0,
            required: true
        }
    },

    {
        collection: "Cart",
        timestamps: true
    }
);

export default model("Cart", cartSchema);