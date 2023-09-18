import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { IArticle } from '../model/IArticle'

import {
  fetchArticleGet,
  fetchArticlesGet,
  fetchArticlePost,
  fetchArticleDelete,
  fetchArticlePut,
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
  error: string[] | undefined
  loading: boolean
  isRegistered: boolean
}

const initialState: IinitialState = {
  articles: [],
  article: null,
  page: 1,
  totalPages: 1,
  offset: 0,
  error: undefined,
  loading: true,
  isRegistered: false,
}

export const articlesSlice = createSlice({
  initialState,
  name: 'articles',
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
      state.offset = action.payload * 5 - 5
    },
    clearError: (state) => {
      state.article = null
      state.error = undefined
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesGet.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchArticlesGet.fulfilled, (state, action) => {
        state.articles = action.payload.articles
        state.totalPages = Math.floor(action.payload.articlesCount / 5)
        state.loading = false
      })
      .addCase(fetchArticlesGet.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(fetchArticleGet.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchArticleGet.fulfilled, (state, action) => {
        state.loading = false
        state.article = action.payload
        if (state.article) {
          state.error = undefined
        }
      })
      .addCase(fetchArticleGet.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(fetchArticlePost.fulfilled, (state, action) => {
        state.article = action.payload
      })
      .addCase(fetchArticlePost.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(fetchArticleDelete.fulfilled, (state) => {
        state.article = null
      })
      .addCase(fetchArticleDelete.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(fetchArticlePut.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(fetchLikeArticle.fulfilled, (state, action) => {
        state.article = action.payload
      })
      .addCase(fetchLikeArticle.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(fetchUnLikeArticle.fulfilled, (state, action) => {
        state.article = action.payload
      })
      .addCase(fetchUnLikeArticle.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(fetchCreateUsersPost.fulfilled, (state) => {
        state.isRegistered = false
      })
      .addCase(fetchCreateUsersPost.rejected, (state, action) => {
        if (action.error.message === 'Request failed with status code 422') {
          state.isRegistered = true
        }
      })
  },
})

export const { setPage, clearError } = articlesSlice.actions

export const articlesReducer = articlesSlice.reducer
