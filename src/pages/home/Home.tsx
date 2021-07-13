import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Card, Container, Typography } from "@material-ui/core";

import UserContext from "../../store/userContext";

import BojSets from "../../components/boj/BojSets";
import CodeforcesSets from "../../components/cf/CodeforcesSets";
import { useStyles as useFormStyles } from "../../components/styles";
import AboutInfo from "../../components/AboutInfo";
import { useStyles } from "./styles";

const HomePage: React.FC = () => {
  const {
    isLoading,
    user: {
      username,
      boj: { userId: bojId },
      cf: { userId: cfId },
    },
  } = useContext(UserContext);

  const classes = useStyles();
  const formClasses = useFormStyles();

  const loggedInJsx = (
    <div>
      <Container className={formClasses.problemListContainer}>
        {bojId ? (
          <BojSets username={username} />
        ) : (
          <Typography>
            {username}, you do not have a Baekjoon Online Judge account linked
            to your Compete account.
          </Typography>
        )}
      </Container>
      <Container className={formClasses.problemListContainer}>
        {cfId ? (
          <CodeforcesSets username={username} />
        ) : (
          <Typography>
            {username}, you do not have a Codeforces account linked to your
            Compete account.
          </Typography>
        )}
      </Container>
    </div>
  );

  const loggedOutJsx = (
    <div>
      <Typography variant="h2" align="center">
        Welcome to Compete!
      </Typography>
      <Card raised className={classes.welcomeCard}>
        <AboutInfo />
        <Typography paragraph>
          If this is your first visit, please{" "}
          <RouterLink to="/register">register an account</RouterLink>. Then, try
          your hand at one of the recommended problems, which will appear on
          this page.
        </Typography>
        <Typography>
          If you already have an account, you may{" "}
          <RouterLink to="/login">log in</RouterLink>.
        </Typography>
      </Card>
    </div>
  );

  if (isLoading) {
    return <Typography variant="body1">loading...</Typography>;
  }

  return <Container>{username ? loggedInJsx : loggedOutJsx}</Container>;
};

export default HomePage;
