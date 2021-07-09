import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useFormStyles = makeStyles((theme: Theme) =>
  createStyles({
    textInputField: {
      margin: theme.spacing(1, 0),
    },
  })
);
