import { ITweet, IUser } from "./user-state"

// export type AppProps = {
//     verified: boolean
//     user?: IUser,
//     profileUser?: IUser
//     loginID?: String
//     userItem?: (userItem: IUser) => void
// }

export type HomeTabProps = {
    tabList: string[]
}

export type ProfileProps = {
    loginID?: String
    profileUser?: IUser
    tweets?: ITweet[]
}