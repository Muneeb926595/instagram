import { MessagesActionTypes } from "../redux/actionTypes";
const INITIAL_STATE: MessagesState = {
  contacts: [],
  messages: [],
  loading: false,
};
interface Action {
  payload: any;
  type: string;
}
const ChatReducer = (
  state: MessagesState = INITIAL_STATE,
  action: Action
): MessagesState => {
  switch (action.type) {
    case MessagesActionTypes.GET_CHAT_START: {
      return { ...state, loading: true };
    }
    case MessagesActionTypes.GET_CHAT_SUCCESS: {
      return {
        ...state,
        contacts: action.payload,
        loading: false,
      };
    }
    case MessagesActionTypes.GET_CHAT_FAIL: {
      return {
        ...state,
        contacts: action.payload,
        loading: false,
      };
    }
    case MessagesActionTypes.UPDATE_CONTACTS_LOCALLY: {
      if (state?.contacts?.length > 0) {
        return {
          ...state,
          contacts: [...state.contacts, action.payload],
          loading: false,
        };
      } else {
        return {
          ...state,
          contacts: [action.payload],
          loading: false,
        };
      }
    }
    case MessagesActionTypes.GET_MESSAGES_START: {
      return { ...state, loading: true };
    }
    case MessagesActionTypes.GET_MESSAGES_SUCCESS: {
      return {
        ...state,
        messages: action.payload.messages.reverse(),
        loading: false,
      };
    }
    case MessagesActionTypes.ADD_MESSAGE_LOCALLY: {
      return {
        ...state,
        messages: [...state.messages, action.payload],
        loading: false,
      };
    }

    default: {
      return state;
    }
  }
};
export default ChatReducer;
