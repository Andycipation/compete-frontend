import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import Layout from "./layout/Layout";

import AboutPage from "./pages/About";
import EditProfilePage from "./pages/EditProfile";
import HomePage from "./pages/home/Home";
import LoginPage from "./pages/Login";
import LogoutPage from "./pages/Logout";
import MyProfilePage from "./pages/profile/MyProfile";
import NotFoundPage from "./pages/NotFound";
import OtherProfilePage from "./pages/profile/OtherProfile";
import ProblemPage from "./pages/problem/Problem";
import RegisterPage from "./pages/Register";
import SubmissionsPage from "./pages/SubmissionsPage";
import UsersPage from "./pages/Users";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/users" exact>
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
          <Route path="/user/:username/submissions" exact>
            <SubmissionsPage />
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
