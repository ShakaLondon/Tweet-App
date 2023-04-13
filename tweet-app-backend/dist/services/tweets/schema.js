import mongoose from "mongoose";
const { Schema, model } = mongoose;
const TweetSchema = new Schema({
    tweet: {
        type: String,
        required: true,
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Users",
    },
    initialTweet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet",
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Users",
    },
    replies: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Tweet",
    },
    tweetType: {
        type: String,
        required: true,
        enum: ['INITIAL', 'MENTION', 'REPLY'],
        default: 'INITIAL'
    },
});
export default model("Tweet", TweetSchema);
