import { ModlasActionTypes } from "../redux/actionTypes";

export const setShowAddPostModal = (modalPayload) => {
  return (dispatch) => {
    dispatch({
      type: ModlasActionTypes.SHOW_ADD_POST_MODAL,
      payload: modalPayload,
    });
  };
};
