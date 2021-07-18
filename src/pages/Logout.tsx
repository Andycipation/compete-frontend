import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

import { Container, Typography } from "@material-ui/core";

import assert from "assert";
import axios from "../axiosConfig";

import { getAccessToken, setAccessToken } from "../store/accessToken";
import UserContext from "../store/userContext";

const LogoutPage: React.FC = () => {
  const userContext = useContext(UserContext);

  const { isLoading } = useQuery(["logout"], async () => {
    const accessToken = getAccessToken();
    assert(accessToken);
    await axios.post("/logout", { accessToken });
    setAccessToken("");
    await userContext.handleLogout();
  });

  if (isLoading) {
    return <Typography>logging out...</Typography>;
  }

  return (
    <Container>
      <Helmet>
        <title>Log in</title>
      </Helmet>
      <Typography variant="body1">
        See you later! <Link to="/">Return home</Link>
      </Typography>
    </Container>
  );
};

export default LogoutPage;
