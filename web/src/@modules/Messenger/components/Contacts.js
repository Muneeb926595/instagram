import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Contact, Search } from "@components";
import { setShowAddNewContactModal } from "@store/modals/ModalsActions";
import { getContacts } from "@store/messages/MessagesActions";

const Contacts = () => {
  const dispatch = useDispatch();
  const contactsData = useSelector(({ Foodbook }) => Foodbook.message.contacts);

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  const handleAddNewContact = () => {
    dispatch(setShowAddNewContactModal({ isVisible: true, modalPayload: {} }));
  };

  return (
    <div
      className="flex flex-col h-full bg-white"
      style={{ boxShadow: "rgb(244 244 244) 7px 0px 12px" }}
    >
      <div className="mb-8">
        <Search />
      </div>
      <div className="flex flex-col overflow-scroll overflow-x-hidden no-scrollbar">
        {contactsData?.length > 0 ? (
          contactsData.map((singleContact, index) => (
            <Contact
              item={singleContact}
              index={index + "132"}
              messageSenderId={
                singleContact.lastMessage && singleContact.lastMessage.senderId
              }
              isActive={
                singleContact?.participents?.[0]?._id ===
                localStorage.getItem("userId")
                  ? singleContact?.participents?.[1]?.userLoginStatus ===
                    "active"
                  : singleContact?.participents?.[0]?.userLoginStatus ===
                    "active"
              }
              read={
                singleContact?.lastMessage && singleContact.lastMessage.read
              }
            />
          ))
        ) : (
          <div className="flex justify-center w-full h-full py-3 px-10 select-none">
            <p className="text-xl text-center font-sans text-gray-400">
              Wait a sec are you new here ?<br />
              <span
                className="font-medium cursor-pointer gradient-text"
                onClick={handleAddNewContact}
              >
                Click Me{" "}
              </span>
              and send message / audio & video call to someone and enjoy free
              messaging!
              <br />{" "}
              <span className="text-sm mt-2 font-sans font-light text-gray-400">
                Please keep the chat clean
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contacts;
