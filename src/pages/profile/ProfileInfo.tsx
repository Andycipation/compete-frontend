/*
Not used yet.
*/

import React from "react";
import { Typography } from "@material-ui/core";

import { useQuery } from "react-query";
import axios from "../../axiosConfig";

interface Props {
  username: string;
}

const ProfileInfo: React.FC<Props> = ({ username }: Props) => {
  const { isLoading, data } = useQuery(["getUserData", username], async () => {
    const res = await axios.get(`/user/${username}`);
    return res.data;
  });

  if (!data || isLoading) {
    return <Typography>loading profile...</Typography>;
  }

  return (
    <>
      <Typography>Joined on {data.createdAt}</Typography>
    </>
  );
};

export default ProfileInfo;
