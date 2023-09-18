import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks'
import { fetchUnLikeArticle, fetchLikeArticle, fetchArticlesGet, fetchArticleGet } from '../../redux/articlesActions'
import { Article } from '../Article'
import { IArticle } from '../../model/IArticle'

export const ArticlePage = () => {
  const { article, offset } = useAppSelector((state) => state.articlesReducer)
  const { user } = useAppSelector((state) => state.userReducer)
  const dispatch = useAppDispatch()

  const { slug } = useParams()

  useEffect(() => {
    if (slug) dispatch(fetchArticleGet({ slug: slug, token: user?.token }))
  }, [dispatch, slug, user?.token])

  const onClickLike = async (article: IArticle) => {
    if (user) {
      const callback = article.favorited ? fetchUnLikeArticle : fetchLikeArticle
      await dispatch(callback({ ...article, ...{ token: user.token } })).then(() => {
        dispatch(fetchArticlesGet({ ...article, ...{ token: user.token }, ...{ offset: offset } }))
      })
    }
  }

  if (!article) {
    return null
  }

  return <Article item={article as IArticle} markdown onClickLike={() => onClickLike(article)} />
}
