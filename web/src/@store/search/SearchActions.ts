import { getSearchUrl } from "@api/Endpoint";
import { axiosInstance as axios } from "@api/axios";
import { SearchActionTypes } from "../redux/actionTypes";

export const searchUser = (searchText) => {
  return (dispatch) => {
    dispatch({
      type: SearchActionTypes.SEARCH_START,
    });
    const url = getSearchUrl(searchText);
    axios
      .get(url)
      .then((res) => {
        let { users } = res.data;
        if (users) {
          searchUserSuccess(dispatch, users);
        } else {
          searchUserFail(dispatch, "There was an error connection");
        }
      })
      .catch((error) => {
        searchUserFail(dispatch, "There was an error connection2");
      });
  };
};
const searchUserFail = (dispatch, errorMessage) => {
  console.log(errorMessage);
  dispatch({
    type: SearchActionTypes.SEARCH_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const searchUserSuccess = (dispatch, users) => {
  dispatch({
    type: SearchActionTypes.SEARCH_SUCCESS,
    payload: users,
  });
};
