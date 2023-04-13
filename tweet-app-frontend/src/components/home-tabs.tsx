import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { HomeTabProps } from "src/types/app-state";
import { Node } from "typescript";

const HomeTabs = ({ tabList }: HomeTabProps) => {

  const classToggle = async (event: React.MouseEvent<HTMLElement>) => {
    const homeTabs = document.querySelectorAll(".home-tab") as NodeListOf<Element>;
    homeTabs.forEach((tab) => {
        tab.classList.remove('active')
    });
    (event.target as HTMLElement).classList.toggle('active');
  }

  return (
    <Container fluid id="home-tabs-list">
      <Row className="px-0 d-flex">
        {tabList.map((title: string, index: number) => {
          return (

      <Col sm={"auto"} md={"auto"} lg={"auto"} xl={"auto"} 
      key={`home-tabs-list-${index}`}
      className="align-items-baseline home-tab d-inline-flex flex-fill"
      onClick={(e) => classToggle(e)}>
          <Container className="d-inline-flex justify-content-center home-tab-button">
              <p className="home-tab-link mb-0 d-inline-flex py-3">
                {title}
              </p>
            </Container>
        </Col>
          )
        })}
      </Row>
    </Container>
  )
};

export default HomeTabs;