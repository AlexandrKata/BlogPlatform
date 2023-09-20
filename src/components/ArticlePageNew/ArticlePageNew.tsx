import { useForm, useFieldArray } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../hooks'
import { ArticleForm } from '../ArticleForm'
import { fetchArticlePost, fetchArticlesGet } from '../../redux/articlesActions'

import classes from './ArticlePageNew.module.scss'

export const ArticlePageNew = () => {
  const { user } = useAppSelector((state) => state.userReducer)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm()

  const { fields, append, remove } = useFieldArray({
    name: 'tagList',
    control,
  })

  const formatData = (data: any) => {
    const copyData = JSON.parse(JSON.stringify(data))
    const tags = copyData.tagList.reduce((acc: unknown[], curr: { [s: string]: unknown } | ArrayLike<unknown>) => {
      acc.push(...Object.values(curr))
      return acc
    }, [])
    const newData = {
      title: copyData.title,
      description: copyData.description,
      body: copyData.body,
      tagList: tags,
      token: user?.token,
    }
    return newData
  }

  const goNewArticle = async (data: any) => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    await dispatch(fetchArticlePost(data)).then(() => {})
    await dispatch(fetchArticlesGet({ ...{ offset: 0 }, ...{ token: user?.token } })).then(() => {
      navigate('/')
    })
  }

  const onSubmit = (data: any) => {
    goNewArticle(formatData(data))
  }

  return (
    <div className={classes.articlePageNew}>
      <h2 className={classes.articlePageNew__title}>Create new article</h2>
      <ArticleForm
        register={register}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        fields={fields}
        append={append}
        remove={remove}
      />
    </div>
  )
}
