import React from "react";
import { Container } from "react-bootstrap";
import LogoNav from "../../../components/logo-nav";
import SideNav from "../../../components/side-nav-list";

const LeftPanel = () => {
    return (
      <Container fluid className="no-padding-small-screen left-panel">
        <LogoNav/>
        <SideNav/>
      </Container>
    )
  };
  
  export default LeftPanel;