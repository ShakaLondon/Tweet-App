import React from "react";
import { Container } from "react-bootstrap";
import SearchBar from "src/components/search-bar";
import SignUpCard from "../../../components/sign-up-card";

const RightPanel = () => {
    return (
      <Container className="right-panel">
        <SearchBar/>
        <SignUpCard/>
      </Container>
    )
  };
  
  export default RightPanel;