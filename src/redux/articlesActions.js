import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getArticles = async (offset = 0, { rejectWithValue }) => {
  try {
    const articles = await axios.get(`https://blog.kata.academy/api/articles?limit=5&offset=${offset}`);
    return articles.data;
  } catch (e) {
    return rejectWithValue(e);
  }
};

const getArticle = async (slug, { rejectWithValue }) => {
  try {
    const article = await axios.get(`https://blog.kata.academy/api/articles/${slug}`);
    return article.data;
  } catch (e) {
    return rejectWithValue(e.response);
  }
};

export const fetchArticles = createAsyncThunk('articles/fetchArticles', getArticles);
export const fetchArticle = createAsyncThunk('articles/fetchArticle', getArticle);
