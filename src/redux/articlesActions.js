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

const postArticle = async (values, { rejectWithValue }) => {
  try {
    const article = await axios.post(
      'https://blog.kata.academy/api/articles',
      {
        article: {
          title: values.title,
          description: values.description,
          body: values.body,
          tagList: values.tagList,
        },
      },
      { headers: { Authorization: `Bearer ${values.token}` } }
    );
    return article.data;
  } catch (e) {
    return rejectWithValue(e);
  }
};

const putArticle = async (values, { rejectWithValue }) => {
  try {
    const article = await axios.put(
      `https://blog.kata.academy/api/articles/${values.slug}`,
      {
        article: {
          title: values.title,
          description: values.description,
          body: values.body,
          tagList: values.tagList,
        },
      },
      { headers: { Authorization: `Bearer ${values.token}` } }
    );
    return article.data;
  } catch (e) {
    return rejectWithValue(e.response);
  }
};

const deleteArticle = async (values, { rejectWithValue }) => {
  try {
    const article = await axios.delete(`https://blog.kata.academy/api/articles/${values.slug}`, {
      headers: { Authorization: `Bearer ${values.token}` },
    });
    return article.data;
  } catch (e) {
    return rejectWithValue(e.response);
  }
};

export const fetchArticlesGet = createAsyncThunk('articles/fetchArticlesGet', getArticles);
export const fetchArticleGet = createAsyncThunk('articles/fetchArticleGet', getArticle);
export const fetchArticlePost = createAsyncThunk('articles/fetchArticlePost', postArticle);
export const fetchArticlePut = createAsyncThunk('articles/fetchArticlePut', putArticle);
export const fetchArticleDelete = createAsyncThunk('articles/fetchArticleDelete', deleteArticle);
