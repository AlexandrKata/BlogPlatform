import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface Props {
  token?: string
}

export const createNewUser = async (props: Props) => {
  const user = await axios.post('https://blog.kata.academy/api/users', {
    user: props,
  })
  return user.data.user
}

export const onLoginUser = async (props: Props) => {
  const login = await axios.post('https://blog.kata.academy/api/users/login', {
    user: props,
  })

  return login.data
}

export const updateUser = async (props: Props) => {
  const update = await axios.put(
    'https://blog.kata.academy/api/user',
    {
      user: props,
    },
    { headers: { Authorization: `Bearer ${props.token}` } }
  )
  return update.data
}

export const fetchCreateUsersPost = createAsyncThunk('user/fetchCreateUsersPost', createNewUser)
export const fetchLoginPost = createAsyncThunk('user/fetchLoginPost', onLoginUser)
export const fetchUpdateUserPut = createAsyncThunk('user/fetchUpdateUserPut', updateUser)
