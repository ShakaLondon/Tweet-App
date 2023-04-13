import express from "express";
import createError from "http-errors";
import TweetModel from "./schema.js";
import UserModel from "../users/schema.js";
import HashModel from "../hashtags/schema.js";
import validations from "../../utils/validation/index.js";
import { JwtMiddleware } from "../../utils/auth/jwt.js";
import MessageFactory from "../../utils/kafka/message-client.js";
const { tweetValidationRules, validate } = validations;
const tweetRouter = express.Router();
tweetRouter.get("/getAllTweets", 
// JwtMiddleware,
// adminOnly,
async (req, res, next) => {
    try {
        console.log();
        const config = {
            clientId: "tweet-app-broker",
            brokers: [`broker:9092`],
            groupId: "tweet-consumer",
            topics: 'tweet-app.test.tweets'
        };
        const users = await (await new MessageFactory().tweetConsumer(config)).consumeAllTweets();
        console.log(users, "tweets");
        res.send(users);
    }
    catch (error) {
        next(createError(500, "An error occurred while getting user."));
    }
});
tweetRouter.get("/:loginID/all", JwtMiddleware, 
// adminOnly,
async (req, res, next) => {
    try {
        console.log(req.params._id);
        const user = await UserModel.findOne({ loginID: req.params.loginID });
        const userID = req.params._id ? req.params._id : user._id;
        const config = {
            clientId: "tweet-app-broker",
            brokers: [`broker:9092`],
            groupId: "tweet-consumer",
            topics: `tweet-app.test.tweets-${userID}`
        };
        const users = await (await new MessageFactory().tweetConsumer(config)).consumeAllTweets();
        console.log(users, "tweets");
        res.send(users);
    }
    catch (error) {
        next(createError(500, "An error occurred while getting user."));
    }
});
tweetRouter.get("/:loginID/all/:tweetType", JwtMiddleware, 
// adminOnly,
async (req, res, next) => {
    try {
        console.log(req.params._id);
        const user = await UserModel.findOne({ loginID: req.params.loginID });
        const userID = req.params._id ? req.params._id : user._id;
        const config = {
            clientId: "tweet-app-broker",
            brokers: [`broker:9092`],
            groupId: "tweet-consumer",
            topics: `tweet-app.test.tweets-${userID}`
        };
        const users = await (await new MessageFactory().tweetConsumer(config)).consumeAllTweets();
        console.log(users, "tweets");
        res.send(users);
    }
    catch (error) {
        next(createError(500, "An error occurred while getting user."));
    }
});
// ADD TWEET ✅
tweetRouter.post("/add", tweetValidationRules(), validate, JwtMiddleware, async (req, res, next) => {
    try {
        const user = req.params._id;
        console.log(user, "user here");
        const createTweet = await new TweetModel({ ...req.body, userID: user }).save();
        console.log(createTweet, "tweet1");
        const addTweet = await UserModel.findByIdAndUpdate(user, { $push: { tweetList: createTweet._id } });
        console.log(addTweet, "tweet");
        const tweet = req.body.tweet;
        // const pattern = /@(\w)+/g;
        const mentionArray = tweet.match(/@(\w)+/g);
        console.log(mentionArray, "mentions", tweet);
        if (Array.isArray(mentionArray) && mentionArray.length > 0) {
            mentionArray.forEach(async (word) => {
                const mention = word.replace("@", "");
                await UserModel.findOneAndUpdate({ loginID: mention }, { $push: { mentions: createTweet._id } });
            });
        }
        ;
        // const patternTwo = /#(\w)+/g;
        const hashtagArray = tweet.match(/#(\w)+/g);
        console.log(hashtagArray, "hashtags");
        if (Array.isArray(hashtagArray) && hashtagArray.length > 0) {
            await hashtagArray.forEach(async (word) => {
                const hashtag = word.replace("#", "");
                const exists = await HashModel.findOneAndUpdate({ name: hashtag });
                if (exists) {
                    await HashModel.findByIdAndUpdate(exists._id, { $push: { tweets: createTweet._id } });
                }
                else {
                    await new HashModel({
                        name: word,
                        tweets: [createTweet._id,]
                    }).save();
                }
            });
        }
        ;
        if (addTweet) {
            res.status(200).send({
                tweet: createTweet,
            });
        }
        else {
            next(createError(400, `Unable to create tweet.`));
        }
    }
    catch (error) {
        next(createError(500, 'Error posting tweet.'));
    }
});
// // UPDATE TWEET ✅
// tweetRouter.put(
//   "/:loginID/update/:tweetID", 
//   tweetValidationRules(),
//   validate,
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { loginID, tweetID } = req.params
//       const editTweet = await TweetModel.findByIdAndUpdate(tweetID, {...req.body});
//       if ( editTweet ) {
//         res.status(200).send({
//           editTweet,
//         });
//       } else {
//         // return res.status(404).send( `No roles found!` );
//         next(createError(404, `Unable to edit tweet.`));
//       }
//     } catch (error) {
//       next(createError(500, `Error updating tweet.`));
//     }
//   });
// DELETE TWEET ✅
tweetRouter.delete("/:loginID/delete/:tweetID", JwtMiddleware, async (req, res, next) => {
    try {
        const { loginID, tweetID } = req.params;
        const deleteTweet = await TweetModel.findByIdAndDelete(tweetID);
        const updateUser = await UserModel.findByIdAndUpdate(req.params._id, { $pull: { tweetID } });
        console.log(deleteTweet);
        if (deleteTweet) {
            res.status(200).send({
                updateUser,
            });
        }
        else {
            next(createError(404, `Unable to edit tweet.`));
        }
    }
    catch (error) {
        next(createError(500, `Error deleting tweet.`));
    }
});
// LIKE TWEET ✅
tweetRouter.put("/like/:tweetID", JwtMiddleware, async (req, res, next) => {
    try {
        const { loginID, tweetID } = req.params;
        const likeTweet = await TweetModel.findByIdAndUpdate(tweetID, { $push: { likes: req.params._id } });
        if (likeTweet) {
            res.status(200).send(likeTweet);
        }
        else {
            next(createError(404, `Unable to like tweet.`));
        }
    }
    catch (error) {
        next(createError(500, `Error liking tweet.`));
    }
});
// UNLIKE TWEET ✅
tweetRouter.put("/unlike/:tweetID", JwtMiddleware, async (req, res, next) => {
    try {
        const { loginID, tweetID } = req.params;
        const likeTweet = await TweetModel.findByIdAndUpdate(tweetID, { $pull: { likes: req.params._id } });
        if (likeTweet) {
            res.status(200).send(likeTweet);
        }
        else {
            next(createError(404, `Unable to like tweet.`));
        }
    }
    catch (error) {
        next(createError(500, `Error unliking tweet.`));
    }
});
// REPLY TO TWEET ✅
tweetRouter.post("/reply/:tweetID", tweetValidationRules(), validate, JwtMiddleware, async (req, res, next) => {
    try {
        const user = req.params._id;
        const createTweet = await new TweetModel({
            ...req.body,
            loginID: user,
            initialTweet: req.params.tweetID,
        }).save();
        const addTweet = await UserModel.findByIdAndUpdate(user, { $push: { tweetList: createTweet._id } });
        if (addTweet) {
            res.status(200).send({
                tweet: addTweet,
            });
        }
        else {
            next(createError(404, `Unable to reply to tweet.`));
        }
    }
    catch (error) {
        next(createError(500, 'Error replying to tweet.'));
    }
});
export default tweetRouter;
