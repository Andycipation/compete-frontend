import React from "react";
import { Grid, Typography } from "@material-ui/core";

import axios from "../../axiosConfig";
import { useQuery } from "react-query";

import { ProblemForUser } from "../../common/interfaces/data";
import ProblemList from "../ProblemList";
import TierBadge from "./TierBadge";
import { useStyles } from "../styles";

interface Props {
  username: string;
}

const BojProblemSets: React.FC<Props> = ({ username }: Props) => {
  const classes = useStyles();

  const {
    data: problemSets,
    isLoading,
    isError,
  } = useQuery(["getBojProblemSets", username], async () => {
    if (username) {
      const { data } = await axios.get<(readonly [string, ProblemForUser[]])[]>(
        "/boj/recommendations",
        { params: { username } }
      );
      console.log(data);
      return data;
    }
  });

  const dateString = new Date(Date.now()).toLocaleDateString();

  if (isError) {
    return (
      <Typography>
        An error occurred and the problems cannot be fetched at this time.
      </Typography>
    );
  }

  if (isLoading || !problemSets) {
    return <Typography>loading BOJ problems...</Typography>;
  }

  return (
    <div>
      <Typography variant="h5">
        Your BOJ problem lists for {dateString}
      </Typography>
      <Grid container direction="row" spacing={3}>
        {problemSets.map(([tag, problems], index) => (
          <Grid key={index} item xs={12} sm={6} lg={3}>
            <ProblemList
              heading={tag}
              problems={problems}
              // TODO: toggle show/not show?
              renderDifficulty={(d) => {
                return <TierBadge className={classes.tierBadge} tier={d} />;
              }}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default BojProblemSets;
