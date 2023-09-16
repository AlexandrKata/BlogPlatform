import { createSlice } from '@reduxjs/toolkit';

import { fetchArticleGet, fetchArticlesGet, fetchArticlePost, fetchArticleDelete } from './articlesActions';

const initialState = {
  articles: [],
  article: null,
  page: 1,
  totalPages: 1,
  offset: 0,
  error: null,
  loading: true,
};

export const articlesSlice = createSlice({
  initialState,
  name: 'articles',
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
      state.offset = action.payload * 5 - 5;
    },
    clearError: (state) => {
      state.article = null;
      state.error = null;
    },
  },
  extraReducers: {
    [fetchArticlesGet.pending]: (state) => {
      state.loading = true;
    },
    [fetchArticlesGet.fulfilled]: (state, action) => {
      state.articles = action.payload.articles;
      state.totalPages = Math.floor(action.payload.articlesCount / 5);
      state.loading = false;
    },
    [fetchArticlesGet.rejected]: (state, action) => {
      state.loading = false;
      state.error = {
        data: action.payload.message,
        status: action.payload.code,
      };
    },

    [fetchArticleGet.pending]: (state) => {
      state.loading = true;
    },
    [fetchArticleGet.fulfilled]: (state, action) => {
      state.loading = false;
      state.article = action.payload.article;
      if (state.article) {
        state.error = null;
      }
    },
    [fetchArticleGet.rejected]: (state, action) => {
      state.loading = false;
      state.error = {
        data: action.payload.data,
        status: action.payload.status,
      };
    },

    [fetchArticlePost.fulfilled]: (state, action) => {
      state.article = action.payload.article;
    },
    [fetchArticlePost.rejected]: (state, action) => {
      state.error = {
        data: action.payload.data,
        status: action.payload.status,
      };
    },

    [fetchArticleDelete.fulfilled]: (state) => {
      state.article = null;
    },
    [fetchArticleDelete.rejected]: (state, action) => {
      state.error = {
        data: action.payload.data,
        status: action.payload.status,
      };
    },
  },
});

export const { setPage, clearError } = articlesSlice.actions;

export const articlesReducer = articlesSlice.reducer;
