import { User } from "./User";

export interface Like {
  _id?: string;
  userId?: User;
  postId?: string;
  like?: boolean;
}
