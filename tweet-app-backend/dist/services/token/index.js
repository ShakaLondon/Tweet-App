import express from "express";
import createError from "http-errors";
import jwt from "jsonwebtoken";
import { JwtMiddleware } from "../../utils/auth/jwt.js";
import { getErrorMessage } from "../../errorHandlers.js";
const tokenRouter = express.Router();
tokenRouter
    .get("/verify", JwtMiddleware, async (req, res, next) => {
    try {
        jwt.verify((req.token), process.env.JWT_SECRET, function (err, decoded) {
            if (!err) {
                res.status(200).send({ verified: true });
            }
            else {
                // next(createError(401, "Unauthorized! Access Token was expired!"));
                res.status(200).send({ verified: false });
            }
        });
    }
    catch (error) {
        next(createError(500, getErrorMessage(error)));
    }
});
export default tokenRouter;
