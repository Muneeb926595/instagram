import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { CustomModal, Icon } from "@components";
import { setShowAddPostModal } from "@store/modals/ModalsActions";

const AddPostModal = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useDispatch();
  const { addPostModal } = useSelector(({ Foodbook }) => Foodbook.modals);

  const closeModal = () => {
    dispatch(
      setShowAddPostModal({
        isVisible: false,
        modalPayload: {},
      })
    );
  };

  return (
    <CustomModal
      onCloseModal={closeModal}
      showModal={addPostModal.isVisible}
      veryDark
    >
      <div
        className="flex flex-col p-10 bg-white rounded-xl items-center"
        style={{ minWidth: "30vw" }}
      >
        <div className="flex flex-row items-center justify-between w-full">
          <p className="font-bold font-sans text-gray-600 text-lg">Add Post</p>
          <div className="cursor-pointer" onClick={closeModal}>
            <Icon type="cancel" size="24px" />
          </div>
        </div>
        <div className="flex flex-row items-center mt-6">
          <div
            className=" flex flex-col justify-center items-center rounded-lg mr-6 flex-shrink-0 flex-grow flex-nowrap border-2 border-gray-300 "
            style={{
              maxWidth: "9rem",
              minWidth: "9rem",
              height: "18vh",
            }}
          >
            <Icon type="add-images" size="40px" />
            <p className=" font-bold font-sans text-gray-400 text-sm mt-8">
              Add Images
            </p>
          </div>
          <div
            className="flex flex-col justify-center items-center rounded-lg mr-4 flex-shrink-0 flex-grow flex-nowrap border-2 border-gray-300 "
            style={{
              maxWidth: "9rem",
              minWidth: "9rem",
              height: "18vh",
            }}
          >
            <Icon type="add-videos" size="40px" />
            <p className=" font-bold font-sans text-gray-400 text-sm mt-8">
              Add Videos
            </p>
          </div>
        </div>
        <buton
          className="cursor-pointer mt-6 py-2 px-32 rounded-3xl text-white  text-lg font-sans font-semibold "
          style={{
            background:
              "linear-gradient(140deg, rgba(228, 62, 104, 1) 0%,  rgba(250, 164, 73, 1) 100%)",
          }}
        >
          Post
        </buton>
      </div>
    </CustomModal>
  );
};

export default AddPostModal;
