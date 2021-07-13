import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    welcomeCard: {
      marginBottom: theme.spacing(2),
      padding: theme.spacing(2),
    },
  })
);
