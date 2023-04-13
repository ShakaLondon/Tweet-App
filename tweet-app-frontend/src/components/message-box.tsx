import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FormEvent, useEffect, useState } from "react";
import { Button, Card, Container, FloatingLabel, Form } from "react-bootstrap";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
// import { AppProps } from "src/types/app-state";
import { IPostTweet, ITweet } from "src/types/user-state";
import tweetService from "src/axios/tweet.service";

const MessageBox = () => {

  const [getTweet, setTweet] = useState< IPostTweet >({
    tweet: "",
    tweetType: "INITIAL"
  });

  const handleSubmit = async (e: FormEvent) => {
      console.log(e, getTweet)
        e.preventDefault();
        const tweet: ITweet = await tweetService.postTweet({...getTweet})
        setTweet({ ...getTweet, tweet: "" })
    };
  
    const handleChange = (field: string, value: string) => {
      // let target = e.target as HTMLInputElement
      console.log(getTweet);
      // let name = target.name;
      setTweet({ ...getTweet, [field]: value });
    };
  
  return (
    <Container fluid className="flex-row my-3">
    {/* <Card className="px-0 py-0 d-flex" id="message-box"> */}
    <Form onSubmit={handleSubmit}>
    <FloatingLabel
                      controlId="floatingTweet"
                      label="What do you want to say?"
                      className="mb-3"
                    >
                      <Form.Control
                        type="tweet"
                        name="tweet"
                        placeholder="Tweet"
                        className="tweet-input"
                        value={getTweet.tweet}
                        onChange={e => handleChange('tweet', e.target.value)}
                      />
                    </FloatingLabel>
                    <Container fluid className="d-inline-flex justify-content-end">

                      <Button
                        type="submit"
                        className="d-flex rounded-pill align-items-center send-tweet-btn justify-content-center"
                        onClick={handleSubmit}
                      >
                        <h3 className="mb-0 send-tweet-title px-1 text-nowrap">Send Twit</h3>
                      </Button>
                    </Container>
                  </Form>
    {/* </Card> */}
    </Container>
  )
};

export default MessageBox; 