import { getUserByIdUrl, getUserPostUrl } from "@api/Endpoint";
import { axiosInstance as axios } from "@api/axios";
import { UserProfileActionTypes } from "../redux/actionTypes";

export const getUserProfile = (id) => {
  return (dispatch) => {
    dispatch({
      type: UserProfileActionTypes.GET_USER_PROFILE_START,
    });

    const url = getUserByIdUrl(id, localStorage.getItem("userId"));

    axios
      .get(url)
      .then((res) => {
        let { data } = res;
        if (data) {
          getUserProfileSuccess(dispatch, data);
        } else {
          getUserProfileFail(dispatch, "There was an error connection");
        }
      })
      .catch((error) => {
        console.log(error.message);
        getUserProfileFail(dispatch, "There was an error connection2");
      });
  };
};
const getUserProfileFail = (dispatch, errorMessage) => {
  console.log(errorMessage);
  dispatch({
    type: UserProfileActionTypes.GET_USER_PROFILE_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const getUserProfileSuccess = (dispatch, data) => {
  dispatch({
    type: UserProfileActionTypes.GET_USER_PROFILE_SUCCESS,
    payload: data,
  });
};

export const getUserPosts = (id, page, limit) => {
  return (dispatch) => {
    dispatch({
      type: UserProfileActionTypes.GET_USER_POSTS_START,
      payload: { page },
    });
    const url = getUserPostUrl(id, page, limit, localStorage.getItem("userId"));
    axios
      .get(url)
      .then((res) => {
        let { data } = res;
        if (data && data.length) {
          getUserPostsSuccess(dispatch, data);
        } else {
          getUserPostsFail(dispatch, "There was an error connection");
        }
      })
      .catch((error) => {
        getUserPostsFail(dispatch, "There was an error connection2");
      });
  };
};
const getUserPostsFail = (dispatch, errorMessage) => {
  console.log(errorMessage);
  dispatch({
    type: UserProfileActionTypes.GET_USER_POSTS_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const getUserPostsSuccess = (dispatch, data) => {
  dispatch({
    type: UserProfileActionTypes.GET_USER_POSTS_SUCCESS,
    payload: data,
  });
};

export const otherUserFoodAndI = (bool) => {
  return (dispatch) => {
    dispatch({
      type: UserProfileActionTypes.OTHER_USER_FOODANDI,
      payload: {
        otherUserFoodAndI: bool,
      },
    });
  };
};
