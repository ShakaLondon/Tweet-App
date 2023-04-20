export interface ILoginUser {
  email: string
  password?: string
}

export interface ISubmitUser extends ILoginUser {
    firstName: string
    lastName: string
    loginID: string
    password?: string
    dateOfBirth?: string
    contactNumber?: string
  }

  export interface IUser extends ISubmitUser {
    role?: Array<string>
    tweetList?: Array<string>
    createdAt?: number
    updatedAt?: number
    token: string
  }

  export interface IPostTweet {
    tweet: string;
    tweetType: string
  }

  export interface ITweet extends IPostTweet{
    _id?: string
    userID: Array<string>;
    initialTweet?: string;
    likes?: Array<string>;
    replies?: Array<string>;
  }
