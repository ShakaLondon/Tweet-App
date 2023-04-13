import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import HomePage from './views/home';
import { Routes, Route, useLoaderData, useLocation } from 'react-router-dom';
import RegisterPage from "./views/registration";
import * as dotenv from 'dotenv'
import ProfilePage from "./views/profile";
import { IUser } from "./types/user-state";
import TokenService from "../src/axios/auth-header";
import authService from "./axios/auth.service";
import { useAppDispatch, useAppSelector } from "./redux/constants";
import { RootState } from "./redux/types/redux-state";
import { checkCredentials } from "./redux/users/app-slice";

function App() {
  const location = useLocation()
  const [verify, getVerify] = useState<boolean>();
  const [getUser, setUser] = useState<IUser | null>();

  // const getVerification = async () => {
  //   getVerify( await TokenService.checkCredentials() );
  // }

  // const getUserItem = (user: IUser) => {
  //   console.log(user, "user passsed")
  //   setUser( (state) => ({ state, ...user }) );
  //   getVerify(true)
  //   console.log(getUser)
  // }

  // const getUserStorage = async () => {
  //   setUser( await TokenService.getUserItem() );
  // }

  const dispatch = useAppDispatch()

  const appState = useAppSelector((state: RootState) => state.appState)

  useEffect(() => {
    dispatch(checkCredentials(null))
    getVerify(appState.verified)
    setUser(appState.user)
  }, [appState]);

  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/home" element={<HomePage/>} />
          <Route path="/login" element={<RegisterPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile/:loginID" element={<ProfilePage />} />
      </Routes>
  </div>
  );
}

export default App;
