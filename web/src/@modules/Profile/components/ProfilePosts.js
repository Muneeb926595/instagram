import React from "react";
import { useSelector } from "react-redux";

import { PostCard, AppHeader, Stories } from "@components";
import { useMobile } from "@customeHooks";

const ProfilePosts = ({ otherUser }) => {
  const profilePosts = useSelector(
    ({ Foodbook }) => Foodbook.userProfile.profilePosts
  );

  const [isMobile] = useMobile();
  return (
    <div className={`flex flex-col py-6 ${!isMobile && "px-12"} `}>
      {!isMobile && <AppHeader />}
      {!isMobile && <Stories otherUser={otherUser} />}

      <div className={`flex flex-col w-full ${isMobile ? "mb-12" : "mt-8"}`}>
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
