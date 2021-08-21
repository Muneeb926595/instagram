import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { Avatar, Clickable } from "@components";
import { setShowAddNewContactModal } from "@store/modals/ModalsActions";
import { getLastPostDuration } from "@helpers/timeDateUtils";

const Contact = ({ item, index, read, messageSenderId }) => {
  const dispatch = useDispatch();
  const [otherContactData, setOtherContactData] = useState();

  useEffect(() => {
    const tempOtherContactData = item?.participents.filter(
      (singleUser) => singleUser?._id !== localStorage.getItem("userId")
    );
    setOtherContactData(tempOtherContactData[0]);
  }, [item]);

  const handleContactClicked = () => {
    dispatch(
      setShowAddNewContactModal({
        isVisible: false,
        modalPayload: {
          otherUserData: {
            contactId: item?._id,
            recieverId: otherContactData?._id,
            image: otherContactData?.image,
            userName: otherContactData?.userName,
          },
          senderId: localStorage.getItem("userId"),
        },
      })
    );
  };
  return (
    <Clickable onClick={handleContactClicked}>
      <div
        key={index}
        className="w-full flex items-center border-b-2 py-3 px-6 border-gray-100 border-solid select-none"
      >
        <Avatar uri={otherContactData?.image} size="54" noCircle />
        <div className="flex-1 flex justify-between ml-4">
          <div className="flex flex-col">
            <p className="font-sans font-medium text-gray-400">
              {otherContactData?.userName}
            </p>
            <p className="font-sans font-light text-gray-400">
              {item?.lastMessage?.message?.length > 24
                ? item?.lastMessage?.message?.substring(0, 20) + "..."
                : item?.lastMessage?.message}
            </p>
          </div>
          <div className="flex flex-col justify-center items-center">
            {read !== undefined &&
              read !== "undefined" &&
              !read &&
              messageSenderId !== localStorage.getItem("userId") && (
                <div className="flex items-center justify-center rounded-full h-2 w-2 bg-pink-600 self-end ">
                  {/* <p className="text-xs font-sans font-light text-white">4</p> */}
                </div>
              )}
            <p className="text-xs mt-2 font-sans font-light text-gray-400">
              {getLastPostDuration(item?.lastMessage?.createdAt)}
            </p>
          </div>
        </div>
      </div>
    </Clickable>
  );
};

export default Contact;
