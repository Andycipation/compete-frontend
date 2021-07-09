/*
Not used yet.
*/

import React from "react";
import { Link as RouterLink, useParams } from "react-router-dom";

import { Typography } from "@material-ui/core";

interface Props {
  mine?: boolean;
}

const ProfilePage: React.FC<Props> = (props: Props) => {
  const { username } = useParams<{ username: string }>();

  if (props.mine) {
    return (
      <div>
        <Typography variant="h5">My Account</Typography>
        <Typography variant="body1">
          <RouterLink to="/edit/profile">Edit profile</RouterLink>
        </Typography>
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h3">{username}&apos;s Profile</Typography>
    </div>
  );
};

export default ProfilePage;
