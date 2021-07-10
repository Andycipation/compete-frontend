import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { Typography } from "@material-ui/core";
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
    <div>
      <Typography variant="body1">
        See you later! <Link to="/">Return home</Link>
      </Typography>
    </div>
  );
};

export default LogoutPage;
