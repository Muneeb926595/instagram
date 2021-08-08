import React from "react";
import { useSelector } from "react-redux";

import { PostCard, AppHeader, Stories } from "@components";

const ProfilePosts = ({ otherUser }) => {
  const profilePosts = useSelector(
    ({ Foodbook }) => Foodbook.userProfile.profilePosts
  );

  return (
    <div className="flex flex-col py-6 px-12 ">
      <AppHeader />
      <Stories otherUser={otherUser} />

      <div className="flex flex-col w-full  mt-8">
        <p className="text-gray-700 font-sans font-bold text-lg ">Feed</p>
        <div className="flex flex-row items-center justify-between mt-3 flex-wrap">
          {profilePosts?.length > 0 &&
            profilePosts.map((singlePost) => (
              <PostCard postData={singlePost} screenName="Profile" />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePosts;
