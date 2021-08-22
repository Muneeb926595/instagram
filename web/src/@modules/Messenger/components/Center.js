import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getUserMessages,
  seenAllMessages,
} from "@store/messages/MessagesActions";
import SingleMessage from "./SingleMessage";
import bg from "assets/icons/bg.png";

const Center = ({ otherUserData }) => {
  const dispatch = useDispatch();
  const messages = useSelector(({ Foodbook }) => Foodbook.message.messages);
  const userData = useSelector(({ Foodbook }) => Foodbook.auth.user);

  useEffect(() => {
    if (otherUserData?.recieverId && otherUserData?.contactId) {
      dispatch(
        seenAllMessages(
          localStorage.getItem("userId"),
          otherUserData?.recieverId,
          otherUserData?.contactId
        )
      );
    }
  }, [dispatch, otherUserData]);

  useEffect(() => {
    if (otherUserData?.recieverId) {
      dispatch(getUserMessages(otherUserData?.recieverId, 1, 100));
    }
  }, [otherUserData, dispatch]);

  return (
    <div className="w-full h-full flex flex-col overflow-scroll overflow-x-hidden no-scrollbar">
      <div className="w-full h-full flex flex-col">
        {messages?.length > 0 &&
          messages.map((item, index) => (
            <SingleMessage
              item={item}
              userImage={
                item?.senderId === localStorage.getItem("userId")
                  ? userData?.image
                  : otherUserData?.image
              }
              index={"Abc" + index}
              islastMessage={index === messages?.length - 1}
              isOwner={item?.senderId === localStorage.getItem("userId")}
            />
          ))}
      </div>
    </div>
  );
};

export default Center;
