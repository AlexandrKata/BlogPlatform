import { format } from 'date-fns'
import { Link, useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { Popconfirm } from 'antd'

import { useAppDispatch, useAppSelector } from '../../hooks'
import { fetchArticleDelete, fetchArticlesGet } from '../../redux/articlesActions'
import plug from '../../img/avatar.png'
import { TagList } from '../TagList'
import { IArticle } from '../../model/IArticle'

import classes from './Article.module.scss'

interface Props {
  item: IArticle
  markdown?: boolean
  onClickLike?: any
}

export const Article = ({ item, markdown = false, onClickLike = undefined }: Props) => {
  const { article } = useAppSelector((state) => state.articlesReducer)
  const { user } = useAppSelector((state) => state.userReducer)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const formatDate = (date: any) => {
    try {
      return format(new Date(date), 'MMMM dd, yyyy')
    } catch (e) {
      return '-'
    }
  }

  const onClickDelete = async () => {
    dispatch(fetchArticleDelete({ slug: article?.slug, token: user?.token })).then(() => {
      dispatch(fetchArticlesGet({ offset: 0, token: user?.token }))
      navigate('/')
    })
  }

  return (
    <>
      <article className={classes.article}>
        <header className={classes.article__header}>
          <div className={classes.article__wrapperTitle}>
            <div className={classes.article__title}>
              <Link to={`/articles/${item.slug}`}>{item.title}</Link>
              <div className={classes.article__wrapperLikes}>
                <button
                  className={
                    user
                      ? !item?.favorited
                        ? classes.article__btnLikeUser
                        : [classes.article__btnLikeUser, classes.article__btnLikeUser__active].join(' ')
                      : classes.article__btnLikeUnUser
                  }
                  onClick={onClickLike}
                  type="button"
                ></button>
                <span className={classes.article__likes}>{item.favoritesCount}</span>
              </div>
            </div>
            <TagList tagList={item.tagList} />
          </div>
          <div className={classes.article__wrapperAuthor}>
            <div className={classes.article__author}>
              <div className={classes.article__author__name}>{item.author.username}</div>
              <div className={classes.article__author__date}>{formatDate(item.createdAt)} </div>
            </div>
            <img src={item.author.image ? item.author.image : plug} className={classes.article__avatar} />
          </div>
        </header>
        <div className={classes.article__wrapper}>
          <div className={classes.article__text}>{item.description}</div>
          {markdown && item.author.username === user?.username ? (
            <div className={classes.article__wrapperBtn}>
              <Popconfirm
                placement="rightTop"
                title={'Are you sure to delete this article?'}
                description={''}
                onConfirm={onClickDelete}
                okText="Yes"
                cancelText="No"
              >
                <button type="button" className={[classes.article__btn, classes.article__btn_delete].join(' ')}>
                  Delete
                </button>
              </Popconfirm>
              <Link to={`/articles/${article?.slug}/edit`}>
                <button type="button" className={[classes.article__btn, classes.article__btn_edit].join(' ')}>
                  Edit
                </button>
              </Link>
            </div>
          ) : null}
        </div>

        {markdown && (
          <div className={classes.article__body}>
            <ReactMarkdown>{item.body}</ReactMarkdown>
          </div>
        )}
      </article>
    </>
  )
}
