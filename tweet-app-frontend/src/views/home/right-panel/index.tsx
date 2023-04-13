import React from "react";
import { Container } from "react-bootstrap";
import SignUpCard from "../../../components/sign-up-card";

const RightPanel = () => {
    return (
      <Container className="right-panel">
        <SignUpCard/>
      </Container>
    )
  };
  
  export default RightPanel;