import React from "react";

import { Icon } from "@components";

const AddStory = () => {
  const userImage =
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvcHBpbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";
  return (
    <div
      className="rounded-lg mr-4 flex-shrink-0 flex-grow flex-nowrap"
      style={{
        maxWidth: "9rem",
        minWidth: "9rem",
        height: "22vh",
        position: "relative",
        backgroundImage: `url(${userImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div
        className="rounded-lg cursor-pointer "
        style={{
          background:
            "linear-gradient(140deg, rgba(228, 62, 104, 0.7) 0%,  rgba(250, 164, 73, 0.67) 100%)",
          height: "100%",
          position: "absolute",
          top: "0",
          lef: "0",
          right: "0",
          bottom: "0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Icon type="plus" size="36px" />
      </div>
    </div>
  );
};

export default AddStory;
