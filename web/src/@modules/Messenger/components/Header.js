import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { Avatar, Icon, Clickable } from "@components";

const Header = ({ otherUserData }) => {
  const history = useHistory();
  const userData = useSelector(({ Foodbook }) => Foodbook.auth.user);
  return (
    <div
      className="flex items-center bg-white w-full h-22 px-12 py-6 border-l border-gray-200 border-solid justify-between"
      style={{ boxShadow: "rgb(244 244 244) 0px 4px 14px" }}
    >
      <div className="flex items-center">
        <Avatar
          uri={
            otherUserData?.recieverId || otherUserData?.contactId
              ? otherUserData?.image
              : userData.image
          }
          size="44"
          noCircle
        />
        {(otherUserData?.recieverId || otherUserData?.contactId) && (
          <>
            <p className="text-l font-medium ml-4 text-gray-500 font-sans capitalize">
              {otherUserData?.userName}
            </p>
            {otherUserData?.isActive ? (
              <div className="flex justify-center items-center rounded ml-6 px-2 py-1 bg-green-100">
                <p className="text-xs	 font-medium text-green-500 font-sans">
                  online
                </p>
              </div>
            ) : (
              <div className="flex justify-center items-center rounded ml-6 px-2 py-1 bg-red-100">
                <p className="text-xs	 font-medium text-red-500 font-sans">
                  offline
                </p>
              </div>
            )}
          </>
        )}
      </div>
      <div className="flex items-center">
        {(otherUserData?.recieverId || otherUserData?.contactId) && (
          <>
            <div className="mx-4">
              <Clickable
                onClick={() => {
                  history.push({
                    pathname: "/audio",
                    state: {
                      recieverId: otherUserData?.recieverId,
                    },
                  });
                }}
              >
                <Icon type="live-audio" size="25px" />
              </Clickable>
            </div>
            <div className="mx-4">
              <Clickable
                onClick={() => {
                  history.push({
                    pathname: "/video",
                    state: {
                      recieverId: otherUserData?.recieverId,
                    },
                  });
                }}
              >
                <Icon type="live-video" size="25px" />
              </Clickable>
            </div>
          </>
        )}
        <div className="mx-4">
          <Clickable>
            <Icon type="search" size="20px" />
          </Clickable>
        </div>
        <div className="mx-4">
          <Clickable>
            <Icon type="attachment" size="20px" />
          </Clickable>
        </div>
        <div className="mx-4">
          <Clickable>
            <Icon type="down-arrow" size="20px" />
          </Clickable>
        </div>
      </div>
    </div>
  );
};

export default Header;
