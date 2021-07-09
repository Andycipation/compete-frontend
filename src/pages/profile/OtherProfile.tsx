/*
Not used yet.
*/

import React from "react";
import { useParams } from "react-router-dom";
import { Container, Typography } from "@material-ui/core";

import ProfileInfo from "./ProfileInfo";

const OtherProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();

  return (
    <Container>
      <Typography variant="h5">{username}&apos;s Account</Typography>
      <ProfileInfo username={username} />
    </Container>
  );
};

export default OtherProfilePage;
