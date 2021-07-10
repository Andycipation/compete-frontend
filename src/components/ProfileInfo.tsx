/*
Not used yet.
*/

import React from "react";
import { Typography } from "@material-ui/core";
import { User } from "../interfaces/User";

interface Props {
  user: User;
}

const ProfileInfo: React.FC<Props> = ({ user }: Props) => {
  return (
    <>
      <Typography>BOJ id: {user.boj.userId || "none set"}</Typography>
      <Typography>Codeforces id: {user.cf.userId || "none set"}</Typography>
    </>
  );
};

export default ProfileInfo;
