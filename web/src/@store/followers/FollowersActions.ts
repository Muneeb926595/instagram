import {
  getFollowUnFollowUrl,
  getUserFollowingsUrl,
  getRemoveFollowerFollowingUrl,
} from "@api/Endpoint";
import { axiosInstance as axios } from "@api/axios";
import { FollowUnFollowActionTypes } from "../redux/actionTypes";
import { getUser } from "../auth/AuthActions";
import { getUserProfile } from "@store/userProfile/UserProfileActions";

export const followUnFollow = (id) => {
  return (dispatch) => {
    dispatch({
      type: FollowUnFollowActionTypes.FOLLOW_UNFOLLOW_START,
    });
    const url = getFollowUnFollowUrl();
    const request = {
      userId: localStorage.getItem("userId"),
      id,
    };

    axios
      .post(url, request)
      .then((res) => {
        let { data } = res;
        if (data) {
          followUnFollowSuccess(dispatch, data, id);
        } else {
          followUnFollowFail(dispatch, "There was an error connection");
        }
      })
      .catch((error) => {
        followUnFollowFail(dispatch, "There was an error connection2");
      });
  };
};
const followUnFollowFail = (dispatch, errorMessage) => {
  console.log(errorMessage);
  dispatch({
    type: FollowUnFollowActionTypes.FOLLOW_UNFOLLOW_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const followUnFollowSuccess = (dispatch, data, id) => {
  dispatch({
    type: FollowUnFollowActionTypes.FOLLOW_UNFOLLOW_SUCCESS,
    payload: data,
  });
  dispatch(getUser(localStorage.getItem("userId")));
  dispatch(getUserProfile(id));
};

export const getUserFollowingsList = (id) => {
  return (dispatch) => {
    dispatch({
      type: FollowUnFollowActionTypes.GET_FOLLOWINGS_START,
    });
    const url = getUserFollowingsUrl(id);

    axios
      .get(url)
      .then((res) => {
        let { data } = res;
        if (data) {
          getUserFollowingsListSuccess(dispatch, data);
        } else {
          getUserFollowingsListFail(dispatch, "There was an error connection");
        }
      })
      .catch((error) => {
        getUserFollowingsListFail(dispatch, "There was an error connection2");
      });
  };
};
const getUserFollowingsListFail = (dispatch, errorMessage) => {
  console.log(errorMessage);
  dispatch({
    type: FollowUnFollowActionTypes.GET_FOLLOWINGS_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const getUserFollowingsListSuccess = (dispatch, data) => {
  dispatch({
    type: FollowUnFollowActionTypes.GET_FOLLOWINGS_SUCCESS,
    payload: data,
  });
};

export const removeFollowerFollowing = (id1, id2) => {
  return (dispatch) => {
    dispatch({
      type: FollowUnFollowActionTypes.REMOVE_FOLLOWER_FOLLOWING_START,
    });
    const url = getRemoveFollowerFollowingUrl();

    const request = {
      id1,
      id2,
    };

    axios
      .post(url, request)
      .then((res) => {
        let { data } = res;
        if (data) {
          removeFollowerFollowingSuccess(dispatch, data);
        } else {
          removeFollowerFollowingFail(
            dispatch,
            "There was an error connection"
          );
        }
      })
      .catch((error) => {
        removeFollowerFollowingFail(dispatch, "There was an error connection2");
      });
  };
};
const removeFollowerFollowingFail = (dispatch, errorMessage) => {
  console.log(errorMessage);
  dispatch({
    type: FollowUnFollowActionTypes.REMOVE_FOLLOWER_FOLLOWING_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const removeFollowerFollowingSuccess = (dispatch, data) => {
  dispatch({
    type: FollowUnFollowActionTypes.REMOVE_FOLLOWER_FOLLOWING_SUCCESS,
    payload: data,
  });
  dispatch(getUser(localStorage.getItem("userId")));
};
