import { Router } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.model.js";
import Item from "../models/Item.model.js";
import { authMiddleware, generateJWT } from "../middlewares/authorization.js";
import { userCloud } from "../middlewares/multer.js";


export const authRouter = Router();

// Registro l'utente
authRouter.post("/registration", async (req, res, next) => {
    try {
        let user = await User.create({
            ...req.body,
            password: await bcrypt.hash(req.body.password, 10),
        });

        const token = await generateJWT({
            _id: user._id
        })

        res.send({user, token});
    } catch (err) {
        next(err);
    }
});

// Login dell'utente
authRouter.post("/login", async (req, res, next) => {
    try {

        let userFound = await User.findOne({
            email: req.body.email,
        });

        if(userFound) {

            const isPasswordMatching = await bcrypt.compare(req.body.password, userFound.password);

            if(isPasswordMatching) {
                // Genera token
                const token = await generateJWT({
                    email: userFound.email
                });

                res.send({user: userFound, token});

            } else {
                res.status(400).send("Password sbagliata!");
            };

        } else {
            res.status(400).send("Utente non trovato!");
        };

    } catch (err) {
        next(err);
    };
});

// Modifico il profilo Utente
authRouter.put("/:id", authMiddleware, async (req, res, next) => {
    try {
        
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(201).send(user);
    } catch (err) {
        next(err);
    };
});

// Vado ad aggiungere un immagine al profilo
authRouter.patch("/:id/picture", userCloud.single("userPicture"), async (req, res, next) => {
    try {
        
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { userPicture: req.file.path },
            { new: true }
        );

        res.status(201).send(user);
    } catch (err) {
        next(err);
    };
});

// Get per recuperare le informazioni utente
authRouter.get("/profile", authMiddleware, async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        
        if(user) {
            res.status(200).send(user);
        };
    } catch (err) {
        next(err);
    };
});

authRouter.get("/item", authMiddleware, async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        if(user) {
            const item = await Item.find({
                owner: user._id
            });

            res.status(200).send(item);
        };
    } catch (err) {
        next(err);
    };
});

authRouter.delete("/:id", authMiddleware, async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete({_id: req.params.id});

        res.status(204).send("Profilo eliminato!");
    } catch (err) {
        next(err);
    };
});