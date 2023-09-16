import { createSlice } from '@reduxjs/toolkit';

import { loadLocalStorage, setLocalStorage, clearLocalStorage } from '../localStorage/localStorage';

import { fetchLoginPost, fetchCreateUsersPost } from './userActions';

const initialState = {
  isAgree: false,
  loginErrors: { email: '', password: '' },
  user: loadLocalStorage('user') ?? undefined,
};

const userSlice = createSlice({
  initialState,
  name: 'users',
  reducers: {
    logOut: (state) => {
      state.user = undefined;
      clearLocalStorage('user');
    },
    onIsAgree: (state, action) => {
      state.isAgree = !action.payload;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
      setLocalStorage('user', action.payload);
    },
  },
  extraReducers: {
    [fetchLoginPost.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      state.loginErrors = initialState;
      setLocalStorage('user', action.payload.user);
    },

    [fetchLoginPost.rejected]: (state, action) => {
      state.loginErrors.email = action.payload.data.errors['email or password'];
      state.loginErrors.password = action.payload.data.errors['email or password'];
    },

    [fetchCreateUsersPost.fulfilled]: (state, action) => {
      state.user = action.payload.user;
      setLocalStorage('user', action.payload.user);
    },
  },
});

export const { logOut, onIsAgree, updateUser, addTag, deleteTag, nextId } = userSlice.actions;
export const userReducer = userSlice.reducer;
