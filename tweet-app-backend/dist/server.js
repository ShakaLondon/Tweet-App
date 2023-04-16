import * as dotenv from 'dotenv';
dotenv.config();
import express from "express";
// IMPORT EXPRESS SERVER
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import promBundle from "express-prom-bundle";
// IMPORT CORS
import userRouter from "./services/users/index.js";
import roleRouter from "./services/roles/index.js";
import tweetsRouter from "./services/tweets/index.js";
import listEndpoints from "express-list-endpoints";
// SHOW API ENDPOINTS
import { catchAllErrorHandler, entryForbiddenMiddleware, notFoundMiddleware, unauthorizedMiddleware, unauthorizedResourceMiddleware, badRequestMiddleware } from "./errorHandlers.js";
import swaggerDocument from "./swagger-output.json" assert { type: "json" };
import tokenRouter from './services/token/index.js';
export const server = express();
const PORT = 6868;
// process.env.NODE_DOCKER_PORT || 8080;
server.use(cors());
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
// Add Swagger
server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
server.use("/api/v1_0/tweets/", tweetsRouter);
server.use("/api/v1_0/tweets/roles", roleRouter);
server.use("/api/v1_0/tweets/users", userRouter);
server.use("/api/v1_0/token", tokenRouter);
// server.use("/api/v1.0/tweets/users/search", searchRouter);
// MIDDLEWARES
const metricsMiddleware = promBundle({
    includeMethod: true,
    includePath: true,
    includeStatusCode: true,
    includeUp: true,
    customLabels: { project_name: 'hello_world', project_type: 'test_metrics_labels' },
    promClient: {
        collectDefaultMetrics: {}
    }
});
server.use(metricsMiddleware);
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
        await mongoose.connect(process.env.MONGO_CONNECTION);
        console.log(`✅ Server is running on ${PORT} and connected to db`);
    }
    catch (error) {
        console.log("Db connection is failed ", error);
    }
});
server.on("error", (error) => console.log(`❌ Server is not running due to : ${error}`));
// FOR SERVER ALREADY IN USE ERROR RUN
// lsof -i:3000
// kill -9 [PID]
