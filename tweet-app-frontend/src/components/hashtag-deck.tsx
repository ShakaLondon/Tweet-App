import React from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";

const HashDeck = () => {

  return (
    <ListGroup className="px-3 py-3">
      <ListGroup.Item>
        <Container className="">
          <Row>
            <Col md={12} sm={12} lg={12}>
              Trending in United Kingdom
            </Col>
          </Row>
          <Row>
            <Col md={12} sm={12} lg={12}>
              Hashtag
            </Col>
          </Row>
          <Row>
            <Col md={12} sm={12} lg={12}>
              45000 Tweets
            </Col>
          </Row>
        </Container>
      </ListGroup.Item>
    </ListGroup>
  )
};

export default HashDeck;