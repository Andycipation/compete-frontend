import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import axios from "./axiosConfig";
import { AxiosResponse } from "axios";
import jwt from "jsonwebtoken";

import UserContext from "./store/userContext";
import { RefreshTokenResponse } from "./common/interfaces/requests";
import { setAccessToken } from "./store/accessToken";

import ProtectedRoute from "./components/ProtectedRoute";

import Layout from "./layout/Layout";

import AboutPage from "./pages/About";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import LogoutPage from "./pages/Logout";
import NotFoundPage from "./pages/NotFound";
import ProfilePage from "./pages/Profile";
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
    setLoading(false);
    axios
      .post("/refresh-token") // includes cookies
      .then(async (res: AxiosResponse<RefreshTokenResponse>) => {
        // TODO: having "ok" is kind of redundant?
        const { ok, accessToken } = res.data;
        if (ok) {
          setAccessToken(accessToken);
          const payload = jwt.decode(accessToken) as AccessTokenPayload;
          userContext.handleLogin(payload.username);
        }
        setLoading(false);
      });
  }, [userContext]);

  if (loading) {
    return <div>loading...</div>;
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

          <Route path="/login" exact>
            <LoginPage />
          </Route>
          <Route path="/logout" exact>
            <LogoutPage />
          </Route>
          <Route path="/register" exact>
            <RegisterPage />
          </Route>

          <ProtectedRoute path="/user" exact>
            <ProfilePage mine />
          </ProtectedRoute>
          <Route path="/user/:username" exact>
            <ProfilePage />
          </Route>

          <ProtectedRoute path="/edit-profile" exact>
            {/* edit profile page */}
          </ProtectedRoute>

          <Route path="/about">
            <AboutPage />
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
