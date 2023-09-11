import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createNewUser = async (values, { rejectWithValue }) => {
  try {
    const user = await axios.post('https://blog.kata.academy/api/users', {
      user: {
        email: values.email,
        username: values.username,
        password: values.password,
      },
    });
    return user.data;
  } catch (e) {
    return rejectWithValue(e.response);
  }
};

export const onLoginUser = async (values, { rejectWithValue }) => {
  try {
    const login = await axios.post('https://blog.kata.academy/api/users/login', {
      user: {
        email: values.email,
        password: values.password,
      },
    });

    return login.data;
  } catch (e) {
    return rejectWithValue(e.response);
  }
};

export const updateUser = async (values, { rejectWithValue }) => {
  try {
    const update = await axios.put(
      'https://blog.kata.academy/api/user',
      {
        user: {
          username: values.username,
          email: values.email,
          password: values.password,
          image: values.image,
        },
      },
      { headers: { Authorization: `Bearer ${values.token}` } }
    );
    return update.data;
  } catch (e) {
    return rejectWithValue(e.response);
  }
};

export const fetchCreateUsersPost = createAsyncThunk('user/fetchCreateUsersPost', createNewUser);
export const fetchLoginPost = createAsyncThunk('user/fetchLoginPost', onLoginUser);
export const fetchUpdateUserPut = createAsyncThunk('user/fetchUpdateUserPut', updateUser);
