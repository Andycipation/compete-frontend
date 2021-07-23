import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { useStyles } from "../styles";

import axios from "../../axiosConfig";
import { useQuery } from "react-query";

import { ProblemMetadata, ProblemSets } from "../../common/interfaces/problem";

import ProblemList from "../ProblemList";
import { getPlatform } from "../../platforms/platforms";

const cf = getPlatform("cf");

interface Props {
  username: string;
}

// thanks to William Li for the color palette
const GREY = "#a3a3a3";
const GM_RED = "#fc3535";
const COLORS: [number, string][] = [
  // if >= t[0], then use the color t[1]
  [-1e9, GREY],
  [1200, "#00d166"],
  [1400, "#59dfdd"],
  [1600, "#737BDF"],
  [1900, "#B971ED"],
  [2100, "#ffcc87"],
  [2300, "#fa7b2d"],
  [2400, "#e76969"],
  [2600, GM_RED],
];

const coloredRatingHtml = (rating: number) => {
  const s = rating.toString();
  if (rating >= 3000) {
    return (
      <span>
        <span color="black">{s[0]}</span>
        <span color={GM_RED}>{s.substr(1)}</span>
      </span>
    );
  }

  let color = GREY;
  for (let i = COLORS.length - 1; i >= 0; i--) {
    const [r, c] = COLORS[i];
    if (rating >= r) {
      color = c;
      break;
    }
  }
  return <span style={{ color }}>{rating}</span>;
};

const CodeforcesSets: React.FC<Props> = ({ username }: Props) => {
  const classes = useStyles();

  const {
    data: problems,
    isLoading,
    isError,
  } = useQuery(["getCfRecs", username], async () => {
    if (username) {
      const { data } = await axios.get<ProblemSets>("/cf/recs", {
        params: { username },
      });
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

  if (isLoading || !problems) {
    return <Typography>loading Codeforces problems...</Typography>;
  }

  return (
    <div>
      <Typography variant="h2">
        Your Codeforces problem lists for {dateString}
      </Typography>
      <Grid container direction="row" spacing={3}>
        {problems.map(([tag, problems], index) => (
          <Grid key={index} item xs={12} sm={6} lg={3}>
            <ProblemList
              heading={tag}
              problems={problems}
              renderDifficulty={(d) => (
                <Typography className={classes.cfRating}>
                  {coloredRatingHtml(d)}
                </Typography>
              )}
              getListItemProps={(problem: ProblemMetadata) => {
                return {
                  component: "a",
                  href: cf.getProblemLink(problem.id),
                  target: "_blank",
                  rel: "noreferrer",
                };
              }}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CodeforcesSets;
