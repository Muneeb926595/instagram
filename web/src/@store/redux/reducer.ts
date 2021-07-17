import { combineReducers } from "redux";

import auth from "../auth/AuthReducers";
import modals from "../modals/ModalsReducers";
import stories from "../stories/StoriesReducers";
import post from "../post/PostReducers";

const Foodbook = combineReducers({
  auth,
  modals,
  post,
  stories,
});

export default Foodbook;
