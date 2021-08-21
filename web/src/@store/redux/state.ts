import { Favourite } from "@models/Favourite";
import { Story } from "@models/Story";
import { User } from "@models/User";
import { Post } from "@models/Post";
import { Comment } from "@models/Comment";
import { Like } from "@models/Like";

export {};
declare global {
  interface AuthState {
    user: User;
    postsCount?: any;
    followingList?: any;
    followersList?: any;
    alreadyFollowing?: String;
    loading?: boolean;
  }
  interface ModalsState {
    addPostModal: any;
    commentsModal: any;
    addNewContact: any;
    newCallAlert: any;
  }
  interface CommentState {
    comment: Comment;
    loading?: boolean;
  }
  interface FollowUnFollowState {
    followingList?: any;
    message: String;
    loading?: boolean;
  }
  interface SearchState {
    users: any[];
    loading?: boolean;
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
    favourite: Favourite;
    loading?: boolean;
  }
  interface MessagesState {
    contacts: any[];
    messages: any[];
    loading?: boolean;
  }
  interface UserProfileState {
    userProfile: User;
    profilePosts: Post[];
    loading?: boolean;
    otherUserFoodAndI: boolean;
    postsCount?: any;
    postsLoading?: boolean;
    followingList?: String;
    followersList?: String;
    alreadyFollowing?: String;
  }
}
