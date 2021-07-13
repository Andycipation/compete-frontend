import React, { useContext } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Link as MaterialLink,
  Toolbar,
  Typography,
} from "@material-ui/core";

import UserContext from "../store/userContext";

import classes from "./Navigation.module.css";

const Navigation: React.FC = () => {
  const { isLoading, user } = useContext(UserContext);
  const history = useHistory();

  const loggedOutJsx = (
    <>
      <Box mx="0.2rem" marginTop="0.05rem">
        <Button
          className={classes.button}
          color="inherit"
          onClick={() => history.push("/login")}
        >
          Log in
        </Button>
      </Box>
      <Box mx="0.2rem" marginTop="0.05rem">
        <Button
          className={classes.button}
          color="inherit"
          onClick={() => history.push("/register")}
        >
          Register
        </Button>
      </Box>
    </>
  );

  const loggedInJsx = (
    <>
      <Typography>
        Welcome,{" "}
        <MaterialLink component={RouterLink} to="/user" color="inherit">
          <strong>{user.username}</strong>
        </MaterialLink>
        .
      </Typography>
      <Box marginLeft="0.5rem" marginTop="0.05rem">
        <Button
          className={classes.button}
          color="inherit"
          onClick={() => history.push("/logout")}
        >
          Log out
        </Button>
      </Box>
    </>
  );

  if (isLoading) {
    return <Typography>loading...</Typography>;
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* title link */}
          <Box
            marginRight="1.5rem"
            onClick={() => history.push("/")}
            style={{ cursor: "pointer" }}
          >
            <Typography variant="h5">Compete</Typography>
          </Box>

          {/* Users tab */}
          <Box marginX="0.2rem" marginTop="0.05rem">
            <Button
              className={classes.button}
              color="inherit"
              onClick={() => history.push("/users")}
            >
              Users
            </Button>
          </Box>

          {/* About page (similar format to DMOJ) */}
          <Box marginX="0.2rem" marginTop="0.05rem">
            <Button
              className={classes.button}
              color="inherit"
              onClick={() => history.push("/about")}
            >
              About
            </Button>
          </Box>

          {/* HACK: align the rest to the right */}
          <Box marginLeft="auto" />

          {user.username ? loggedInJsx : loggedOutJsx}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navigation;
