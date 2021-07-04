import React, { useContext, useEffect, useState } from "react";
import { Grid, Typography } from "@material-ui/core";

import UserContext from "../store/userContext";
import { Problem } from "../common/interfaces/data";

import axios from "../axiosConfig";
import ProblemList from "../components/ProblemList";

const HomePage: React.FC = () => {
  const { username } = useContext(UserContext);
  const dateString = new Date(Date.now()).toLocaleDateString();

  // TODO: move this to context
  const [problemSets, setProblemSets] = useState<[string, Problem[]][]>();

  useEffect(() => {
    if (username) {
      try {
        axios.get("/problems", { params: { username } }).then((res) => {
          setProblemSets(res.data.problemSets);
        });
      } catch (err) {
        // no BOJ id configured?
        console.error(err);
      }
    }
  }, [username]);

  const loggedInJsx = !problemSets ? (
    <Typography>loading problems...</Typography>
  ) : (
    <div>
      <Typography variant="h5">Your problem lists for {dateString}</Typography>
      <Grid container direction="row" spacing={3}>
        {problemSets.map(([tag, problems], index) => (
          <Grid key={index} item xs={3}>
            <ProblemList heading={tag} problems={problems} showTiers />
          </Grid>
        ))}
      </Grid>
    </div>
  );

  const loggedOutJsx = (
    <Typography>
      You are currently not logged in; log in <a href="/login">here</a>.
    </Typography>
  );

  return <div>{username ? loggedInJsx : loggedOutJsx}</div>;
};

export default HomePage;
