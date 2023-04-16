import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormEvent, useState } from "react";
import {
    Button,
    Container,
    Form,
    FloatingLabel,
    Row,
    Col,
  } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppDispatch } from "src/redux/constants";
import { userRegister } from "src/redux/users/app-slice";
import { ISubmitUser } from "../../types/user-state";
  
  const SignUpContainer = () => {

    const [getUser, setUser] = useState< ISubmitUser >({
      firstName: "",
      lastName: "",
      email: "",
      loginID: "",
      password: "",
      contactNumber: "",
      dateOfBirth: ""
    });

    const dispatch = useAppDispatch()

    const handleSubmit = async (e: FormEvent) => {
        console.log(e, getUser)
          e.preventDefault();
          dispatch(userRegister(getUser))
          // const user = await authService.register(getUser.firstName, getUser.lastName, getUser.email as string, getUser.loginID, getUser.password as string, getUser.contactNumber as string)
          // userItem?.(user.user)
      };
    
      const handleChange = (field: string, value: string) => {
        // let target = e.target as HTMLInputElement
        console.log(getUser);
        // let name = target.name;
        setUser({ ...getUser, [field]: value });
      };

      return (
        <>
          <Container
            fluid
            className="mx-auto d-flex justify-content-center register-container"
          >
            <Container fluid className="flex-row my-auto">
              <Row>
                <Col
                  md={12}
                  className="d-inline-flex justify-content-center align-content-center my-3"
                >
                <FontAwesomeIcon icon={faTwitter} className="twetter-register-icon"/>
                <h1 className="mb-0 mx-2 tweeter-title">Tweeter.</h1>
                </Col>
              </Row>
              <Row>
                <Col md={12}  className="d-flex justify-content-center">
                  <p>
                  Tell your friends.
                  </p>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Form onSubmit={handleSubmit}>
                    <FloatingLabel
                      controlId="floatingName"
                      label="First Name"
                      className="mb-3"
                    >
                      <Form.Control
                        name="name"
                        type='text'
                        placeholder="First Name"
                        className="register-input"
                        value={getUser.firstName}
                        onChange={e => handleChange('firstName', e.target.value)}
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="floatingSurname"
                      label="Last Name"
                      className="mb-3"
                    >
                      <Form.Control
                        name="surname"
                        placeholder="Last Name"
                        className="register-input"
                        value={getUser.lastName}
                        onChange={e => handleChange('lastName', e.target.value)}
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="floatingUserName"
                      label="User Name"
                      className="mb-3"
                    >
                      <Form.Control
                        name="username"
                        placeholder="Username"
                        className="register-input"
                        value={getUser.loginID}
                        onChange={e => handleChange('loginID', e.target.value)}
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="floatingPassword"
                      label="Password"
                      className="mb-3"
                    >
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="register-input"
                        value={getUser.password}
                        onChange={e => handleChange('password', e.target.value)}
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="floatingDOB"
                      label="Date of Birth"
                      className="mb-3"
                    >
                      <Form.Control
                        type="date"
                        name="dateOfBirth"
                        placeholder="Date of Birth"
                        className="register-input"
                        value={getUser.dateOfBirth}
                        onChange={e => handleChange('dateOfBirth', e.target.value)}
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Email address"
                      className="mb-3"
                    >
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="name@example.com"
                        className="register-input"
                        value={getUser.email}
                        onChange={e => handleChange('email', e.target.value)}
                      />
                    </FloatingLabel>
                    <FloatingLabel
                      controlId="floatingPhone"
                      label="Phone Number"
                      className="mb-3"
                    >
                      <Form.Control
                        name="contactNumber"
                        placeholder="Phone Number"
                        className="register-input"
                        value={getUser.contactNumber}
                        onChange={e => handleChange('contactNumber', e.target.value)}
                      />
                    </FloatingLabel>
                    <Button
                      type="submit"
                      className="rounded-pill text-center register-btn d-flex align-content-center justify-content-center"
                      onClick={handleSubmit}
                    >
                      <h3 className="mb-0">Sign Up</h3>
                    </Button>
                    <p id="register-subtext" className="mb-2 mt-3">Already signed up?</p>
                    <Button
                      className="rounded-pill text-center register-btn d-flex align-content-center justify-content-center"
                    >
                      <Link to={'/login'} className=""><h3 className="mb-0">Log In</h3></Link>
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Container>
          </Container>
        </>
      );
  };
  
  export default SignUpContainer;