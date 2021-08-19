import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import crossIcon from "assets/crossIcon.svg";

function CrossButton() {
  const useStyles = makeStyles({
    crossIcon: { height: "100%", width: "100%" },
  });
  const classes = useStyles();
  return <img alt="crossIcon" src={crossIcon} className={classes.crossIcon} />;
}

export default CrossButton;
