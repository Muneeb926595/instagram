import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getUser } from "@store/auth/AuthActions";
import { socket } from "@helpers/sockets";
import { Navbar } from "@components";
import { useMobile } from "@customeHooks";

const Layout = (props) => {
  const dispatch = useDispatch();
  const userData = useSelector(({ Foodbook }) => Foodbook.auth.user);

  const [isMobile] = useMobile();

  //get user data if not available in redux
  useEffect(() => {
    if (!userData.userName) {
      dispatch(getUser(localStorage.getItem("userId")));
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
      <div className={`${isMobile ? "p-2" : "w-1/5"} h-full`}>
        {!isMobile && <Navbar />}
      </div>
      <div className={`${isMobile ? "w-full" : "w-4/5"} h-full mr-2 `}>
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
