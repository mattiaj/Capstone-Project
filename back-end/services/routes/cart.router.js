import { Router } from "express";
import Item from "../models/Item.model.js";
import Cart from "../models/Cart.model.js";
import { authMiddleware } from "../middlewares/authorization.js";

export const cartRouter = Router();

// Ottengo tutti gli item del carrello
cartRouter.get("/", authMiddleware, async (req, res, next) => {

    const owner = req.user._id;
    try {
        
        const cart = await Cart.findOne({ owner });

        if(cart && cart.items.length > 0) {
            res.status(200).send(cart);
        } else {
            res.send(null);
        };

    } catch (err) {
        next(err);
    };
});

// Creo il carrello
cartRouter.post("/", authMiddleware, async (req, res, next) => {

    const owner = req.user._id;

    const {itemId, quantity} = req.body.items;
    try {
        
        const cart = await Cart.findOne({ owner });
        const item = await Item.findOne({ _id: itemId });

        if(!item) {
            res.status(404).send("Articolo non trovato!");
            return;
        };

        const price = item.price;
        const name = item.name;

        // Quando il carrello già esiste per l'utente
        if(cart) {
            const itemIndex = cart.items.findIndex((item) => item.itemId == itemId);
            
            // Controllo se il prodotto esiste o no
            if(itemIndex > -1) {

                let product = cart.items[itemIndex];

                product.quantity += quantity;

                cart.bill = cart.items.reduce((acc, curr) => {
                    return acc + curr.quantity * curr.price;
                }, 0);
                
                cart.items[itemIndex] = product;

                await cart.save();
                res.status(200).send(cart);

            } else {

                cart.items.push({ itemId, name, quantity, price });

                cart.bill = cart.items.reduce((acc, curr) => {
                    return acc + curr.quantity * curr.price;
                }, 0);
                
                await cart.save();
                res.status(200).send(cart);
            };
            // Se il carrello non esiste
        } else {

            const newCart = await Cart.create({
                owner,
                items: [{ itemId, name, quantity, price }],
                bill: quantity * price
            });

           return res.status(201).send(newCart);
        };
    } catch (err) {
        next(err);
    };
});

// Eliminazione di un articolo dal carrello
cartRouter.delete("/", authMiddleware, async (req, res, next) => {

    const owner = req.user._id;

    const {itemId, quantity} = req.body;

    try {

        let cart = await Cart.findOne({ owner });

        const itemIndex = cart.items.findIndex((item) => item.itemId == itemId);

        if(itemIndex > -1) {

            let item = cart.items[itemIndex];

            cart.bill -= item.quantity * item.price;

            if(cart.bill < 0) {
                cart.bill = 0;
            };

            cart.items.splice(itemIndex, 1);
            cart.bill = cart.items.reduce((acc, curr) => {
                return acc + curr.quantity * curr.price;
            }, 0);

            cart = await cart.save();
            res.status(201).send(cart);
        } else {
            res.status(404).send("Articolo non trovato!");
        }
    } catch (err) {
        next(err);
    };
});