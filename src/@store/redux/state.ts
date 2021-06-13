import { User } from "@models/User";

export {};
declare global {
  interface AuthState {
    user: User;
    loading?: boolean;
  }
}
