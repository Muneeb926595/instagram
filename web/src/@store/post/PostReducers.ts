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
      return { ...state, loading: false };
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
    default: {
      return state;
    }
  }
};
export default PostReducer;
