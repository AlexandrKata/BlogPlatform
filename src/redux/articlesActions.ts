import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

interface Props {
  offset?: number
  token?: string
  slug?: string
}

const getArticles = async (props: Props) => {
  const articles = await axios.get(`https://blog.kata.academy/api/articles?limit=5&offset=${props.offset}`, {
    headers: { Authorization: `Bearer ${props.token}` },
  })
  return articles.data
}

const getArticle = async (props: Props) => {
  const article = await axios.get(`https://blog.kata.academy/api/articles/${props.slug}`, {
    headers: { Authorization: `Bearer ${props.token}` },
  })
  return article.data
}

const postArticle = async (props: Props) => {
  const article = await axios.post(
    'https://blog.kata.academy/api/articles',
    {
      article: props,
    },
    { headers: { Authorization: `Bearer ${props.token}` } }
  )
  return article.data
}

const putArticle = async (props: Props) => {
  const article = await axios.put(
    `https://blog.kata.academy/api/articles/${props.slug}`,
    {
      article: props,
    },
    { headers: { Authorization: `Bearer ${props.token}` } }
  )
  return article.data
}

const deleteArticle = async (props: Props) => {
  const article = await axios.delete(`https://blog.kata.academy/api/articles/${props.slug}`, {
    headers: { Authorization: `Bearer ${props.token}` },
  })
  return article.data
}

export const likeArticle = async (props: Props) => {
  const like = await axios.post(
    `https://blog.kata.academy/api/articles/${props.slug}/favorite`,
    { props },
    {
      headers: { Authorization: `Bearer ${props.token}` },
    }
  )
  return like.data
}

export const unLikeArticle = async (props: Props) => {
  const like = await axios.delete(`https://blog.kata.academy/api/articles/${props.slug}/favorite`, {
    headers: { Authorization: `Bearer ${props.token}` },
  })
  return like.data
}

export const fetchArticlesGet = createAsyncThunk('articles/fetchArticlesGet', getArticles)
export const fetchArticleGet = createAsyncThunk('articles/fetchArticleGet', getArticle)
export const fetchArticlePost = createAsyncThunk('articles/fetchArticlePost', postArticle)
export const fetchArticlePut = createAsyncThunk('articles/fetchArticlePut', putArticle)
export const fetchArticleDelete = createAsyncThunk('articles/fetchArticleDelete', deleteArticle)
export const fetchLikeArticle = createAsyncThunk('articles/fetchLikeArticle', likeArticle)
export const fetchUnLikeArticle = createAsyncThunk('articles/fetchUnLikeArticle', unLikeArticle)
