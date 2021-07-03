import React from "react";
import {
  Card,
  createStyles,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { Problem } from "../common/interfaces";

interface Props {
  heading: string;
  problems: Problem[];
  showTiers?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      borderRadius: theme.spacing(2),
    },
  })
);

const ProblemList: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  return (
    <Card className={classes.card} raised>
      <Typography variant="h6" align="center">
        {props.heading}
      </Typography>
      <List>
        {props.problems.map((problem: Problem, index) => (
          <ListItem
            key={index}
            button
            component="a"
            // below: forwarded to <a> tag
            href={`https://www.acmicpc.net/problem/${problem.id}`}
            target="_blank" // open a new tab
          >
            <ListItemText>{problem.title}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default ProblemList;
