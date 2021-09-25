import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import footerPlusButton from "assets/icons/footerPlusButton.svg";
import { setShowAddPostModal } from "@store/modals/ModalsActions";
import { Icon } from "@components";

const useStyles = makeStyles((theme) => {
  return {
    bottomNavigationContainer: {
      height: "8vh",
      width: "100%",
      padding: "10px 0px",
      zIndex: "99",
      backgroundColor: "#ffffff",
      boxShadow: "0px 10px 30px #000000",
      position: "fixed",
      bottom: "0",
      left: "0",
    },
    iconsContainer: {
      display: "flex",
      justifyContent: "space-evenly",
      width: "80%",
      alignSelf: "center",
      alignItems: "center",
    },
    notFilledIconContainer: {
      display: "flex",
      alignItems: "center",
      padding: "0.5rem",
      borderRadius: "20px",

      width: "15%",
      "@media (max-height:580px)": { height: "10%" },
      whiteSpace: "nowrap",
      overflow: "hidden",
      transition: "0.2s ease-out",
    },
    filledIconContainer: {
      width: "35%",
      "@media (max-height:580px)": { height: "25%" },
      background:
        "linear-gradient(140deg, rgba(228, 62, 104, 1) 0%,  rgba(250, 164, 73, 1) 100%)",
    },
    plusIcon: {
      height: "100%",
      width: "100%",
    },
    plusIconContainer: {
      width: "14%",
      position: "fixed",
      bottom: "4.4%",
      right: "4%",
      zIndex: "1000",
      [theme.breakpoints.up("sm")]: {
        display: "none !important",
      },
    },
    iconTitle: {
      margin: "0",
      marginLeft: "0.3rem",
      color: "#ffffff",
      fontSize: "12px",
    },
  };
});

const BottomNavigation = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [selectedPage, setSelectedPage] = useState(window.location.pathname);
  const classes = useStyles();
  const handleOpenAddPostModal = () => {
    dispatch(setShowAddPostModal({ isVisible: true, modalPayload: {} }));
  };
  return (
    <>
      <div className={classes.bottomNavigationContainer}>
        <div className={classes.iconsContainer}>
          <div
            className={`${classes.notFilledIconContainer} ${
              selectedPage === "/home" && classes.filledIconContainer
            }`}
            onClick={() => {
              setSelectedPage("/home");
              history.push("/home");
            }}
          >
            <Icon
              type={selectedPage === "/home" ? "home-white" : "home"}
              size="24px"
            />
            {selectedPage === "/home" && (
              <p className={classes.iconTitle}>Home</p>
            )}
          </div>
          <div
            className={`${classes.notFilledIconContainer} ${
              selectedPage === "/profile" && classes.filledIconContainer
            }`}
            onClick={() => {
              setSelectedPage("/profile");
              history.push("/profile");
            }}
          >
            <Icon
              type={selectedPage === "/profile" ? "profile-white" : "profile"}
              size="24px"
            />
            {selectedPage === "/profile" && (
              <p className={classes.iconTitle}>Profile</p>
            )}
          </div>
          <div
            className={`${classes.notFilledIconContainer} ${
              selectedPage === "/igtv" && classes.filledIconContainer
            }`}
            onClick={() => {
              setSelectedPage("/igtv");
              history.push("/igtv");
            }}
          >
            <Icon
              type={selectedPage === "/igtv" ? "igtv-white" : "igtv"}
              size="24px"
            />
            {selectedPage === "/igtv" && (
              <p className={classes.iconTitle}>Igtv</p>
            )}
          </div>
          <div
            className={`${classes.notFilledIconContainer} ${
              selectedPage === "/saved" && classes.filledIconContainer
            }`}
            onClick={() => {
              setSelectedPage("/saved");
              history.push("/saved");
            }}
          >
            <Icon
              type={selectedPage === "/saved" ? "saved-white" : "saved"}
              size="24px"
            />
            {selectedPage === "/saved" && (
              <p className={classes.iconTitle}>Saved</p>
            )}
          </div>
        </div>
      </div>
      <div
        className={classes.plusIconContainer}
        onClick={handleOpenAddPostModal}
      >
        <img
          className={classes.plusIcon}
          src={footerPlusButton}
          alt="plusIcon"
        />
      </div>
    </>
  );
};

export default BottomNavigation;
