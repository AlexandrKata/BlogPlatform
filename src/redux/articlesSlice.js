import { createSlice } from '@reduxjs/toolkit';

import { fetchArticle, fetchArticles } from './articlesActions';

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
      state.error = null;
    },
  },
  extraReducers: {
    [fetchArticles.pending]: (state) => {
      state.loading = true;
    },
    [fetchArticles.fulfilled]: (state, action) => {
      state.articles = action.payload.articles;
      state.totalPages = Math.floor(action.payload.articlesCount / 5);
      state.loading = false;
    },
    [fetchArticles.rejected]: (state, action) => {
      state.loading = false;
      state.error = {
        data: action.payload.message,
        status: action.payload.code,
      };
    },

    [fetchArticle.pending]: (state) => {
      state.loading = true;
    },
    [fetchArticle.fulfilled]: (state, action) => {
      state.loading = false;
      state.article = action.payload.article;
      if (state.article) {
        state.error = null;
      }
    },
    [fetchArticle.rejected]: (state, action) => {
      state.loading = false;
      state.error = {
        data: action.payload.data,
        status: action.payload.status,
      };
    },
  },
});

export const { setPage, clearError } = articlesSlice.actions;

export const articlesReducer = articlesSlice.reducer;
