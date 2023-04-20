import { ITweet, IUser } from "./user-state"

export type HomeTabProps = {
    tabList: string[]
}

export type ProfileProps = {
    loginID?: String
    profileUser?: IUser
    tweets?: ITweet[]
}