import { ModlasActionTypes } from "../redux/actionTypes";

export const setShowAddPostModal = (modalPayload) => {
  return (dispatch) => {
    dispatch({
      type: ModlasActionTypes.SHOW_ADD_POST_MODAL,
      payload: modalPayload,
    });
  };
};

export const setShowCommentsModal = (modalPayload) => {
  return (dispatch) => {
    dispatch({
      type: ModlasActionTypes.SHOW_COMMENTS_MODAL,
      payload: modalPayload,
    });
  };
};
export const setShowAddNewContactModal = (modalPayload) => {
  return (dispatch) => {
    dispatch({
      type: ModlasActionTypes.SHOW_ADD_NEW_CONTACT_MODAL,
      payload: modalPayload,
    });
  };
};
export const setShowNewCallAlert = (modalPayload) => {
  return (dispatch) => {
    dispatch({
      type: ModlasActionTypes.SHOW_NEW_CALL_ALERT,
      payload: modalPayload,
    });
  };
};
