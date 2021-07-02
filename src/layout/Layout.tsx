import React, { ReactNode } from "react";
import Navigation from "./Navigation";

import { Container } from "@material-ui/core";

interface Props {
  children: ReactNode;
}

const Layout: React.FC<Props> = (props: Props) => {
  return (
    <Container>
      <Navigation />
      <main>{props.children}</main>
    </Container>
  );
};

export default Layout;
