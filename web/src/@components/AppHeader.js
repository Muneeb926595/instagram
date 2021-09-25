import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { HeaderSearch, Icon, NotificationsModal, Clickable } from "@components";
import { useMobile } from "@customeHooks";
import { setShowAddPostModal } from "@store/modals/ModalsActions";

const AppHeader = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [isMobile] = useMobile();

  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const unreadNotificationsCount = useSelector(
    ({ Foodbook }) => Foodbook.notifications.unreadNotificationsCount
  );

  const handleOpenAddPostModal = () => {
    dispatch(setShowAddPostModal({ isVisible: true, modalPayload: {} }));
  };
  return (
    <div
      className={`flex flex-row items-center bg-white justify-between ${
        isMobile && "w-screen"
      }  `}
    >
      <HeaderSearch />
      <div className="flex flex-row items-center">
        <Clickable onClick={() => history.push("/messenger")}>
          <Icon
            type="messenger"
            marg={`${isMobile ? "0" : "0 0.8rem 0 0"}`}
            size={`${isMobile ? "18px" : "24px"}`}
          />
        </Clickable>
        <div style={{ position: "relative" }}>
          <Clickable onClick={() => setShowNotificationModal(true)}>
            <Icon
              type="notifications"
              marg="0  1.4rem 0 0.8rem"
              size={`${isMobile ? "18px" : "24px"}`}
            />
          </Clickable>
          {unreadNotificationsCount ? (
            <div
              className="bg-pink-600"
              style={{
                width: "10px",
                height: "10px",
                position: "absolute",
                borderRadius: "100px",
                left: "50%",
                top: "-30%",
              }}
            ></div>
          ) : (
            ""
          )}
          {showNotificationModal && (
            <NotificationsModal
              closeModal={() => setShowNotificationModal(false)}
            />
          )}
        </div>
        {!isMobile && (
          <button
            onClick={handleOpenAddPostModal}
            className="flex flex-row items-center px-3 py-2 rounded-lg"
            style={{
              background:
                "linear-gradient(140deg, rgba(228, 62, 104, 1) 0%,  rgba(250, 164, 73, 1) 100%)",
            }}
          >
            <div
              style={{
                backdropFilter: "blur(12px) saturate(120%)",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                borderRadius: "4px",
                border: "1px solid rgba(209, 213, 219, 0.3)",
              }}
            >
              <Icon type="plus" size="22px" />
            </div>
            <p className="text-white text-lg font-sans font-semibold ml-3">
              Add photo
            </p>
          </button>
        )}
      </div>
    </div>
  );
};

export default AppHeader;
