import { SotryiesActionTypes } from "../redux/actionTypes";

const INITIAL_STATE: StoriesState = {
  stories: [],
  myStories: [],
  loading: false,
};
interface Action {
  payload: any;
  type: string;
}
const PostReducer = (
  state: StoriesState = INITIAL_STATE,
  action: Action
): StoriesState => {
  switch (action.type) {
    case SotryiesActionTypes.ADD_STORY_START: {
      return { ...state, loading: false };
    }
    case SotryiesActionTypes.ADD_STORY_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case SotryiesActionTypes.ADD_STORY_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }
    case SotryiesActionTypes.GET_STORIES_START: {
      return { ...state, loading: false };
    }
    case SotryiesActionTypes.GET_STORIES_SUCCESS: {
      return {
        ...state,
        stories: action.payload.stories,
        myStories: action.payload.myStories,
        loading: false,
      };
    }
    case SotryiesActionTypes.GET_STORIES_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }
    case SotryiesActionTypes.VIEWED_STORY_START: {
      return { ...state, loading: false };
    }
    case SotryiesActionTypes.VIEWED_STORY_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case SotryiesActionTypes.VIEWED_STORY_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }
    case SotryiesActionTypes.UPDATE_LOCAL_STORIES_DATA: {
      return {
        ...state,
        stories: action.payload.stories,
      };
    }
    default: {
      return state;
    }
  }
};
export default PostReducer;
