import { combineReducers } from "redux";

import auth from "../auth/AuthReducers";
import modals from "../modals/ModalsReducers";

const Foodbook = combineReducers({
  auth,
  modals
});

export default Foodbook;
