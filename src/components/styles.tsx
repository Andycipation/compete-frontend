import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { lightGreen } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme: Theme) =>
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
    problemListContainer: {
      margin: theme.spacing(3, 1),
    },
  })
);
