import React, { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Typography } from "@material-ui/core";
import axios from "../axiosConfig";

import { getAccessToken, setAccessToken } from "../store/accessToken";
import UserContext from "../store/userContext";
import assert from "assert";

const LogoutPage: React.FC = () => {
  const userContext = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (!userContext.username) {
      // already logged out
      history.replace("/");
      return;
    }
    const accessToken = getAccessToken();
    assert(accessToken);
    axios.post("/logout", { accessToken }).then(() => {
      setAccessToken("");
      userContext.handleLogout();
    });
  }, [history, userContext]);

  return (
    <div>
      <Typography variant="body1">
        See you later! <Link to="/">Return home</Link>
      </Typography>
    </div>
  );
};

export default LogoutPage;
