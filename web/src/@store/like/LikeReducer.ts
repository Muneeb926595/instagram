import { LikeActionTypes } from "./../redux/actionTypes";
const INITIAL_STATE: LikeState = {
  like: {},
  favourite: {},
  loading: false,
};
interface Action {
  payload: any;
  type: string;
}
const LikeReducer = (
  state: LikeState = INITIAL_STATE,
  action: Action
): LikeState => {
  switch (action.type) {
    case LikeActionTypes.GET_LIKES_START: {
      return { ...state, loading: false };
    }
    case LikeActionTypes.GET_LIKES_SUCCESS: {
      return {
        ...state,
        like: action.payload,
        loading: false,
      };
    }
    case LikeActionTypes.GET_LIKES_FAIL: {
      return {
        ...state,
        like: action.payload,
        loading: false,
      };
    }

    case LikeActionTypes.LIKE_POST_START: {
      return { ...state, loading: false };
    }
    case LikeActionTypes.LIKE_POST_SUCCESS: {
      return {
        ...state,
        like: action.payload,
        loading: false,
      };
    }
    case LikeActionTypes.LIKE_POST_FAIL: {
      return {
        ...state,
        like: action.payload,
        loading: false,
      };
    }
    case LikeActionTypes.ADD_TO_FAVOURITE_START: {
      return { ...state, loading: false };
    }
    case LikeActionTypes.ADD_TO_FAVOURITE_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case LikeActionTypes.ADD_TO_FAVOURITE_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }
    case LikeActionTypes.GET_FAVOURITES_START: {
      return { ...state, loading: false };
    }
    case LikeActionTypes.GET_FAVOURITES_SUCCESS: {
      return {
        ...state,
        favourite: action.payload,
        loading: false,
      };
    }
    case LikeActionTypes.GET_FAVOURITES_FAIL: {
      return {
        ...state,
        favourite: action.payload,
        loading: false,
      };
    }

    default: {
      return state;
    }
  }
};
export default LikeReducer;
