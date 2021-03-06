import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { PostCard, AppHeader, Stories, Loader } from "@components";
import { getPosts } from "@store/post/PostActions";
import { useMobile } from "@customeHooks";
import { getNotifications } from "@store/notifications/NotificationsActions";

const Home = () => {
  const dispatch = useDispatch();

  const { loading, posts } = useSelector(({ Foodbook }) => Foodbook.post);

  const [isMobile] = useMobile();

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getNotifications());
  }, []);

  return (
    <div className={`flex flex-col h-full py-6 ${!isMobile && "pr-10"} `}>
      {loading ? (
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Loader />
        </div>
      ) : (
        <>
          <AppHeader />
          <Stories />
          <div className={`flex flex-col w-full ${!isMobile && "mt-8"} `}>
            <p className="text-gray-700 font-sans font-bold text-lg ">Feed</p>
            <div
              className={`flex flex-row items-center justify-between mt-3 flex-wrap ${
                isMobile && "mb-16"
              }`}
            >
              {posts?.length > 0 &&
                posts.map((singlePost) => <PostCard postData={singlePost} />)}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
