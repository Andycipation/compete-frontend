import React, { useContext } from "react";
import { Typography } from "@material-ui/core";

import UserContext from "../store/userContext";

const AboutPage: React.FC = () => {
  const { username } = useContext(UserContext);

  return (
    <div>
      <Typography variant="h5" align="center">
        About Compete
      </Typography>
      <Typography variant="body1">
        An app for anyone looking to improve at competitive programming.
      </Typography>
    </div>
  );
};

export default AboutPage;
