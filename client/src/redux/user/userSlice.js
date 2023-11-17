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
    // reducers for signing purposes
    signInStarted: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // reducers for update purposes
    UpdateUserStarted: (state) => {
      state.loading = true;
    },
    UpdateUserSucces: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    UpdateUserFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // reducers for delete purposes
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOutStart: (state) => {
      state.loading = true;
    },
    signOutSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    signOutFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  signInStarted,
  signInSuccess,
  signInFailure,
  UpdateUserFail,
  UpdateUserStarted,
  UpdateUserSucces,
  deleteUserStart,
  deleteUserFail,
  deleteUserSuccess,
  signOutFail,
  signOutStart,
  signOutSuccess,
} = userSlice.actions;

export default userSlice.reducer;
