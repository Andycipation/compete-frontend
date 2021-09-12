/*
Not used yet.
*/

import React from "react";
import {
  Card,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";

import PopoutLink from "./PopoutLink";
import { Sub } from "../common/interfaces/sub";

import { getPlatform } from "../platforms/platforms";

const cf = getPlatform("cf");

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    subCard: {
      margin: theme.spacing(0.5),
      padding: theme.spacing(1),
    },
  })
);

interface Props {
  sub: Sub;
}

const Submission: React.FC<Props> = ({ sub }: Props) => {
  const classes = useStyles();

  const platform = cf;

  return (
    <Grid item xs={12}>
      <Card className={classes.subCard} raised>
        <Grid container direction="row">
          <Grid item xs={1}>
            <platform.Icon />
          </Grid>
          <Grid item xs={1}>
            <PopoutLink to={platform.getSubLink(sub)}>
              <Typography>Link</Typography>
            </PopoutLink>
          </Grid>
          <Grid item xs={2}>
            <PopoutLink to={platform.getProblemLink(sub.problemId)}>
              <Typography>Problem</Typography>
            </PopoutLink>
          </Grid>
          {/* <Typography>Memory: {sub.memory} bytes</Typography>
          <Typography>Running time: {sub.runningTime} milliseconds</Typography>
          <Grid item xs={2}>
            <Typography>
              {new Date(sub.unixDate * 1000).toLocaleString()}
            </Typography>
          </Grid> */}
          <Grid item xs={1}>
            <Typography>Verdict: {sub.verdict}</Typography>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default Submission;
