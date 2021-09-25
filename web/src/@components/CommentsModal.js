import React, { useState, useEffect } from "react";
import { MentionsInput, Mention } from "react-mentions";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";

import { commentPost, getComments } from "@store/comments/CommentActions";
import { likePost, addToFavourite } from "@store/like/LikeActions";
import {
  CustomModal,
  Avatar,
  Loader,
  Comment,
  PostImage,
  Icon,
  Clickable,
} from "@components";
import { setShowCommentsModal } from "@store/modals/ModalsActions";
import { swapTags, getUsersFromTags } from "@helpers/utils";
import {
  addPostLikeLocally,
  removePostLikeLocally,
} from "@store/post/PostActions";
import { useMobile } from "@customeHooks";

const useStyles = makeStyles((theme) => ({
  commentspage: (styleProps) => ({
    margin: "0 auto",
    maxWidth: styleProps.isMobile ? "90vw" : "50%",
    width: "100%",
    display: "flex",
    height: "65%",
    maxHeight: styleProps.isMobile && "56vh",
    flexDirection: styleProps.isMobile ? "column" : "row",
    justifyContent: "center",
  }),

  commentspage__leftPart: (styleProps) => ({
    height: "100%",
    width: styleProps.isMobile ? "100%" : "60%",
    backgroundColor: "#ffffff",
  }),

  commentspage__rightPart: {
    flex: "1",
    maxHeight: "700px !important",
    position: "relative",
    borderLeft: "1px solid #dbdbdb",
    backgroundColor: "#ffffff",
  },
  commentspage__rightPartContent: {
    display: "flex",
    flexDirection: "column",
    overflow: "scroll",
    maxHeight: "58vh",
    "&::-webkit-scrollbar": {
      width: "0px",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: "10px",
      boxShadow: "inset 10px 10px 2px #6979f8",
    },
  },
  commentspage__userProfileIcon: {
    width: "36px",
    height: "36px",
    marginRight: "1rem",
    borderRadius: "100%",
    objectFit: "cover",
    alignSelf: "center",
  },
  commentspage__userProfileName: {
    fontWeight: "600",
    marginRight: "5px",
    color: "#000000",
    textDecoration: "none",
  },
  userProfileNameContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    color: "#262626",
  },
  Icon: {
    width: "25px",
    objectFit: "cover",
    margin: "0px 5px 0px 0px",
    "& hover": {
      cursor: "pointer",
    },
  },
  commentSection: (styleProps) => ({
    overflow: "scroll",
    overflowX: "hidden",
    paddingLeft: "12px",
    maxHeight: styleProps.isMobile ? "50% !important" : "70% !important",
    paddingTop: "5px",
    borderTop: "1px solid #dbdbdb",
    "&:last-child": {
      paddingBottom: "2rem",
    },
    "&::-webkit-scrollbar": {
      width: "4px",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: "10px",
      boxShadow: "inset 10px 10px 2px #6979f8",
    },
  }),
  commentspage__commentsPart: {
    position: "absolute",
    padding: "5px",
    bottom: "0",
    width: "96%",
    display: "flex",
    alignSelf: "end",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingBottom: "1rem",
  },
  commentspage__userDisplayImage: {
    width: "36px",
    height: "36px",
    borderRadius: "100%",
    objectFit: "cover",
    marginLeft: "1rem",
    marginRight: "1rem",
  },
  commentspage__addCommentBox: {
    display: "flex",
    flex: "1",
    marginLeft: "8px",
    padding: "6px",
    borderRadius: "4px",
    border: "none",
    outline: "none",
    width: "100%",
    backgroundColor: "#f5f5f5",
    alignItems: "center",
  },
  commentspage__sendCommentIcon: {
    width: "28px",
    objectFit: "contain",
    cursor: "pointer",
    marginLeft: "5px",
    fontSize: "1rem !important",
  },
}));

