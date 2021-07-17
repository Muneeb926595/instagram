import { combineReducers } from "redux";

import auth from "../auth/AuthReducers";
import modals from "../modals/ModalsReducers";
import like from "../like/LikeReducer";
import stories from "../stories/StoriesReducers";
import post from "../post/PostReducers";

const Foodbook = combineReducers({
  auth,
  modals,
  post,
  like,
  stories,
});

export default Foodbook;
