import { createSlice } from '@reduxjs/toolkit'

import { IUser } from '../model/IUser'
import { loadLocalStorage, setLocalStorage, clearLocalStorage } from '../localStorage/localStorage'

import { fetchLoginPost, fetchCreateUsersPost } from './userActions'

interface IinitialState {
  user?: IUser
  isAgree: boolean
  loginErrors: { email: string; password: string }
}

const initialState: IinitialState = {
  isAgree: false,
  loginErrors: { email: '', password: '' },
  user: loadLocalStorage('user') ?? undefined,
}

const userSlice = createSlice({
  initialState,
  name: 'users',
  reducers: {
    logOut: (state) => {
      state.user = undefined
      clearLocalStorage('user')
    },
    onIsAgree: (state, action) => {
      state.isAgree = !action.payload
    },
    updateUser: (state, action) => {
      state.user = action.payload
      setLocalStorage('user', action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoginPost.fulfilled, (state, action) => {
        state.user = action.payload
        state.loginErrors = { email: '', password: '' }
        setLocalStorage('user', action.payload)
      })
      .addCase(fetchLoginPost.rejected, (state, action) => {
        if (action.payload?.message === 'Request failed with status code 422') {
          state.loginErrors.email = 'email address or password is not correct'
          state.loginErrors.password = 'email address or password is not correct'
        }
      })

      .addCase(fetchCreateUsersPost.fulfilled, (state, action) => {
        state.user = action.payload
        setLocalStorage('user', action.payload)
      })
  },
})

export const { logOut, onIsAgree, updateUser } = userSlice.actions
export const userReducer = userSlice.reducer
