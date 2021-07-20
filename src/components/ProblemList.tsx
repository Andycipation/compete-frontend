import React from "react";
import {
  Box,
  Card,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";

import { useStyles } from "./styles";
import { ProblemForUser, ProblemMetadata } from "../common/interfaces/problem";

interface Props {
  heading: string;
  problems: ProblemForUser[];
  renderDifficulty?: (difficulty: number) => React.ReactElement;
  getListItemProps: (problem: ProblemMetadata) => any;
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
          const className = solved
            ? classes.problemListItemSolved
            : classes.problemListItemUnsolved;
          return (
            <ListItem
              key={index}
              className={className}
              button
              {...props.getListItemProps(problem)}
            >
              <Box marginRight="1rem">
                {props.renderDifficulty &&
                  props.renderDifficulty(problem.difficulty)}
              </Box>
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
