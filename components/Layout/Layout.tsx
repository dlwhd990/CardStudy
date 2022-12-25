import React, { Fragment } from "react";
import Header from "../Header/Header";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <Fragment>{children}</Fragment>
    </Fragment>
  );
};

export default Layout;
