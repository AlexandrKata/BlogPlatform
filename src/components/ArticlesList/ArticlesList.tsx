import { useAppDispatch, useAppSelector } from '../../hooks'
import { IArticle } from '../../model/IArticle'
import { Article } from '../Article'
import { Pagination_ } from '../Pagination_'
import { fetchUnLikeArticle, fetchLikeArticle, fetchArticlesGet } from '../../redux/articlesActions'

export const ArticlesList = () => {
  const { articles, offset } = useAppSelector((state) => state.articlesReducer)
  const { user } = useAppSelector((state) => state.userReducer)
  const dispatch = useAppDispatch()

  const onClickLike = async (article: IArticle) => {
    if (user) {
      const callback = article.favorited ? fetchUnLikeArticle : fetchLikeArticle
      await dispatch(callback({ ...article, ...{ token: user.token } })).then(() => {
        dispatch(fetchArticlesGet({ ...article, ...{ token: user.token }, ...{ offset: offset } }))
      })
    }
  }

  return (
    <>
      <div>
        {articles.map((item) => (
          <Article key={item.slug} item={item} onClickLike={() => onClickLike(item)} />
        ))}
      </div>
      <Pagination_ />
    </>
  )
}
