import { Schema, model } from "mongoose";

const itemSchema = new Schema(
    {

        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        name: {
            type: String,
            required: true
        },

        itemImage: {
            type: String,
            required: false
        },

        description: {
            type: String,
            required: true
        },

        category: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true
        },

        reviews: [{
                type: Schema.Types.ObjectId,
                ref: "Review"
        }]
    },

    {
        collection: "Item",
        timestamps: true
    }
);

export default model("Item", itemSchema);