import React from "react";

import { Icon, Avatar } from "@components";

const Navbar = () => {
  return (
    <div className="flex flex-col py-8">
      <div className="flex items-center justify-center">
        <Icon type="logo" size="30px" marg="0 10px 0 0" />
        <Icon type="instagram" width="auto" height="auto" marg="4px 0 0 0" />
      </div>

      <div className="flex flex-col items-center mt-8">
        <Avatar profile size="130" />
        <p className="text-gray-700 font-sans font-bold text-lg mt-4">
          Full Name
        </p>
        <p
          className=" font-sans  text-sm"
          style={{
            background:
              "linear-gradient(140deg, rgba(228, 62, 104, 1) 0%,  rgba(250, 164, 73, 1) 100%);",
          }}
        >
          @username
        </p>
      </div>

      {/* user followings */}
      <div></div>
      {/* navigations */}
      <div></div>
    </div>
  );
};

export default Navbar;
