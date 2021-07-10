import React from "react";
import { Typography } from "@material-ui/core";

import PopoutLink from "../components/PopoutLink";

const AboutPage: React.FC = () => {
  // TODO: keep up-to-date

  return (
    <div>
      <Typography variant="h5" align="center">
        About Compete
      </Typography>
      <Typography variant="body1" paragraph>
        Welcome to Compete, an app for anyone looking to improve at competitive
        programming.
      </Typography>
      <Typography variant="body1" paragraph>
        To get started, you should create an account. The currently supported
        judges are:
        <ul>
          <li>
            <PopoutLink to="https://www.acmicpc.net/">
              Baekjoon Online Judge
            </PopoutLink>
          </li>
          <li>
            <PopoutLink to="https://codeforces.com/">Codeforces</PopoutLink>
          </li>
        </ul>
      </Typography>
      <Typography>
        Compete recommends problems from BOJ and Codeforces based on your skill
        level to help you improve your competitive programming ability.
      </Typography>

      <Typography variant="h6">Baekjoon Online Judge (BOJ)</Typography>
      <Typography variant="body1" paragraph>
        BOJ has one of the most complete problem sets online. If you do not have
        a BOJ account, you can register one{" "}
        <PopoutLink to="https://www.acmicpc.net/register">here</PopoutLink>. You
        can use your browser&apos;s Translate functionality if you are not able
        to read Korean.
      </Typography>
    </div>
  );
};

export default AboutPage;
