import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Typography } from "@material-ui/core";

import UserContext from "../store/userContext";

import BojSets from "../components/boj/BojSets";
import CodeforcesSets from "../components/cf/CodeforcesSets";
import { useStyles } from "../components/styles";

const HomePage: React.FC = () => {
  const {
    user: {
      username,
      boj: { userId: bojId },
      cf: { userId: cfId },
    },
  } = useContext(UserContext);
  const classes = useStyles();

  const loggedInJsx = (
    <div>
      <Container className={classes.problemListContainer}>
        {bojId ? (
          <BojSets username={username} />
        ) : (
          <Typography>{username}, you do not have a BOJ handle set.</Typography>
        )}
      </Container>
      <Container className={classes.problemListContainer}>
        {cfId ? (
          <CodeforcesSets username={username} />
        ) : (
          <Typography>
            {username}, you do not have a Codeforces handle set.
          </Typography>
        )}
      </Container>
    </div>
  );

  const loggedOutJsx = (
    <Typography>
      You are currently not logged in; log in{" "}
      <RouterLink to="/login">here</RouterLink>.
    </Typography>
  );

  return <div>{username ? loggedInJsx : loggedOutJsx}</div>;
};

export default HomePage;
