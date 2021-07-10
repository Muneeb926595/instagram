import React from "react";

import { Avatar, Icon } from "@components";

const PostCard = () => {
  return (
    <div className="flex flex-col mb-4" style={{ flexBasis: "31%" }}>
      <img
        className="rounded-lg"
        alt="postImg"
        src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvcHBpbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        style={{
          height: "36vh",
          objectFit: "cover",
        }}
      />
      <div className="flex flex-row items-center justify-between py-1 px-2">
        <div className="flex flex-row items-center">
          <Avatar
            uri="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvcHBpbmd8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            size="36"
            noCircle
          />
          <p className="ml-3 font-semibold font-sans text-sm">username</p>
        </div>
        {/* post actions */}
        <div className="flex flex-row items-center">
          <div className="flex flex-row items-center">
            <Icon type="like-filled" size="24px" />
            <p className="font-sans font-semibold text-xs mx-1">13k</p>
          </div>
          <div className="flex flex-row items-center">
            <Icon type="comment-filled" size="24px" />
            <p className="font-sans font-semibold text-xs mx-1">13k</p>
          </div>
          <div className="flex flex-row items-center">
            <Icon type="saved-filled" size="24px" />
            <p className="font-sans font-semibold text-xs mx-1">13k</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
