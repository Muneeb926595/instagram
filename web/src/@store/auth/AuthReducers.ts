import { AuthActionTypes } from "./../redux/actionTypes";
const INITIAL_STATE: AuthState = {
  user: {},
  postsCount: 0,
  followingList: [],
  followersList: [],
  alreadyFollowing: "false",
  loading: false,
};
interface Action {
  payload: any;
  type: string;
}
const AuthReducer = (
  state: AuthState = INITIAL_STATE,
  action: Action
): AuthState => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_USER_START: {
      return { ...state, loading: true };
    }
    case AuthActionTypes.LOGIN_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    }
    case AuthActionTypes.LOGIN_USER_FAIL: {
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    }
    case AuthActionTypes.CREATE_USER_START: {
      return { ...state, loading: true };
    }
    case AuthActionTypes.CREATE_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    }
    case AuthActionTypes.CREATE_USER_FAIL: {
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    }
    case AuthActionTypes.SOCIAL_LOGIN_START: {
      return { ...state, loading: true };
    }
    case AuthActionTypes.SOCIAL_LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    }
    case AuthActionTypes.SOCIAL_LOGIN_FAIL: {
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    }
    case AuthActionTypes.GET_USER_START: {
      return { ...state, loading: true };
    }
    case AuthActionTypes.GET_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload.user,
        postsCount: action.payload.postsCount,
        followingList: action.payload.followingList,
        followersList: action.payload.followersList,
        alreadyFollowing: action.payload.alreadyFollowing,
        loading: false,
      };
    }
    case AuthActionTypes.GET_USER_FAIL: {
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    }
    case AuthActionTypes.UPDATE_USER_POST_COUNT: {
      return {
        ...state,
        postsCount: state?.postsCount + 1,
        loading: false,
      };
    }
    case AuthActionTypes.UPDATE_USER_IMAGE_SUCCESS: {
      return {
        ...state,
        user: { ...state.user, image: action.payload },
        loading: false,
      };
    }
    case AuthActionTypes.UPDATE_USER_LOGIN_STATUS_START: {
      return { ...state, loading: true };
    }
    case AuthActionTypes.UPDATE_USER_LOGIN_STATUS_SUCCESS: {
      return { ...state, loading: false };
    }
    case AuthActionTypes.UPDATE_USER_LOGIN_STATUS_FAIL: {
      return { ...state, loading: false };
    }
    default: {
      return state;
    }
  }
};
export default AuthReducer;
