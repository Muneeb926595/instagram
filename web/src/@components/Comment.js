import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { getLastPostDuration } from "@helpers/timeDateUtils";
import { Avatar } from "@components";

const useStyles = makeStyles(() => ({
  authorComment: {
    padding: "5px",
    display: "flex",
    alignItems: "center",
    position: "relative",
  },

  commentContainer: {
    display: "flex",
    alignItems: "flex-start",
    width: "100%",
  },
  userProfileIcon: {
    width: "36px",
    height: "36px",
    borderRadius: "100%",
    objectFit: "cover",
    alignSelf: "center",
  },
  coment: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    paddingLeft: "1rem",
  },
  userProfileNameContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    color: "#262626",
  },
  userProfileName: {
    fontWeight: "600",
    marginRight: "5px",
    color: "#000000",
    textDecoration: "none",
  },
  duration: {
    margin: "0",
    paddingRight: "12px",
    fontSize: "10px",
    fontWeight: "600",
    color: "#808080",
  },
  optionsContainer: {
    width: "20px",
    height: "10px",
    cursor: "pointer",
    alignSelf: "center",
    marginRight: "10px",
    position: "relative",
  },

  optionsIcon: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}));

const Comment = ({ comment }) => {
  const classes = useStyles();
  return (
    <div className={classes.authorComment}>
      <div className={classes.commentContainer}>
        <Avatar uri={comment?.userId.image} size="36" noCircle />

        <div className={classes.coment}>
          <div className="flex items-center justify-between">
            <p className=" font-sans text-xs gradient-text">
              @{comment?.userId?.userName}
            </p>
            <p className={` font-sans ${classes.duration}`}>
              {getLastPostDuration(comment.createdAt)}
            </p>
          </div>
          <div>
            <p
              className="font-sans text-sm "
              style={{ margin: "0px", width: "85%" }}
            >
              {" "}
              {comment.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
