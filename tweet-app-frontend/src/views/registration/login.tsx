import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, FormEvent, useState } from "react";
import {
    Button,
    Container,
    Form,
    FloatingLabel,
    Row,
    Col,
  } from "react-bootstrap";
import { useAppDispatch } from "src/redux/constants";
import { userLogin } from "src/redux/users/app-slice";
import authService from "../../axios/auth.service";
import { ILoginUser } from "../../types/user-state";
  
  const LoginContainer = () => {

    const [getUser, setUser] = useState< ILoginUser >({
      email: "",
      password: "",
    });

    const dispatch = useAppDispatch()

    const handleSubmit = async (e: FormEvent) => {
        console.log(e, getUser)
          e.preventDefault();
          dispatch(userLogin({ email: getUser.email, password: getUser.password as string}))
          // const user = await authService.login(getUser.email, getUser.password as string)
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
                      controlId="floatingUserName"
                      label="Username or Email"
                      className="mb-3"
                    >
                      <Form.Control
                        name="username"
                        placeholder="Username"
                        className="register-input"
                        value={getUser.email}
                        onChange={e => handleChange('email', e.target.value)}
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
                    <Button
                      type="submit"
                      className="rounded-pill text-center register-btn d-flex align-content-center justify-content-center"
                      onClick={handleSubmit}
                    >
                      <h3 className="mb-0">Log In</h3>
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Container>
          </Container>
        </>
      );
  };
  
  export default LoginContainer;