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
export const getFollowUnFollowUrl = () => {
  return encodeURI("followUnFollow");
};
export const getUserFollowingsUrl = (id) => {
  return encodeURI("followings/" + id);
};
export const getRemoveFollowerFollowingUrl = () => {
  return encodeURI("removeFollowerFollowing");
};

export const getSearchUrl = (searchText) => {
  return encodeURI("search?searchText=" + searchText);
};
export const getAddToFavouriteUrl = () => {
  return encodeURI("favourites");
};
export const getFavouritesUrl = (userId) => {
  return encodeURI("favourites/" + userId);
};
export const addCommentUrl = () => {
  return encodeURI("comments");
};
export const getCommentUrl = (id) => {
  return encodeURI("comments/" + id);
};
export const getContactsUrl = (userId) => {
  return encodeURI("contacts/" + userId);
};
export const getUserMessagesUrl = (userId, participentId, page, limit) => {
  return encodeURI(
    "userMessages?userId=" +
      userId +
      "&participentId=" +
      participentId +
      "&page=" +
      page +
      "&limit=" +
      limit
  );
};
export const seenAllMessagesUrl = () => {
  return encodeURI("seen-all-messages");
};
export const getNotificationsUrl = (userId) => {
  return encodeURI("notification?userId=" + userId);
};
export const getReadNotificationUrl = (id) => {
  return encodeURI("notification/" + id);
};
export const deleteNotificationUrl = (id) => {
  return encodeURI("delete-notification/" + id);
};
