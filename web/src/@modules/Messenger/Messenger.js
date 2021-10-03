import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Contacts, Body } from "./components";
import { socket } from "@helpers/sockets";
import { updateContactsLocally } from "@store/messages/MessagesActions";
import { setShowNewCallAlert } from "@store/modals/ModalsActions";

const Messenger = () => {
  const dispatch = useDispatch();
  const [otherUserData, setOtherUserData] = useState({});
  const { addNewContact } = useSelector(({ Foodbook }) => Foodbook.modals);

  useEffect(() => {
    if (
      addNewContact?.modalPayload?.otherUserData?.recieverId ||
      addNewContact?.modalPayload?.otherUserData?.contactId
    ) {
      setOtherUserData(addNewContact?.modalPayload?.otherUserData);
    }
  }, [addNewContact]);

  useEffect(() => {
    socket.on("new-contact", ({ _id, contactResult, senderId, message }) => {
      contactResult.lastMessage = {
        message,
        read: false,
        chatId: _id,
        senderId,
        createdAt: contactResult?.createdAt,
      };
      dispatch(updateContactsLocally(contactResult));
    });
    return () => {
      socket.off("new-contact");
    };
  }, [dispatch]);

  //below are streaming sockets


  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div style={{ flex: "0.5", height: "100%" }}>
        <Contacts />
      </div>
      <div
        style={{
          flex: "1",
          width: "100%",
          height: "100%",
        }}
      >
        <Body otherUserData={otherUserData} />
      </div>
    </div>
  );
};

export default Messenger;
