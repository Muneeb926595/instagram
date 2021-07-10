import React from "react";

import { Search, Icon } from "@components";
const AppHeader = () => {
  return (
    <div className="flex flex-row items-center bg-white justify-between ">
      <Search />
      <div className="flex flex-row items-center">
        <Icon type="messenger" marg="0 0.8rem 0 0" size="24px" />
        <Icon type="notifications" marg="0  0 0 0.8rem" size="24px" />
      </div>
    </div>
  );
};

export default AppHeader;
