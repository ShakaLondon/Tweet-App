import { Date, Model, ObjectId, PopulatedDoc, Schema, Document } from "mongoose";
import * as mongoose from "mongoose";
import { JwtPayload } from "jsonwebtoken";
import { Request } from "express"
import { CompleteResult } from 'paseto'
import { type } from "os";

export interface IErrorObject {
    [x: string]: string
}

export interface IJSONConverterObject {
    type: string,
    title: string,
    properties: object,
    required: Array<string>,
    additionalProperties: boolean
}

export type JSONConverterObjectTypes = Schema<IUser, IUserModel> | Schema<IRole, IUserModel>

export type GroupDocumentType = UserDocument | RoleDocument | TweetListDocument | MentionsDocument

export type SchemaGroup = IUser | IMentions | ITweetList | IRole

export type ModelGroup = IUserModel | IMentionModel | ITweetListModel | IRoleModel

export interface ITokenRequest extends Request {
    token: string | CompleteResult;
   }

export interface IJWTPayload {
    id: string | ObjectId
}


export type TJWTPayload = Buffer | Record<PropertyKey, unknown>

// export interface IPopulatedGroup extends Omit<GroupDocumentType, "role"> {
//     role: GroupDocumentType[];
//   }



export interface IRole {
    _id?: ObjectId;
    role: string;
}
  
export interface IRoleModel extends Model<IRole> {
    findRoles(rolesArray: Array<string>): ObjectId;
}

export type RoleDocument = IRoleModel & Document



export interface IUser {
    _id?: ObjectId | string;
    firstName: string;
    lastName: string;
    email: string;
    loginID: string;
    password: string;
    contactNumber: string;
    role: mongoose.HydratedDocument<IRole>['_id'];
    tweetList?: mongoose.HydratedDocument<ITweetList>['_id'];
    mentions: mongoose.HydratedDocument<IMentions>['_id'];
    following: mongoose.HydratedDocument<IUser>['_id'];
    followers: mongoose.HydratedDocument<IUser>['_id'];
    // createdAt: Date;
}
  
export interface IUserModel extends Model<IUser> {
    findByCredentials(email: string, password: string): mongoose.HydratedDocument<IUser>;
}

export interface UserDocument extends mongoose.Document<IUser> {
}




export interface ITweetList {
    _id?: ObjectId;
    tweet: string;
    userID: mongoose.HydratedDocument<IUser>;
    initialTweet: mongoose.HydratedDocument<ITweetList>['_id'];
    likes: mongoose.HydratedDocument<IUser>['_id'];
    replies: mongoose.HydratedDocument<ITweetList>['_id'];
    tweetType: string
}
  
export interface ITweetListModel extends Model<ITweetList> {
    // findRoles(rolesArray: Array<string>): number;
}

export type TweetListDocument = ITweetListModel & Document



export interface IMentions {
    _id?: ObjectId;
    role: string;
}
  
export interface IMentionModel extends Model<IMentions> {
    // findRoles(rolesArray: Array<string>): number;
}

export type MentionsDocument = IMentionModel & Document



export interface IHash {
    _id?: ObjectId;
    name: string;
    tweets: mongoose.HydratedDocument<ITweetList>['_id'];
}
  
export interface IHashModel extends Model<IMentions> {
    // findRoles(rolesArray: Array<string>): number;
}

export type HashDocument = IMentionModel & Document


