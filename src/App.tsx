import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Typography } from "@material-ui/core";

import axios from "./axiosConfig";
import { AxiosResponse } from "axios";
import jwt from "jsonwebtoken";

import UserContext from "./store/userContext";
import { RefreshTokenResponse } from "./common/interfaces/requests";
import { setAccessToken } from "./store/accessToken";

import ProtectedRoute from "./components/ProtectedRoute";

import Layout from "./layout/Layout";

import AboutPage from "./pages/About";
import EditProfilePage from "./pages/EditProfile";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import LogoutPage from "./pages/Logout";
import MyProfilePage from "./pages/profile/MyProfile";
import NotFoundPage from "./pages/NotFound";
import OtherProfilePage from "./pages/profile/OtherProfile";
import ProblemPage from "./pages/problem/Problem";
import RegisterPage from "./pages/Register";
import UsersPage from "./pages/Users";

interface AccessTokenPayload {
  iat: number; // issued at
  exp: number; // expiry time
  username: string;
}

const App: React.FC = () => {
  const userContext = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .post("/refresh-token")
      .then(async (res: AxiosResponse<RefreshTokenResponse>) => {
        // TODO: having "ok" is kind of redundant?
        const { ok, accessToken } = res.data;
        if (ok) {
          setAccessToken(accessToken);
          const payload = jwt.decode(accessToken) as AccessTokenPayload;
          await userContext.handleLogin(payload.username);
        }
        // TODO: wait for userContext to finish loading?
        setLoading(false);
      });
  }, [userContext]);

  if (loading) {
    return (
      <div>
        <Typography variant="body1">loading...</Typography>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/users">
            <UsersPage />
          </Route>

          {/* view problem */}
          <Route path="/problem/:id" exact>
            <ProblemPage />
          </Route>

          <ProtectedRoute path="/user" exact>
            <MyProfilePage />
          </ProtectedRoute>
          <Route path="/user/:username" exact>
            <OtherProfilePage />
          </Route>

          <ProtectedRoute path="/edit/profile" exact>
            <EditProfilePage />
          </ProtectedRoute>

          <Route path="/about" exact>
            <AboutPage />
          </Route>

          {/* authentication */}
          <Route path="/login" exact>
            <LoginPage />
          </Route>
          <Route path="/logout" exact>
            <LogoutPage />
          </Route>
          <Route path="/register" exact>
            <RegisterPage />
          </Route>

          {/* 404 not found */}
          <Route path="/">
            <NotFoundPage />
          </Route>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
