import React from "react";
import ReactDOM from "react-dom";

import { UserContextProvider } from "./store/userContext";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
