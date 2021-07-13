import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    h1: {
      fontSize: "2.2rem",
      marginBottom: "0.8rem",
    },
    h2: {
      fontSize: "1.85rem",
      marginBottom: "0.7rem",
    },
    h3: {
      fontSize: "1.5rem",
      marginBottom: "0.5rem",
    },
    h5: {
      // fontSize: 100,
    },
  },
});

export default theme;
