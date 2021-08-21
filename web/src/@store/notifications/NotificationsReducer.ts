import { NotificationsActionTypes } from "./../redux/actionTypes";
const INITIAL_STATE: NotificationState = {
  unreadNotificationsCount: 0,
  notificationsList: [],
  postData: {},
  loading: false,
};
interface Action {
  payload: any;
  type: string;
}
const NotificationReducer = (
  state: NotificationState = INITIAL_STATE,
  action: Action
): NotificationState => {
  switch (action.type) {
    case NotificationsActionTypes.GET_NOTIFICATIONS_START: {
      return { ...state, loading: true };
    }
    case NotificationsActionTypes.GET_NOTIFICATIONS_SUCCESS: {
      if (action.payload.notificationCurrentPage === 1) {
        state.notificationsList = [];
        return {
          ...state,
          unreadNotificationsCount: action.payload.unreadNotificationsCount,
          notificationsList: action.payload.notifications,
          loading: false,
        };
      } else {
        return {
          ...state,
          unreadNotificationsCount:
            parseInt(state.unreadNotificationsCount) +
            parseInt(action.payload.unreadNotificationsCount),
          notificationsList: [
            ...state.notificationsList,
            ...action.payload.notifications,
          ],
          loading: false,
        };
      }
    }
    case NotificationsActionTypes.GET_NOTIFICATIONS_FAIL: {
      return {
        ...state,
        notificationsList: action.payload,
        loading: false,
      };
    }
    case NotificationsActionTypes.READ_NOTIFICATION_START: {
      return { ...state, loading: true };
    }
    case NotificationsActionTypes.READ_NOTIFICATION_SUCCESS: {
      return {
        ...state,
        postData: action.payload,
        loading: false,
      };
    }
    case NotificationsActionTypes.READ_NOTIFICATION_FAIL: {
      return {
        ...state,
        notificationsList: action.payload,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};
export default NotificationReducer;
