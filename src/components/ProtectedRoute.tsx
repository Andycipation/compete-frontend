import React, { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router";

import UserContext from "../store/userContext";

const ProtectedRoute: React.FC<RouteProps> = ({
  path,
  children,
  ...rest
}: RouteProps) => {
  const { user } = useContext(UserContext);

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
