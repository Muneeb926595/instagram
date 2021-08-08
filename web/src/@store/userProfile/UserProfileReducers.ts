import { UserProfileActionTypes } from "./../redux/actionTypes";
const INITIAL_STATE: UserProfileState = {
  userProfile: {},
  profilePosts: [],
  otherUserFoodAndI: false,
  postsCount: 0,
  followingList: "0",
  followersList: "0",
  alreadyFollowing: "false",
  loading: false,
  postsLoading: false,
};
interface Action {
  payload: any;
  type: string;
}
const UserProfileReducer = (
  state: UserProfileState = INITIAL_STATE,
  action: Action
): UserProfileState => {
  switch (action.type) {
    case UserProfileActionTypes.GET_USER_PROFILE_START: {
      return { ...state, loading: true };
    }
    case UserProfileActionTypes.GET_USER_PROFILE_SUCCESS: {
      return {
        ...state,
        userProfile: action.payload.user,
        postsCount: action.payload.postsCount,
        followingList: action.payload.followingList,
        followersList: action.payload.followersList,
        alreadyFollowing: action.payload.alreadyFollowing,
        loading: false,
      };
    }
    case UserProfileActionTypes.GET_USER_PROFILE_FAIL: {
      return {
        ...state,
        userProfile: action.payload,
        loading: false,
      };
    }
    case UserProfileActionTypes.GET_USER_POSTS_START: {
      return { ...state, postsLoading: true };
    }
    case UserProfileActionTypes.GET_USER_POSTS_SUCCESS: {
      return {
        ...state,
        profilePosts: action.payload,
        postsLoading: false,
      };
    }
    case UserProfileActionTypes.GET_USER_POSTS_FAIL: {
      return {
        ...state,
        profilePosts: action.payload ? action.payload : [],
        postsLoading: false,
      };
    }
    case UserProfileActionTypes.OTHER_USER_FOODANDI: {
      return { ...state, otherUserFoodAndI: action.payload };
    }
    default: {
      return state;
    }
  }
};
export default UserProfileReducer;
