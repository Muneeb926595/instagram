import React from "react";
import { useDispatch } from "react-redux";

import { Search, Icon } from "@components";
import { setShowAddPostModal } from "@store/modals/ModalsActions";

const AppHeader = () => {
  const dispatch = useDispatch();

  const handleOpenAddPostModal = () => {
    dispatch(setShowAddPostModal({ isVisible: true, modalPayload: {} }));
  };

  return (
    <div className="flex flex-row items-center bg-white justify-between ">
      <Search />
      <div className="flex flex-row items-center">
        <Icon type="messenger" marg="0 0.8rem 0 0" size="24px" />
        <Icon type="notifications" marg="0  1.4rem 0 0.8rem" size="24px" />
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
      </div>
    </div>
  );
};

export default AppHeader;
