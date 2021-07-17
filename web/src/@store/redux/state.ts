import { User } from "@models/User";
import { Post } from "@models/Post";
import { Story } from "@models/Story";

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
}
