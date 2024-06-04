import { Schema, model } from "mongoose";

const reviewsSchema = new Schema(
    {
        review: {
            type: String,
            required: true
        },

        owner: {
            id: {
                type: Schema.Types.ObjectId,
                ref: "User"
            },
            username: {
                type: Schema.Types.String
            }
        },

        item: {
            type: Schema.Types.ObjectId,
            ref: "Item"
        }
    },

    {
        collection: "Reviews",
        timestamps: true
    }
);

export default model("Review", reviewsSchema);