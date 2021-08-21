import React from "react";

import Header from "./Header";
import Footer from "./Footer";
import Center from "./Center";

const Body = ({ otherUserData }) => {
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <Header otherUserData={otherUserData} />
      <Center otherUserData={otherUserData} />
      <Footer otherUserData={otherUserData} />
    </div>
  );
};

export default Body;
