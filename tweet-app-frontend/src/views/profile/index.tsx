import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ITweet, IUser } from "src/types/user-state";
import CenterPanel from "./center-panel";
import LeftPanel from "./left-panel";
import RightPanel from "./right-panel";
import { useLocation, useParams } from "react-router-dom";
import userService from "src/axios/user.service";
import { RootState } from "src/redux/types/redux-state";
import { useAppSelector } from "src/redux/constants";
import authService from "src/axios/auth.service";
import tweetService from "src/axios/tweet.service";

const ProfilePage = () => {

  const { loginID } = useParams();

  const appState = useAppSelector((state: RootState) => state.appState)
  
  const [verify, getVerify] = useState(appState.verified);
  const [getUser, setUser] = useState<IUser | null>(appState.user);
  const [getUserTweets, setUserTweets] = useState<ITweet[]>();
  const [loginUser, setLoginUser] = useState<String>(loginID as string);
  const [getProfileUser, setProfileUser] = useState<IUser>();

  useEffect(() => {

    async function getProfileUser (username:string) {
      await authService.logout()
      setProfileUser( await userService.getUser(username) )
    }

    async function getProfileUserTweets (username:string) {
      setUserTweets( await tweetService.getAllTweetsUser(username) )
    }

    if (verify && getUser?.loginID === loginUser) {
      setProfileUser(getUser)
      getProfileUserTweets(loginID as string)
    } else {
      getProfileUser(loginID as string)
      getProfileUserTweets(loginID as string)
    }
  },[getProfileUser, loginID]);


    return (
      <Container fluid className="page-width">
        <Row className="full-view-height">
          <Col xs={1} sm={2} md={3} lg={3} xl={3} className="px-0 min-width-left">
            <LeftPanel/>
          </Col>
          <Col xs={11} sm={10} md={9} lg={6} xl={6} className="section-line px-0 min-width-center">
        <CenterPanel loginID={loginUser} profileUser={getProfileUser} tweets={getUserTweets}/>
          </Col>
          <Col xs={0} sm={0} md={0} lg={3} xl={3} className="px-0">
            <RightPanel/>
          </Col>
        </Row>
      </Container>
    )
  };
  
  export default ProfilePage;