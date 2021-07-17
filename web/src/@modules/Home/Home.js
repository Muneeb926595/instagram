import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { PostCard, AppHeader, Stories } from "@components";
import { getPosts } from "@store/post/PostActions";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <div className="flex flex-col py-6 pr-10">
      <AppHeader />
      <Stories />

      <div className="flex flex-col w-full  mt-8">
        <p className="text-gray-700 font-sans font-bold text-lg ">Feed</p>
        <div className="flex flex-row items-center justify-between mt-3 flex-wrap">
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
      </div>
    </div>
  );
};

export default Home;
