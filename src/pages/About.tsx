import React from "react";
import { Typography } from "@material-ui/core";

const AboutPage: React.FC = () => {
  return (
    <div>
      <Typography variant="h5" align="center">
        About Compete
      </Typography>
      <p></p>
      <Typography variant="body1" paragraph>
        Welcome to Compete, an app for anyone looking to improve at competitive
        programming!
      </Typography>
      <Typography variant="body1" paragraph>
        To get started, you should create an account and link your
        <a href="https://www.acmicpc.net/">Baekjoon Online Judge</a> (BOJ)
        account. Compete recommends problems from BOJ based on your skill level
        to help you improve your competitive programming ability.
      </Typography>
    </div>
  );
};

export default AboutPage;
