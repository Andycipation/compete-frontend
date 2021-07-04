import React, { useContext } from "react";
import { Redirect, Route, RouteProps, useRouteMatch } from "react-router";

import UserContext from "../store/userContext";

const ProtectedRoute: React.FC<RouteProps> = ({
  children,
  ...rest
}: RouteProps) => {
  const userContext = useContext(UserContext);
  const { path } = useRouteMatch();

  if (!userContext.username) {
    return <Redirect to={`/login?next=${path}`} />;
  }

  return <Route {...rest}>{children}</Route>;
};

export default ProtectedRoute;
