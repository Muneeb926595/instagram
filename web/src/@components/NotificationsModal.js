import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import { useOutsideClick, useMobile } from "@customeHooks";
import { NotificationListRow, Loader } from "@components";

const useStyles = makeStyles(() => ({
  triangleUp: (styleProps) => ({
    position: "absolute",
    top: "-4.2%",
    width: "1px",
    height: "0px",
    left: styleProps.isMobile ? "92%" : "45%",
    borderLeft: "20px solid transparent",
    borderRight: "20px solid transparent",
    borderBottom: "20px solid #fff",
  }),
}));

const NotificationsModal = ({ closeModal }) => {
  const [isMobile] = useMobile();
  const styleProps = { isMobile };
  const classes = useStyles(styleProps);

  const wrapperRef = useRef(null);

  const { notificationsList, loading } = useSelector(
    ({ Foodbook }) => Foodbook.notifications
  );

  useOutsideClick(wrapperRef, () => {
    closeModal();
  });

  return (
    <div
      className="p-4 absolute bg-white rounded-lg "
      ref={wrapperRef}
      style={{
        zIndex: 1000,
        height: "32vh",
        width: isMobile ? "93vw" : "20vw",
        top: "5vh",
        right: isMobile ? "6vw" : "-8vw",
        boxShadow: "0px 0px 20px #dbdbdb",
      }}
    >
      <div className={classes.triangleUp}></div>
      {loading ? (
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Loader />
        </div>
      ) : (
        <>
          {notificationsList?.length > 0 &&
            notificationsList?.map((notification) => (
              <NotificationListRow
                notification={notification}
                key={notification._id}
              />
            ))}
        </>
      )}
    </div>
  );
};

export default NotificationsModal;
