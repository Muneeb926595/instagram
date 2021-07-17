import { toast } from "react-toastify";

import {
  getAddStoryUrl,
  getStoriesUrl,
  getViewedStoriesUrl,
} from "@api/Endpoint";
import { axiosInstance as axios } from "@api/axios";
import { SotryiesActionTypes } from "../redux/actionTypes";
import { Story } from "@models/Story";

export const getStories = (userId) => {
  return (dispatch) => {
    dispatch({
      type: SotryiesActionTypes.GET_STORIES_START,
    });
    const url = getStoriesUrl(userId);
    axios
      .get(url)
      .then((res) => {
        let { data } = res;
        if (data) {
          getStoriesSuccess(dispatch, data);
        } else {
          getStoriesFail(dispatch, "There was an error connection");
        }
      })
      .catch((error) => {
        getStoriesFail(dispatch, "There was an error connection2");
      });
  };
};
const getStoriesFail = (dispatch, errorMessage) => {
  console.log(errorMessage);
  dispatch({
    type: SotryiesActionTypes.GET_STORIES_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const getStoriesSuccess = (dispatch, data) => {
  dispatch({
    type: SotryiesActionTypes.GET_STORIES_SUCCESS,
    payload: data,
  });
};

export const updateLocalStoriesData = (data) => {
  return (dispatch) => {
    dispatch({
      type: SotryiesActionTypes.UPDATE_LOCAL_STORIES_DATA,
      payload: data,
    });
  };
};

export const addStory = (story: Story) => {
  return (dispatch) => {
    dispatch({
      type: SotryiesActionTypes.ADD_STORY_START,
    });

    const url = getAddStoryUrl();
    let formData = new FormData();
    for (let key in story) {
      if (key === "imageFile" && story[key] != null) {
        formData.append(key, story[key], story[key].name);
      } else {
        formData.append(key, story[key]);
      }
    }
    axios
      .post(url, formData)
      .then((res) => {
        let { data } = res;
        if (data) {
          addStorySuccess(dispatch, data);
        } else {
          addStoryFail(dispatch, "There was an error connection");
        }
      })
      .catch((error) => {
        addStoryFail(dispatch, "There was an error connection2");
      });
  };
};
const addStoryFail = (dispatch, errorMessage) => {
  dispatch({
    type: SotryiesActionTypes.ADD_STORY_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const addStorySuccess = (dispatch, data) => {
  dispatch({
    type: SotryiesActionTypes.ADD_STORY_SUCCESS,
    payload: data,
  });
  toast.success("Story uploaded successfully!");
};

export const viewedStory = (storyId) => {
  return (dispatch) => {
    dispatch({
      type: SotryiesActionTypes.VIEWED_STORY_START,
    });
    const url = getViewedStoriesUrl(localStorage.getItem("userId"), storyId);
    axios
      .put(url)
      .then((res) => {
        let { data } = res;
        if (data) {
          viewedStorySuccess(dispatch, data);
        } else {
          viewedStoryFail(dispatch, "There was an error connection");
        }
      })
      .catch((error) => {
        viewedStoryFail(dispatch, "There was an error connection2");
      });
  };
};
const viewedStoryFail = (dispatch, errorMessage) => {
  console.log(errorMessage);
  dispatch({
    type: SotryiesActionTypes.VIEWED_STORY_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const viewedStorySuccess = (dispatch, data) => {
  dispatch({
    type: SotryiesActionTypes.VIEWED_STORY_SUCCESS,
    payload: data,
  });
};
