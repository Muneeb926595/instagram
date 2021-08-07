import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  getUserProfile,
  getUserPosts,
} from "@store/userProfile/UserProfileActions";

const Profile = (props) => {
  const dispatch = useDispatch();
  const { userId } = (props.location && props.location.state) || {};
  const [otherUser, setOtherUser] = useState(false);

  const otherUserData = useSelector(
    ({ Foodbook }) => Foodbook.userProfile.userProfile
  );
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
  console.log("otherUser", otherUser);
  return (
    <div>
      <p>Testing profile</p>
    </div>
  );
};

export default Profile;
