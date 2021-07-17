import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Avatar, Icon, PostImage } from "@components";
import { likePost } from "@store/like/LikeActions";
import {
  addPostLikeLocally,
  removePostLikeLocally,
} from "@store/post/PostActions";

const PostCard = ({ postData }) => {
  const dispatch = useDispatch();
  const [like, setLike] = useState(false);
  const [likeCounts, setLikeCounts] = useState(0);

  const userData = useSelector(({ Foodbook }) => Foodbook.auth.user);

  useEffect(() => {
    if (postData.likes && postData.likes.count > 0) {
      for (let i = 0; i < postData?.likes?.likes?.length; i++) {
        let user = postData?.likes?.likes[i];
        if (localStorage.getItem("userId") === user.userId._id) {
          setLike(true);
          break;
        } else {
          setLike(false);
        }
      }
    }
    if (postData?.likes?.count === 0) {
      setLike(false);
    }

    if (postData.likes) {
      setLikeCounts(postData.likes.count);
    }
  }, [postData.likes]);

  return (
    <div className="flex flex-col mb-4" style={{ flexBasis: "31%" }}>
      <div
        className="rounded-lg"
        style={{
          height: "36vh",
          objectFit: "cover",
        }}
      >
        <PostImage hasRadius="0.5rem" mediaFiles={postData?.mediaFiles} />
      </div>

      <div className="flex flex-row items-center justify-between py-1 px-2">
        <div className="flex flex-row items-center">
          <Avatar uri={postData?.users?.[0]?.image} size="36" noCircle />
          <p className="ml-3 font-semibold font-sans text-sm">
            {postData?.users?.[0]?.userName}
          </p>
        </div>

        <div className="flex flex-row items-center">
          <div className="flex flex-row items-center">
            <div
              className="cursor-pointer"
              onClick={() => {
                dispatch(
                  likePost({
                    userId: localStorage.getItem("userId"),
                    postId: postData?._id,
                    like: !like,
                  })
                );

                like
                  ? dispatch(
                      removePostLikeLocally(
                        postData?._id,
                        localStorage.getItem("userId"),
                        !like
                      )
                    )
                  : dispatch(
                      addPostLikeLocally(
                        postData?._id,
                        localStorage.getItem("userId"),
                        !like,
                        userData.image,
                        userData.userName
                      )
                    );
              }}
            >
              <Icon type={`${like ? "like-filled" : "like"}`} size="24px" />
            </div>
            <p className="font-sans font-semibold text-xs mx-1">
              {postData?.likes?.likes?.length}
            </p>
          </div>
          <div className="flex flex-row items-center">
            <Icon type="comment-filled" size="24px" />
            <p className="font-sans font-semibold text-xs mx-1">
              {postData?.comments?.length}
            </p>
          </div>
          <div className="flex flex-row items-center">
            <Icon type="saved-filled" size="24px" />
            <p className="font-sans font-semibold text-xs mx-1">13k</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
