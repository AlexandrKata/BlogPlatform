import { createSlice } from '@reduxjs/toolkit'

import { IArticle } from '../model/IArticle'

import {
  fetchArticleGet,
  fetchArticlesGet,
  fetchArticlePost,
  fetchArticleDelete,
  fetchLikeArticle,
  fetchUnLikeArticle,
} from './articlesActions'
import { fetchCreateUsersPost } from './userActions'

export interface IinitialState {
  articles: IArticle[]
  article: IArticle | null
  page: number
  totalPages: number
  offset: number
  error: { data: string; name: string } | null
  loading: boolean
  isRegistered: boolean
}

const initialState: IinitialState = {
  articles: [],
  article: null,
  page: 1,
  totalPages: 1,
  offset: 0,
  error: null,
  loading: true,
  isRegistered: false,
}

export const articlesSlice = createSlice({
  initialState,
  name: 'articles',
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload
      state.offset = action.payload * 5 - 5
    },
    clearError: (state) => {
      state.article = null
      state.error = null
    },
  },
  extraReducers: {
    [fetchArticlesGet.pending.type]: (state) => {
      state.loading = true
    },
    [fetchArticlesGet.fulfilled.type]: (state, action) => {
      state.articles = action.payload.articles
      state.totalPages = Math.floor(action.payload.articlesCount / 5)
      state.loading = false
    },
    [fetchArticlesGet.rejected.type]: (state, action) => {
      state.loading = false
      state.error = {
        data: action.error.message,
        name: action.error.name,
      }
    },

    [fetchArticleGet.pending.type]: (state) => {
      state.loading = true
    },
    [fetchArticleGet.fulfilled.type]: (state, action) => {
      state.loading = false
      state.article = action.payload.article
      if (state.article) {
        state.error = null
      }
    },
    [fetchArticleGet.rejected.type]: (state, action) => {
      state.loading = false
      state.error = {
        data: action.error.message,
        name: action.error.name,
      }
    },

    [fetchArticlePost.fulfilled.type]: (state, action) => {
      state.article = action.payload.article
    },
    [fetchArticlePost.rejected.type]: (state, action) => {
      state.error = {
        data: action.error.message,
        name: action.error.name,
      }
    },

    [fetchArticleDelete.fulfilled.type]: (state) => {
      state.article = null
    },
    [fetchArticleDelete.rejected.type]: (state, action) => {
      state.error = {
        data: action.error.message,
        name: action.error.name,
      }
    },

    [fetchLikeArticle.fulfilled.type]: (state, action) => {
      state.article = action.payload.article
    },
    [fetchLikeArticle.rejected.type]: (state, action) => {
      state.error = {
        data: action.error.message,
        name: action.error.name,
      }
    },

    [fetchUnLikeArticle.fulfilled.type]: (state, action) => {
      state.article = action.payload.article
    },
    [fetchUnLikeArticle.rejected.type]: (state, action) => {
      state.error = {
        data: action.error.message,
        name: action.error.name,
      }
    },

    [fetchCreateUsersPost.fulfilled.type]: (state) => {
      state.isRegistered = false
    },
    [fetchCreateUsersPost.rejected.type]: (state, action) => {
      if (action.error.message === 'Request failed with status code 422') {
        state.isRegistered = true
      }
    },
  },
})

export const { setPage, clearError } = articlesSlice.actions

export const articlesReducer = articlesSlice.reducer
