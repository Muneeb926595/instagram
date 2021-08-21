import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { CustomModal, Icon } from "@components";
import { setShowNewCallAlert } from "@store/modals/ModalsActions";
import { socket } from "@helpers/sockets";

const NewCallAlert = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { newCallAlert } = useSelector(({ Foodbook }) => Foodbook.modals);

  const closeActionsModal = () => {
    dispatch(setShowNewCallAlert({ isVisible: false, modalPayload: {} }));
  };

  const handleCloseCall = () => {
    //TODO: in future when user 2 reject the call offer let the use1 know through sockets that user 1 is not accepting the call
    closeActionsModal();
  };

  const handleAcceptCallOffer = () => {
    socket.emit(
      "call-accepted",
      newCallAlert?.modalPayload?.hostId,
      localStorage.getItem("userId")
    );
    history.push("/audio");
    closeActionsModal();
  };

  return (
    <CustomModal
      onCloseModal={closeActionsModal}
      showModal={newCallAlert.isVisible}
      veryDark="true"
    >
      <div className="w-1/4 h-1/4 flex flex-col bg-white rounded">
        <div className="flex items-center px-4 py-4 ">
          <p className="text-lg font-sans font-medium text-gray-800">
            Call Arrived
          </p>
        </div>
        <p className=" px-4 py-2 text-lg font-sans text-gray-800">
          {newCallAlert?.modalPayload?.hostName} is calling you
        </p>
        <div className="flex justify-between w-full items-center px-8 py-4 mt-8">
          <button
            className="flex items-center bg-green-500 px-5 py-2 rounded-full text-white"
            onClick={handleAcceptCallOffer}
          >
            <Icon type="start-call" size="20px" />
            <p className="ml-2 font-sans font-medium">Accept</p>
          </button>
          <button
            className="flex items-center bg-red-500 px-5 py-2 rounded-full text-white"
            onClick={handleCloseCall}
          >
            <Icon type="end-call" size="20px" />
            <p className="ml-2 font-sans font-medium">Cancel</p>
          </button>
        </div>
      </div>
    </CustomModal>
  );
};

export default NewCallAlert;
