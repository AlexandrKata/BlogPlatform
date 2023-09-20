import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { IError } from '../model/IError'
import { IUser } from '../model/IUser'

interface Props {
  token?: string
}

export const fetchCreateUsersPost = createAsyncThunk<IUser, Props, { rejectValue: IError }>(
  'user/fetchCreateUsersPost',
  async function (props, { rejectWithValue }) {
    try {
      const response = await axios.post('https://blog.kata.academy/api/users', {
        user: props,
      })
      return response.data.user
    } catch (e) {
      return rejectWithValue({ message: (e as Error).message.toString(), name: (e as Error).name.toString() })
    }
  }
)

export const fetchLoginPost = createAsyncThunk<IUser, Props, { rejectValue: IError }>(
  'user/fetchLoginPost',
  async function (props, { rejectWithValue }) {
    try {
      const response = await axios.post('https://blog.kata.academy/api/users/login', {
        user: props,
      })
      return response.data.user
    } catch (e) {
      return rejectWithValue({ message: (e as Error).message.toString(), name: (e as Error).name.toString() })
    }
  }
)

export const fetchUpdateUserPut = createAsyncThunk<IUser, Props, { rejectValue: IError }>(
  'user/fetchUpdateUserPut',
  async function (props, { rejectWithValue }) {
    try {
      const response = await axios.put(
        'https://blog.kata.academy/api/user',
        {
          user: props,
        },
        { headers: { Authorization: `Bearer ${props.token}` } }
      )
      return response.data
    } catch (e) {
      return rejectWithValue({ message: (e as Error).message.toString(), name: (e as Error).name.toString() })
    }
  }
)
