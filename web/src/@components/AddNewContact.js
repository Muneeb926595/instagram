import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "debounce";

import { CustomModal, Clickable, Icon, Avatar, Loader } from "@components";
import { setShowAddNewContactModal } from "@store/modals/ModalsActions";
import { searchUser } from "@store/search/SearchActions";

const AddNewContact = () => {
  const dispatch = useDispatch();

  const { addNewContact } = useSelector(({ Foodbook }) => Foodbook.modals);
  const searchData = useSelector(({ Foodbook }) => Foodbook.search.users);
  const searchLoading = useSelector(({ Foodbook }) => Foodbook.search.loading);

  const [searchText, setSearchText] = useState("");

  const doDebouncedAction = (event) => {
    setSearchText(event.target.value);
    debounce(dispatch(searchUser(searchText)), 1000);
  };

  const closeActionsModal = () => {
    dispatch(setShowAddNewContactModal({ isVisible: false, modalPayload: {} }));
  };

  const handleContactClicked = (singleUser) => {
    dispatch(
      setShowAddNewContactModal({
        isVisible: false,
        modalPayload: {
          otherUserData: {
            recieverId: singleUser._id,
            image: singleUser.image,
            userName: singleUser.userName,
          },
          senderId: localStorage.getItem("userId"),
        },
      })
    );
  };

  return (
    <CustomModal
      onCloseModal={closeActionsModal}
      showModal={addNewContact.isVisible}
      veryDark="true"
    >
      <div className="w-1/3 h-2/3 flex flex-col bg-white rounded">
        <div
          className="flex items-center px-4 py-4 cursor-pointer"
          onClick={closeActionsModal}
        >
          <Icon type="back" size="36px" />
          <p className="text-lg font-sans font-medium text-gray-800">
            New Contact
          </p>
        </div>
        <div className="w-full pt-4 pb-2 px-6">
          <form className="flex w-full rounded-full bg-gray-100 px-2 pr-4 items-center ">
            <Clickable>
              <Icon type="search" size="20px" />
            </Clickable>
            <input
              placeholder="Search..."
              onChange={doDebouncedAction}
              className="w-full ml-2 bg-gray-100 rounded-full  py-2 px-2 font-sans outline-none"
            />
          </form>
        </div>
        <div className="flex flex-col mt-8 overflow-scroll overflow-x-hidden app-scrollbar">
          {searchLoading && (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Loader />
            </div>
          )}
          {searchData?.length > 0 &&
            searchData.map((singleUser, index) => (
              <div
                key={"A" + index}
                onClick={() => handleContactClicked(singleUser)}
                className="w-full flex items-center border-b-2 py-3 px-6 border-gray-100 border-solid select-none cursor-pointer"
              >
                <Avatar uri={singleUser?.image} size="36" noCircle />
                <div className="flex-1 flex justify-between ml-4">
                  <div className="flex flex-col">
                    <p className="font-sans font-medium text-gray-400 capitalize">
                      {singleUser?.userName}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div></div>
      </div>
    </CustomModal>
  );
};

export default AddNewContact;