const CommentsModal = (props) => {
  const [isMobile] = useMobile();

  const styleProps = {
    isMobile: isMobile,
  };

  const classes = useStyles(styleProps);
  const dispatch = useDispatch();

  const [like, setLike] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);

  const requestComments = useSelector(
    ({ Foodbook }) => Foodbook.comment.comment
  );
  const commentsLoading = useSelector(
    ({ Foodbook }) => Foodbook.comment.loading
  );
  const [comment, setComment] = useState("");
  const [users, setUsers] = useState();
  const [comments, setComments] = useState(requestComments);

  const { commentsModal } = useSelector(({ Foodbook }) => Foodbook.modals);
  const { followingList } = useSelector(({ Foodbook }) => Foodbook.auth);

  useEffect(() => {
    dispatch(getComments(commentsModal?.modalPayload?.postId));
  }, [commentsModal]);

  useEffect(() => {
    setComments(requestComments);
  }, [requestComments]);

  useEffect(() => {
    setLike(commentsModal?.modalPayload?.like);
    setIsFavourite(commentsModal?.modalPayload?.isFavourite);
  }, [commentsModal]);

  const closeModal = () => {
    dispatch(
      setShowCommentsModal({
        isVisible: false,
        modalPayload: {},
      })
    );
  };

  useEffect(() => {
    if (followingList?.length) {
      const data = followingList?.map((user) => ({
        id: user.UserData._id,
        display: user.UserData.userName,
      }));
      setUsers(data);
    }
  }, [followingList]);

  const handleAddToFavourite = () => {
    setIsFavourite(!isFavourite);
    dispatch(
      addToFavourite({
        postId: commentsModal?.modalPayload?.postId,
        favourite: !isFavourite,
      })
    );
  };

  return (
    <CustomModal
      onCloseModal={closeModal}
      showModal={commentsModal.isVisible}
      dark
    >
      <div
        className={` ${classes.commentspage}`}
        style={{ borderTopLeftRadius: "8px", borderBottomLeftRadius: "8px" }}
      >
        <div
          className={` ${classes.commentspage__leftPart}`}
          style={{ borderTopLeftRadius: "8px", borderBottomLeftRadius: "8px" }}
        >
          <PostImage
            hasRadius="8px 0 0 8px"
            mediaFiles={commentsModal?.modalPayload?.mediaFiles}
          />
        </div>

        <div
          className={` ${classes.commentspage__rightPart}`}
          style={{
            borderTopRightRadius: "8px",
            borderBottomRightRadius: "8px",
          }}
        >
          {!isMobile && (
            <div
              className="flex items-center p-4"
              style={{ borderBottom: "1px solid #dbdbdb" }}
            >
              <div className={classes.commentspage__userProfileIcon}>
                <Avatar
                  uri={commentsModal?.modalPayload?.postAuthorImage}
                  size="40px"
                />
              </div>
              <p className=" font-sans text-lg gradient-text">
                @{commentsModal?.modalPayload?.otherUserName}
              </p>
            </div>
          )}

          {/* post actions */}

          <div
            className="flex flex-row items-center px-4 py-2 pb-4"
            style={{
              width: "50%",
              justifyContent: "space-between",
            }}
          >
            {commentsModal?.modalPayload?.screenName !== "Saved" && (
              <>
                <div className="flex flex-row items-center">
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      setLike(!like);
                      dispatch(
                        likePost({
                          userId: localStorage.getItem("userId"),
                          postId: commentsModal?.modalPayload?.postId,
                          like: !like,
                        })
                      );

                      like
                        ? dispatch(
                            removePostLikeLocally(
                              commentsModal?.modalPayload?.postId,
                              localStorage.getItem("userId"),
                              !like
                            )
                          )
                        : dispatch(
                            addPostLikeLocally(
                              commentsModal?.modalPayload?.postId,
                              localStorage.getItem("userId"),
                              !like,
                              commentsModal?.modalPayload?.userImage,
                              commentsModal?.modalPayload?.userName
                            )
                          );
                    }}
                  >
                    <Icon
                      type={`${like ? "like-filled" : "like"}`}
                      size="24px"
                    />
                  </div>
                  <p className="font-sans font-semibold text-xs mx-1">
                    {commentsModal?.modalPayload?.likesCount}
                  </p>
                </div>
                <div className="flex flex-row items-center">
                  <Icon type="comment-filled" size="24px" />
                  <p className="font-sans font-semibold text-xs mx-1">
                    {commentsModal?.modalPayload?.commentsCount}
                  </p>
                </div>
              </>
            )}
            <div className="flex flex-row items-center">
              <Clickable onClick={handleAddToFavourite}>
                <Icon
                  type={isFavourite ? "saved-filled" : "saved"}
                  size="24px"
                />
              </Clickable>
            </div>
          </div>

          <div className={classes.commentSection}>
            {commentsLoading ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Loader />
              </div>
            ) : (
              <>
                {comments &&
                  comments.length > 0 &&
                  comments.map((comment) => {
                    return (
                      <Comment
                        comment={comment}
                        userId={props?.userId}
                        postId={props?.id}
                        key={comment._id}
                      />
                    );
                  })}
              </>
            )}
          </div>

          <div className={classes.commentspage__commentsPart}>
            <Avatar
              uri={commentsModal?.modalPayload?.userImage}
              size="36"
              noCircle
            />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const filteredComment = swapTags(comment);
                dispatch(
                  commentPost({
                    userId: localStorage.getItem("userId"),
                    postId: props?.id,
                    postType: props?.postType,
                    comment: filteredComment,
                  })
                );
                setComment("");
              }}
              className={classes.commentspage__addCommentBox}
            >
              <MentionsInput
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                placeholder="Type here .."
                className="mentionsComment"
                style={{ width: "100%" }}
              >
                <Mention
                  markup="@{{__type__||__id__||__display__}}"
                  trigger="@"
                  data={users}
                  className="mentionsComment__mention"
                />
              </MentionsInput>

              <p
                className=" font-sans text-xs font-bold gradient-text cursor-pointer"
                onClick={() => {
                  const filteredComment = swapTags(comment);
                  const taggedUsers = getUsersFromTags(comment);

                  dispatch(
                    commentPost({
                      userId: localStorage.getItem("userId"),
                      postId: commentsModal?.modalPayload?.postId,
                      comment: filteredComment,
                      taggedUsers: taggedUsers,
                    })
                  );
                  setComment("");
                }}
              >
                Submit
              </p>
            </form>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default CommentsModal;
