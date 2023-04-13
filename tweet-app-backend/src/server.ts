import * as dotenv from 'dotenv'
dotenv.config()
import express from "express";
// IMPORT EXPRESS SERVER
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser"
// IMPORT CORS
import userRouter from "./services/users/index.js"
import roleRouter from "./services/roles/index.js"
import tweetsRouter from "./services/tweets/index.js"

import listEndpoints from "express-list-endpoints";
// SHOW API ENDPOINTS

import {
  catchAllErrorHandler,
  entryForbiddenMiddleware,
  notFoundMiddleware,
  unauthorizedMiddleware,
  unauthorizedResourceMiddleware,
  badRequestMiddleware
} from "./errorHandlers.js";

// BASIC SERVER CREATION
// REMEMBER TO UPDATE START SCRIPT IN PACKAGE JSON
import { join } from "path"
import tokenRouter from './services/token/index.js';

export const server = express();
const PORT = 6868
// process.env.NODE_DOCKER_PORT || 8080;

server.use(cors());
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())

server.use("/api/v1_0/tweets/", tweetsRouter);
server.use("/api/v1_0/tweets/roles", roleRouter);
server.use("/api/v1_0/tweets/users", userRouter);
server.use("/api/v1_0/token", tokenRouter);
// server.use("/api/v1.0/tweets/users/search", searchRouter);

// MIDDLEWARES

server.use(notFoundMiddleware);
server.use(badRequestMiddleware);
server.use(unauthorizedMiddleware);
server.use(unauthorizedResourceMiddleware);
server.use(entryForbiddenMiddleware);
server.use(catchAllErrorHandler);

console.table(listEndpoints(server));
// console.log(listEndpoints(server)) TO SHOW AS A LIST

server.listen(PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONNECTION as string);
    console.log(`✅ Server is running on ${PORT} and connected to db`);
  } catch (error) {
    console.log("Db connection is failed ", error);
  }
});

server.on("error", (error) =>
  console.log(`❌ Server is not running due to : ${error}`)
);


// FOR SERVER ALREADY IN USE ERROR RUN
// lsof -i:3000
// kill -9 [PID]