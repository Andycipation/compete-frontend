import React from "react";
import { useHistory } from "react-router-dom";
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
import { ProblemForUser } from "../common/interfaces/data";
import { lightGreen } from "@material-ui/core/colors";
import TierBadge from "./TierBadge";

interface Props {
  heading: string;
  problems: ProblemForUser[];
  showTiers?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      borderRadius: theme.spacing(1),
    },
    tierBadge: {
      height: "15px",
      marginRight: theme.spacing(1),
    },
    problemListItemUnsolved: {
      padding: theme.spacing(0.1, 2),
    },
    problemListItemSolved: {
      padding: theme.spacing(0.1, 2),
      backgroundColor: lightGreen[500],
    },
  })
);

const ProblemList: React.FC<Props> = (props: Props) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Card className={classes.card} raised>
      <Typography variant="h6" align="center">
        {props.heading}
      </Typography>
      <List>
        {props.problems.map(({ problem, solved }, index) => (
          <ListItem
            key={index}
            className={
              solved
                ? classes.problemListItemSolved
                : classes.problemListItemUnsolved
            }
            button
            // component={Link}
            // to={`/problem/${problem.id}`}
            // component="a"
            // // below: forwarded to <a> tag
            // href={`https://www.acmicpc.net/problem/${problem.id}`}
            // target="_blank" // open a new tab
            // rel="noreferrer"
            onClick={() => history.push(`/problem/${problem.id}`)}
          >
            {props.showTiers && (
              <TierBadge tier={problem.tier} className={classes.tierBadge} />
            )}
            <ListItemText>{problem.title}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

export default ProblemList;
