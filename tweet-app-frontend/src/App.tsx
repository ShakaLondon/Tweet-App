import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import HomePage from './views/home';
import { Routes, Route, useLocation } from 'react-router-dom';
import RegisterPage from "./views/registration";
import * as dotenv from 'dotenv'
import ProfilePage from "./views/profile";
import { IUser } from "./types/user-state";
import { useAppDispatch, useAppSelector } from "./redux/constants";
import { RootState } from "./redux/types/redux-state";
import { checkCredentials } from "./redux/users/app-slice";

function App() {
  const location = useLocation()
  const [verify, getVerify] = useState<boolean>();
  const [getUser, setUser] = useState<IUser | null>();

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
