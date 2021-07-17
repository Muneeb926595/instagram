import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { PostCard, AppHeader, Stories } from "@components";
import { getPosts } from "@store/post/PostActions";

const Home = () => {
  const dispatch = useDispatch();

  const { loading, posts } = useSelector(({ Foodbook }) => Foodbook.post);

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
          {posts?.length > 0 &&
            posts.map((singlePost) => <PostCard postData={singlePost} />)}
        </div>
      </div>
    </div>
  );
};

export default Home;
