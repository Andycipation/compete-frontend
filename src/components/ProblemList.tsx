import React from "react";
import { Card, List, ListItem, Typography } from "@material-ui/core";
import { Problem } from "../common/interfaces";

interface Props {
  heading: string;
  problems: Problem[];
  showTiers?: boolean;
}

const ProblemList: React.FC<Props> = (props: Props) => {
  return (
    <Card raised>
      <Typography variant="h6">{props.heading}</Typography>
      <List>
        {props.problems.map((problem: Problem, index) => (
          <ListItem key={index} button>
            {problem.title}
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default ProblemList;
