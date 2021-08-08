import { PostActionTypes } from "../redux/actionTypes";

const INITIAL_STATE: PostState = {
  posts: [],
  loading: false,
};
interface Action {
  payload: any;
  type: string;
}
const PostReducer = (
  state: PostState = INITIAL_STATE,
  action: Action
): PostState => {
  switch (action.type) {
    case PostActionTypes.GET_POSTS_START: {
      return { ...state, loading: true };
    }
    case PostActionTypes.GET_POSTS_SUCCESS: {
      return {
        ...state,
        posts: action.payload.posts,
        loading: false,
      };
    }
    case PostActionTypes.GET_POSTS_FAIL: {
      return { ...state, loading: false };
    }
    case PostActionTypes.CREATE_POSTS_START: {
      return { ...state, loading: true };
    }
    case PostActionTypes.CREATE_POSTS_SUCCESS: {
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    }
    case PostActionTypes.CREATE_POSTS_FAIL: {
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    }
    case PostActionTypes.ADD_POST_LIKE_LOCALLY: {
      const filteredPosts = state.posts.map((singlePost: any) => {
        if (singlePost._id === action.payload.postId) {
          const updateLikedObject = {
            userId: {
              _id: action.payload.userId,
              image: action.payload.image,
              userName: action.payload.userName,
            },
            postId: action.payload.postId,
            like: action.payload.like,
          };
          singlePost.likes.likes.push(updateLikedObject);
          return {
            ...singlePost,
            likes: {
              count: singlePost.likes.likes.length,
              likes: singlePost.likes.likes,
            },
          };
        } else {
          return singlePost;
        }
      });

      return {
        ...state,
        posts: filteredPosts,
      };
    }
    case PostActionTypes.REMOVE_POST_LIKE_LOCALLY: {
      const filteredPosts = state.posts.map((singlePost: any) => {
        if (singlePost._id === action.payload.postId) {
          const filteredLikes = singlePost.likes.likes.filter((singleLike) => {
            if (singleLike.userId._id !== action.payload.userId) {
              return singleLike;
            }
          });
          return {
            ...singlePost,
            likes: {
              count: filteredLikes.length,
              likes: filteredLikes,
            },
          };
        } else {
          return singlePost;
        }
      });

      return {
        ...state,
        posts: filteredPosts,
      };
    }
    default: {
      return state;
    }
  }
};
export default PostReducer;
