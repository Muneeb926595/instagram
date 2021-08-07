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
export const getUserByIdUrl = (id, userId) => {
  return encodeURI("auth/user/" + id + "/" + userId);
};
export const getUserPostUrl = (id, page, limit, userId) => {
  return encodeURI(
    "post/userPosts/" +
      id +
      "?page=" +
      page +
      "&limit=" +
      limit +
      "&userId=" +
      userId
  );
};
export const getAddPostUrl = () => {
  return encodeURI("post");
};
export const getAddStoryUrl = () => {
  return encodeURI("story");
};
export const getViewedStoriesUrl = (userId, storyId) => {
  return encodeURI("viewed-story?userId=" + userId + "&storyId=" + storyId);
};
export const getStoriesUrl = (userId) => {
  return encodeURI("story?userId=" + userId);
};
export const getPostUrl = () => {
  return encodeURI("post");
};
export const getLikeUrl = () => {
  return encodeURI("likes");
};
