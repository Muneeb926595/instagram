import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import userPlaceholder from "assets/icons/user-placeholder.png";

const baseUrl = "";

const useStyles = makeStyles(() => ({
  postImage: {
    height: "100%",
    width: "100%",
    objectFit: "cover",
    borderRadius: "0.5rem",
  },
}));
const ProfileInfo = ({
  userData,
  postsCount,
  followingList,
  followersList,
  alreadyFollowing,
}) => {
  const classes = useStyles();
  const [userImageHasHttp, setUserImageHasHttp] = useState(false);

  useEffect(() => {
    if (userData?.image !== "undefined") {
      const prefix = userData?.image?.toString().split("/")[0];
      if (prefix === "images") {
        setUserImageHasHttp(false);
      } else {
        setUserImageHasHttp(true);
      }
    }
  }, [userData]);

  return (
    <div
      className="flex flex-col py-12 h-screen "
      style={{
        position: "fixed",
        maxWidth: "20vw",
        width: "20vw",
        minWidth: "20vw",
        borderRight: "1px solid #ebebeb",
      }}
    >
      <div className="flex flex-col items-center mt-8">
        <div
          className="rounded-lg"
          style={{
            height: "25vh",
            objectFit: "cover",
          }}
        >
          <img
            src={
              userData?.image
                ? userImageHasHttp
                  ? userData?.image
                  : baseUrl + userData?.image
                : userPlaceholder
            }
            alt="mediaFiles"
            className={classes.postImage}
          />
        </div>
        <p className="text-gray-700 font-sans font-bold text-lg mt-4">
          {userData?.userName}
        </p>
        <p className=" font-sans text-sm gradient-text">
          @{userData?.userName}
        </p>
      </div>

      <div
        className="flex flex-row items-center justify-between w-3/4 "
        style={{ margin: "0 auto", marginTop: "1.6rem" }}
      >
        <div className="flex flex-col justify-center items-center">
          <p className="text-gray-700 font-sans font-bold text-base">
            {postsCount}
          </p>
          <p className="text-gray-500 font-sans text-sm">Posts</p>
        </div>
        <div style={{ height: "4vh", border: "1px solid #dbdbdb" }}></div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-gray-700 font-sans font-bold text-base ">
            {followersList?.length}
          </p>
          <p className="text-gray-500 font-sans text-sm">Followers</p>
        </div>
        <div style={{ height: "4vh", border: "1px solid #dbdbdb" }}></div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-gray-700 font-sans font-bold text-base ">
            {followingList?.length}
          </p>
          <p className="text-gray-500 font-sans text-sm">Followings</p>
        </div>
      </div>

      <div
        className="flex flex-col w-3/4 "
        style={{ margin: "0 auto", marginTop: "3.2rem" }}
      >
        <div className="flex justify-between px-4">
          <button
            className="flex flex-row items-center justify-center  py-2  rounded-lg"
            style={{
              border: alreadyFollowing ? "1px solid rgba(228, 62, 104, 1)" : "",
              background: alreadyFollowing
                ? "transparent"
                : "linear-gradient(140deg, rgba(228, 62, 104, 1) 0%,  rgba(250, 164, 73, 1) 100%)",
              width: "7rem",
            }}
          >
            <p className="text-white text-sm font-sans font-semibold ">
              {alreadyFollowing ? "UnFollow" : "Follow"}
            </p>
          </button>
          <button
            className="flex flex-row items-center justify-center  py-2  rounded-lg"
            style={{
              background: "#ededed",
              width: "7rem",
            }}
          >
            <p className="text-gray-500 text-sm font-sans font-semibold ">
              Message
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
