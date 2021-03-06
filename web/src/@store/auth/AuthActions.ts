import { toast } from "react-toastify";
import {
  loginUserUrl,
  registerUserUrl,
  getSocialLoginUrl,
  getUserByIdUrl,
  updateUserImageUrl,
  updateLoginStatusUrl,
} from "@api/Endpoint";
import { axiosInstance as axios } from "@api/axios";
import { AuthActionTypes } from "../redux/actionTypes";
import { User } from "@models/User";

export const submitLogin = (user: User, history: any) => {
  return (dispatch) => {
    dispatch({
      type: AuthActionTypes.LOGIN_USER_START,
    });
    const request = {
      email: user.email,
      password: user.password,
    };
    const url = loginUserUrl();
    axios
      .post(url, request)
      .then((res) => {
        let { data } = res;
        if (
          data.accessToken &&
          data.accessToken !== "undefined" &&
          data._id &&
          data._id !== "undefined"
        ) {
          loginUserSuccess(dispatch, data, history);
        } else {
          loginUserFail(dispatch, "There was an error connection");
        }
      })
      .catch((error) => {
        console.log(error.message);
        if (error?.response?.data === "Email not found") {
          toast.error("Email not found");
        } else if (error?.response?.data === "Password is invalid!") {
          toast.error("Password is invalid!");
        }
        loginUserFail(dispatch, "There was an error connection2");
      });
  };
};
const loginUserFail = (dispatch, errorMessage) => {
  console.log(errorMessage);
  dispatch({
    type: AuthActionTypes.LOGIN_USER_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const loginUserSuccess = (dispatch, data, history) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + data.accessToken;
  localStorage.setItem("access_token", data.accessToken);
  localStorage.setItem("userId", data._id);

  dispatch({
    type: AuthActionTypes.LOGIN_USER_SUCCESS,
    payload: data,
  });
  toast.success("Welcome Back " + data.userName);
  history.push("/home");
};

export const submitRegister = (user: User, history: any) => {
  return (dispatch) => {
    dispatch({
      type: AuthActionTypes.CREATE_USER_START,
    });
    const request = {
      userName: user.userName,
      email: user.email,
      password: user.password,
    };
    const url = registerUserUrl();
    axios
      .post(url, request)
      .then((res) => {
        let { data } = res;
        if (
          data.accessToken &&
          data.accessToken !== "undefined" &&
          data._id &&
          data._id !== "undefined"
        ) {
          registerUserSuccess(dispatch, data, history);
        } else {
          registerUserFail(dispatch, "There was an error connection");
        }
      })
      .catch((error) => {
        console.log(error.message);
        if (error?.response?.data === "Email Already Exist") {
          toast.error("Email Already Exist");
        } else if (error?.response?.data === "User Name Already Exist") {
          toast.error("User Name Already Exist");
        }
        registerUserFail(dispatch, "There was an error connection2");
      });
  };
};
const registerUserFail = (dispatch, errorMessage) => {
  console.log(errorMessage);
  dispatch({
    type: AuthActionTypes.CREATE_USER_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const registerUserSuccess = (dispatch, data, history) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + data.accessToken;
  localStorage.setItem("access_token", data.accessToken);
  localStorage.setItem("userId", data._id);
  dispatch({
    type: AuthActionTypes.CREATE_USER_SUCCESS,
    payload: data,
  });
  toast.success("Welcome " + data.userName);
  history.push("/home");
};

export const socialLogin = (data, history) => {
  return (dispatch) => {
    dispatch({
      type: AuthActionTypes.SOCIAL_LOGIN_START,
    });
    const url = getSocialLoginUrl();
    axios
      .post(url, data)
      .then((res) => {
        let { data } = res;
        if (
          data.accessToken &&
          data.accessToken !== "undefined" &&
          data._id &&
          data._id !== "undefined"
        ) {
          socialLoginSuccess(dispatch, data, history);
        } else {
          socialLoginFail(dispatch, "There was an error connection");
        }
      })
      .catch((error) => {
        if (error.response.data === "User Name Already Exists!") {
          toast.error("User Name Already Exists!");
        }
        console.log(error.message);
        socialLoginFail(dispatch, "There was an error connection2");
      });
  };
};
const socialLoginFail = (dispatch, errorMessage) => {
  console.log(errorMessage);
  dispatch({
    type: AuthActionTypes.SOCIAL_LOGIN_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const socialLoginSuccess = (dispatch, data, history) => {
  localStorage.setItem("access_token", data.accessToken);
  localStorage.setItem("userId", data._id);
  dispatch({
    type: AuthActionTypes.SOCIAL_LOGIN_SUCCESS,
    payload: data,
  });
  toast.success("Welcome " + data.userName);
  history.push("/home");
};

export const getUser = (id) => {
  return (dispatch) => {
    dispatch({
      type: AuthActionTypes.GET_USER_START,
    });

    const url = getUserByIdUrl(id, localStorage.getItem("userId"));

    axios
      .get(url)
      .then((res) => {
        let { data } = res;
        if (data) {
          getUserSuccess(dispatch, data);
        } else {
          getUserFail(dispatch, "There was an error connection");
        }
      })
      .catch((error) => {
        console.log(error.message);
        getUserFail(dispatch, "There was an error connection2");
      });
  };
};
const getUserFail = (dispatch, errorMessage) => {
  console.log(errorMessage);
  dispatch({
    type: AuthActionTypes.GET_USER_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const getUserSuccess = (dispatch, data) => {
  dispatch({
    type: AuthActionTypes.GET_USER_SUCCESS,
    payload: data,
  });
};

export const upateUserPostCount = () => {
  return (dispatch) => {
    dispatch({
      type: AuthActionTypes.UPDATE_USER_POST_COUNT,
    });
  };
};

export const updateUserImage = (user) => {
  return (dispatch) => {
    dispatch({
      type: AuthActionTypes.UPDATE_USER_IMAGE_START,
    });

    const url = updateUserImageUrl(user.userId);
    axios
      .put(url, user)
      .then((res) => {
        let { data } = res;
        if (data) {
          updateUserImageSuccess(dispatch, data, user.image);
        } else {
          updateUserImageFail(dispatch, "There was an error connection");
        }
      })
      .catch((error) => {
        console.log(error.message);
        updateUserImageFail(dispatch, "There was an error connection2");
      });
  };
};
const updateUserImageFail = (dispatch, errorMessage) => {
  console.log(errorMessage);
  dispatch({
    type: AuthActionTypes.UPDATE_USER_IMAGE_FAIL,
    payload: {
      errorMessage,
    },
  });
};
const updateUserImageSuccess = (dispatch, data, userImage) => {
  dispatch({
    type: AuthActionTypes.UPDATE_USER_IMAGE_SUCCESS,
    payload: userImage,
  });
};

export const updateLoginStatus = (loginStatus) => {
  return (dispatch) => {
    dispatch({
      type: AuthActionTypes.UPDATE_USER_LOGIN_STATUS_START,
    });
    const url = updateLoginStatusUrl();
    const request = {
      userId: localStorage.getItem("userId"),
      userLoginStatus: loginStatus,
    };
    axios
      .put(url, request)
      .then((res) => {
        let { data } = res;
        if (data) {
          updateLoginStatusSuccess(dispatch, data);
        } else {
          updateLoginStatusFail(dispatch, "There user status was not updated");
        }
      })
      .catch((error) => {
        updateLoginStatusFail(dispatch, "There user status was not updated");
      });
  };
};
const updateLoginStatusSuccess = (dispatch, data) => {
  dispatch({
    type: AuthActionTypes.UPDATE_USER_LOGIN_STATUS_SUCCESS,
    payload: data,
  });
};
const updateLoginStatusFail = (dispatch, errorMessage) => {
  console.log(errorMessage);
  dispatch({
    type: AuthActionTypes.UPDATE_USER_LOGIN_STATUS_FAIL,
    payload: errorMessage,
  });
};
