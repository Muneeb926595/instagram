import { axiosInstance as axios } from "@api/axios";
import { LikeActionTypes } from "../redux/actionTypes";
import {
  getLikeUrl,
  getFavouritesUrl,
  getAddToFavouriteUrl,
} from "@api/Endpoint";
import { Like } from "@models/Like";
import { Favourite } from "@models/Favourite";

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

export const addToFavourite = (favourite: Favourite) => {
  return async (dispatch) => {
    dispatch({
      type: LikeActionTypes.ADD_TO_FAVOURITE_START,
    });
    const url = getAddToFavouriteUrl();
    const request = {
      userId: localStorage.getItem("userId"),
      postId: favourite.postId,
      favourite: favourite.favourite,
    };
    axios
      .post(url, request)
      .then((res) => {
        let { data } = res;
        if (data) {
          addToFavouriteSuccess(dispatch, data);
        } else {
          addToFavouriteFail(dispatch, "There was an error connection");
        }
      })
      .catch((error) => {
        addToFavouriteFail(dispatch, "There was an error connection2");
      });
  };
};
const addToFavouriteFail = (dispatch, errorMessage) => {
  console.log(errorMessage);
  dispatch({
    type: LikeActionTypes.ADD_TO_FAVOURITE_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const addToFavouriteSuccess = (dispatch, data) => {
  dispatch({
    type: LikeActionTypes.ADD_TO_FAVOURITE_SUCCESS,
    payload: data,
  });
};

export const getFavourites = () => {
  return async (dispatch) => {
    dispatch({
      type: LikeActionTypes.GET_FAVOURITES_START,
    });
    const url = getFavouritesUrl(localStorage.getItem("userId"));
    axios
      .get(url)
      .then((res) => {
        let { favourites } = res.data;
        if (favourites) {
          getFavouritesSuccess(dispatch, favourites);
        } else {
          getFavouritesFail(dispatch, "There was an error connection");
        }
      })
      .catch((error) => {
        getFavouritesFail(dispatch, "There was an error connection2");
      });
  };
};
const getFavouritesFail = (dispatch, errorMessage) => {
  console.log(errorMessage);
  dispatch({
    type: LikeActionTypes.GET_FAVOURITES_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const getFavouritesSuccess = (dispatch, favourites) => {
  dispatch({
    type: LikeActionTypes.GET_FAVOURITES_SUCCESS,
    payload: favourites,
  });
};
