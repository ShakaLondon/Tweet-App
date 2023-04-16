import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Navbar } from "react-bootstrap";

const LogoNav = () => {

  return (
    <Navbar className="navBar-height container-fluid d-flex no-padding-small-screen px-3 side-list-item">
        <Navbar.Brand href="/home" className="py-0 full-height mx-2">
          <Button className="d-flex rounded-circle full-height align-items-center justify-content-center brand-button">
            <FontAwesomeIcon icon={faTwitter} id="twetter-icon"/>
          </Button>
        </Navbar.Brand>
    </Navbar>
  )
};

export default LogoNav;