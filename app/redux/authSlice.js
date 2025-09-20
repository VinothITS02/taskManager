
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
  isLoggedIn: false,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
        console.log("inside the action")
      const { token, user } = action.payload;
        console.log("inside the action",action.payload)
      state.token = token ?? null;
      state.user = user ?? null;
      state.isLoggedIn = !!token;
    },
    clearCredentials(state) {
      state.token = null;
      state.user = null;
      state.isLoggedIn = false;
    },
    setLoading(state, action) {
      state.loading = !!action.payload;
    },
  },
});

export const { setCredentials, clearCredentials, setLoading } = authSlice.actions;
export default authSlice.reducer;
