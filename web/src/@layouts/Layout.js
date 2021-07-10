import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getUser } from "@store/auth/AuthActions";
import { socket } from "@helpers/sockets";
import { Navbar } from "@components";

const Layout = (props) => {
  const dispatch = useDispatch();
  const userData = useSelector(({ Foodbook }) => Foodbook.auth.user);

  //get user data if not available in redux
  useEffect(() => {
    if (!userData.userName) {
      dispatch(getUser());
    }
  }, [dispatch, userData]);

  //join the user with sockets
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      socket.emit("join", localStorage.getItem("userId"));
    }
    return () => {
      socket.off("join");
    };
  }, []);

  if (
    !(localStorage.getItem("access_token") && localStorage.getItem("userId"))
  ) {
    return <Redirect to="/" />;
  }
  return (
    <div
      className="w-screen h-screen flex items-center"
      style={{ maxWidth: "98vw" }}
    >
      <div className="w-1/5 h-full">
        <Navbar />
      </div>
      <div className=" w-4/5 h-full mr-2 ml-16">{props.children}</div>
    </div>
  );
};

export default Layout;
