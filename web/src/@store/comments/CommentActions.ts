import { addCommentUrl, getCommentUrl } from "@api/Endpoint";
import { axiosInstance as axios } from "@api/axios";
import { CommentActionTypes } from "../redux/actionTypes";
import { Comment } from "@models/Comment";

export const getComments = (id) => {
  return (dispatch) => {
    dispatch({
      type: CommentActionTypes.GET_COMMENTS_START,
    });
    const url = getCommentUrl(id);
    axios
      .get(url)
      .then((res) => {
        let { data } = res;
        if (data.length || data) {
          getCommentsSuccess(dispatch, data);
        } else {
          getCommentsFail(dispatch, "There was an error connection");
        }
      })
      .catch((error) => {
        getCommentsFail(dispatch, "There was an error connection2");
      });
  };
};

const getCommentsFail = (dispatch, errorMessage) => {
  console.log(errorMessage);
  dispatch({
    type: CommentActionTypes.GET_COMMENTS_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const getCommentsSuccess = (dispatch, data) => {
  dispatch({
    type: CommentActionTypes.GET_COMMENTS_SUCCESS,
    payload: data,
  });
};

export const commentPost = (comment: Comment) => {
  return (dispatch) => {
    dispatch({
      type: CommentActionTypes.COMMENT_POST_START,
    });
    const url = addCommentUrl();
    const request = {
      userId: comment.userId,
      postId: comment.postId,
      content: comment.comment,
      taggedUsers: comment.taggedUsers,
    };
    axios
      .post(url, request)
      .then((res) => {
        let { data } = res;
        if (data) {
          commentPostSuccess(dispatch, data, comment.postId);
        } else {
          commentPostFail(dispatch, "There was an error connection");
        }
      })
      .catch((error) => {
        commentPostFail(dispatch, "There was an error connection2");
      });
  };
};
const commentPostFail = (dispatch, errorMessage) => {
  console.log(errorMessage);
  dispatch({
    type: CommentActionTypes.COMMENT_POST_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const commentPostSuccess = (dispatch, data, postId) => {
  dispatch({
    type: CommentActionTypes.COMMENT_POST_SUCCESS,
    payload: data,
  });
  dispatch(getComments(postId));
};
