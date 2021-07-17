export const BASE = "api end point";
export const loginUserUrl = () => {
  return encodeURI("auth/login");
};
export const registerUserUrl = () => {
  return encodeURI("auth/user");
};
export const getSocialLoginUrl = () => {
  return encodeURI("auth/socialLogin");
};
export const getUserByIdUrl = (userId) => {
  return encodeURI("auth/user/" + userId);
};
export const getAddPostUrl = () => {
  return encodeURI("post");
};
