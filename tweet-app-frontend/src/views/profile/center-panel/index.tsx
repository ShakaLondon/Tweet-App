import React, { useState } from "react";
import { Container } from "react-bootstrap";
import MessageBox from "src/components/message-box";
import ProfileCard from "src/components/profile-card";
import { useAppSelector } from "src/redux/constants";
import { RootState } from "src/redux/types/redux-state";
import { ProfileProps } from "src/types/app-state";
import { ITweet, IUser } from "src/types/user-state";
import HomeTabs from "../../../components/home-tabs";
import TweetDeck from "src/components/tweet-deck";

const CenterPanel = ({ loginID, profileUser, tweets }: ProfileProps) => {

  const appState = useAppSelector((state: RootState) => state.appState)
  
  const [verify, getVerify] = useState(appState.verified);
  const [getUser, setUser] = useState<IUser | null>(appState.user);
  const [loginUser, setLoginUser] = useState<String>(loginID as string);
  const [getUserTweets, setUserTweets] = useState<ITweet[]>(tweets as ITweet[]);
  const [getProfileUser, setProfileUser] = useState<IUser>(profileUser as IUser);

    return (
      <Container fluid className="px-0">
        <ProfileCard profileUser={profileUser}/>
        {(verify && getUser?.loginID === loginUser) && <MessageBox/>}
        <HomeTabs tabList={["Tweets", "Replies", "Media", "Likes"]}/>
        <TweetDeck tweets={ tweets } profileUser={ profileUser }/>
      </Container>
    )
  };
  
  export default CenterPanel;