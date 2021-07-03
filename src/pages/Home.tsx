import React, { useContext, useEffect, useState } from "react";
import { Grid, Typography } from "@material-ui/core";

import UserContext from "../store/userContext";
import { Problem } from "../common/interfaces";

import axios from "../axiosConfig";
import ProblemList from "../components/ProblemList";

const HomePage: React.FC = () => {
  const { username } = useContext(UserContext);
  const dateString = new Date(Date.now()).toLocaleDateString();

  const [problemSets, setProblemSets] = useState<[string, Problem[]][]>();

  useEffect(() => {
    if (username) {
      axios.get("/problems", { params: { username } }).then((res) => {
        setProblemSets(res.data.problemSets);
      });
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
            <ProblemList heading={tag} problems={problems} />
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

  return (
    <div>
      <Typography variant="h3" align="center">
        Compete
      </Typography>
      <Typography align="center">
        An app for anyone looking to improve at competitive programming.
      </Typography>
      {username ? loggedInJsx : loggedOutJsx}
    </div>
  );
};

export default HomePage;