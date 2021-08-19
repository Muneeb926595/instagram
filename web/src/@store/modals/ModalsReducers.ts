import { ModlasActionTypes } from "./../redux/actionTypes";

const INITIAL_STATE: ModalsState = {
  addPostModal: { isVisible: false, modalPayload: {} },
  commentsModal: { isVisible: false, modalPayload: {} },
};
interface Action {
  payload: any;
  type: string;
}
const AuthReducer = (
  state: ModalsState = INITIAL_STATE,
  action: Action
): ModalsState => {
  switch (action.type) {
    case ModlasActionTypes.SHOW_ADD_POST_MODAL: {
      return {
        ...state,
        addPostModal: {
          isVisible: action.payload.isVisible,
          modalPayload: action.payload.modalPayload,
        },
      };
    }
    case ModlasActionTypes.SHOW_COMMENTS_MODAL: {
      return {
        ...state,
        commentsModal: {
          isVisible: action.payload.isVisible,
          modalPayload: action.payload.modalPayload,
        },
      };
    }

    default: {
      return state;
    }
  }
};
export default AuthReducer;
