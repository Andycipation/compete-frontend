import React from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "../axiosConfig";

import { Container, Grid, Typography } from "@material-ui/core";
import { Sub } from "../common/interfaces/sub";
import Submission from "../components/Submission";

const SubmissionsPage: React.FC = () => {
  const { username } = useParams<{ username: string }>();

  const {
    isLoading,
    isError,
    data: subs,
  } = useQuery(["fetchSubs", username], async () => {
    const res = await axios.get("/cf/subs", {
      params: { username, page: 1 },
    });
    const subs: Sub[] = res.data;
    return subs;
  });

  if (isLoading || !subs) {
    return <Typography>loading submissions...</Typography>;
  }

  if (isError) {
    return (
      <Typography>
        An error occurred and the submissions could not be fetched at this time.
      </Typography>
    );
  }

  const heading = `${username}'s Recent Submissions`;

  return (
    <Container>
      <Helmet>
        <title>{heading}</title>
      </Helmet>
      <Typography variant="h2">{heading}</Typography>
      <Grid container spacing={1}>
        {subs.map((sub, index) => (
          <Submission key={index} sub={sub} />
        ))}
      </Grid>
    </Container>
  );
};

export default SubmissionsPage;
