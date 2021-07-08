import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Typography } from "@material-ui/core";

import UserContext from "../store/userContext";

import BojProblemSets from "../components/boj/BojProblemSets";
import CodeforcesSets from "../components/cf/CodeforcesSets";
import { useStyles } from "../components/styles";

const HomePage: React.FC = () => {
  const { username } = useContext(UserContext);
  const classes = useStyles();

  const loggedInJsx = (
    <div>
      <Container className={classes.problemList}>
        <BojProblemSets username={username} />
      </Container>
      <Container className={classes.problemList}>
        <CodeforcesSets username={username} />
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
