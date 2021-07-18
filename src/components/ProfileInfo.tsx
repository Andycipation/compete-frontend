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
  // console.log(user);

  return (
    <>
      <Typography variant="body2">
        Joined: {new Date(user.createdAt).toLocaleDateString()}
      </Typography>
      <Typography variant="body2">
        BOJ id: {user.boj.userId || "none set"}
      </Typography>
      <Typography variant="body2">
        Codeforces id: {user.cf.userId || "none set"}
      </Typography>

      {/* TODO: add */}
      {/* <Typography variant="h2">Recent Solves</Typography> */}
    </>
  );
};

export default ProfileInfo;
