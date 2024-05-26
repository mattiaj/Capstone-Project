import { Router } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.model.js";
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