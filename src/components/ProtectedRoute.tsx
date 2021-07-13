import React, { useContext } from "react";
import { Typography } from "@material-ui/core";
import { Redirect, Route, RouteProps } from "react-router";

import UserContext from "../store/userContext";

const ProtectedRoute: React.FC<RouteProps> = ({
  path,
  children,
  ...rest
}: RouteProps) => {
  const { isLoading, user } = useContext(UserContext);

  if (isLoading) {
    return <Typography>loading...</Typography>;
  }

  if (!user.username) {
    return <Redirect to={`/login?next=${path}`} />;
  }

  return (
    <Route path={path} {...rest}>
      {children}
    </Route>
  );
};

export default ProtectedRoute;
