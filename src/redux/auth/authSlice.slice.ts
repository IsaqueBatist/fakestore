import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthState } from "./types";
import { loginUser } from './authThunks.thunk'
import type { UserJWT } from "../../types/user";
import { Utils } from "../../utils";

const token = localStorage.getItem('authToken');
let user: UserJWT | null = null;

if(token){
  user = Utils.jwtUtils.decodeJWT();
}

const initialState: AuthState = {
  isLoggedIn: token? true : false,
  token: token || null, 
  user: user ? user : null,
  isLoading: false,
  error: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem('authToken');
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(loginUser.fulfilled, (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.token = action.payload;
    })
    .addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || 'Erro não definido'
    })
  }
})

export const { logout } = authSlice.actions;

export default authSlice.reducer