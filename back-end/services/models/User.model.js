import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {

        name: {
            type: String,
            required: true
        },

        surname: {
            type: String,
            required: true
        },

        username: {
            type: String,
            required: true
        },

        userPicture: {
            type: String,
            required: false
        },

        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },

        password: {
            type: String,
            required: true,
            unique: true
        },

    },

    {
        collection: "Users",
        timestamps: true
    }
);

export default model("User", userSchema);