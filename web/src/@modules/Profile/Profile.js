import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  getUserProfile,
  getUserPosts,
} from "@store/userProfile/UserProfileActions";
import { useMobile } from "@customeHooks";
import { ProfileInfo, ProfilePosts } from "./components";

const Profile = (props) => {
  const dispatch = useDispatch();
  const { userId } = (props.location && props.location.state) || {};
  const [otherUser, setOtherUser] = useState(false);

  const [isMobile] = useMobile();

  const otherUserData = useSelector(({ Foodbook }) => Foodbook.userProfile);
  const userData = useSelector(({ Foodbook }) => Foodbook.auth);

  useEffect(() => {
    const id = userId;
    if (id) {
      setOtherUser(true);
      dispatch(getUserProfile(id));
      dispatch(getUserPosts(id, 1, 25));
    } else {
      setOtherUser(false);
    }
  }, [userId]);
  useEffect(() => {
    if (!userId) {
      dispatch(getUserPosts(localStorage.getItem("userId"), 1, 25));
    }
  }, [otherUser, userId, dispatch]);

  return (
    <div
      style={{ display: "flex", flexDirection: isMobile ? "column" : "row" }}
    >
      <div style={{ display: "flex", flex: !isMobile && "0.24" }}>
        <ProfileInfo
          userData={otherUser ? otherUserData?.userProfile : userData?.user}
          postsCount={
            otherUser ? otherUserData?.postsCount : userData?.postsCount
          }
          followingList={
            otherUser ? otherUserData?.followingList : userData?.followingList
          }
          followersList={
            otherUser ? otherUserData?.followersList : userData?.followersList
          }
          alreadyFollowing={
            otherUser
              ? otherUserData?.alreadyFollowing
              : userData?.alreadyFollowing
          }
        />
      </div>
      <div style={{ display: "flex", flex: !isMobile && "0.8" }}>
        <ProfilePosts otherUser={otherUser} />
      </div>
    </div>
  );
};

export default Profile;
