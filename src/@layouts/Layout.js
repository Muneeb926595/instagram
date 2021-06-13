import React from "react";

const Layout = () => {
  if (
    !(localStorage.getItem("access_token") && localStorage.getItem("userId"))
  ) {
  }
  return <div></div>;
};

export default Layout;
