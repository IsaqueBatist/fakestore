import type { RootState } from "../store";

export const selectIsLoggedIn = (state: RootState) => state.authReducer.isLoggedIn;
export const selectAuthLoading = (state: RootState) => state.authReducer.isLoading;
export const selectauthReducerError = (state: RootState) => state.authReducer.error;
export const selectToken = (state: RootState) => state.authReducer.token;
export const selectUser = (state: RootState) =>state.authReducer.user;