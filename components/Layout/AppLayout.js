import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";

const AppLayout = ({ children }) => {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
};

export default AppLayout;
