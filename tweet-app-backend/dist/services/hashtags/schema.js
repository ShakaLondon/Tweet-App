import mongoose from "mongoose";
const { Schema, model } = mongoose;
const HashSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    tweets: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Tweet"
    }
});
export default model("Hash", HashSchema);
