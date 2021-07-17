import { axiosInstance as axios } from "@api/axios";
import { LikeActionTypes } from "../redux/actionTypes";
import { getLikeUrl } from "@api/Endpoint";
import { Like } from "@models/Like";

export const getLikes = () => {
  return (dispatch) => {
    dispatch({
      type: LikeActionTypes.GET_LIKES_START,
    });
    const url = getLikeUrl();
    axios
      .get(url)
      .then((res) => {
        let { data } = res;
        if (data.length) {
          getLikesSuccess(dispatch, data);
        } else {
          getLikesFail(dispatch, "There was an error connection");
        }
      })
      .catch((error) => {
        getLikesFail(dispatch, "There was an error connection2");
      });
  };
};
const getLikesFail = (dispatch, errorMessage) => {
  console.log(errorMessage);
  dispatch({
    type: LikeActionTypes.GET_LIKES_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const getLikesSuccess = (dispatch, data) => {
  dispatch({
    type: LikeActionTypes.GET_LIKES_SUCCESS,
    payload: data,
  });
};

export const likePost = (like: Like) => {
  return (dispatch) => {
    dispatch({
      type: LikeActionTypes.LIKE_POST_START,
    });
    const url = getLikeUrl();
    const request = {
      userId: like.userId,
      postId: like.postId,
      like: like.like,
    };
    axios
      .post(url, request)
      .then((res) => {
        let { data } = res;
        if (data) {
          likePostSuccess(dispatch, data);
        } else {
          likePostFail(dispatch, "There was an error connection");
        }
      })
      .catch((error) => {
        likePostFail(dispatch, "There was an error connection2");
      });
  };
};
const likePostFail = (dispatch, errorMessage) => {
  console.log(errorMessage);
  dispatch({
    type: LikeActionTypes.LIKE_POST_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const likePostSuccess = (dispatch, data) => {
  dispatch({
    type: LikeActionTypes.LIKE_POST_SUCCESS,
    payload: data,
  });
};
