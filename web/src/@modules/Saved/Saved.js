import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getFavourites } from "@store/like/LikeActions";
import { Loader, PostCard, AppHeader } from "@components";

const Saved = () => {
  const dispatch = useDispatch();

  const { loading, favourite } = useSelector(({ Foodbook }) => Foodbook.like);

  useEffect(() => {
    dispatch(getFavourites());
  }, []);

  return (
    <div className="flex flex-col h-full py-6 pr-10">
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
          <div className="flex flex-col w-full  mt-8">
            <p className="text-gray-700 font-sans font-bold text-lg ">Saved</p>
            <div className="flex flex-row items-center justify-between mt-3 flex-wrap">
              {favourite?.length > 0 &&
                favourite.map((singlePost) => (
                  <PostCard
                    postData={{
                      ...singlePost?.postId?.[0],
                      users: singlePost?.userData,
                    }}
                    screenName="Saved"
                  />
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Saved;
