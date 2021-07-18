import React from "react";
import { Helmet } from "react-helmet";
import { Container, Typography } from "@material-ui/core";

import AboutInfo from "../components/AboutInfo";

const AboutPage: React.FC = () => {
  return (
    <Container>
      <Helmet>
        <title>About Compete</title>
      </Helmet>
      <Typography variant="h1">About</Typography>
      <AboutInfo />

      <Typography variant="h2">FAQ</Typography>
      <Typography variant="h3">Why Baekjoon Online Judge (BOJ)?</Typography>
      <Typography variant="body1" paragraph>
        When I was first introduced to BOJ, I was also hesitant to use a site
        whose native language I did not understand. However, BOJ has one of the
        most complete problem sets on the internet.
      </Typography>
      <Typography variant="body1" paragraph>
        You can use your browser&apos;s translate functionality if you are not
        able to read Korean. In my opinion, using Google Translate is a small
        price to pay to gain access to all of the training problems you will
        need.
      </Typography>
    </Container>
  );
};

export default AboutPage;
