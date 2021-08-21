import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { addMessageLocally } from "@store/messages/MessagesActions";
import { Clickable, Icon } from "@components";
import { socket } from "@helpers/sockets";

const Footer = ({ otherUserData }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message !== "") {
      socket.emit("message", {
        contactId: otherUserData?.contactId,
        senderId: localStorage.getItem("userId"),
        recieverId: otherUserData?.recieverId,
        message,
        read: false,
      });
      dispatch(
        addMessageLocally({
          contactId: otherUserData?.contactId,
          senderId: localStorage.getItem("userId"),
          recieverId: otherUserData?.recieverId,
          message,
          read: false,
        })
      );
      setMessage("");
    }
  };

  return (
    <div
      className="flex items-center bg-white w-full h-20 px-12 py-6 border-l border-gray-200 border-solid"
      style={{ boxShadow: "rgb(244 244 244) 0px -4px 14px" }}
    >
      {(otherUserData?.recieverId || otherUserData?.contactId) && (
        <form
          className="flex w-full rounded-full bg-gray-100 px-2 pr-4 items-center "
          onSubmit={handleSubmit}
        >
          <input
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="Type something"
            className="w-full  bg-gray-100 rounded-full  py-2 px-2 font-sans outline-none "
          />
          {message !== "" && (
            <Clickable onClick={handleSubmit}>
              <p className=" font-sans text-xs font-bold gradient-text cursor-pointer">
                SEND
              </p>
            </Clickable>
          )}
        </form>
      )}
    </div>
  );
};

export default Footer;
