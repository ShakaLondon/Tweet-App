import mongoose, { Mongoose } from "mongoose"
import { IHash, IHashModel } from "../../types/schema-types.js"

const { Schema, model } = mongoose

const HashSchema = new Schema<IHash, IHashModel>(
  {
    name: {
      type: String,
      required: true,
    },
    tweets: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Tweet"
    }
  }
)

export default model<IHash, IHashModel>("Hash", HashSchema)