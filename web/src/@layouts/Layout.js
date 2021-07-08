import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getUser } from "@store/auth/AuthActions";
import { socket } from "@helpers/sockets";

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
  return <div>{props.children}</div>;
};

export default Layout;
