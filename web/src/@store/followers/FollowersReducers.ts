import { FollowUnFollowActionTypes } from "./../redux/actionTypes";
const INITIAL_STATE: FollowUnFollowState = {
  followingList: [],
  message: "",
  loading: false,
};
interface Action {
  payload: any;
  type: string;
}
const CommentReducer = (
  state: FollowUnFollowState = INITIAL_STATE,
  action: Action
): FollowUnFollowState => {
  switch (action.type) {
    case FollowUnFollowActionTypes.FOLLOW_UNFOLLOW_START: {
      return { ...state, loading: true };
    }
    case FollowUnFollowActionTypes.FOLLOW_UNFOLLOW_SUCCESS: {
      return {
        ...state,
        message: action.payload,
        loading: false,
      };
    }
    case FollowUnFollowActionTypes.FOLLOW_UNFOLLOW_FAIL: {
      return {
        ...state,
        message: action.payload,
        loading: false,
      };
    }
    case FollowUnFollowActionTypes.REMOVE_FOLLOWER_FOLLOWING_START: {
      return { ...state, loading: true };
    }
    case FollowUnFollowActionTypes.REMOVE_FOLLOWER_FOLLOWING_SUCCESS: {
      return {
        ...state,
        message: action.payload,
        loading: false,
      };
    }
    case FollowUnFollowActionTypes.REMOVE_FOLLOWER_FOLLOWING_FAIL: {
      return {
        ...state,
        message: action.payload,
        loading: false,
      };
    }
    case FollowUnFollowActionTypes.GET_FOLLOWINGS_START: {
      return { ...state, loading: true };
    }
    case FollowUnFollowActionTypes.GET_FOLLOWINGS_SUCCESS: {
      return {
        ...state,
        followingList: action.payload,
        loading: false,
      };
    }
    case FollowUnFollowActionTypes.GET_FOLLOWINGS_FAIL: {
      return {
        ...state,
        followingList: action.payload,
        loading: false,
      };
    }

    default: {
      return state;
    }
  }
};
export default CommentReducer;
