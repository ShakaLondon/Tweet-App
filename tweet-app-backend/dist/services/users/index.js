import express from "express";
import createError from "http-errors";
import { adminOnly, generateJwt, JwtMiddleware, JwtUserMiddleware } from "../../utils/auth/jwt.js";
import UserModel from "./schema.js";
import RoleModel from "../roles/schema.js";
import validations from "../../utils/validation/index.js";
import { getErrorMessage } from "../../errorHandlers.js";
import MessageFactory from "../../utils/kafka/message-client.js";
const { userValidationRules, validate } = validations;
const userRouter = express.Router();
// LOGIN ✅
userRouter.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log(email + password + "Here babe");
        if (!email || !password) {
            next(createError(404, "User Not found."));
        }
        const user = await UserModel.findByCredentials(email, password);
        console.log(user);
        if (!user) {
            next(createError(401, "Invalid Credentials!"));
        }
        await user.populate(["role"]);
        const token = await generateJwt({ id: user._id });
        res.status(200).send({
            user,
            token: token,
        });
    }
    catch (error) {
        next(createError(500, getErrorMessage(error)));
    }
});
// REGISTER ✅
userRouter.post("/register", userValidationRules(), validate, async (req, res, next) => {
    try {
        if (req.body.role) {
            const roles = await RoleModel.findRoles(req.body.role);
            const userSave = await new UserModel({
                ...req.body,
                role: roles
            }).save();
            const token = await generateJwt({ id: "222222" });
            res.status(200).send({
                message: "User was registered successfully!",
                user: userSave,
                token: token
            });
        }
        else {
            const findRole = await RoleModel.findOne({ role: "USER" });
            const user = new UserModel({
                ...req.body,
                role: findRole ?? {}
            });
            await user.save();
            const token = await generateJwt({ id: user._id });
            res.status(200).send({
                message: "User was registered successfully!",
                user: user,
                token: token
            });
        }
    }
    catch (error) {
        next(createError(500, getErrorMessage(error)));
    }
});
// RESET PASSWORD
userRouter.put("/forgot", JwtMiddleware, async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findByIdAndUpdate(req.params._id, { password: password });
        res.send({
            message: `USER:${user?.loginID} has been updated.`,
            user
        });
    }
    catch (error) {
        next(createError(500, "An error occurred while resetting password."));
    }
});
// EDIT USER
userRouter.put("/update", JwtMiddleware, async (req, res, next) => {
    try {
        const changes = req.body;
        const user = await UserModel.findByIdAndUpdate(req.params._id, changes);
        res.send({
            message: `USER:${user?.loginID} has been updated.`,
            user
        });
    }
    catch (error) {
        next(createError(500, "An error occurred while resetting password."));
    }
});
// FOLLOW USER
userRouter.put("/follow/:userID", JwtMiddleware, async (req, res, next) => {
    try {
        const user = await UserModel.findByIdAndUpdate(req.params._id, { $push: { following: req.params.userID } });
        const otherUser = await UserModel.findByIdAndUpdate(req.params.userID, { $push: { following: req.params._id } });
        res.send({
            message: `USER:${user?.loginID} has been updated.`,
            user
        });
    }
    catch (error) {
        next(createError(500, "An error occurred while resetting password."));
    }
});
// FOLLOW USER
userRouter.put("/follow/remove/:userID", JwtMiddleware, async (req, res, next) => {
    try {
        const user = await UserModel.findByIdAndUpdate(req.params._id, { $pull: { following: req.params.userID } });
        const otherUser = await UserModel.findByIdAndUpdate(req.params.userID, { $pull: { following: req.params._id } });
        res.send({
            message: `USER:${user?.loginID} has been updated.`,
            user
        });
    }
    catch (error) {
        next(createError(500, "An error occurred while resetting password."));
    }
});
// GET SINGLE USER ✅
userRouter.get("/:loginID", JwtUserMiddleware, async (req, res, next) => {
    try {
        const query = {
            field: "loginID",
            value: req.params.loginID
        };
        const config = {
            clientId: "tweet-app-broker",
            brokers: [`broker:9092`],
            groupId: "users-consumer",
            topics: 'tweet-app.test.users'
        };
        const users = await (await new MessageFactory().userConsumer(config)).consumeSingleUser(query);
        res.send(users);
    }
    catch (error) {
        next(createError(500, "An error occurred while getting user."));
    }
});
// GET ALL USERS ✅
userRouter.get("/", 
// JwtMiddleware, 
// adminOnly, 
async (req, res, next) => {
    try {
        const config = {
            clientId: "tweet-app-broker",
            brokers: [`broker:9092`],
            groupId: "users-consumer",
            topics: 'tweet-app.test.users'
        };
        const users = await (await new MessageFactory().userConsumer(config)).consumeAllUsers();
        res.send(users);
    }
    catch (error) {
        next(createError(500, "An error occurred while getting user list."));
    }
});
// ADMIN - GET SINGLE USER ✅
userRouter.get("/single/:loginID", JwtMiddleware, adminOnly, async (req, res, next) => {
    try {
        const query = {
            field: "loginID",
            value: req.params.loginID
        };
        const config = {
            clientId: "tweet-app-broker",
            brokers: [`broker:9092`],
            groupId: "users-consumer",
            topics: 'tweet-app.test.users'
        };
        const users = await (await new MessageFactory().userConsumer(config)).consumeSingleUser(query);
        res.send(users);
    }
    catch (error) {
        next(createError(500, "An error occurred while getting user."));
    }
});
// ADMIN - GET ALL USERS ✅
userRouter.get("/all", JwtMiddleware, adminOnly, async (req, res, next) => {
    try {
        const config = {
            clientId: "tweet-app-broker",
            brokers: [`broker:9092`],
            groupId: "users-consumer",
            topics: 'tweet-app.test.users'
        };
        const users = await (await new MessageFactory().userConsumer(config)).consumeAllUsers();
        res.send(users);
    }
    catch (error) {
        next(createError(500, "An error occurred while getting user list."));
    }
});
// ADMIN - DELETE SINGLE USER ✅
userRouter.delete("/single/:userID", JwtMiddleware, adminOnly, async (req, res, next) => {
    try {
        const loginID = req.params.userID;
        const user = await UserModel.findByIdAndDelete({ _id: loginID });
        res.send({ message: `USER:${loginID} has been deleted.` });
    }
    catch (error) {
        next(createError(500, "An error occurred while deleting user."));
    }
});
// EDIT USER ROLE ✅
userRouter.put("/single/:userID", JwtMiddleware, adminOnly, async (req, res, next) => {
    try {
        const { role } = req.body;
        const userID = req.params.userID;
        const roles = await RoleModel.findRoles(role);
        const user = await UserModel.findByIdAndUpdate(userID, { role: roles });
        res.send({
            message: `USER:${user.loginID} has been updated.`,
            user
        });
    }
    catch (error) {
        next(createError(500, "An error occurred while editing user."));
    }
});
export default userRouter;
