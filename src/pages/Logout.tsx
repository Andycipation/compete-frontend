import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import axios from "../axiosConfig";

import { getAccessToken, setAccessToken } from "../store/accessToken";
import UserContext from "../store/userContext";
import assert from "assert";

const LogoutPage: React.FC = () => {
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (userContext.username) {
      const accessToken = getAccessToken();
      assert(accessToken);
      axios.post("/logout", { accessToken }).then(async () => {
        setAccessToken("");
        await userContext.handleLogout();
      });
    }
  }, [userContext]);

  return (
    <div>
      <Typography variant="body1">
        See you later! <Link to="/">Return home</Link>
      </Typography>
    </div>
  );
};

export default LogoutPage;
