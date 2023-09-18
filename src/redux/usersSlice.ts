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
        console.log(state, action)
        // state.loginErrors.email = action.payload.data.errors['email or password']
        // state.loginErrors.password = action.payload.data.errors['email or password']
      })

      .addCase(fetchCreateUsersPost.fulfilled, (state, action) => {
        state.user = action.payload
        setLocalStorage('user', action.payload)
      })
  },
})

export const { logOut, onIsAgree, updateUser } = userSlice.actions
export const userReducer = userSlice.reducer
