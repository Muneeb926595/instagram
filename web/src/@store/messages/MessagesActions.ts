import {
  getContactsUrl,
  getUserMessagesUrl,
  seenAllMessagesUrl,
} from "../../@api/Endpoint";
import { axiosInstance as axios } from "../../@api/axios";
import { MessagesActionTypes } from "../redux/actionTypes";

export const updateContactsLocally = (newContact) => {
  return (dispatch) => {
    dispatch({
      type: MessagesActionTypes.UPDATE_CONTACTS_LOCALLY,
      payload: newContact,
    });
  };
};
export const addMessageLocally = (newMessage) => {
  return (dispatch) => {
    dispatch({
      type: MessagesActionTypes.ADD_MESSAGE_LOCALLY,
      payload: newMessage,
    });
  };
};

export const getContacts = () => {
  return (dispatch) => {
    dispatch({
      type: MessagesActionTypes.GET_CHAT_START,
    });
    const url = getContactsUrl(localStorage.getItem("userId"));
    axios
      .get(url)
      .then((res) => {
        let { data } = res;
        if (data) {
          getContactsSuccess(dispatch, data);
        } else {
          getContactsFail(dispatch, "There was an error connection");
        }
      })
      .catch((error) => {
        getContactsFail(dispatch, "There was an error connection2");
      });
  };
};
const getContactsFail = (dispatch, errorMessage) => {
  console.log(errorMessage);
  dispatch({
    type: MessagesActionTypes.GET_CHAT_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const getContactsSuccess = (dispatch, data) => {
  dispatch({
    type: MessagesActionTypes.GET_CHAT_SUCCESS,
    payload: data,
  });
};

export const getUserMessages = (id, page, limit) => {
  return (dispatch) => {
    dispatch({
      type: MessagesActionTypes.GET_MESSAGES_START,
    });
    const url = getUserMessagesUrl(
      localStorage.getItem("userId"),
      id,
      page,
      limit
    );

    axios
      .get(url)
      .then((res) => {
        let { data } = res;
        if (data) {
          getUserMessagesSuccess(dispatch, data);
        } else {
          getUserMessagesFail(dispatch, "There was an error connection");
        }
      })
      .catch((error) => {
        getUserMessagesFail(dispatch, "There was an error connection2");
      });
  };
};
const getUserMessagesFail = (dispatch, errorMessage) => {
  console.log(errorMessage);
  dispatch({
    type: MessagesActionTypes.GET_MESSAGES_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const getUserMessagesSuccess = (dispatch, data) => {
  dispatch({
    type: MessagesActionTypes.GET_MESSAGES_SUCCESS,
    payload: data,
  });
};

export const seenAllMessages = (userId, recieverId, contactId) => {
  return (dispatch) => {
    dispatch({
      type: MessagesActionTypes.SEEN_ALL_MESSAGES_START,
    });
    const url = seenAllMessagesUrl();

    const req = {
      userId,
      recieverId,
      contactId,
    };
    axios
      .put(url, req)
      .then((res) => {
        let { data } = res;
        if (data) {
          seenAllMessagesSuccess(dispatch, data);
        } else {
          seenAllMessagesFail(dispatch, "There was an error connection");
        }
      })
      .catch((error) => {
        seenAllMessagesFail(dispatch, "There was an error connection2");
      });
  };
};
const seenAllMessagesFail = (dispatch, errorMessage) => {
  console.log(errorMessage);
  dispatch({
    type: MessagesActionTypes.SEEN_ALL_MESSAGES_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const seenAllMessagesSuccess = (dispatch, data) => {
  dispatch({
    type: MessagesActionTypes.SEEN_ALL_MESSAGES_SUCCESS,
    payload: data,
  });
};
