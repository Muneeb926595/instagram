import { combineReducers } from "redux";

import auth from "../auth/AuthReducers";
import modals from "../modals/ModalsReducers";
import like from "../like/LikeReducer";
import comment from "../comments/CommentReducer";
import stories from "../stories/StoriesReducers";
import userProfile from "../userProfile/UserProfileReducers";
import search from "../search/SearchReducers";
import post from "../post/PostReducers";
import follow from "../followers/FollowersReducers";

const Foodbook = combineReducers({
  auth,
  modals,
  follow,
  post,
  like,
  comment,
  search,
  stories,
  userProfile,
});

export default Foodbook;
