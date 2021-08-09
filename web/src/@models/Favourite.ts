import {User} from './User';

export interface Favourite {
  _id?: string;
  userId?: User;
  postId?: string;
  postType?: string;
  favourite?: boolean;
}
