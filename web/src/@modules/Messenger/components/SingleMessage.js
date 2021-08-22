import React, { useCallback } from "react";

import { Avatar } from "@components";
import { getLastPostDuration } from "@helpers/timeDateUtils";

const SingleMessage = ({ item, index, isOwner, islastMessage, userImage }) => {
  const lastMessageRef = useCallback((node) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);

  return (
    <>
      {isOwner ? (
        <div
          ref={islastMessage ? lastMessageRef : null}
          key={index}
          className="flex w-auto px-8 mb-6 mt-4 self-end"
        >
          <div className="flex flex-col w-auto mr-4 ">
            <div className="w-auto bg-gray-100 px-4 py-3 rounded-tl-xl rounded-br-xl rounded-bl-xl mb-2">
              <p className="font-sans font-light text-black">{item?.message}</p>
            </div>
            <p className="text-xs mr-4 font-sans font-normal text-gray-400 text-right">
              {getLastPostDuration(item?.createdAt)}
            </p>
          </div>
          <div>
            <Avatar size="44" noCircle uri={userImage} />
          </div>
        </div>
      ) : (
        <div
          ref={islastMessage ? lastMessageRef : null}
          key={index}
          className="flex w-auto px-8 mb-6 mt-4"
        >
          <div>
            <Avatar size="44" noCircle uri={userImage} />
          </div>
          <div className="flex flex-col w-auto ml-4">
            <div className="w-auto bg-gray-100 px-4 py-3 rounded-tr-xl rounded-br-xl rounded-bl-xl mb-2">
              <p className="font-sans font-light text-black">{item?.message}</p>
            </div>
            <p className="text-xs ml-4 font-sans font-normal text-gray-400">
              {getLastPostDuration(item?.createdAt)}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleMessage;
