import React from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "../axiosConfig";

import { Container, Typography } from "@material-ui/core";
import { Sub } from "../common/interfaces/sub";
import PopoutLink from "../components/PopoutLink";

const SubsPage: React.FC = () => {
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
      {subs.map((sub, index) => (
        // TODO: massive cleanup, e.g. move into components
        <div key={index}>
          <PopoutLink
            to={`https://codeforces.com/contest/${sub.problemId.substring(
              0,
              4
            )}/submission/${sub.subId}`}
          >
            <Typography>{sub.subId}</Typography>
          </PopoutLink>
        </div>
      ))}
    </Container>
  );
};

export default SubsPage;
