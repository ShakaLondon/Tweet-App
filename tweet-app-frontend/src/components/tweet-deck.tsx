import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { ProfileProps } from "src/types/app-state";
import { ITweet, IUser } from "src/types/user-state";

const TweetDeck = ({ tweets, profileUser }: ProfileProps) => {

  const [getUserTweets, setUserTweets] = useState<ITweet[]>(tweets as ITweet[]);
  const [getProfileUser, setProfileUser] = useState<IUser>(profileUser as IUser);
  

  return (
    <ListGroup className="px-3 py-3">
        { tweets && (tweets as ITweet[]).map( tweet => {
          return (
            <ListGroup.Item className="px-0 no-border" key={`${tweet._id}`}>
        <Card className="no-border">
          <Row>
            <Col xs={2} sm={2} md={2} lg={2} xl={2}>
              <Image className="rounded-circle" src="https://picsum.photos/80/80"/>
            </Col>
            <Col xs={10} sm={10} md={10} lg={10} xl={10}>
          <Row>
            <Col md={12} sm={12} lg={12} className="d-flex">
              <h5 className="mb-0 tweet-name"> {`${profileUser?.firstName}  ${profileUser?.lastName}`}</h5>
              <h6 className="px-2 mb-0 tweet-login"> {`@${profileUser?.loginID}`}</h6>
              <FontAwesomeIcon icon={faCircle} />
              <h6 className="px-2 mb-0 tweet-timestamp"> {`${profileUser?.createdAt}`}</h6>
            </Col>
          </Row>
          <Row>
            <Col md={12} sm={12} lg={12}>
            <h5 className="mb-0 tweet-content"> {`${tweet.tweet}`}</h5>
            </Col>
          </Row>
          {/* <Row>
            <Col md={12} sm={12} lg={12}>
              45000 Tweets
            </Col>
          </Row> */}
          </Col>
          </Row>
        </Card>
      </ListGroup.Item>
          )
        })}
    </ListGroup>
  )
};

export default TweetDeck;