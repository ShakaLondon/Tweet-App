import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Navigate, useLocation } from "react-router";
import authService from "../../axios/auth.service";
import { IUser } from "../../types/user-state";
import TokenService from "../../axios/auth-header";
import LoginContainer from "./login";
import SignUpContainer from "./sign-up";
// import { AppProps } from "src/types/app-state";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "src/redux/types/redux-state";
import { logout } from "src/redux/users/app-slice";
import { useAppDispatch, useAppSelector } from "src/redux/constants";

const RegisterPage = () => {
  const location = useLocation();
  const dispatch = useAppDispatch()

  const appState = useAppSelector((state: RootState) => state.appState)
  
  const [verify, getVerify] = useState(appState.verified);
  const [getUser, setUser] = useState<IUser | null>(appState.user);

  useEffect(() => {
    // const appState = useAppSelector((state: RootState) => state.appState)
    getVerify(appState.verified)
    setUser(appState.user)
  })


  if (( verify === true ) && getUser) {
    // return redirect("/test")
    return <Navigate to={`/profile/${getUser?.loginID}`} />
  } else if (( verify === false ) && (getUser)) {
    console.log("why it logging out");
    dispatch(logout)
    
    // return redirect("/home")
    return <Navigate to="/home" />
  } else {

  return (
    <Container fluid className="mx-0">
      <Container fluid className="px-0 mx-0 full-view-height">
        <Row className="full-height">
          <Col
             xs={12}
             sm={12}
               md={12}
            className="px-0 mx-0"
          >
            <Container className="px-0 full-height d-flex align-content-center">
              {location.pathname === "/login" && <LoginContainer />}
              {location.pathname === "/register" && <SignUpContainer />}
            </Container>
          </Col>
        </Row>
      </Container>
    </Container>
  );
  };
};

export default RegisterPage;