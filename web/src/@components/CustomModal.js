import Backdrop from "@material-ui/core/Backdrop";
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import React from "react";

export default function CustomModal({
  children,
  onCloseModal,
  showModal,
  dark,
  homePage,
  veryDark,
}) {
  return (
    <Modal
      BackdropProps={{
        style: {
          backgroundColor: `${
            dark
              ? "rgb(0,0,0,0.6)"
              : veryDark
              ? "rgb(0,0,0,0.8)"
              : "rgb(0,0,0,0.2)"
          }`,
        },
      }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      open={showModal}
      onClose={() => {
        onCloseModal();
        if (homePage) {
          localStorage.setItem("firstTime", "false");
        }
      }}
      closeAfterTransition
      BackdropComponent={Backdrop}
    >
      <Fade in={showModal} style={{ outline: "none" }}>
        {children}
      </Fade>
    </Modal>
  );
}
