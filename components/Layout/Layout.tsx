import React, { Fragment } from "react";
import Header from "../Header/Header";
import SideBar from "../SideBar/SideBar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <SideBar />
      <Fragment>{children}</Fragment>
    </Fragment>
  );
};

export default Layout;
