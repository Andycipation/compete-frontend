import React from "react";
import { Helmet } from "react-helmet";
import { Typography } from "@material-ui/core";

const NotFoundPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <Typography>Page not found</Typography>
    </>
  );
};

export default NotFoundPage;
