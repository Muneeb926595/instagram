import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { Avatar, Icon, PostImage, Clickable } from "@components";
import { likePost, addToFavourite } from "@store/like/LikeActions";
import { setShowCommentsModal } from "@store/modals/ModalsActions";
import {
  addPostLikeLocally,
  removePostLikeLocally,
} from "@store/post/PostActions";

const PostCard = ({ postData, screenName }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [like, setLike] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
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

  useEffect(() => {
    if (screenName === "Saved") {
      setIsFavourite(true);
    } else {
      if (postData?.favourites > 0) {
        setIsFavourite(true);
      } else {
        setIsFavourite(false);
      }
    }
  }, [postData]);

  const handleAddToFavourite = () => {
    setIsFavourite(!isFavourite);
    dispatch(
      addToFavourite({
        postId: postData?._id,
        favourite: !isFavourite,
      })
    );
  };

  const handleOpenCommentsModal = () => {
    dispatch(
      setShowCommentsModal({
        isVisible: true,
        modalPayload: {
          mediaFiles: postData?.mediaFiles,
          userImage: userData?.image,
          userName: userData?.userName,
          otherUserName: postData?.users?.[0]?.userName,
          postAuthorImage: postData?.users?.[0]?.image,
          screenName: screenName,
          like: like,
          isFavourite: isFavourite,
          postId: postData?._id,
          commentsCount: postData?.comments?.length,
          likesCount: postData?.likes?.likes?.length,
        },
      })
    );
  };

  return (
    <div
      className="flex flex-col mb-4"
      style={{ flexBasis: screenName === "Profile" ? "45%" : "31%" }}
    >
      <div
        className="rounded-lg cursor-pointer "
        style={{
          height: "36vh",
          objectFit: "cover",
        }}
        onClick={handleOpenCommentsModal}
      >
        <PostImage hasRadius="0.5rem" mediaFiles={postData?.mediaFiles} />
      </div>

      <div className="flex flex-row items-center justify-between py-1 px-2">
        <div className="flex flex-row items-center">
          <Avatar uri={postData?.users?.[0]?.image} size="36" noCircle />
          <Clickable
            onClick={() =>
              history.push({
                pathname: "/profile",
                state: { userId: postData?.userId?._id },
              })
            }
          >
            <p className="ml-3 font-semibold font-sans text-sm">
              {postData?.users?.[0]?.userName}
            </p>
          </Clickable>
        </div>

        <div className="flex flex-row items-center">
          {screenName !== "Saved" && (
            <>
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
            </>
          )}
          <div className="flex flex-row items-center">
            <Clickable onClick={handleAddToFavourite}>
              <Icon type={isFavourite ? "saved-filled" : "saved"} size="24px" />
            </Clickable>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
