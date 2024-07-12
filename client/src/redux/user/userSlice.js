import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInUserStart: (state) => {
      state.loading = true;
    },
    signInUserFail: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
    signInUserSuccess: (state, action) => {
      (state.loading = false),
        (state.currentUser = action.payload),
        (state.error = null);
    },
    signOutStart: (state) => {
      state.loading = true;
    },
    signOutSuccess: (state) => {
      (state.loading = false), (state.currentUser = null), (state.error = null);
    },
    signOutFail: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserFail: (state, action) => {
      state.loading = false, 
      state.error = action.payload;
    },
    updateUserSuccess: (state, action) => {
      state.loading = false,
      state.currentUser = action.payload,
      state.error = null;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    },
    deleteUserFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  signInUserStart,
  signInUserFail,
  signInUserSuccess,
  signOutFail,
  signOutStart,
  signOutSuccess,
  updateUserFail,
  updateUserSuccess,
  updateUserStart,
  deleteUserFail,
  deleteUserStart,
  deleteUserSuccess
} = userSlice.actions;
export default userSlice.reducer;
