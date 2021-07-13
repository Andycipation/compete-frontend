import React from "react";
import ReactDOM from "react-dom";

import { QueryClient, QueryClientProvider } from "react-query";
import { UserContextProvider } from "./store/userContext";
import { ThemeProvider } from "@material-ui/core";
import theme from "./ui/theme";

import App from "./App";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </UserContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
