import React from "react";
import { Typography } from "@material-ui/core";

import PopoutLink from "./PopoutLink";
import { useStyles } from "./styles";

const AboutInfo: React.FC = () => {
  const classes = useStyles();
  // TODO: keep up-to-date

  return (
    <>
      <Typography variant="body1" paragraph>
        Compete is a training platform for anyone looking to improve at
        competitive programming. It is developed by me, Andrew. You can check
        out my GitHub{" "}
        <PopoutLink to="https://github.com/AndrewDongAndy">here</PopoutLink>.
      </Typography>
      <Typography variant="body1" paragraph>
        The currently supported judges are:
      </Typography>
      <Typography paragraph>
        {/* Baekjoon Online Judge */}
        <PopoutLink to="https://www.acmicpc.net/">
          <img
            className={classes.judgeLogo}
            src="https://d2gd6pc034wcta.cloudfront.net/images/logo@2x.png"
            alt="Baekjoon Online Judge logo"
            style={{ scale: 0.25 }}
          ></img>
        </PopoutLink>

        {/* Codeforces */}
        <PopoutLink to="https://codeforces.com/">
          <img
            className={classes.judgeLogo}
            src="https://codeforces.org/s/87227/images/codeforces-logo-with-telegram.png"
            alt="Codeforces logo"
            style={{ scale: 0.25 }}
          ></img>
        </PopoutLink>
      </Typography>
      <Typography paragraph>
        Compete recommends problems from these judges based on your skill level
        to help you improve your competitive programming ability.
      </Typography>
    </>
  );
};

export default AboutInfo;
