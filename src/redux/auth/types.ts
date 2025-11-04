import type { UserJWT } from "../../types/user";

export interface AuthState {
  isLoggedIn: boolean,
  token: string | null,
  user: UserJWT | null,
  isLoading: boolean,
  error: string | null
}