import { toast } from "react-toastify";

import { getAddPostUrl, getPostUrl } from "@api/Endpoint";
import { axiosInstance as axios } from "@api/axios";
import { PostActionTypes } from "../redux/actionTypes";
import { Post } from "@models/Post";
import { setShowAddPostModal } from "../modals/ModalsActions";
import { upateUserPostCount } from "../auth/AuthActions";

export const getPosts = () => {
  return (dispatch) => {
    dispatch({
      type: PostActionTypes.GET_POSTS_START,
    });
    const url = getPostUrl();

    axios
      .get(url)
      .then((res) => {
        let { posts } = res.data;
        if (posts) {
          getPostsSuccess(dispatch, posts);
        } else {
          getPostsFail(dispatch, "There was an error connection");
        }
      })
      .catch((error) => {
        getPostsFail(dispatch, "There was an error connection2");
      });
  };
};
const getPostsFail = (dispatch, errorMessage) => {
  console.log(errorMessage);
  dispatch({
    type: PostActionTypes.GET_POSTS_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const getPostsSuccess = (dispatch, posts) => {
  dispatch({
    type: PostActionTypes.GET_POSTS_SUCCESS,
    payload: {
      posts,
    },
  });
};

export const createPost = (post: Post) => {
  return (dispatch) => {
    dispatch({
      type: PostActionTypes.CREATE_POSTS_START,
    });
    const url = getAddPostUrl();

    let formData = new FormData();
    for (let key in post) {
      if (key === "imageFile" && post[key] != null) {
        Object.keys(post["imageFile"]).map((v) => {
          formData.append(key, post[key][v], post["imageFile"][v].name);
        });
      } else if (key === "mediaFiles") {
        const mediaData = JSON.stringify(post.mediaFiles);
        formData.append("mediaFiles", mediaData);
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
  dispatch(getPosts());
  dispatch(upateUserPostCount());
  toast.success("Post Uploaded Successfully!");
};

export const addPostLikeLocally = (
  postId,
  userId,

  like,
  image,
  userName
) => {
  return (dispatch) => [
    dispatch({
      type: PostActionTypes.ADD_POST_LIKE_LOCALLY,
      payload: { postId, userId, like, image, userName },
    }),
  ];
};

export const removePostLikeLocally = (postId, userId, like) => {
  return (dispatch) => [
    dispatch({
      type: PostActionTypes.REMOVE_POST_LIKE_LOCALLY,
      payload: { postId, userId, like },
    }),
  ];
};
