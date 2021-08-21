import React from "react";

import {
  AddPostModal,
  CommentsModal,
  AddNewContact,
  NewCallAlert,
} from "@components";

const Modals = () => {
  return (
    <>
      <AddPostModal />
      <CommentsModal />
      <AddNewContact />
      <NewCallAlert />
    </>
  );
};

export default Modals;
