/*
Not used yet.
*/

import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Typography } from "@material-ui/core";

import ProfileInfo from "./ProfileInfo";

import UserContext from "../../store/userContext";

const MyProfilePage: React.FC = () => {
  const { username } = useContext(UserContext);

  return (
    <Container>
      <Typography variant="h5">My Account</Typography>
      <Typography variant="body1">
        <RouterLink to="/edit/profile">Edit profile</RouterLink>
      </Typography>
      <ProfileInfo username={username} />
    </Container>
  );
};

export default MyProfilePage;
