import express, { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import jwt from "jsonwebtoken"
import { JwtMiddleware } from "../../utils/auth/jwt.js";

import { getErrorMessage } from "../../errorHandlers.js";
import { ITokenRequest } from "../../types/schema-types.js";

const tokenRouter = express.Router();

tokenRouter
.get("/verify", 
JwtMiddleware,
async (req, res, next) => {
    try {
      jwt.verify(((req as ITokenRequest).token) as string, process.env.JWT_SECRET as string, function(err, decoded) {
        if (!err) {
          res.status(200).send({ verified: true });
        } else {
          // next(createError(401, "Unauthorized! Access Token was expired!"));
          res.status(200).send({ verified: false });
        }
      });
    } catch (error) {
      next(createError(500, getErrorMessage(error)));
    }
  });
  
  export default tokenRouter;