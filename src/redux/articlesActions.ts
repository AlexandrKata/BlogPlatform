import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { IArticle } from '../model/IArticle'
import { IArticles } from '../model/IArticles'

interface Props {
  offset?: number
  token?: string
  slug?: string
}

export const fetchArticlesGet = createAsyncThunk<IArticles, Props, { rejectValue: string[] }>(
  'articles/fetchArticlesGet',
  async function (props, { rejectWithValue }) {
    try {
      const response = await axios.get(`https://blog.kata.academy/api/articles?limit=5&offset=${props.offset}`, {
        headers: { Authorization: `Bearer ${props.token}` },
      })
      return response.data
    } catch (e) {
      return rejectWithValue([(e as Error).message, (e as Error).name])
    }
  }
)

export const fetchArticleGet = createAsyncThunk<IArticle, Props, { rejectValue: string[] }>(
  'articles/fetchArticleGet',
  async function (props, { rejectWithValue }) {
    try {
      const response = await axios.get(`https://blog.kata.academy/api/articles/${props.slug}`, {
        headers: { Authorization: `Bearer ${props.token}` },
      })
      return response.data.article
    } catch (e) {
      return rejectWithValue([(e as Error).message, (e as Error).name])
    }
  }
)

export const fetchArticlePost = createAsyncThunk<IArticle, Props, { rejectValue: string[] }>(
  'articles/fetchArticlePost',
  async function (props, { rejectWithValue }) {
    try {
      const response = await axios.post(
        'https://blog.kata.academy/api/articles',
        {
          article: props,
        },
        { headers: { Authorization: `Bearer ${props.token}` } }
      )
      return response.data.article
    } catch (e) {
      return rejectWithValue([(e as Error).message, (e as Error).name])
    }
  }
)

export const fetchArticleDelete = createAsyncThunk<unknown, Props, { rejectValue: string[] }>(
  'articles/fetchArticleDelete',
  async function (props, { rejectWithValue }) {
    try {
      const response = await axios.delete(`https://blog.kata.academy/api/articles/${props.slug}`, {
        headers: { Authorization: `Bearer ${props.token}` },
      })
      return response.data
    } catch (e) {
      return rejectWithValue([(e as Error).message, (e as Error).name])
    }
  }
)

export const fetchArticlePut = createAsyncThunk<IArticle, Props, { rejectValue: string[] }>(
  'articles/fetchArticlePut',
  async function (props, { rejectWithValue }) {
    try {
      const response = await axios.put(
        `https://blog.kata.academy/api/articles/${props.slug}`,
        {
          article: props,
        },
        { headers: { Authorization: `Bearer ${props.token}` } }
      )
      return response.data
    } catch (e) {
      return rejectWithValue([(e as Error).message, (e as Error).name])
    }
  }
)

export const fetchLikeArticle = createAsyncThunk<IArticle, Props, { rejectValue: string[] }>(
  'articles/fetchLikeArticle',
  async function (props, { rejectWithValue }) {
    try {
      const response = await axios.post(
        `https://blog.kata.academy/api/articles/${props.slug}/favorite`,
        { props },
        {
          headers: { Authorization: `Bearer ${props.token}` },
        }
      )
      return response.data.article
    } catch (e) {
      return rejectWithValue([(e as Error).message, (e as Error).name])
    }
  }
)

export const fetchUnLikeArticle = createAsyncThunk<IArticle, Props, { rejectValue: string[] }>(
  'articles/fetchUnLikeArticle',
  async function (props, { rejectWithValue }) {
    try {
      const response = await axios.delete(`https://blog.kata.academy/api/articles/${props.slug}/favorite`, {
        headers: { Authorization: `Bearer ${props.token}` },
      })
      return response.data.article
    } catch (e) {
      return rejectWithValue([(e as Error).message, (e as Error).name])
    }
  }
)
