import { User } from "@models/User";
import { Post } from "@models/Post";
import { Story } from "@models/Story";
import { Like } from "@models/Like";

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
  interface StoriesState {
    stories: Story[];
    myStories: Story[];
    loading?: boolean;
  }
  interface LikeState {
    like: Like;
    loading?: boolean;
  }
}
