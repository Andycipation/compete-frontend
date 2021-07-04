/*
Not used yet.
*/

import React from "react";
import { useParams } from "react-router-dom";

import { Typography } from "@material-ui/core";

interface Props {
  mine?: boolean;
}

const ProfilePage: React.FC<Props> = (props: Props) => {
  const { username } = useParams<{ username: string }>();

  if (props.mine) {
    return (
      <div>
        <Typography>My Account</Typography>
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
