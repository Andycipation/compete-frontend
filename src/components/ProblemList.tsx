import React from "react";
import { useHistory } from "react-router-dom";
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

const cfProblemLink = (problemId: string): string => {
  const id = problemId;
  const prefixMatch = id.match(/^[0-9]+/);
  assert(prefixMatch);
  const contestId = prefixMatch[0];
  const problemIndex = id.substr(contestId.length);
  // TODO: use this or contest link?
  return `https://codeforces.com/problemset/problem/${contestId}/${problemIndex}`;
};

interface Props {
  heading: string;
  problems: ProblemForUser[];
  renderDifficulty?: (difficulty: number) => React.ReactElement;
}

const ProblemList: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Card className={classes.card} raised>
      <Typography variant="h6" align="center">
        {props.heading}
      </Typography>
      <List>
        {props.problems.map(({ problem, solved }, index) => {
          const listItemProps: any = {
            className: solved
              ? classes.problemListItemSolved
              : classes.problemListItemUnsolved,
            button: true,
          };
          if (problem.platform == "boj") {
            listItemProps.onClick = () => {
              history.push(`/problem/${problem.id}`);
            };
          } else {
            const link = cfProblemLink(problem.id);
            listItemProps.component = "a";
            listItemProps.href = link;
            listItemProps.target = "_blank";
            listItemProps.rel = "noreferrer";
          }
          return (
            <ListItem key={index} {...listItemProps}>
              {props.renderDifficulty &&
                props.renderDifficulty(problem.difficulty)}
              <ListItemText>
                <Typography noWrap>{problem.title}</Typography>
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
};

export default ProblemList;
