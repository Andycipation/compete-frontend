/*
Not used yet.
*/

import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { User } from "../interfaces/User";

interface Props {
  user: User;
}

const ProfileInfo: React.FC<Props> = ({ user }: Props) => {
  // console.log(user);

  return (
    <>
      <Typography variant="body1">
        Joined: {new Date(user.createdAt).toLocaleDateString()}
      </Typography>
      <Typography variant="body1">
        BOJ id: {user.boj.userId || "none set"}
      </Typography>
      <Typography variant="body1">
        Codeforces id: {user.cf.userId || "none set"}
      </Typography>

      {/* TODO: add */}
      {/* <Typography variant="h2">Recent Solves</Typography> */}
      <Link to={`/user/${user.username}/submissions`}>
        <Typography variant="body1">Recent Submissions</Typography>
      </Link>
    </>
  );
};

export default ProfileInfo;
