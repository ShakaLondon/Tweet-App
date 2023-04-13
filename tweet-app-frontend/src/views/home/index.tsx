import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CenterPanel from "./center-panel";
import LeftPanel from "./left-panel";
import RightPanel from "./right-panel";

const HomePage = () => {
    return (
      <Container fluid className="page-width">
        <Row className="full-view-height">
          <Col xs={1} sm={2} md={3} lg={3} xl={3} className="px-0 min-width-left">
            <LeftPanel/>
          </Col>
          <Col xs={11} sm={10} md={9} lg={6} xl={6} className="section-line px-0 min-width-center">
        <CenterPanel/>
          </Col>
          <Col xs={0} sm={0} md={0} lg={3} xl={3} className="px-0">
            <RightPanel/>
          </Col>
        </Row>
      </Container>
    )
  };
  
  export default HomePage;