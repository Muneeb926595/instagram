import { User } from "@models/User";
import { Post } from "@models/Post";

export {};
declare global {
  interface AuthState {
    user: User;
    loading?: boolean;
  }  
  interface ModalsState {
    addPostModal: any;
  } 
   interface PostState {
    posts: Post[];
    loading?: boolean;
  }
}
