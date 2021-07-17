import { toast } from "react-toastify";

import { getAddPostUrl } from "@api/Endpoint";
import { axiosInstance as axios } from "@api/axios";
import { PostActionTypes } from "../redux/actionTypes";
import { Post } from "@models/Post";
import { setShowAddPostModal } from "../modals/ModalsActions";

export const createPost = (post: Post) => {
  return (dispatch) => {
    dispatch({
      type: PostActionTypes.CREATE_POSTS_START,
    });
    const url = getAddPostUrl();
    console.log("goint to ", url, "with", post);
    let formData = new FormData();
    for (let key in post) {
      if (key === "imageFile" && post[key] != null) {
        Object.keys(post["imageFile"]).map((v) => {
          formData.append(key, post[key][v], post["imageFile"][v].name);
        });
      } else {
        formData.append(key, post[key]);
      }
    }

    axios
      .post(url, formData)
      .then((res) => {
        let { data } = res;
        if (data) {
          createPostSuccess(dispatch, data, post.history);
        } else {
          createPostFail(dispatch, "There was an error connection");
        }
      })
      .catch((error) => {
        createPostFail(dispatch, "There was an error connection2");
      });
  };
};
const createPostFail = (dispatch, errorMessage) => {
  dispatch({
    type: PostActionTypes.CREATE_POSTS_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const createPostSuccess = (dispatch, data, history) => {
  dispatch({
    type: PostActionTypes.CREATE_POSTS_SUCCESS,
    payload: data,
  });
  dispatch(setShowAddPostModal({ isVisible: false, modalPayload: {} }));

  toast.success("Post Uploaded Successfully!");
};
