import { User } from "./User";

export interface Post {
  _id?: String;
  userId?: User;
  name?: String;
  likes?: any;
  time?: String;
  mediaFiles?: [{ type: String }];
  history?: any;
}
