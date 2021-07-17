import React from "react";

import { Avatar, Icon } from "@components";
import { formateImageUrl } from "@helpers/formateImageUrl";

const PostCard = ({ postData }) => {
  return (
    <div className="flex flex-col mb-4" style={{ flexBasis: "31%" }}>
      <img
        className="rounded-lg"
        alt="postImg"
        src={formateImageUrl(postData?.mediaFiles?.[0])}
        style={{
          height: "36vh",
          objectFit: "cover",
        }}
      />
      <div className="flex flex-row items-center justify-between py-1 px-2">
        <div className="flex flex-row items-center">
          <Avatar uri={postData?.users?.[0]?.image} size="36" noCircle />
          <p className="ml-3 font-semibold font-sans text-sm">
            {postData?.users?.[0]?.userName}
          </p>
        </div>
        {/* post actions */}
        <div className="flex flex-row items-center">
          <div className="flex flex-row items-center">
            <Icon type="like-filled" size="24px" />
            <p className="font-sans font-semibold text-xs mx-1">
              {postData?.likes?.likes?.length}
            </p>
          </div>
          <div className="flex flex-row items-center">
            <Icon type="comment-filled" size="24px" />
            <p className="font-sans font-semibold text-xs mx-1">
              {postData?.comments?.length}
            </p>
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
