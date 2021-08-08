import { SearchActionTypes } from "../redux/actionTypes";

const INITIAL_STATE: SearchState = {
  users: [],
  loading: false,
};
interface Action {
  payload: any;
  type: string;
}
const SearchReducer = (
  state: SearchState = INITIAL_STATE,
  action: Action
): SearchState => {
  switch (action.type) {
    case SearchActionTypes.SEARCH_START: {
      return { ...state, loading: true };
    }
    case SearchActionTypes.SEARCH_SUCCESS: {
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    }
    case SearchActionTypes.SEARCH_FAIL: {
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
export default SearchReducer;
