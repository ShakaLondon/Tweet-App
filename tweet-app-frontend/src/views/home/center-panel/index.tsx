import React from "react";
import { Container } from "react-bootstrap";
import HashDeck from "../../../components/hashtag-deck";
import HomeTabs from "../../../components/home-tabs";
import SearchBar from "../../../components/search-bar";

const CenterPanel = () => {
    return (
      <Container fluid className="px-0">
        <SearchBar/>
        <HomeTabs tabList={[ "For You", "Trending", "News", "Entertainment"]}/>
        <HashDeck/>
      </Container>
    )
  };
  
  export default CenterPanel;