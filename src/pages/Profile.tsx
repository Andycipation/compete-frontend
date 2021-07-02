/*
Not used yet.
*/

import React from "react";

import { Typography } from "@material-ui/core";

interface Props {
  username: string;
}

const ProfilePage: React.FC<Props> = ({ username }: Props) => {
  return (
    <div>
      <Typography variant="h3">{username}'s Profile</Typography>
    </div>
  );
};

export default ProfilePage;
