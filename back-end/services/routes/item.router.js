import { Router } from "express";
import Item from "../models/Item.model.js";
import Review from "../models/Reviews.model.js";
import { authMiddleware } from "../middlewares/authorization.js";
import { itemCloud } from "../middlewares/multer.js";

export const itemRouter = Router();

// Creo un nuovo Item
itemRouter.post("/", authMiddleware, async (req, res, next) => {
    try {
        
        const newItem = new Item({
            ...req.body,
            owner: req.user._id
        });
        
        await newItem.save();
        res.status(201).send(newItem);
    } catch (err) {
        next(err);
    }
});

// Recupero un item specifico
itemRouter.get("/:id", async (req, res, next) => {
    try {

        const item = await Item.findOne({_id: req.params.id});

        if(!item) {
            res.status(401).send("Articolo non trovato!");
        } else {
            res.status(201).send(item);
        };
    } catch (err) {
        next(err);
    };
});

// Recupero tutti gli Item
itemRouter.get("/", async (req, res, next) => {
    try {
        
        const items = await Item.find({});

        res.status(200).send(items);
    } catch (err) {
        next(err);
    };
});

// modifico un item
itemRouter.put("/:id", authMiddleware, async (req, res, next) => {
    try {
        
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, {new: true});

        res.status(200).send(item);
    } catch (err) {
        next(err);
    };
});

// cancello un item
itemRouter.delete("/:id", authMiddleware, async (req, res, next) => {
    try {

        const item = await Item.findByIdAndDelete({_id: req.params.id});

        res.status(201).send(item, "Articolo eliminato correttamente!");
    } catch (err) {
        next(err);
    };
});

itemRouter.patch("/:id/image", itemCloud.single("itemImage"), async (req, res, next) => {
    try {
        
        const item = await Item.findByIdAndUpdate(
            req.params.id,
            {  itemImage: req.file.path },
            { new: true }
        );

        res.status(201).send(item);
    } catch (err) {
        next(err);
    };
});

// Sezione Rewies

// Faccio una Rewie
itemRouter.post("/:id", authMiddleware, async (req, res, next) => {
    try {
        
        const item = await Item.findById(req.params.id);

        if(item) {

            const newReview = new Review({
                ...req.body,
                owner: {
                    id: req.user._id,
                    username: req.user.username
                },
                item: {
                    id: item._id,
                    name: item.name
                }
            });

            item.reviews.push(newReview._id);
            await item.save();
            await newReview.save();
            res.status(201).send(newReview);
        } else {
            res.status(401).send("Nessun articolo trovato!");
        }
    } catch (err) {
        next(err);
    };
});

// Ricevo indietro tutti le Reviews di un post specifico
itemRouter.get("/:id/reviews", async (req, res, next) => {
    try {
        
        const item = await Item.findById(req.params.id).populate("reviews");

        if(item) {

            res.send(item.reviews)
        }
    } catch (err) {
        next(err)
    }
})

// Modifico una Review
itemRouter.put("/:id/reviews/:reviewId", authMiddleware, async (req, res, next) => {
    try {
        
        const item = await Item.findById(req.params.id);

        if(item) {

            const review = await Review.findByIdAndUpdate(
                req.params.reviewId,
                req.body,
                { new: true }
            );

            if(review) {

                await item.save();
                await review.save();
                res.status(201).send(review);
            }
        } else {
            res.status(400).send("Non è stato possibile modificare il commento!");
        }
    } catch (err) {
        next(err);
    };
});

itemRouter.delete("/:id/reviews/:reviewId", authMiddleware, async (req, res, next) => {
    try {
        
        const item = await Item.findById(req.params.id);

        if(item) {

            const review = await Review.findById(req.params.reviewId);

            if(review) {

                item.reviews.pull(review);
                item.save();
                await Review.deleteOne({_id: req.params.reviewId});
                res.status(204).send("Recensione eliminata!");
            } else {
                res.status(401).send("Non è stato possibile eliminare la recensione!");
            };
        } else {
            res.status(401).send("Articolo non trovato!");
        };
    } catch (err) {
        next(err);
    };
});