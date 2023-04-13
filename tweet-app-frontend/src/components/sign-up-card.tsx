import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Card } from "react-bootstrap";
import { faApple, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { Link } from "react-router-dom";

const SignUpCard = () => {

  
  return (
    <Card className="my-2" id="sign-up-card">
      <Card.Body>
        <Card.Title>New to Twetter?</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Sign up now to get your own personalized timeline!</Card.Subtitle>
        <Button className="d-flex rounded-pill align-items-center py-2 sign-up-btn justify-content-center my-3">
            <FontAwesomeIcon icon={faGoogle} className="sign-up-icon px-1 my-2"/>
            <p className="mb-0 sign-up-title px-1 py-2 text-nowrap">Sign up with Google</p>
        </Button>
        <Button className="d-flex rounded-pill align-items-center py-2 sign-up-btn justify-content-center my-3">
            <FontAwesomeIcon icon={faApple} className="sign-up-icon px-1 my-2"/>
            <p className="mb-0 sign-up-title px-1 py-2 text-nowrap">Sign up with Apple</p>
        </Button>
        <Button className="d-flex rounded-pill align-items-center py-2 sign-up-btn justify-content-center my-3">
            <Link to={'/register'} className="mb-0 sign-up-title px-1 py-2 text-nowrap">Create an account</Link>
        </Button>
      </Card.Body>
    </Card>
  )
};

export default SignUpCard;