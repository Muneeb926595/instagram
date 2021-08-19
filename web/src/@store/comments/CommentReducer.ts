import { CommentActionTypes } from "./../redux/actionTypes";
const INITIAL_STATE: CommentState = {
  comment: {},
  loading: false,
};
interface Action {
  payload: any;
  type: string;
}
const CommentReducer = (
  state: CommentState = INITIAL_STATE,
  action: Action
): CommentState => {
  switch (action.type) {
    case CommentActionTypes.GET_COMMENTS_START: {
      return { ...state, loading: true };
    }
    case CommentActionTypes.GET_COMMENTS_SUCCESS: {
      return {
        ...state,
        comment: action.payload,
        loading: false,
      };
    }
    case CommentActionTypes.GET_COMMENTS_FAIL: {
      return {
        ...state,
        comment: action.payload,
        loading: false,
      };
    }

    case CommentActionTypes.COMMENT_POST_START: {
      return { ...state, loading: true };
    }
    case CommentActionTypes.COMMENT_POST_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case CommentActionTypes.COMMENT_POST_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }
    case CommentActionTypes.DELETE_COMMENT_START: {
      return { ...state, loading: true };
    }
    case CommentActionTypes.DELETE_COMMENT_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case CommentActionTypes.DELETE_COMMENT_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }

    default: {
      return state;
    }
  }
};
export default CommentReducer;
