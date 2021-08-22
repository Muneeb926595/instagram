import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import { Avatar } from "@components";
import { readNotification } from "@store/notifications/NotificationsActions";

const useStyles = makeStyles((theme) => ({
  notificationListRow: {
    width: "100%",
    display: "flex",
    cursor: "pointer",
    alignItems: "center",
    textDecoration: "none",
    color: "black",
    borderBottom: "1px solid #dbdbdb",
    padding: "20px",
    [theme.breakpoints.down("sm")]: {
      padding: "10px",
    },
  },
  notificationContent: {
    flex: "1",
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
}));

const NotificationListRow = ({ notification }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [state] = useState({
    pageName: "notification",
    userId: notification?.userId?._id,
  });
  return (
    <Link
      className={classes.notificationListRow}
      to={
        notification.followedUserId &&
        notification.followedUserId !== undefined &&
        notification.followedUserId !== "undefined" && {
          pathname: "/profile",
          state,
        }
      }
      onClick={() => {
        dispatch(readNotification(notification._id));
      }}
    >
      <Avatar uri={notification?.userId?.image} noCircle size="50" />
      <div className={classes.notificationContent}>
        <p className="font-sans font-semibold text-sm ml-4">
          <span
            style={{
              textTransform: "capitalize",
            }}
          >
            {notification.userId && notification.userId.userName}
          </span>
          <span
            className="font-sans font-light text-sm"
            style={{
              textTransform: "lowercase",
            }}
          >
            {notification.followedUserId &&
            notification.followedUserId !== undefined &&
            notification.followedUserId !== "undefined"
              ? "  has started to feed by"
              : `  ${notification.action}`}
          </span>
        </p>
        {notification.read ? (
          ""
        ) : (
          <div
            className="bg-pink-600"
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "100px",
            }}
          ></div>
        )}
      </div>
    </Link>
  );
};

export default NotificationListRow;
