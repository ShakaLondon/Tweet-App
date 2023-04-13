import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import JSONConverter from "../../utils/json-schema/json-converter.js";
const { Schema, model } = mongoose;
export const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    loginID: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    role: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: "Role",
    },
    tweetList: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Tweet",
    },
    mentions: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Tweet",
    },
    following: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Users",
    },
    followers: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Users",
    },
}, {
    timestamps: true,
    toJSON: {
        transform: function (doc, ret) {
            delete ret._id;
        }
    }
});
UserSchema.pre("save", async function (done) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hashSync(this.password, 12);
    }
    done();
});
UserSchema.methods.toJSON = function () {
    const userDocument = this;
    const docObject = userDocument.toObject();
    delete docObject.password;
    delete docObject.__v;
    console.log(docObject, "toJson");
    return docObject;
};
UserSchema.static('findByCredentials', async function findByCredentials(email, password) {
    console.log(email);
    const user = await this.findOne({ $or: [{ 'email': email }, { 'loginID': email }] });
    console.log(user, password, email);
    if (user) {
        const userVerified = await bcrypt.compare(password, user.password);
        console.log(userVerified, "userFound");
        if (userVerified) {
            return user;
        }
        else {
            return null;
        }
    }
    else {
        return null;
    }
});
// export const AvroUserSchema = new Generator(UserSchema, 'com.tweetapp.users')
console.log(UserSchema, 'JSON Schema');
// const UserModelJSON = { schema: JSONConverter(UserSchema)}
const schema = JSONConverter(UserSchema);
console.log(schema, "JSON String");
// const result = await registry.register({ type: SchemaType.JSON, schema: schema }
//   , { compatibility: COMPATIBILITY.NONE, subject: 'users-value' }
//   )
//   console.log(result, "schema ID")
//   export const id = result.id
//   console.log(id, "schema ID")
export default model("Users", UserSchema);
