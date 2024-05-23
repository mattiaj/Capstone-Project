import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

// Viene generato il token
export const generateJWT = (payload) => {

    return new Promise((res, rej) => {

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn: "1d"},

            (err, token) => {

                if(err) {
                    rej(err);
                } else {
                    res(token);
                };
            }
        );
    });
};

// Viene verificato se il token è corretto
export const verifyJWT = (token) => {

    return new Promise((res, rej) => {

        jwt.verify(
            token,
            process.env.JWT_SECRET,
            (err, decoded) => {

                if(err) {
                    rej(err);
                } else {
                    res(decoded);
                };
            }
        );
    });
};

// Middleware che utilizzo nelle richieste che necessitano del token
export const authMiddleware = async (req, res, next) => {
    try {
        
        if(!req.headers.authorization) {
            res.status(400).send("Effettua il Login!");
        } else {

            const decoded = await verifyJWT(
                req.headers.authorization.replace("Bearer ", "")
            );

            if(decoded.exp) {

                delete decoded.iat;
                delete decoded.exp;

                const me = await User.findOne({...decoded});

                if(me) {

                    req.user = me;
                    next();

                } else {
                    res.status(401).send("Utente non trovato!");
                };

            } else {
                res.status(401).send("Rieffettua il Login!");
            };
        }
    } catch (err) {
        next(err);
    };
};