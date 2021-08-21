import { axiosInstance as axios } from "@api/axios";
import { NotificationsActionTypes } from "../redux/actionTypes";
import {
  getNotificationsUrl,
  getReadNotificationUrl,
  deleteNotificationUrl,
} from "@api/Endpoint";

export const getNotifications = () => {
  return (dispatch) => {
    dispatch({
      type: NotificationsActionTypes.GET_NOTIFICATIONS_START,
    });
    const url = getNotificationsUrl(localStorage.getItem("userId"));
    axios
      .get(url)
      .then((res) => {
        let { data } = res;
        if (data) {
          getNotificationsSuccess(dispatch, data);
        } else {
          getNotificationsFail(dispatch, "There was an error connection");
        }
      })
      .catch((error) => {
        getNotificationsFail(dispatch, "There was an error connection2");
      });
  };
};
const getNotificationsFail = (dispatch, errorMessage) => {
  console.log(errorMessage);
  dispatch({
    type: NotificationsActionTypes.GET_NOTIFICATIONS_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const getNotificationsSuccess = (dispatch, data) => {
  dispatch({
    type: NotificationsActionTypes.GET_NOTIFICATIONS_SUCCESS,
    payload: data,
  });
};

export const readNotification = (id) => {
  return (dispatch) => {
    dispatch({
      type: NotificationsActionTypes.READ_NOTIFICATION_START,
    });
    const url = getReadNotificationUrl(id);
    axios
      .put(url)
      .then((res) => {
        let { data } = res;
        if (data) {
          readNotificationSuccess(dispatch, data);
        } else {
          readNotificationFail(dispatch, "There was an error connection");
        }
      })
      .catch((error) => {
        readNotificationFail(dispatch, "There was an error connection2");
      });
  };
};
const readNotificationFail = (dispatch, errorMessage) => {
  console.log(errorMessage);
  dispatch({
    type: NotificationsActionTypes.READ_NOTIFICATION_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const readNotificationSuccess = (dispatch, data) => {
  dispatch({
    type: NotificationsActionTypes.READ_NOTIFICATION_SUCCESS,
    payload: data,
  });
  dispatch(getNotifications());
};

export const deleteNotification = (id) => {
  return (dispatch) => {
    dispatch({
      type: NotificationsActionTypes.DELETE_NOTIFICATION_START,
    });
    const url = deleteNotificationUrl(id);

    axios
      .delete(url)
      .then((res) => {
        let { data } = res;
        if (data) {
          deleteNotificationSuccess(dispatch, data);
        } else {
          deleteNotificatonFail(dispatch, "There was an error connection");
        }
      })
      .catch((error) => {
        deleteNotificatonFail(dispatch, "There was an error connection2");
      });
  };
};
const deleteNotificatonFail = (dispatch, errorMessage) => {
  console.log(errorMessage);
  dispatch({
    type: NotificationsActionTypes.DELETE_NOTIFICATION_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const deleteNotificationSuccess = (dispatch, data) => {
  dispatch({
    type: NotificationsActionTypes.DELETE_NOTIFICATION_SUCCESS,
    payload: data,
  });
  dispatch(getNotifications());
};
