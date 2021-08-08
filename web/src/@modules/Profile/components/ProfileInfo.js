import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";

import { Icon } from "@components";
import userPlaceholder from "assets/icons/user-placeholder.png";
import { followUnFollow } from "@store/followers/FollowersActions";

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
  const dispatch = useDispatch();
  const classes = useStyles();
  const [userImageHasHttp, setUserImageHasHttp] = useState(false);
  const [following, setFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    setFollowersCount(followersList.length);
    setFollowingCount(followingList.length);
  }, [followingList, followersList]);

  useEffect(() => {
    setFollowing(alreadyFollowing);
  }, [alreadyFollowing]);

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

  const calculateFollowers = () => {
    if (following) {
      setFollowersCount(followersCount - 1);
    } else {
      setFollowersCount(followersCount + 1);
    }
  };

  return (
    <div
      className="flex flex-col py-12 h-screen "
      style={{
        width: "100%",
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
            {followersCount}
          </p>
          <p className="text-gray-500 font-sans text-sm">Followers</p>
        </div>
        <div style={{ height: "4vh", border: "1px solid #dbdbdb" }}></div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-gray-700 font-sans font-bold text-base ">
            {followingCount}
          </p>
          <p className="text-gray-500 font-sans text-sm">Followings</p>
        </div>
      </div>

      <div
        className="flex flex-col w-3/4 "
        style={{ margin: "0 auto", marginTop: "3.2rem" }}
      >
        {localStorage?.getItem("userId") !== userData?._id && (
          <div className="flex justify-between px-2">
            <button
              onClick={() => {
                setFollowing(!following);
                calculateFollowers();
                dispatch(followUnFollow(userData?._id));
              }}
              className="flex flex-row items-center justify-center  py-2  rounded-lg"
              style={{
                border: following ? "1px solid rgba(228, 62, 104, 1)" : "",
                background: following
                  ? "transparent"
                  : "linear-gradient(140deg, rgba(228, 62, 104, 1) 0%,  rgba(250, 164, 73, 1) 100%)",
                width: "7rem",
              }}
            >
              <p
                className={`text-white text-sm font-sans font-semibold ${
                  following && "gradient-text"
                } `}
              >
                {following ? "UnFollow" : "Follow"}
              </p>
            </button>
            <button
              className="flex flex-row items-center justify-center  py-2  rounded-lg"
              style={{
                background: "#ededed",
                width: "7rem",
              }}
            >
              <Icon type="messenger" marg="0 0.8rem 0 0" size="22px" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;