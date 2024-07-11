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
        state.loading = false, 
        state.error = action.payload;
    },
    signInUserSuccess: (state, action) => {
        state.loading = false,
        state.currentUser = action.payload,
        state.error = null;
    },
    signOutStart:(state) =>{
        state.loading = true;
    },
    signOutSuccess : (state) => {
        state.loading = false,
        state.currentUser = null,
        state.error = null;
    },
    signOutFail : (state, action) => {
        state.loading = false,
        state.error = action.payload;
    }
  },
});

export const { signInUserStart, signInUserFail, signInUserSuccess, signOutFail, signOutStart, signOutSuccess } =
  userSlice.actions;
export default userSlice.reducer;
