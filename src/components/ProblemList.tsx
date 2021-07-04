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
import { Problem } from "../common/interfaces/data";

interface Props {
  heading: string;
  problems: Problem[];
  showTiers?: boolean;
}

export const tierBadgeUrl = (tier: string | number): string => {
  return `https://d2gd6pc034wcta.cloudfront.net/tier/${tier}.svg`;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      borderRadius: theme.spacing(1),
    },
    problemListItem: {
      padding: theme.spacing(0.1, 2),
    },
    tierBadge: {
      height: "15px",
      marginRight: theme.spacing(1),
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
            className={classes.problemListItem}
            button
            component="a"
            // below: forwarded to <a> tag
            href={`https://www.acmicpc.net/problem/${problem.id}`}
            target="_blank" // open a new tab
          >
            {props.showTiers && (
              <img
                className={classes.tierBadge}
                src={tierBadgeUrl(problem.tier)}
                alt={`tier${problem.tier}`}
              />
            )}
            <ListItemText>{problem.title}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default ProblemList;
