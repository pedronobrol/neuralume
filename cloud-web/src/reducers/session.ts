/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { AuthToken } from "../api/auth/schema";
import {
  saveAuthToken,
  getAuthToken,
  clearAuthToken,
} from "../api/auth/storage";

export interface SessionState {
  authToken: AuthToken | null;
}

const initialState: SessionState = { authToken: getAuthToken() };

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    loadSession(state, action) {
      const { token, refreshToken } = action.payload;
      state.authToken = { token, refreshToken };
      saveAuthToken({ token, refreshToken });
    },
    deleteSession(state) {
      state.authToken = null;
      clearAuthToken();
    },
  },
});

export const { loadSession, deleteSession } = sessionSlice.actions;

export default sessionSlice.reducer;
