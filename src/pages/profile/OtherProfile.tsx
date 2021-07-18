/*
Not used yet.
*/

import React from "react";
import { Helmet } from "react-helmet";
import { Container, Typography } from "@material-ui/core";
import axios from "../../axiosConfig";

import ProfileInfo from "../../components/ProfileInfo";
import { User } from "../../interfaces/User";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

const OtherProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();

  const {
    isLoading,
    isError,
    data: user,
  } = useQuery(["getUserData", username], async () => {
    const res = await axios.get<User>(`/user/${username}`);
    return res.data;
  });

  if (!user || isLoading) {
    return <Typography>loading profile...</Typography>;
  }

  if (isError) {
    return (
      <Typography>
        The user <strong>{username}</strong> cannot be loaded at this time.
      </Typography>
    );
  }

  return (
    <Container>
      <Helmet>
        <title>User {username}</title>
      </Helmet>
      <Typography variant="h1">{username}&apos;s Profile</Typography>
      <ProfileInfo user={user} />
    </Container>
  );
};

export default OtherProfilePage;
