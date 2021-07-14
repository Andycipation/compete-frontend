import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { grey, lightGreen } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      borderRadius: theme.spacing(1),
    },
    bojTierBadge: {
      height: "1rem",
    },
    cfRating: {},
    judgeLogo: {
      height: theme.spacing(8),
      borderColor: grey[900],
      borderStyle: "solid",
      borderWidth: "1px",
    },
    problemListItemUnsolved: {
      padding: theme.spacing(0.1, 2),
    },
    problemListItemSolved: {
      padding: theme.spacing(0.1, 2),
      backgroundColor: lightGreen[500],
    },
    problemListsContainer: {
      margin: theme.spacing(3, 1),
    },
  })
);
