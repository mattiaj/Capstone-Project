import express from "express";
import {config} from "dotenv";
import mongoose from "mongoose";
import { authRouter } from "./services/routes/auth.router.js";
import { itemRouter } from "./services/routes/item.router.js";
import { cartRouter } from "./services/routes/cart.router.js";

config();

const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/item", itemRouter);
app.use("/cart", cartRouter);

const initServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Database connesso al server!`);

        app.listen(process.env.PORT, () => {
            console.log(`il server ascolta alla porta ${process.env.PORT}!`);
        });
        
    } catch (err) {
        console.error(`Connessione al Database non riuscita!`, err);
    };
};

initServer();