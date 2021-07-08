import React from "react";
import {
  Card,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import assert from "assert";

import { useStyles } from "./styles";
import { ProblemForUser } from "../common/interfaces/data";
// import { lightGreen } from "@material-ui/core/colors";

interface Props {
  heading: string;
  problems: ProblemForUser[];
  renderDifficulty?: (difficulty: number) => React.ReactElement;
}

const ProblemList: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  return (
    <Card className={classes.card} raised>
      <Typography variant="h6" align="center">
        {props.heading}
      </Typography>
      <List>
        {props.problems.map(({ problem, solved }, index) => {
          const id = problem.id;
          const prefixMatch = id.match(/^[0-9]+/);
          assert(prefixMatch);
          const contestId = prefixMatch[0];
          const problemIndex = id.substr(contestId.length);
          // TODO: use this or contest link?
          const link = `https://codeforces.com/problemset/problem/${contestId}/${problemIndex}`;
          return (
            <ListItem
              key={index}
              className={
                solved
                  ? classes.problemListItemSolved
                  : classes.problemListItemUnsolved
              }
              button
              // below: forwarded to <a> tag
              component="a"
              href={link}
              target="_blank" // open a new tab
              rel="noreferrer"
              // onClick={() => history.push(`/problem/${problem.id}`)}
            >
              {props.renderDifficulty &&
                props.renderDifficulty(problem.difficulty)}
              <ListItemText>{problem.title}</ListItemText>
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
};

export default ProblemList;
