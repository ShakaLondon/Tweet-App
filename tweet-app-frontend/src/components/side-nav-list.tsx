import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { faGear, faHashtag } from "@fortawesome/free-solid-svg-icons";

const SideNav = () => {

  return (
    <Container className="px-0">
    <ListGroup>
      <ListGroup.Item className="no-border">
          <Row>
            <Col md={12} sm={12} lg={12} className="d-flex justify-content-start no-padding-small-screen side-list-item">
            <Button className="d-flex rounded-pill align-items-center justify-content-center py-3 side-list-btn">
            <FontAwesomeIcon icon={faHashtag} className="side-list-icon mx-2 my-2"/>
            <p className="mb-0 side-nav-title mx-2">Explore</p>
        </Button>
            </Col>
          </Row>
          {/* </Container> */}
      </ListGroup.Item>
      <ListGroup.Item className="no-border">
          <Row>
            <Col md={12} sm={12} lg={12} className="d-flex justify-content-start no-padding-small-screen side-list-item">
            <Button className="d-flex rounded-pill align-items-center py-3 side-list-btn justify-content-center">
            <FontAwesomeIcon icon={faGear} className="side-list-icon mx-2 my-2"/>
            <p className="mb-0 side-nav-title mx-2">Settings</p>
        </Button>
            </Col>
          </Row>
          {/* </Container> */}
      </ListGroup.Item>
    </ListGroup>
    </Container>
  )
};

export default SideNav;