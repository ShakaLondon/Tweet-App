import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Navbar, Container, Form, InputGroup, Row, Col } from "react-bootstrap";
import { faCircleXmark, faGear, faSearch } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const location = useLocation();
  const path = location.pathname
  const home =  path === "/home"

  return (
    <Navbar className={`navBar-height container-fluid d-flex ${home ? '' : 'hide-search-right'}`}>
    <Container fluid className="d-flex justify-content-between">
      <Row className={`flex-fill full-height d-flex align-items-center px-${home ? 3 : 0}`}>
        <Col 
        xs={ home ? 10 : 12 } 
        sm={ home ? 10 : 12 } 
        md={ home ? 10 : 12 } 
        lg={ home ? 10 : 12 } 
        className="px-0 align-items-center">
        <Form>
          <Form.Group>
          <InputGroup className="mx-0 search-bar">
        <InputGroup.Text className="search-rounded-pill-left">
        <FontAwesomeIcon icon={faSearch} />
        </InputGroup.Text>
        <Form.Control aria-label="Search Tweeter" className="search-form-input"/>
        <InputGroup.Text className="search-rounded-pill-right">
        <FontAwesomeIcon icon={faCircleXmark} />
        </InputGroup.Text>
      </InputGroup>
          </Form.Group>
        </Form>

        </Col>
{ home && <Col xs={2} sm={2} md={2} lg={2} className="d-flex justify-content-end px-0 align-items-center">

        <FontAwesomeIcon icon={faGear} />
        </Col>}    
      </Row>
    </Container>
  </Navbar>
  )
};

export default SearchBar;